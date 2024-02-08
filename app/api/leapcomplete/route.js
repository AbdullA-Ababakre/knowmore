// export async function GET(req, res) {
//   console.log("leapcomplete", res.body);
//   return Response.json({ message: "leapcomplete" });
// }

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const incomingData = await request.json();
  // console.log(incomingData, "train model webhook incomingData");

  const { output } = incomingData;
  console.log("output111", output);
}
