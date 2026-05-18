import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { fullName, email, service, message } = body;

    if (!fullName || !email) {
      return NextResponse.json(
        {
          error: "Missing required fields",
        },
        {
          status: 400,
        },
      );
    }

    const { data, error } = await supabase
      .from("contact_leads")
      .insert([
        {
          full_name: fullName,
          email,
          service,
          message,
        },
      ])
      .select();

    if (error) {
      console.error("SUPABASE ERROR:", error);

      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        },
      );
    }

    // SEND EMAIL
    const emailResponse = await resend.emails.send({
      from: "Echo Media Wave <onboarding@resend.dev>",
      to: "echomediarelations@gmail.com",
      subject: "New Echo Media Wave Lead",

      html: `
    <h2>New Client Inquiry</h2>

    <p><strong>Name:</strong> ${fullName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Service:</strong> ${service}</p>
    <p><strong>Message:</strong> ${message}</p>
  `,
    });

    console.log("EMAIL RESPONSE:", emailResponse);

    return NextResponse.json(
      {
        success: true,
        data,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown server error";

    console.error("SERVER ERROR:", error);

    return NextResponse.json(
      {
        error: message,
      },
      {
        status: 500,
      },
    );
  }
}
