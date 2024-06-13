import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

const uri = process.env.CONNECTION_STRING;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const getUserByEmailHandler = async (event) => {
  if (event.requestContext.http.method.toUpperCase() !== "GET") {
    throw new Error(
      `getMethod only accepts GET method, you tried: ${event.requestContext.http.method.toUpperCase()} method.`
    );
  }

  const params = event.queryStringParameters;
  const email = params.email;

  let response = {};
  try {
    await client.connect();

    const result = await client
      .db("paxiv")
      .collection("users")
      .aggregate([
        {
          $match: { email: { $regex: new RegExp(email, "i") } },
        },
        {
          $lookup: {
            from: "company",
            let: { companyID: { $toObjectId: "$companyID" } },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$companyID"] },
                },
              },
            ],
            as: "companyDetails",
          },
        },
      ])
      .limit(1)
      .toArray();
    response = {
      statusCode: 200,
      body: JSON.stringify(result[0]),
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
