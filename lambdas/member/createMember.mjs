import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.CONNECTION_STRING;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const createMemberHandler = async (event) => {
  if (event.requestContext.http.method.toUpperCase() !== "POST") {
    throw new Error(
      `postMethod only accepts POST method, you tried: ${event.requestContext.http.method.toUpperCase()} method.`
    );
  }
  console.info("received:", event);

  const body = JSON.parse(event.body);

  const id = body.userId;

  const data = {
    firstname: body.firstname,
    lastname: body.lastname,
    email: body.email,
    util: body.util,
    assetType: body.assetType,
    totalAsset: body.totalAsset,
    role: "user",
    position: body.position,
    phone: body.phone,
    platinumCompany: body.platinumCompany,
    paymentStatus: body.paymentStatus,
    approval: "pending",
    companyID: body.companyID,
    companyUserDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    avatar: body.avatar,
  };
  let response = {};

  try {
    await client.connect();

    if (id != "") {
      const user = await client
        .db("paxiv")
        .collection("users")
        .findOne({ _id: new ObjectId(id) });
      if (user) {
        await client.db("paxiv").collection("users").updateMany(
          { _id: id },
          {
            $set: data,
          }
        );

        response = {
          statusCode: 200,
          body: JSON.stringify({
            message: `Successfully updated`,
          }),
        };
      } else {
        response = {
          statusCode: 401,
          body: JSON.stringify({
            message: `user id is not correct.`,
          }),
        };
      }
    } else {
      const result = await client
        .db("paxiv")
        .collection("users")
        .insertOne(data);
      if (result.acknowledged && result.insertedId) {
        response = {
          statusCode: 200,
          body: JSON.stringify({
            message: `New user is created successfully.`,
          }),
        };
      } else {
        response = {
          statusCode: 500,
          body: JSON.stringify({ message: "Something went wrong!" }),
        };
      }
    }
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

export const createPersonalInfoHandler = async (event) => {
  if (event.requestContext.http.method.toUpperCase() !== "POST") {
    throw new Error(
      `postMethod only accepts POST method, you tried: ${event.requestContext.http.method.toUpperCase()} method.`
    );
  }
  console.info("received:", event);

  const body = JSON.parse(event.body);

  let data = {
    firstname: body.firstname,
    lastname: body.lastname,
    email: body.email,
    // util: body.util,
    // companyName: body.companyName,
    // companyWebsite: body.companyWebsite,
    // assetType: body.assetType,
    // totalAsset: body.totalAsset,
    // role: 'user',
    // position: body.position,
    // phone: body.phone,
    // platinumCompany: body.platinumCompany,
    // paymentStatus: body.paymentStatus,
    // approval: 'pending',
    // companyID: body.companyID,
    // companyUser: body.companyUser ? true : false,
    // companyUserDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  let response = {};

  try {
    await client.connect();

    const user = await client
      .db("paxiv")
      .collection("users")
      .findOne({ email: { $regex: new RegExp(body.email, "i") } });
    if (user) {
      // Already complete all journey step
      if (
        user.isCompleted === true &&
        user.journeyStep === JOURNEY_FIFTH_STEP
      ) {
        response = {
          statusCode: 401,
          body: JSON.stringify({
            message: `Already all journey steps are completed`,
          }),
        };
      } else {
        journeyStep = user.journeyStep;
        if (journeyStep === null) user.journeyStep = JOURNEY_FIRST_STEP;

        response = {
          statusCode: 200,
          body: JSON.stringify(user),
        };
      }
    } else {
      data.journeyStep = JOURNEY_FIRST_STEP;
      const result = await client
        .db("paxiv")
        .collection("users")
        .insertOne(data);
      if (result.acknowledged && result.insertedId) {
        if (body.companyID === null) {
          const companyData = {
            name: body.companyName,
            website: body.companyWebsite,
            userID: result.insertedId.toString(),
            createdBy: result.insertedId.toString(),
            createdAt: new Date(),
          };
          const resultData = await client
            .db("paxiv")
            .collection("company")
            .insertOne(companyData);
          if (resultData.acknowledged && resultData.insertedId) {
            const updateData = { companyID: resultData.insertedId.toString() };
            await client.db("paxiv").collection("users").updateMany(
              { _id: result.insertedId },
              {
                $set: updateData,
              }
            );
            const insertedUser = await client
              .db("paxiv")
              .collection("users")
              .findOne({ _id: result.insertedId });
            response = {
              statusCode: 200,
              body: JSON.stringify(insertedUser),
            };
          } else {
            await client
              .db("paxiv")
              .collection("users")
              .deleteOne({ email: { $regex: new RegExp(body.email, "i") } });
            response = {
              statusCode: 500,
              body: JSON.stringify({ message: "Something went wrong!" }),
            };
          }
        } else {
          response = {
            statusCode: 200,
            body: JSON.stringify({
              message: `New user is created successfully.`,
            }),
          };
        }
      } else {
        response = {
          statusCode: 500,
          body: JSON.stringify({ message: "Something went wrong!" }),
        };
      }
    }
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
