import type { NextApiRequest, NextApiResponse } from "next";
import { Leap } from "@leap-ai/workflows";

type Data = {
  name: string;
};

const leap = new Leap({
  apiKey: "le_6ee3a58a_10BQlbAOmDeD0OaYuFpt76jR",
});

export async function POST(req: NextApiRequest, res: NextApiResponse<Data>) {
  const response = await leap.workflowRuns.workflow({
    workflow_id: "wkf_D8rw0tlFr5t0d3",
    webhook_url: "https://26f9-204-11-230-50.ngrok-free.app/api/leap",
    input: {
      email_of_lead: "bill.gates@microsoft.com",
    },
  });
  console.log("response", response);
  if (response.data.output !== null) {
    return Response.json(response.data);
  } else {
    return Response.json("not completed");
  }
}
