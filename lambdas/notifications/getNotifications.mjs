import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.CONNECTION_STRING;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const getNotificationsHandler = async (event) => {
  if (event.requestContext.http.method.toUpperCase() !== "GET") {
    throw new Error(
      `getMethod only accepts GET method, you tried: ${event.requestContext.http.method.toUpperCase()} method.`
    );
  }
  console.info("received:", event);

  const params = event.pathParameters;
  const id = params.id;

  let response = {};
  try {
    await client.connect();

    const result = await client
      .db("paxiv")
      .collection("notifications")
      .aggregate([
        {
          $match: { target_user: id },
        },
        {
          $lookup: {
            from: "users",
            let: { origin_user_id: { $toObjectId: "$origin_user" } },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$origin_user_id"] },
                },
              },
              {
                $project: {
                  firstname: 1,
                  lastname: 1,
                  companyID: { $toObjectId: "$companyID" },
                },
              },
            ],
            as: "userDetails",
          },
        },
        {
          $lookup: {
            from: "company",
            localField: "userDetails.companyID",
            foreignField: "_id",
            as: "userCompany",
          },
        },
        {
          $lookup: {
            from: "asset",
            let: { asset_id: { $toObjectId: "$asset_id" } },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$asset_id"] },
                },
              },
              {
                $project: {
                  name: 1,
                },
              },
            ],
            as: "assetDetails",
          },
        },
        {
          $sort: { updatedAt: -1 },
        },
        {
          $limit: 1000,
        },
      ])
      .toArray();
    console.log(result);
    response = {
      statusCode: 200,
      body: JSON.stringify(result),
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
