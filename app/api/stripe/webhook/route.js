import Stripe from "stripe";
import { headers } from "next/headers";
import { buffer } from "node:stream/consumers";
import { createSupbaseAdmin } from "@/lib/supabase";


const stripe = new Stripe(process.env.STRIPE_SK_KEY, {
  apiVersion: "2023-10-16",
});

console.log("stripe1111",stripe);

export async function POST(req, res) {
  console.log("req111,", req);
  const signature = headers().get("stripe-signature");
  const signingSecret = process.env.STRIPE_SIGNING_SECRET;
  const rawBody = await buffer(req.body);

  let event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, signingSecret);
  } catch (err) {
    return Response.json({ error: `Webhook Error ${err?.message} ` });
  }

  console.log("event11", event);

  switch (event.type) {
    case "customer.subscription.deleted":
      await deleteSubscription(event);
      break;
    case "customer.subscription.updated":
      const { customer } = event.data.object;
      const subscription = await stripe.subscriptions.list({
        customer: customer.id,
      });

      const customerInfo = await stripe.customers.retrieve(
        event.data.object.customer
      );
      if (subscription.data.length) {
        const sub = subscription.data[0];
        await onSuccessSubscription(
          sub.id,
          customer,
          sub.status === "active",
          customerInfo.email
        );
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return Response.json({ success: true });
}

const onSuccessSubscription = async (
  subscription_id,
  customer_id,
  status,
  email
) => {
  console.log("subscription_id,customer_id,status,email", subscription_id,
    customer_id,
    status,
    email);
  const supabase = await createSupbaseAdmin();
  const { data, error } = await supabase
    .from("users")
    .update({
      stripe_subscriptoin_id: subscription_id,
      stripe_customer_id: customer_id,
      subscription_status: status,
    })
    .eq("email", email)
    .select("id")
    .select();
  await supabase.auth.admin.updateUserById(data?.id, {
    user_metadata: { stripe_customer_id: null },
  });
};



async function deleteSubscription(event) { }
