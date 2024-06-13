import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

const uri = process.env.CONNECTION_STRING;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const updateMemberByIDHandler = async (event) => {
  if (event.requestContext.http.method.toUpperCase() !== "PUT") {
    throw new Error(
      `putMethod only accepts PUT method, you tried: ${event.requestContext.http.method.toUpperCase()} method.`
    );
  }
  console.info("received:", event);

  const params = event.pathParameters;
  const id = params.id;
  const body =
    typeof event.body === "string" ? JSON.parse(event.body) : event.body;

  let response = {};
  try {
    await client.connect();

    await client
      .db("paxiv")
      .collection("users")
      .updateMany(
        { _id: new ObjectId(id) },
        {
          $set: body,
        }
      );

    const user = await client
      .db("paxiv")
      .collection("users")
      .findOne({ _id: new ObjectId(id) });

    if (user) {
      if (parseInt(user.journeyStep) == 4 && user.paymentStatus == true) {
        await client
          .db("paxiv")
          .collection("users")
          .updateMany(
            { _id: new ObjectId(id) },
            {
              $set: {
                isCompleted: true,
              },
            }
          );
      }
    }

    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: `Item updated successfully.`,
        id: id,
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

export const updateJourneyMemberByIDHandler = async (event) => {
  if (event.requestContext.http.method.toUpperCase() !== "PUT") {
    throw new Error(
      `putMethod only accepts PUT method, you tried: ${event.requestContext.http.method.toUpperCase()} method.`
    );
  }
  console.info("received:", event);
  const params = event.pathParameters;
  const id = params.id; // user id
  const body = JSON.parse(event.body);

  let data = {
    companyName: body.assetID,
    companyWebsite: body.userID,
    companyID: body.companyID,

    approval: body.approval,
    paymentStatus: body.paymentStatus,
    role: body.role,
  };

  for (var propName in data) {
    if (data[propName] === null || data[propName] === undefined) {
      delete data[propName];
    }
  }

  let response = {};
  try {
    await client.connect();

    const user = await client
      .db("paxiv")
      .collection("users")
      .findOne({ _id: new ObjectId(id) });

    if (user) {
      if (!data.companyID) {
        const companyData = {
          name: data.companyName,
          website: data.companyWebsite,

          createdBy: id,
          createdAt: new Date(),
        };

        if (
          Boolean(companyData.name) === false ||
          Boolean(companyData.website) === false
        ) {
          response = {
            statusCode: 500,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({
              message: `Please provide the company's information for approval.`,
            }),
          };
          console.info(
            `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
          );

          return response;
        }

        const company = await client
          .db("paxiv")
          .collection("company")
          .findOne({ name: data.companyName, website: data.companyWebsite });

        if (company) {
          data.companyID = company._id.toString();
          await client.db("paxiv").collection("users").updateMany(
            { _id: user._id },
            {
              $set: data,
            }
          );
        } else {
          const resultData = await client
            .db("paxiv")
            .collection("company")
            .insertOne(companyData);

          if (resultData.acknowledged && resultData.insertedId) {
            data.companyID = resultData.insertedId.toString();
            await client.db("paxiv").collection("users").updateMany(
              { _id: user._id },
              {
                $set: data,
              }
            );

            response = {
              statusCode: 200,
              body: JSON.stringify({
                message: `New user is created successfully.`,
              }),
            };
          } else {
            await client
              .db("paxiv")
              .collection("users")
              .deleteOne({ email: { $regex: new RegExp(user.email, "i") } });
            response = {
              statusCode: 500,
              body: JSON.stringify({ message: "Something went wrong!" }),
            };
          }
        }
      } else {
        await client.db("paxiv").collection("users").updateMany(
          { _id: user._id },
          {
            $set: data,
          }
        );
      }
    } else {
      response = {
        statusCode: 500,
        body: JSON.stringify({
          message: `Please provide the existing user!`,
        }),
      };
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
