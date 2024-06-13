import {
  USER_APPROVED,
  USER_COMPANY_REGISTER,
  USER_ADHOC,
} from "@/libs/constants";
import { sendMail } from "../shared/notifications";

const buildMessage = (email: string, event: string, params: any) => {

  switch (event) {
    case USER_APPROVED:
      const code = Buffer.from(params.password).toString('base64');
      const proto = process.env.CUSTOM_DOMAIN?.startsWith('localhost') ? "http://" : "https://";
      const URL=`${proto}${process.env.CUSTOM_DOMAIN}/auth/accept?email=${email}&code=${code}`;
      return `<p>Your application has been accepted and your company profile has been uploaded.<br></p> 
              <p>Click on the link below to set your account password:</p><br/>
                <a style="text-decoration:none;max-width:280px;background-color:#a37e2c;border:2px solid #a37e2c;border-radius:8px;min-width:230px;color:#ffffff;white-space:nowrap;font-weight:bold;display:block;font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:40px;text-align:center;"
                href="${URL}"
                target="_blank"
                >
                <span style="text-decoration:none;">Set up your password</span>
                  
                </a>
      `;

    case USER_COMPANY_REGISTER:
      return `Successfully approved!<br> <p>Your password is: <span id="password" style="background-color: yellow; padding: 3px">${params.password}</span></p>`;
    case USER_ADHOC:
      return params.html;
  }
};

export async function notifyUser(email: string, event: string, params: any) {
  const html = buildMessage(email, event, params);

  return await sendMail({
    to: email,
    subject: "Paxiv Team",
    html,
  });
}
