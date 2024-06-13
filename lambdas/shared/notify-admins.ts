import { ADMIN_JOURNEY_COMPLETE, ADMIN_MESSAGE } from "@/libs/constants";
import {
  sendMailToList,
  sendClientMailToList,
  sendMail,
} from "../shared/notifications";

const BASE_URL_BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_ENDPOIONT;

const buildMessage = (
  firstname: string,
  lastname: string,
  email: string,
  event: string,
  params: any
) => {
  switch (event) {
    case ADMIN_JOURNEY_COMPLETE:
      return `${
        firstname + " " + lastname
      } (${email}) successfully completed a member journey`;
    case ADMIN_MESSAGE:
      return "";
  }
};

const buildNotifyClientRequestMessage = (data: any) => {
  return `<div>${data.firstname} ${data.lastname} (${data.email}) submitted this request.</div>
          <div><span style="font-weight:bold">Cost Allocation and Budget: </span><span>${data.cost}</span></div>
          <div><span style="font-weight:bold">Type of Property: </span><span>${data.property}</span></div>
          <div><span style="font-weight:bold">Property Sub-type: </span><span>${data.subType}</span></div>
          <div><span style="font-weight:bold">Market Locations: </span><span>${data.locations}</span></div>
          <div><span style="font-weight:bold">Physical Characteristics Needed: </span><span>${data.characteristics}</span></div>
          <div><span style="font-weight:bold">Market Requirements: </span><span>${data.requirements}</span></div>
          <div><span style="font-weight:bold">Other Considerations: </span><span>${data.other}</span></div>
  `;
};

const buildNotifySupportTeamMessage = (data: any) => {
  return `<div>You received a message from ${data.name}.</div>
          <div><span style="font-weight:bold">Email: </span><span>${data.email}</span></div>
          <div><span style="font-weight:bold">Phone: </span><span>${data.phone}</span></div>
          <div><span style="font-weight:bold">Subject:</span> <span>${data.subject}</span></div>
          <div><span style="font-weight:bold">Content:</span> <span>${data.message}</span></div>
  `;
};

export async function notifyAdmins(
  client: any,
  firstname: string,
  lastname: string,
  email: string,
  event: string,
  params: any
) {
  console.log(`notifying admins...`);
  const text = buildMessage(firstname, lastname, email, event, params);
  const admins = await getAllSiteAdminsEmails(client);
  console.log(`admins: `, JSON.stringify(admins, null, 2));
  return sendMailToList(
    admins,
    params.subject ?? "Paxiv Team",
    text ?? params.text,
    params.html ?? ""
  );
}

export async function notifySupportTeam(client: any, data: any) {
  const html = buildNotifySupportTeamMessage(data);

  return await sendMail({
    to: "support@paxiv.com",
    subject: "Paxiv Team",
    html,
  });
}

export async function notifyClientRequestToAdmins(client: any, data: any) {
  console.log(`notifying admins...`);
  const html = buildNotifyClientRequestMessage(data);
  const admins = await getAllSiteAdminsEmails(client);
  return sendClientMailToList(admins, "Paxiv Team", html);
}

const getAllSiteAdmins = async (client: any) => {
  try {
    return await client
      .db("paxiv")
      .collection("users")
      .find({ role: "siteAdmin" })
      .toArray();
  } catch (e) {
    console.log(e);
  }
  return null;
};

const getAllSiteAdminsEmails = async (client: any): Promise<string[]> => {
  let admins = await getAllSiteAdmins(client);
  if (admins?.length > 0) {
    return admins.map((item: any) => {
      return item.email;
    });
  }

  return [];
};
