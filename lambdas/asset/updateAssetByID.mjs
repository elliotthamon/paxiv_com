import {
  MongoClient,
  ObjectId,
  ServerApiVersion,
} from 'mongodb';

const uri = process.env.CONNECTION_STRING;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const updateAssetHandler = async (event) => {
  if (event.requestContext.http.method.toUpperCase() !== "POST") {
    throw new Error(
      `postMethod only accepts POST method, you tried: ${event.requestContext.http.method.toUpperCase()} method.`
    );
  }

  const params = event.pathParameters;
  const id = params.id;
  const body = JSON.parse(event.body);

  console.info("received:", body.files);
  let data = {
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
    
    updatedAt: new Date(),
    updatedBy: body.userID,
  };

  for (var propName in data) {
    if (data[propName] === null || data[propName] === undefined) {
      delete data[propName];
    }
  }

  let response = {};

  try {
    await client.connect();

    await client
    .db("paxiv")
    .collection("asset")
    .updateMany(
      { _id: new ObjectId(id) },
      {
        $set: data,
      }
    );

    response = {
      statusCode: 200,
      body: JSON.stringify({ message: `Item updated successfully.` }),
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
