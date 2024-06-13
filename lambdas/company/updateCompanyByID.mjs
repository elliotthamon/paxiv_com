import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

const uri = process.env.CONNECTION_STRING;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const updateCompanyHandler = async (event) => {
  if (event.requestContext.http.method.toUpperCase() !== "PUT") {
    throw new Error(
      `putMethod only accepts PUT method, you tried: ${event.requestContext.http.method.toUpperCase()} method.`
    );
  }
  console.info("received:", event);

  const params = event.pathParameters;
  const id = params.id;
  const body = JSON.parse(event.body);
  body.updatedAt = new Date();

  let response = {};
  try {
    await client.connect();

    await client
      .db("paxiv")
      .collection("company")
      .updateMany(
        { _id: new ObjectId(id) },
        {
          $set: body,
        }
      );
    
    if(body.name != undefined && body.name != null) {
      await client
      .db("paxiv")
      .collection("users")
      .updateMany(
        { companyID: id },
        {
          $set: {
            companyName: body.name,
            companyWebsite: body.website
          },
        }
      );
    }

    const company = await client
      .db("paxiv")
      .collection("company")
      .find({})
      .toArray();

    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: `Item updated successfully.`,
        id: id,
        data: company,
      }),
    };
  } catch (err) {
    console.info("error----------->", err);
    response = {
      statusCode: 500,
      body: JSON.stringify({
        message: "Something went wrong!",
        id: id,
        body: body,
      }),
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
