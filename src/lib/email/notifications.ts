import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const notificationEmail =
  process.env.FOUNDATION_NOTIFICATION_EMAIL;
const fromEmail =
  process.env.EMAIL_FROM ||
  "Sangbe Foundation <onboarding@resend.dev>";

const resend = apiKey ? new Resend(apiKey) : null;

type NotificationOptions = {
  subject: string;
  title: string;
  fields: {
    label: string;
    value?: string | number | null;
  }[];
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function sendStaffNotification({
  subject,
  title,
  fields,
}: NotificationOptions) {
  if (!resend || !notificationEmail) {
    console.warn(
      "Email notification skipped: email environment variables are missing."
    );

    return {
      success: false,
      skipped: true,
    };
  }

  const rows = fields
    .filter(
      (field) =>
        field.value !== undefined &&
        field.value !== null &&
        String(field.value).trim() !== ""
    )
    .map(
      (field) => `
        <tr>
          <td style="
            padding: 10px 16px;
            border-bottom: 1px solid #e5e7eb;
            font-weight: 600;
            vertical-align: top;
            width: 160px;
          ">
            ${escapeHtml(field.label)}
          </td>

          <td style="
            padding: 10px 16px;
            border-bottom: 1px solid #e5e7eb;
            white-space: pre-wrap;
          ">
            ${escapeHtml(String(field.value))}
          </td>
        </tr>
      `
    )
    .join("");

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: notificationEmail,
      subject,
      html: `
        <div style="
          font-family: Arial, Helvetica, sans-serif;
          color: #142019;
          max-width: 680px;
          margin: 0 auto;
          padding: 24px;
        ">
          <div style="
            background: #073b29;
            color: #ffffff;
            padding: 24px;
            border-radius: 14px 14px 0 0;
          ">
            <div style="
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 1.5px;
              opacity: 0.75;
            ">
              Sangbe Foundation Website
            </div>

            <h1 style="
              margin: 8px 0 0;
              font-size: 22px;
            ">
              ${escapeHtml(title)}
            </h1>
          </div>

          <table
            cellspacing="0"
            cellpadding="0"
            style="
              width: 100%;
              border: 1px solid #e5e7eb;
              border-top: 0;
              border-collapse: collapse;
            "
          >
            ${rows}
          </table>

          <div style="
            padding: 18px;
            background: #f5f8f6;
            color: #647067;
            font-size: 12px;
            line-height: 1.6;
            border-radius: 0 0 14px 14px;
          ">
            This notification was generated automatically
            from the Sangbe Foundation website.
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Email notification error:", error);

      return {
        success: false,
        error,
      };
    }

    return {
      success: true,
      id: data?.id,
    };
  } catch (error) {
    console.error("Email notification exception:", error);

    return {
      success: false,
      error,
    };
  }
}