import {
  MongoClient,
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

export const deleteSavedAssetHandler = async (event) => {
  if (event.requestContext.http.method.toUpperCase() !== "POST") {
    throw new Error(
      `postMethod only accepts POST method, you tried: ${event.requestContext.http.method.toUpperCase()} method.`
    );
  }
  console.info("received:", event);

  const body = JSON.parse(event.body);

  const data = {
    assetID: body.assetID,
    savedUserID: body.userID,

    createdAt: new Date(),
    createdBy: body.userID,
    updatedAt: new Date(),
    updatedBy: body.userID,
  };

  let response = {};

  try {
    await client.connect();

    // console.info(`!!!!!!!!!!!${data.assetID}, ${data.savedUserID}!!!!!!!!!!!!!`)
    await client.db("paxiv").collection("savedAsset").deleteOne({"assetID": data.assetID, "savedUserID": data.userID});

    const results = await client
    .db("paxiv")
    .collection("savedAsset")
    .find({assetID: data.assetID, savedUserID: data.savedUserID})
    .toArray();

  for(var i = 0; i < results.length; i ++) {
    await client.db("paxiv").collection("savedAsset").deleteOne({_id: results[i]._id});
  }

  // const results1 = await client
  //   .db("paxiv")
  //   .collection("savedAsset")
  //   .find({assetID: data.assetID, savedUserID: data.savedUserID})
  //   .toArray();

    response = {
      statusCode: 200,
      body: JSON.stringify({ message: "Item is submitted successfully", result: results, result1: results1 }),
      headers: { "Access-Control-Allow-Origin": "*" },
    };

  } catch (err) {
    console.info("error----------->", err);
    response = {
      statusCode: 500,
      body: JSON.stringify({ message: "Something went wrong!" }),
      headers: { "Access-Control-Allow-Origin": "*" },
    };
  } finally {
    await client.close();
  }

  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
  );
  
  return response;
};
