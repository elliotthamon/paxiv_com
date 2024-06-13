import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

const uri = process.env.CONNECTION_STRING;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const getAssetHandler = async (event) => {
  if (event.requestContext.http.method.toUpperCase() !== "POST") {
    throw new Error(
      `postMethod only accepts POST method, you tried: ${event.requestContext.http.method.toUpperCase()} method.`
    );
  }
  console.info("received:", event);
  const params = event.pathParameters;
  const assetID = params.id;

  const body = JSON.parse(event.body);
  const userID = body.userID;

  let response = {};
  try {
    await client.connect();

    let asset = await client
      .db("paxiv")
      .collection("asset")
      .findOne({ _id: new ObjectId(assetID) });

    if (asset) {
      let user;
      if (asset.assetUserID) {
        user = await client
          .db("paxiv")
          .collection("users")
          .findOne({ _id: new ObjectId(asset.assetUserID) });
      } else {
        user = await client
          .db("paxiv")
          .collection("users")
          .findOne({ _id: new ObjectId(asset.createdBy) });
      }
      asset.user = user;

      if (asset.companyID) {
        const company = await client
          .db("paxiv")
          .collection("company")
          .findOne({ _id: new ObjectId(asset.companyID) });

        asset.company = company;

        const users = await client
          .db("paxiv")
          .collection("users")
          .find({
            companyID: asset.companyID,
          })
          .toArray();

        asset.users = users;
      } else if (user) {
        const company = await client
          .db("paxiv")
          .collection("company")
          .findOne({ _id: new ObjectId(user.companyID) });

        asset.company = company;

        const users = await client
          .db("paxiv")
          .collection("users")
          .find({
            companyID: user.companyID,
          })
          .toArray();

        asset.users = users;
      }
    }

    if (userID) {
      const savedAsset = await client
        .db("paxiv")
        .collection("savedAsset")
        .findOne({ assetID: assetID, savedUserID: userID });

      if (savedAsset) asset.isSaved = true;
      else asset.isSaved = false;
    }

    response = {
      statusCode: 200,
      body: JSON.stringify(asset),
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
