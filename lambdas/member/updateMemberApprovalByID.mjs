import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

const uri = process.env.CONNECTION_STRING;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const updateMemberApprovalByIDHandler = async (event) => {
  if (event.requestContext.http.method.toUpperCase() !== "PUT") {
    throw new Error(
      `putMethod only accepts PUT method, you tried: ${event.requestContext.http.method.toUpperCase()} method.`
    );
  }
  console.info("received:", event);
  const params = event.pathParameters;
  const id = params.id; // user id
  const body = JSON.parse(event.body);
  const approval = body.approval;

  let response = {};
  try {
    await client.connect();

    const user = await client
      .db("paxiv")
      .collection("users")
      .findOne({ _id: new ObjectId(id) });

    if (user) {
      const updateUserData = { approval: approval };

      await client.db("paxiv").collection("users").updateMany(
        { _id: user._id },
        {
          $set: updateUserData,
        }
      );
    }

    const members = await client
      .db("paxiv")
      .collection("users")
      .find({})
      .toArray();

    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: `Item updated successfully.`,
        id: id,
        data: members,
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
