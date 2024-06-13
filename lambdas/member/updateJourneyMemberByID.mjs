import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
import * as yup from "yup";
import { notifyUser } from "../shared/notify-user";

const uri = process.env.CONNECTION_STRING;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const updateSchema = yup.object().shape({
  company_id: yup.string().optional(),
  companyName: yup.string().optional(),
  companyWebsite: yup.string().optional(),
  paymentStatus: yup.boolean().optional(),
  approval: yup
    .string()
    .optional()
    .oneOf(["pending", "approved", "denied", "forwarding"]),
  password: yup.string().optional(),
});

export const updateJourneyMemberByIDHandler = async (event) => {
  if (event.requestContext.http.method.toUpperCase() !== "PUT") {
    throw new Error(
      `putMethod only accepts PUT method, you tried: ${event.requestContext.http.method.toUpperCase()} method.`
    );
  }
  const params = event.pathParameters;
  const id = params.id; // user id
  const body = JSON.parse(event.body);
  console.info("body:", JSON.stringify(body, null, 2));

  const data = await updateSchema.validate(body, { stripUnknown: false });
  let response = {};
  try {
    await client.connect();
    const journeys = await client.db("paxiv").collection("journey");
    const companies = await client.db("paxiv").collection("company");

    const user = await journeys.findOne({ _id: new ObjectId(id) });
    if (user) {
      // auto connect matching companies
      if (!data.companyID && (Boolean(data.name) || Boolean(data.website))) {
        const company = await companies.findOne({
          name: data.companyName,
          website: data.companyWebsite,
        });

        if (company) data.companyID = company._id.toString();
      }

      const password = data?.password;
      delete data?.password;
      await journeys.updateMany({ _id: user._id }, { $set: data });

      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: `Successfully updated`,
        }),
      };

      if (data.companyID && data.approval === "approved") {
        try {
          const journey = await journeys.findOne({ _id: user._id });

          const data = {
            firstname: journey.firstname,
            lastname: journey.lastname,
            email: journey.email,
            util: [
              journey?.acquisition ?? false,
              journey?.disposition ?? false,
              journey?.jointventure ?? false,
              journey?.network ?? false,
            ],
            assetType: journey?.assetType ?? [],
            totalAsset: journey?.totalAsset ?? null,
            role: journey?.role ?? "user",
            position: null,
            phone: journey?.phone ?? null,
            platinumCompany: "",
            approval: "approved",
            paymentStatus: journey?.paymentStatus ?? false,
            companyID: journey?.companyID ?? null,
            createdAt: new Date(),
            updatedAt: new Date(),
            journeyStep: journey?.journeyStep,
            isCompleted: true,
          };

          await client.db("paxiv").collection("users").insertOne(data);
          await notifyUser(data.email, "USER_APPROVED", {
            password,
          });
        } catch (e) {
          response = {
            statusCode: 500,
            body: JSON.stringify({ message: "Something went wrong!" }),
          };
        }
      }
    }
  } catch (err) {
    console.info("error----------->", err);
    response = {
      statusCode: 500,
      body: JSON.stringify({ message: "Something went wrong!" }),
    };
  } finally {
    await client.close();
  }

  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
  );
  response["headers"] = { "Access-Control-Allow-Origin": "*" };
  return response;
};
