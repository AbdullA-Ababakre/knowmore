import { Leap } from "@leap-ai/workflows";

const leap = new Leap({
  apiKey: "le_80593dca_E05YaZ9T0h69tXw0iHDkbCHm",
});

// eslint-disable-next-line import/no-anonymous-default-export
// export default async function handler(req, res)
export async function POST(req, res) {
  const body = await req.json();
  console.log("body111", body);
  try {
    const response = await leap.workflowRuns.workflow({
      workflow_id: "wkf_ZUV578fRsUfxz3",
      webhook_url: `https://knowmore-tan.vercel.app/api/leapcomplete?email_of_lead=${body.email}&upload_id=${body.upload_id}`,
      input: {
        email_of_lead: body.email,
      },
    });
  } catch {}

  return Response.json({ message: "hello" });
}
