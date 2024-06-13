import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.CONNECTION_STRING;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const saveSearchedAssetsHandler = async (event) => {
  if (event.requestContext.http.method.toUpperCase() !== "POST") {
    throw new Error(
      `postMethod only accepts POST method, you tried: ${event.requestContext.http.method.toUpperCase()} method.`
    );
  }

  const body = JSON.parse(event.body);
  const assetArr = [];
  for (let asset of body) {
    assetArr.push({
      assetID: asset.assetID,
      savedUserID: asset.userID,
      createdAt: new Date(),
      createdBy: asset.userID,
      updatedAt: new Date(),
      updatedBy: asset.userID,
    });
  }
  const bulkArr = [];

  let response = {};

  try {
    await client.connect();

    const collection = await client.db("paxiv").collection("savedSearch");
    const searchedArr = await collection.find({}).toArray();
    assetArr.forEach((item) => {
      const { assetID, savedUserID } = item;
      const matchingItem = searchedArr.find(
        (searchedItem) =>
          String(searchedItem.assetID) === String(assetID) &&
          String(searchedItem.savedUserID) === String(savedUserID)
      );

      if (matchingItem) {
        bulkArr.push({
          updateOne: {
            filter: { assetID, savedUserID },
            update: {
              $set: {
                updatedAt: new Date(),
              },
            },
          },
        });
      } else {
        bulkArr.push({
          insertOne: {
            document: item,
          },
        });
      }
    });

    await collection.bulkWrite(bulkArr);

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
