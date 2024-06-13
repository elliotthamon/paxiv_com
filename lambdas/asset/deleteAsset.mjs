import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

const uri = process.env.CONNECTION_STRING;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const deleteAssetHandler = async (event) => {
  if (event.requestContext.http.method.toUpperCase() !== "DELETE") {
    throw new Error(
      `deleteMethod only accepts DELETE method, you tried: ${event.requestContext.http.method.toUpperCase()} method.`
    );
  }
  console.info("received:", event);

  const params = event.pathParameters;
  const id = params.id;

  let response = {};
  try {
    await client.connect();

    await client
      .db("paxiv")
      .collection("asset")
      .deleteOne({ _id: new ObjectId(id) });

    await client
      .db("paxiv")
      .collection("savedAsset")
      .deleteMany({ assetID: id });
    response = {
      statusCode: 200,
      body: JSON.stringify({ message: `Item deleted successfully. ID: ${id}` }),
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
