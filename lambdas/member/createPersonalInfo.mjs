import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
import * as yup from "yup";
import { assetLevels, assetTypes } from "@/libs/constants";
import { notifyAdmins } from "../shared/notify-admins";

const uri = process.env.CONNECTION_STRING;

const assetLevelSchema = yup
  .string()
  .oneOf(assetLevels.map((a) => a[0]))
  .required("Total Asset under management is required");

const assetTypeSchema = yup
  .array(yup.string().oneOf(assetTypes))
  .min(1, "At least one asset type is required")
  .max(assetTypes.length);

const stepCheck = yup.number().required().max(4).min(0).integer();
const schemas = [
  // First Step
  yup.object().shape({
    _id: yup.string().optional(),
    journeyStep: yup.number().required().max(4).min(0).integer(),
    firstname: yup.string().required("First Name is required."),
    lastname: yup.string().required("Last Name is required.").min(2),
    email: yup
      .string()
      .email("Email is not valid")
      .required("Email is required."),
    phone: yup
      .string()
      .transform((value, originalValue) => {
        if (originalValue.startsWith("+")) {
          return originalValue;
        } else if (originalValue.startsWith("1")) {
          return `+${originalValue}`;
        } else {
          return `+1${originalValue}`;
        }
      })
      .matches(/^\+1\d{10}$/, "Invalid US phone number format")
      .required("Phone number is required"),
    acceptTermsandConditions: yup
      .bool()
      .oneOf([true], "You must accept our terms & conditions.")
      .required(),
  }),

  // second step
  yup.object().shape({
    _id: yup.string().required(),
    journeyStep: yup.number().required().max(4).min(0).integer(),
    acquisition: yup.bool().required(),
    disposition: yup.bool().required(),
    jointventure: yup.bool().required(),
    network: yup.bool().required(),
  }),

  // third step
  yup.object().shape({
    _id: yup.string().required(),
    journeyStep: yup.number().required().max(4).min(0).integer(),
    companyName: yup.string().required("Company Name is required."),
    companyWebsite: yup
      .string()
      .matches(
        /^(https?:\/\/)?(?:[-A-Za-z0-9]+\.)+[A-Za-z]{2,6}$/,
        "Please enter a valid URL or domain"
      )
      .required("Company Website is required."),
    assetType: assetTypeSchema,
    totalAsset: assetLevelSchema,
    isCompleted: yup.bool().optional(),
  }),

  // fourth step - demo only or move on
  yup.object().shape({
    _id: yup.string().required(),
    journeyStep: yup.number().required().max(4).min(0).integer(),
    isCompleted: yup.bool().optional(),
    stripe: yup.bool().optional(),
    stripeId: yup.string().optional(),
  }),
  // fifth step - pay
  yup.object().shape({
    _id: yup.string().required(),
    journeyStep: yup.number().required().max(4).min(4).integer(),
    paymentStatus: yup.bool().optional(),
    isCompleted: yup.bool().optional(),
    stripe: yup.bool().optional(),
    stripeId: yup.string().optional(),
  }),
];

const schemaSignup = yup.object().shape({
  firstname: yup.string().required("First Name is required."),
  lastname: yup.string().required("Last Name is required."),
  email: yup
    .string()
    .email("Email is not valid")
    .required("Email is required."),
  companyName: yup.string().required("Company Name is required."),
  password: yup
    .string()
    .required("Password is required.")
    .min(8, "Password must be at least 8 characters.")
    .max(32, "Password must be at most 32 characters.")
    .matches(/[a-z]+/, "password must contain at least 1 lowercase character.")
    .matches(/[A-Z]+/, "password must contain at least 1 uppercase character.")
    .matches(
      /[@$!%*#?&]+/,
      "password must contain at least one special character."
    )
    .matches(/\d+/, "password must contain at least one number."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null || ""], "Passwords must be matched.")
    .required("Confirm password is required."),
  acceptTermsandConditions: yup
    .bool()
    .oneOf([true], "You must accept our terms & conditions.")
    .required(),
  stripeId: yup.string().optional(),
});

const schemaDemo = yup.object().shape({
  firstname: yup.string().required("First Name is required."),
  lastname: yup.string().required("Last Name is required."),
  email: yup
    .string()
    .email("Email is not valid.")
    .required("Email is required."),
  acceptTermsandConditions: yup
    .bool()
    .oneOf([true], "You must accept our terms of Use.")
    .required(),
  stripeId: yup.string().optional(),
});

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const createPersonalInfoHandler = async (event) => {
  if (event.requestContext.http.method.toUpperCase() !== "POST") {
    return {
      statusCode: 200,
      body: "{}",
    };
  }

  console.info("received:", event);

  const body = JSON.parse(event.body);

  const email = body?.email;

  let userId = body._id || null;

  let response = {};

  try {
    await client.connect();
    const users = await client.db("paxiv").collection("users");
    const journeys = await client.db("paxiv").collection("journey");

    const result1 =
      email !== undefined
        ? await users
            .find({ email: { $regex: new RegExp(email, "i") } })
            .toArray()
        : [];
    const result2 =
      email !== undefined
        ? await journeys
            .find({ email: { $regex: new RegExp(email, "i") } })
            .toArray()
        : [];
    if (result1.length == 0 && result2.length == 0) {
      if (userId === null) {
        // must be new submission
        const data = await schemas[0].validate(body, { stripUnknown: true });
        data.createdAt = new Date();
        data.paymentStatus = false;
        data.approval = data.approval ?? "pending";
        const result = await journeys.insertOne(data);
        if (result.acknowledged && result.insertedId) {
          response = {
            statusCode: 200,
            body: JSON.stringify({ _id: result.insertedId }),
          };
        } else {
          console.info("error----------->", err);
          throw new Error(result);
        }
      } else {
        // existing submission
        const step = await stepCheck.validate(body.journeyStep);
        const data = await schemas[step].validate(body, { stripUnknown: true });
        const journey = await journeys.findOne({ _id: new ObjectId(data._id) });
        const update = { ...journey, ...data };
        delete update._id;
        const result = await journeys.updateOne(
          { _id: new ObjectId(data._id) },
          { $set: update }
        );

        if (result.acknowledged) {
          response = {
            statusCode: 200,
            body: JSON.stringify({ _id: data._id }),
          };

          if (data.isCompleted) {
            console.log(`Journey complete. Sending notifications`);
            const { firstname, lastname, email } = journey;
            console.log(`Journey: `, JSON.stringify(journey, null, 3));

            try {
              const res = await notifyAdmins(
                client,
                firstname,
                lastname,
                email,
                "ADMIN_JOURNEY_COMPLETE",
                { userId: data._id }
              );
            } catch (err) {
              console.info("error----------->", err);
              response = {
                statusCode: 500,
                body: JSON.stringify({ message: "Something went wrong!" }),
              };
            }
          }
        } else {
          console.info("error----------->", err);
          throw new Error(result);
        }
      }
    } else {
      response = {
        statusCode: 500,
        body: JSON.stringify({ message: "This email was already registered!" }),
      };
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
