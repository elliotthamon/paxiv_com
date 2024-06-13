import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.CONNECTION_STRING;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const createViewAssetNotificationHandler = async (event) => {
  if (event.requestContext.http.method.toUpperCase() !== "POST") {
    throw new Error(
      `postMethod only accepts POST method, you tried: ${event.requestContext.http.method.toUpperCase()} method.`
    );
  }
  console.info("received:", event);

  const body = JSON.parse(event.body);

  const data = {
    eventType: body.eventType,
    status: body.status,
    origin_user: body.origin_user,
    target_user: body.target_user,
    asset_id: body.asset_id,

    createdAt: Date.now(),
    createdBy: body.origin_user,
    updatedAt: Date.now(),
  };

  let response = {};

  try {
    await client.connect();

    const result = await client
      .db("paxiv")
      .collection("notifications")
      .insertOne(data);
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
