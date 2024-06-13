import { ObjectId } from "mongodb";
import { MongoService } from "./mongodb.service";
import qs2m from 'qs-to-mongo'

// {object}/{id}

const BASE_RESPONSE = {
  statusCode: 200,
  headers: { "Access-Control-Allow-Origin": "*" },
  body: {}
};

const mongo = new MongoService();

async function doGet(event: any) {
  const { id, collection } = event.pathParameters;
  const col = mongo.collection(collection);
  let result: any = {};

  if (id) {
    result = {
      _meta: { skip: 0, limit: 1, total: 1 },
      data: [await col.findOne({ _id: new ObjectId(id) })],
    };
  } else {
    const raw = event.rawQueryString;
    const qry = raw && raw.endsWith('?') ? raw.slice(0, raw.length - 1) : raw
    const query = qry ?
      qs2m(qry).criteria : { criteria: {}, options: {} }

    // console.log('data-access: \n', { qry, path: event.pathParameters });
    ///console.log('Query: \n', JSON.stringify(query.criteria));
    // console.log('Options: \n', JSON.stringify(query.options));

    const [data, total] = await Promise.all([
      col.find(query.criteria, query.options).toArray(),
      col.countDocuments(query.criteria)
    ]);

    result = {
      _meta: { ...query.options, total },
      data,
    };
  }

  console.log(`result:\n`, result);

  return {
    ...BASE_RESPONSE,
    statusCode: 200,
    body: JSON.stringify(result),
  };
}

export const handler = async (event: any) => {
  console.info("received----------->:", event);

  const method = event.requestContext.http.method.toLowerCase();

  try {
    switch (method) {
      case "get":
        return doGet(event);

      default:
        throw new Error(`Invalid operation.`);
    }
  } catch (err) {
    console.info("error----------->", err);
    return {
      ...BASE_RESPONSE,
      statusCode: 500,
      body: JSON.stringify({ message: "Something went wrong!" }),
    };
  }

};
