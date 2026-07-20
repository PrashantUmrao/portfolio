import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
    try {
        const { data, error } = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: "prashantumrao4242@gmail.com",
            subject: "Resend Test Email",
            html: "<h2>🎉 Congratulations!</h2><p>Your Resend integration is working successfully.</p>",
        });

        if (error) {
            return Response.json(error, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        console.error(error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, subject, message } = body || {};

        const cleanName = typeof name === "string" ? name.trim() : "";
        const cleanEmail = typeof email === "string" ? email.trim() : "";
        const cleanSubject = typeof subject === "string" ? subject.trim() : "";
        const cleanMessage = typeof message === "string" ? message.trim() : "";

        if (!cleanName || !cleanEmail || !cleanSubject || !cleanMessage) {
            return Response.json(
                { error: "All fields (Name, Email, Subject, and Message) are required." },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(cleanEmail)) {
            return Response.json(
                { error: "Please enter a valid email address." },
                { status: 400 }
            );
        }

        if (cleanMessage.length < 10) {
            return Response.json(
                { error: "Message must be at least 10 characters long." },
                { status: 400 }
            );
        }

        const recipientEmail = process.env.CONTACT_RECEIVER_EMAIL || "prashantumrao4242@gmail.com";
        const senderEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

        // Email #1: Send details to site owner with visitor email set as replyTo
        const { data: ownerData, error: ownerError } = await resend.emails.send({
            from: `Portfolio Contact <${senderEmail}>`,
            to: recipientEmail,
            replyTo: cleanEmail,
            subject: `[Portfolio Contact] ${cleanSubject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
                    <h2 style="color: #2563eb; margin-bottom: 16px;">New Portfolio Contact Message</h2>
                    <p style="margin: 8px 0;"><strong>Name:</strong> ${escapeHtml(cleanName)}</p>
                    <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${escapeHtml(cleanEmail)}">${escapeHtml(cleanEmail)}</a></p>
                    <p style="margin: 8px 0;"><strong>Subject:</strong> ${escapeHtml(cleanSubject)}</p>
                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
                    <p style="margin: 8px 0;"><strong>Message:</strong></p>
                    <div style="background-color: #f8fafc; padding: 16px; border-radius: 6px; white-space: pre-wrap; font-size: 14px; line-height: 1.5; color: #334155;">${escapeHtml(cleanMessage)}</div>
                </div>
            `,
        });

        if (ownerError) {
            console.error("Resend API owner notification error:", ownerError);
            return Response.json(
                { error: ownerError.message || "Failed to send notification email." },
                { status: 500 }
            );
        }

        // Email #2: Automatic confirmation email to visitor
        try {
            const { error: visitorError } = await resend.emails.send({
                from: `Prashant Umrao <${senderEmail}>`,
                to: cleanEmail,
                subject: `Thank you for reaching out, ${cleanName}!`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
                        <h2 style="color: #2563eb; margin-bottom: 16px;">Thank You for Connecting!</h2>
                        <p style="font-size: 15px; color: #334155;">Hi ${escapeHtml(cleanName)},</p>
                        <p style="font-size: 15px; color: #334155; line-height: 1.5;">
                            Thank you for sending a message regarding <strong>"${escapeHtml(cleanSubject)}"</strong>. I have received your email and will review it as soon as possible.
                        </p>
                        <p style="font-size: 15px; color: #334155; line-height: 1.5;">
                            Best regards,<br />
                            <strong>Prashant Umrao</strong><br />
                            Software Engineer & QA Tester
                        </p>
                    </div>
                `,
            });

            if (visitorError) {
                console.warn("Resend visitor confirmation notice:", visitorError);
            }
        } catch (confError) {
            console.warn("Auto-reply confirmation email could not be sent:", confError.message);
        }

        return Response.json(
            { success: true, message: "Message sent successfully!", id: ownerData?.id },
            { status: 200 }
        );
    } catch (error) {
        console.error("Contact API internal error:", error);
        return Response.json(
            { error: "An unexpected error occurred while processing your request." },
            { status: 500 }
        );
    }
}

function escapeHtml(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}