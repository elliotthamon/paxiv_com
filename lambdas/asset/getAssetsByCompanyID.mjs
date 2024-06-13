import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

const uri = process.env.CONNECTION_STRING;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const getAssetsHandler = async (event) => {
  if (event.requestContext.http.method.toUpperCase() !== "POST") {
    throw new Error(
      `postMethod only accepts POST method, you tried: ${event.requestContext.http.method.toUpperCase()} method.`
    );
  }
  console.info("received:", event);
  const params = event.pathParameters;
  const companyID = params.id;

  const body = JSON.parse(event.body);
  const userID = body.userID;

  let response = {};
  try {
    await client.connect();

    let filterdAssets = await client
      .db("paxiv")
      .collection("asset")
      .aggregate([
        {
          $match: { companyID: companyID },
        },
        {
          $limit: 100
        },
        {
          $lookup: {
            from: "users",
            let: { createdBy: { $toObjectId: "$createdBy" } },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$createdBy"] },
                },
              },
            ],
            as: "userData",
          },
        },
      ])
      .toArray();
    for (var i = 0; i < filterdAssets.length; i++) {
      if (userID) {
        const available = await client
          .db("paxiv")
          .collection("savedAsset")
          .findOne({
            assetID: filterdAssets[i]._id.toString(),
            savedUserID: userID,
          });

        filterdAssets[i]["isSaved"] = !!available;
      }
    }

    response = {
      statusCode: 200,
      body: JSON.stringify(filterdAssets),
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
