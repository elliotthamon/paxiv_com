import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import jwt from "jsonwebtoken";

const uri = process.env.CONNECTION_STRING;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const authenticateMemberHandler = async (event) => {
  if (event.requestContext.http.method.toUpperCase() !== "POST") {
    throw new Error(
      `postMethod only accepts POST method, you tried: ${event.requestContext.http.method.toUpperCase()} method.`
    );
  }
  console.info("received:", event);

  const body = JSON.parse(event.body);
  let response = {};

  try {
    await client.connect();

    let user = await client
      .db("paxiv")
      .collection("users")
      .findOne({ email: { $regex: new RegExp(body.email, "i") } });

    if (!user) {
      user = {
        createdAt: new Date(),
        email,
        journeyStep: 0,
        firstname: "",
        lastname: "",
        util: body.util,
        assetType: "",
        totalAsset: "",
        role: "user",
        position: "",
        phone: "",
        platinumCompany: "",
        paymentStatus: "",
        approval: "pending",
        companyID: body.companyID,
        companyUser: false,
        companyUserDeleted: false,
        updatedAt: new Date(),
        isCompleted: true,
      };
      const result = await client
        .db("paxiv")
        .collection("users")
        .insertOne(user);

      if (result.acknowledged && result.insertedId)
        user._id = result.insertedId;
    }
    if (!user) {
      response = {
        statusCode: 401,
        body: JSON.stringify({ message: `User does not exist.` }),
      };
    } else if (user.companyID === null) {
      response = {
        statusCode: 401,
        body: JSON.stringify({ message: `Company does not exist.` }),
      };
    } else {
      const company = await client
        .db("paxiv")
        .collection("company")
        .findOne({ _id: new ObjectId(user.companyID) });
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          role: user.role,
          approval: user.approval,
          companyID: user.companyID,
          companyAvatar: company.companyAvatarImageFile,
        },
        "paxiv",
        { expiresIn: "1h" }
      );

      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: `JWT token is created successfully.`,
          token: token,
        }),
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
