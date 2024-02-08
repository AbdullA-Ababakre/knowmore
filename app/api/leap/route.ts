import { Leap } from "@leap-ai/workflows";
import type { NextApiRequest, NextApiResponse } from "next";

const leap = new Leap({
  apiKey: "le_80593dca_E05YaZ9T0h69tXw0iHDkbCHm",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const response = await leap.workflowRuns.workflow({
        workflow_id: "wkf_ZUV578fRsUfxz3",
        webhook_url: "https://knowmore-jade.vercel.app/api/leadcomplete",
        input: {
          email_of_lead: "bill.gates@microsoft.com",
        },
      });
    } catch {
      console.log("11");
    }

    res.status(200).json({ message: "Hello from Next.js!" });
  } else {
    // Handle any other HTTP method
    res.status(200).json({ message: "method not allowded" });
  }
}

// export async function POST(req: NextApiRequest, res: NextApiResponse<Data>) {
// const response = await leap.workflowRuns.workflow({
//   workflow_id: "wkf_D8rw0tlFr5t0d3",
//   webhook_url: "https://26f9-204-11-230-50.ngrok-free.app/api/leap",
//   input: {
//     email_of_lead: "bill.gates@microsoft.com",
//   },
// });
// console.log("response", response);
// if (response.data.output !== null) {
//   return Response.json(response.data);
// } else {
//   return Response.json("not completed");
// }
// }
