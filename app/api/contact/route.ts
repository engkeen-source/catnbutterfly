import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, message } = body as Record<string, string>;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Name, email, and message are all required." },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY is not set — skipping email delivery.");
    return NextResponse.json(
      { error: "Email service is not configured. Please set RESEND_API_KEY." },
      { status: 503 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const toEmail = process.env.CONTACT_TO_EMAIL ?? "hello@thecatnbutterfly.com";

  try {
    await resend.emails.send({
      from: "The Cat And Butterfly <noreply@thecatnbutterfly.com>",
      to: toEmail,
      replyTo: email,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr/>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
