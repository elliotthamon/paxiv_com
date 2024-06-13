import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

const uri = process.env.CONNECTION_STRING;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const deleteMemberByIDHandler = async (event) => {
  if (event.requestContext.http.method.toUpperCase() !== "DELETE") {
    throw new Error(
      `deleteMethod only accepts DELETE method, you tried: ${event.requestContext.http.method.toUpperCase()} method.`
    );
  }
  console.info("received:", event);

  const params = event.pathParameters;
  const id = params.id;

  let response = {};
  try {
    await client.connect();
    const users = await client.db("paxiv").collection("users");
    const user = await users.findOne({ _id: new ObjectId(id) });
    if(user) {
      console.log(user);
      // remove cognito acount
      const cognito = new CognitoIdentityProviderClient(config);
      const cg = await cognito.send(new AdminDeleteUserCommand(  {  UserPoolId: preocess.env.USER_POOL_ID ?? "", Username: user.email}));
    }
        
  
    
    /*
    await client
      .db("paxiv")
      .collection("journey")
      .deleteOne({ _id: new ObjectId(id) });
    response = {
      statusCode: 200,
      body: JSON.stringify({ message: `Item deleted successfully. ID: ${id}` }),
    };
    */
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
