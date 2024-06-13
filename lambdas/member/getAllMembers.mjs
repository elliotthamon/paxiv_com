import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.CONNECTION_STRING;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const getAllMembersHandler = async (event) => {
  if (event.requestContext.http.method.toUpperCase() !== "GET") {
    throw new Error(
      `getMethod only accepts GET method, you tried: ${event.requestContext.http.method.toUpperCase()} method.`
    );
  }
  console.info("received:", event);

  let response = {};
  try {
    await client.connect();

    const result = await client
      .db("paxiv")
      .collection("users")
      .aggregate([
        {
          $addFields: {
            companyID: {
              $toObjectId: "$companyID",
            },
          },
        },
        {
          $lookup: {
            from: "company",
            localField: "companyID",
            foreignField: "_id",
            as: "companyDetails",
          },
        },
        {
          $project: {
            firstname: 1,
            lastname: 1,
            email: 1,
            role: 1,
            position: 1,
            companyName: { $arrayElemAt: ["$companyDetails.name", 0] },
          },
        },
      ])
      .toArray();

    console.log(result);
    response = {
      ok: true,
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
  console.log("response--------------->", response);
  return response;
};
