import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

const uri = process.env.CONNECTION_STRING;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const updateAssetUserHandler = async (event) => {
  if (event.requestContext.http.method.toUpperCase() !== "POST") {
    throw new Error(
      `postMethod only accepts POST method, you tried: ${event.requestContext.http.method.toUpperCase()} method.`
    );
  }

  const params = event.pathParameters;
  const id = params.id;
  const body = JSON.parse(event.body);

  const userID = body.userID;
  console.log("AssetUser ID is " + userID);

  let response = {};

  try {
    await client.connect();

    await client
      .db("paxiv")
      .collection("asset")
      .updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            assetUserID: userID,
          },
        }
      );

    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: `The user is assigned to an asset successfully.`,
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
