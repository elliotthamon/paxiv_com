import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
import {
  CognitoIdentityProviderClient,
  AdminDeleteUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const uri = process.env.CONNECTION_STRING;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const removeMemberHandler = async (event) => {
  if (event.requestContext.http.method.toUpperCase() !== "DELETE") {
    throw new Error(
      `deleteMethod only accepts DELETE method, you tried: ${event.requestContext.http.method.toUpperCase()} method.`
    );
  }
  console.info("received:", event);

  const body = JSON.parse(event.body);
  const id = body._id;
  const email = body.email;

  let response = {};
  try {
    await client.connect();

    // remove cognito account
    const cognito = new CognitoIdentityProviderClient({});

    const actions = [
      cognito
        .send(
          new AdminDeleteUserCommand({
            UserPoolId: process.env.USER_POOL_ID ?? "",
            Username: email,
          })
        )
        .catch((e) => {
          if (
            e.toString().includes("UserNotFoundException: User does not exist.")
          )
            return { message: "User does not have a login;" };
          else throw e;
        })
        .then((r) => ({ message: "User login removed;" })),

      client
        .db("paxiv")
        .collection("users")
        .deleteOne({ _id: new ObjectId(id) })
        .then((r) => ({ message: "User record removed;"})),

      client
        .db("paxiv")
        .collection("journey")
        .deleteOne({ email: { $regex: new RegExp(email, "i") } })
        .then((r) => ({ message: "Journey record removed;"})),
        
    ];

    const results = (await Promise.allSettled(actions)).map((e) => e.value.message);

    console.log("results: " + JSON.stringify(results));

    response = {
      statusCode: 200,
      body: JSON.stringify({ message: `User ${id}: ${results.join()}` }),
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
