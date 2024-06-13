import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.CONNECTION_STRING;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const createSavedAssetHandler = async (event) => {
  if (event.requestContext.http.method.toUpperCase() !== "POST") {
    throw new Error(
      `postMethod only accepts POST method, you tried: ${event.requestContext.http.method.toUpperCase()} method.`
    );
  }
  console.info("received:", event);

  const body = JSON.parse(event.body);

  const data = {
    assetID: body.assetID,
    savedUserID: body.userID,
    createdAt: new Date(),
    createdBy: body.userID,
    updatedAt: new Date(),
    updatedBy: body.userID,
  };
  let response = {};

  try {
    await client.connect();

    await client.db("paxiv").collection("savedAsset").deleteMany({assetID: data.assetID, savedUserID: data.savedUserID});
    const result = await client.db("paxiv").collection("savedAsset").insertOne(data);
    
    response = {
      statusCode: 200,
      body: JSON.stringify({ message: `Item is submitted successfully.` }),
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
