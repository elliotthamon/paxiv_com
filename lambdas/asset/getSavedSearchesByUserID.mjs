import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.CONNECTION_STRING;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const getSavedSearchesByUserIDHandler = async (event) => {
  if (event.requestContext.http.method.toUpperCase() !== "GET") {
    throw new Error(
      `getMethod only accepts GET method, you tried: ${event.requestContext.http.method.toUpperCase()} method.`
    );
  }
  console.info("received:", event);
  const params = event.pathParameters;
  const userID = params.id;

  let response = {};
  try {
    await client.connect();

    const results = await client
      .db("paxiv")
      .collection("savedSearch")
      .aggregate([
        {
          $match: { savedUserID: userID },
        },
        {
          $lookup: {
            from: "asset",
            let: { assetId: { $toObjectId: "$assetID" } },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$assetId"] },
                },
              },
            ],
            as: "assetData",
          },
        },
      ])
      .toArray();

    response = {
      statusCode: 200,
      body: JSON.stringify(results),
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
