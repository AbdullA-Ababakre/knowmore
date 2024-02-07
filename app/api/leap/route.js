import { Leap } from "@leap-ai/workflows";

const leap = new Leap({
  apiKey: "le_80593dca_E05YaZ9T0h69tXw0iHDkbCHm",
});


export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const response = await leap.workflowRuns.workflow({
        workflow_id: "wkf_ZUV578fRsUfxz3",
        webhook_url: "https://26f9-204-11-230-50.ngrok-free.app/api/leap",
        input: {
          email_of_lead: "bill.gates@microsoft.com",
        },
      });

      if (response.data.output !== null) {
        res.json(response.data.output); // Assuming output is of type Data
      } else {
        res.json({ name: "not completed" });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ name: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
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
