import type { NextApiRequest, NextApiResponse } from "next";
import { Leap } from "@leap-ai/workflows";

type Data = {
  name: string;
};

const leap = new Leap({
  apiKey: "le_689abdde_W9q515UPfr92fcTTQQ0NRW6D",
});

export async function POST(req: NextApiRequest, res: NextApiResponse<Data>) {
  const response = await leap.workflowRuns.workflow({
    workflow_id: "wkf_eZ1AxrGszPnIsu",
    webhook_url: "https://d171-204-11-230-50.ngrok-free.app/api/leap",
    input: {
      email_of_lead: "bill.gates@microsoft.com",
    },
  });
  return Response.json({ name: "John Doe" });
}
