import Stripe from "stripe";
import { headers } from "next/headers";
import { buffer } from "node:stream/consumers";
import { createSupbaseAdmin } from "@/lib/supabase";

const stripe = new Stripe(process.env.STRIPE_SK_KEY, {
  apiVersion: "2023-10-16",
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const signature = headers().get("stripe-signature");
    const signingSecret = process.env.STRIPE_SIGNING_SECRET;
    const rawBody = await buffer(req.body);

    let event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, signingSecret);
    } catch (err) {
      return Response.json({ error: `Webhook Error ${err?.message} ` });
    }

    switch (event.type) {
      case "customer.subscription.deleted":
        const deleteSubscription = event.data.object;
        if (deleteSubscription.status === "canceled") {
          await onCacnelSubscription(false, deleteSubscription.customer);
        }
        break;
      case "customer.subscription.updated":
        const { customer } = event.data.object;
        const subscription = await stripe.subscriptions.list({
          customer: customer.id,
        });

        const customerInfo = await stripe.customers.retrieve(
          event.data.object.customer
        );

        if (subscription.data.length && event.data.object.status === "active") {
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
  } else {
    return Response.json({ success: false });
  }
}

// export async function POST(req, res) {
//   const signature = headers().get("stripe-signature");
//   const signingSecret = process.env.STRIPE_SIGNING_SECRET;
//   const rawBody = await buffer(req.body);

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(rawBody, signature, signingSecret);
//   } catch (err) {
//     return Response.json({ error: `Webhook Error ${err?.message} ` });
//   }

//   switch (event.type) {
//     case "customer.subscription.deleted":
//       const deleteSubscription = event.data.object;
//       if (deleteSubscription.status === "canceled") {
//         await onCacnelSubscription(false, deleteSubscription.customer);
//       }
//       break;
//     case "customer.subscription.updated":
//       const { customer } = event.data.object;
//       const subscription = await stripe.subscriptions.list({
//         customer: customer.id,
//       });

//       const customerInfo = await stripe.customers.retrieve(
//         event.data.object.customer
//       );

//       if (subscription.data.length && event.data.object.status === "active") {
//         const sub = subscription.data[0];
//         await onSuccessSubscription(
//           sub.id,
//           customer,
//           sub.status === "active",
//           customerInfo.email
//         );
//       }
//       break;
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   return Response.json({ success: true });
// }

const onSuccessSubscription = async (
  subscription_id,
  customer_id,
  status,
  email
) => {
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
};

const onCacnelSubscription = async (status, customer) => {
  const supabase = await createSupbaseAdmin();
  const { error } = await supabase
    .from("users")
    .update({
      stripe_subscriptoin_id: null,
      stripe_customer_id: null,
      subscription_status: status,
    })
    .match({ stripe_customer_id: customer });
};
