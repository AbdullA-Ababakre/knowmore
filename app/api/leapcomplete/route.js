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

  const urlObj = new URL(request.url);
  const email_of_lead = urlObj.searchParams.get("email_of_lead");
  const upload_id = urlObj.searchParams.get("upload_id");

  if (incomingData.status === "completed") {
    const { error: imageError } = await supabase.from("data").insert({
      output: JSON.stringify(output),
      email_of_lead: JSON.stringify(email_of_lead),
      upload_id: JSON.stringify(upload_id),
    });

    return Response.json({ message: output });
  } else {
    return Response.json({ message: "failed" });
  }
}
