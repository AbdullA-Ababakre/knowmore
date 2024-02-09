import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const body = _req.body;
  console.log("upload request",body);

  res.status(200).json({
    success: "file uploaded successfully",
  });
}
