import { UserInfoType } from "../journey";

const secretKey = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;
const demoProduct = process.env.NEXT_PUBLIC_STRIPE_DEMO_PRODUCT;
const BASE_URL_BACKEND_API = process.env.NEXT_PUBLIC_API_URL;



const createJourneyPersonalInfo = async (memberData: any) => {
  try {
    const response = await fetch(
      `${BASE_URL_BACKEND_API}/member/createPersonalInfo`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(memberData),
      }
    );

    const data = await response.json();
    if (response.ok) {
      return { status: true, data: data };
    } else {
      return { status: false, data: data.message };
    }
  } catch (e: any) {
    return { status: false, data: "Error occured, Try again later" };
  }
};

const stripe = require("stripe")(secretKey);

export default async function handler(req: any, res: any) {

  const member: UserInfoType = req.body.member ?? {};

  if(!member.stripeId) {
    const cust = await stripe.customers.create({
      "email": member.personal.email,
      "metadata": {
        firstname: member.personal.firstname,
        lastname: member.personal.lastname,
      },
      "name": member.company.companyName,
    });
    member.stripeId = cust.id;
    createJourneyPersonalInfo(member);
  }

  const priceId = demoProduct ?? 'price_1O2J6TAcF4MlfTLADDvlob9v'; 
  const subscription = await stripe.subscriptions.create({
    customer: member.stripeId,
    payment_behavior: 'default_incomplete',
    cancel_at_period_end: false,
    items: [
      {
        price: priceId
      },
    ],
  });

  const inv = await stripe.invoices.retrieve(subscription.latest_invoice);
  const intent = await stripe.paymentIntents.retrieve(inv.payment_intent)

  res.send({
    customerId: subscription.customer,
    paymentIntent: inv.payment_intent,
    clientSecret: intent.client_secret,
  });
};
