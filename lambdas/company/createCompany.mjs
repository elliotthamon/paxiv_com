import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.CONNECTION_STRING;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const createCompanyHandler = async (event) => {
  if (event.requestContext.http.method.toUpperCase() !== "POST") {
    throw new Error(
      `postMethod only accepts POST method, you tried: ${event.requestContext.http.method.toUpperCase()} method.`
    );
  }
  console.info("received:", event);

  const body = JSON.parse(event.body);

  const data = {
    name: body.name,
    subname: body.subname,
    description: body.description,
    userID: body.userID,
    phone: body.phone,
    email: body.email,
    website: body.website,
    logo: body.logo,
    background: body.background,
    
    createdAt: Date.now(),
    createdBy: body.userID,
    updatedAt: Date.now(),
    updatedBy: body.userID,
  };
  let response = {};

  try {
    await client.connect();

    const result = await client
      .db("paxiv")
      .collection("company")
      .insertOne(data);
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: `Item is submitted successfully. ID: ${result.insertedId}`,
        id: result.insertedId
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
