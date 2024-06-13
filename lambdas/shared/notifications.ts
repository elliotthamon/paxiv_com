import sendgrid from "@sendgrid/mail";

export const FROM_EMAIL_ADDRESS = "support@paxiv.com";
export const FROM_EMAIL_NAME = "Paxiv Team";

interface Message {
  to: string;
  cc?: string;
  bcc?: string;
  subject: string;
  text: string;
  html: string;
}

sendgrid.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY!);
const FROM = { name: FROM_EMAIL_NAME, email: FROM_EMAIL_ADDRESS };

export async function sendMail(message: Partial<Message>) {
  if (!message.to && !message.bcc) throw new Error("No to or bcc address");

  const m: any = {
    from: FROM,
    to: { email: message.to },
    subject: message.subject,
  };
  if (message.text) m.text = message.text;
  if (message.html) m.html = message.html;
  if (message.to) m.to = { email: message.to };
  if (message.cc) m.cc = { email: message.cc };
  if (message.bcc) m.bcc = { email: message.bcc };

  try {
    const r = await sendgrid.send(m);
    console.log(`sendgrid OK: ${JSON.stringify(r, null, 2)}`);
    return { success: true };
  } catch (error: any) {
    console.log(`sendgrid FAIL: ${JSON.stringify(error, null, 2)}`);
    if (error.response)
      console.log(
        `sendgrid FAIL Response: ${JSON.stringify(
          error.response.body,
          null,
          2
        )}`
      );
    return { success: false };
  }
}

export async function sendMailToList(
  to: string[],
  subject: string,
  message: string,
  html: string = ""
) {
  const sends = to.map((t) => {
    return sendMail({
      to: t,
      subject: subject,
      text: message,
      html: html,
    });
  });
  return await Promise.all(sends);
}

export async function sendClientMailToList(
  to: string[],
  subject: string,
  html: string = ""
) {
  const sends = to.map((t) => {
    return sendMail({
      to: t,
      subject: subject,
      html: html,
    });
  });
  return await Promise.all(sends);
}

export async function sendMailToBccList(
  to: string[],
  subject: string,
  message: string,
  html: string = ""
) {
  console.log(
    `sendMailToBccList("${to}", "${subject}", "${message}", "${html}")`
  );
  return sendMail({
    bcc: to.join(","),
    subject: subject,
    text: message,
    html: html,
  });
}
