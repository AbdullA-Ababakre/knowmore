import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export const getData = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("res-leapComplete", res);
  return Response.json({ message: "succeess" });
};
