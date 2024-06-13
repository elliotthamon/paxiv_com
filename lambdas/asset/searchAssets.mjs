import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

const uri = process.env.CONNECTION_STRING;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const searchAssetsHandler = async (event) => {
  if (event.requestContext.http.method.toUpperCase() !== "POST") {
    throw new Error(
      `getMethod only accepts POST method, you tried: ${event.requestContext.http.method.toUpperCase()} method.`
    );
  }
  console.info("received:", event);

  const body = JSON.parse(event.body);
  const address = body.address ? body.address : "";
  const assetType = body.assetType;
  const assetClass = body.class;
  const assetStatus = body.status;
  const userID = body.userID;

  const isAdvancedSearch = body.isAdvancedSearch;
  const advancedMinProperty = body.advancedMinProperty;
  const advancedMaxProperty = body.advancedMaxProperty;
  const advancedMinUnity = body.advancedMinUnity;
  const advancedMaxUnity = body.advancedMaxUnity;
  const advancedMinPurchase = body.advancedMinPurchase;
  const advancedMaxPurchase = body.advancedMaxPurchase;
  const advancedMinPrice = body.advancedMinPrice;
  const advancedMaxPrice = body.advancedMaxPrice;
  const advancedPropertyDevStatus = body.advancedPropertyDevStatus;
  const advancedMarketSegment = body.advancedMarketSegment;
  const advancedRentType = body.advancedRentType;
  const advancedIsOpportunityZone = body.advancedIsOpportunityZone;

  let response = {};
  try {
    await client.connect();

    const searchResults = await client
      .db("paxiv")
      .collection("asset")
      .aggregate([
        {
          $match: {
            realAddress: {
              $regex: new RegExp(address, "i"),
            },
          },
        },
        {
          $lookup: {
            from: "savedAsset",
            let: { assetId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$assetID", { $toString: "$$assetId" }] },
                      { $eq: ["$savedUserID", userID] },
                    ],
                  },
                },
              },
            ],
            as: "savedAssets",
          },
        },
        {
          $addFields: {
            isSaved: {
              $cond: {
                if: { $gt: [{ $size: "$savedAssets" }, 0] },
                then: true,
                else: false,
              },
            },
          },
        },
      ])
      .toArray();

    const finalResults = searchResults.filter((asset) => {
      let bFilter = true;

      if (assetType && assetType.length > 0) {
        if (asset.assetType === assetType) bFilter &= true;
        else bFilter &= false;
      } else bFilter &= true;

      if (assetClass && assetClass.length > 0) {
        if (asset.class === assetClass) bFilter &= true;
        else bFilter &= false;
      } else bFilter &= true;

      if (assetStatus && assetStatus.length > 0) {
        if (asset.status === assetStatus) bFilter &= true;
        else bFilter &= false;
      } else bFilter &= true;

      if (isAdvancedSearch) {
        if (advancedMinProperty && advancedMinProperty.length > 0) {
        }

        if (advancedMaxProperty && advancedMaxProperty.length > 0) {
        }

        if (advancedMinUnity && advancedMinUnity.length > 0) {
          if (parseInt(asset.numberOfUnits) >= parseInt(advancedMinUnity))
            bFilter &= true;
          else bFilter &= false;
        } else bFilter &= true;

        if (advancedMaxUnity && advancedMaxUnity.length > 0) {
          if (parseInt(asset.numberOfUnits) <= parseInt(advancedMaxUnity))
            bFilter &= true;
          else bFilter &= false;
        } else bFilter &= true;

        if (advancedMinPurchase && advancedMinPurchase.length > 0) {
          if (parseInt(asset.yearPurchased) >= parseInt(advancedMinPurchase))
            bFilter &= true;
          else bFilter &= false;
        } else bFilter &= true;

        if (advancedMaxPurchase && advancedMaxPurchase.length > 0) {
          if (parseInt(asset.yearPurchased) <= parseInt(advancedMaxPurchase))
            bFilter &= true;
          else bFilter &= false;
        } else bFilter &= true;

        if (advancedMinPrice && advancedMinPrice.length > 0) {
          if (parseInt(asset.price) >= parseInt(advancedMinPrice))
            bFilter &= true;
          else bFilter &= false;
        } else bFilter &= true;

        if (advancedMaxPrice && advancedMaxPrice.length > 0) {
          if (parseInt(asset.price) <= parseInt(advancedMaxPrice))
            bFilter &= true;
          else bFilter &= false;
        } else bFilter &= true;

        if (advancedPropertyDevStatus && advancedPropertyDevStatus.length > 0) {
          if (asset.propertyDevStatus === advancedPropertyDevStatus)
            bFilter &= true;
          else bFilter &= false;
        } else bFilter &= true;

        if (advancedMarketSegment && advancedMarketSegment.length > 0) {
          if (asset.marketSegment === advancedMarketSegment) bFilter &= true;
          else bFilter &= false;
        } else bFilter &= true;

        if (advancedRentType && advancedRentType.length > 0) {
          if (asset.rentType === advancedRentType) bFilter &= true;
          else bFilter &= false;
        } else bFilter &= true;

        if (advancedIsOpportunityZone) {
          if (asset.opportunityZone === advancedIsOpportunityZone)
            bFilter &= true;
          else bFilter &= false;
        }
      }

      return bFilter;
    });

    response = {
      statusCode: 200,
      body: JSON.stringify(finalResults),
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
