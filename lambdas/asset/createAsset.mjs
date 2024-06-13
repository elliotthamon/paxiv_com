import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.CONNECTION_STRING;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const createAssetHandler = async (event) => {
  if (event.requestContext.http.method.toUpperCase() !== "POST") {
    throw new Error(
      `postMethod only accepts POST method, you tried: ${event.requestContext.http.method.toUpperCase()} method.`
    );
  }

  const body = JSON.parse(event.body);

  console.info("received:", body.files);
  const data = {
    name: body.name,
    address: body.address,
    realAddress: body.realAddress,
    preferredContact: body.preferredContact,
    numberOfUnits: body.numberOfUnits,
    price: body.price,
    images: body.images,
    squareFeet: body.squareFeet,
    yearPurchased: body.yearPurchased,
    constructionYear: body.constructionYear,
    assetType: body.assetType,
    class: body.class,
    opportunityZone: body.opportunityZone,
    status: body.status,
    propertyDevStatus: body.propertyDevStatus,
    marketSegment: body.marketSegment,
    rentType: body.rentType,
    description: body.description,

    companyID: body.companyID,
    createdAt: new Date(),
    createdBy: body.userID,
    updatedAt: new Date(),
    updatedBy: body.userID,
  };

  let response = {};

  try {
    await client.connect();

    const result = await client.db("paxiv").collection("asset").insertOne(data);
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
