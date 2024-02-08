// export async function GET(req, res) {
//   console.log("leapcomplete", res.body);
//   return Response.json({ message: "leapcomplete" });
// }

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SERVICE_ROLE,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  }
);

export async function POST(request) {
  const incomingData = await request.json();
  // console.log(incomingData, "train model webhook incomingData");

  const { output } = incomingData;
  console.log("output", output);

  if (incomingData.status === "completed") {
    console.log("incomingData-output", output);

    const { error: imageError } = await supabase.from("data").insert({
      output: JSON.stringify(output),
    });

    return Response.json({ message: output });
  } else {
    return Response.json({ message: "failed" });
  }
}
