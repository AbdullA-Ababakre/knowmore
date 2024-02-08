import { Leap } from "@leap-ai/workflows";
import type { NextApiRequest, NextApiResponse } from "next";

const leap = new Leap({
  apiKey: "le_80593dca_E05YaZ9T0h69tXw0iHDkbCHm",
});

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await leap.workflowRuns.workflow({
      workflow_id: "wkf_ZUV578fRsUfxz3",
      webhook_url: "https://knowmore-jade.vercel.app/api/leapcomplete",
      input: {
        email_of_lead: "bill.gates@microsoft.com",
      },
    });
    return Response.json({ message: "Hello from Next.js!" });
  } catch {
    console.log("11");
    return Response.json({ message: "nethod not supported" });
  }
}
