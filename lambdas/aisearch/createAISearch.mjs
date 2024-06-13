import { MongoClient, ServerApiVersion } from "mongodb";
import { notifyClientRequestToAdmins } from "../shared/notify-admins";

const uri = process.env.CONNECTION_STRING;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const createAISearchHandler = async (event) => {
  if (event.requestContext.http.method.toUpperCase() !== "POST") {
    throw new Error(
      `postMethod only accepts POST method, you tried: ${event.requestContext.http.method.toUpperCase()} method.`
    );
  }

  const data = JSON.parse(event.body);
  data.createdAt = new Date();

  let response = {};

  try {
    const result = await client
      .db("paxiv")
      .collection("aisearch")
      .insertOne(data);
    if (result.acknowledged && result.insertedId) {
      try {
        await notifyClientRequestToAdmins(client, data);
        response = {
          statusCode: 200,
          body: JSON.stringify({
            message: `New AISearch was created successfully.`,
          }),
        };
      } catch (err) {
        response = {
          statusCode: 500,
          body: JSON.stringify({ message: "Something went wrong!" }),
        };
      }
    } else {
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
