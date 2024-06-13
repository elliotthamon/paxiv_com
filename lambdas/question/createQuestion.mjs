import { MongoClient, ServerApiVersion } from "mongodb";
import { notifySupportTeam } from "../shared/notify-admins";

const uri = process.env.CONNECTION_STRING;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const createQuestionHandler = async (event) => {
  if (event.requestContext.http.method.toUpperCase() !== "POST") {
    throw new Error(
      `postMethod only accepts POST method, you tried: ${event.requestContext.http.method.toUpperCase()} method.`
    );
  }
  console.info("received:", event);

  const body = JSON.parse(event.body);

  const data = {
    name: body.name,
    email: body.email,
    phone: body.phone,
    subject: body.subject,
    message: body.message,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  let response = {};

  try {
    await client.connect();

    await client.db("paxiv").collection("question").insertOne(data);
    try {
      const res = await notifySupportTeam(client, data);
      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: `Question is submitted successfully.`,
        }),
      };
    } catch (err) {
      response = {
        statusCode: 500,
        body: JSON.stringify({ message: "Something went wrong!" }),
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
