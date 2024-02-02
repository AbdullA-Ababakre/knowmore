import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const body = _req.body;

  res.status(200).json({
    success: "file uploaded successfully",
  });
}
