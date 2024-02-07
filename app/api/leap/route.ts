import type { NextApiRequest, NextApiResponse } from "next";
import { Leap } from "@leap-ai/workflows";

type Data = {
  name: string;
};

const leap = new Leap({
  apiKey: "le_6ee3a58a_10BQlbAOmDeD0OaYuFpt76jR",
});

export async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "POST") {
    try {
      const response = await leap.workflowRuns.workflow({
        workflow_id: "wkf_D8rw0tlFr5t0d3",
        webhook_url: "https://26f9-204-11-230-50.ngrok-free.app/api/leap",
        input: {
          email_of_lead: "bill.gates@microsoft.com",
        },
      });

      console.log("response", response);

      // Assuming response.data.output is the expected data structure
      if (response.data.output !== null) {
        res.json(response.data.output); // Assuming output is of type Data
      } else {
        res.json({name: "not completed"});
      }
    } catch (error) {
      console.error("Error:", error);
      // Sending a JSON response with the error message and a 500 status code
      res.status(500).json({name: "Internal server error"});
    }
  } else {
    // Handling non-POST requests
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
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
