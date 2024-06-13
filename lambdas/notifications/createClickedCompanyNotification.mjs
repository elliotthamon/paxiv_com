import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.CONNECTION_STRING;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const createClickedCompanyNotificationHandler = async (event) => {
  if (event.requestContext.http.method.toUpperCase() !== "POST") {
    throw new Error(
      `postMethod only accepts POST method, you tried: ${event.requestContext.http.method.toUpperCase()} method.`
    );
  }
  console.info("received:", event);

  const body = JSON.parse(event.body);

  const target_arr = body.target_user;

  let data = [];

  for (let item of target_arr) {
    const document = {
      eventType: body.eventType,
      status: body.status,
      origin_user: body.origin_user,
      target_user: item,

      createdAt: Date.now(),
      createdBy: body.origin_user,
      updatedAt: Date.now(),
    };
    data.push(document);
  }

  let response = {};

  try {
    await client.connect();

    const result = await client
      .db("paxiv")
      .collection("notifications")
      .insertMany(data);
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: `Item is submitted successfully. ID: ${result.insertedId}`,
        id: result.insertedId,
      }),
    };
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
