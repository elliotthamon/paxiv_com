import { ASSET_IMAGE_FILE, ROW_COUNT } from "@/libs/constants";
import qs from "qs";

const BASE_URL_BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_ENDPOIONT;

export const getUploadUrl = async (Key: string, ContentType: string) => {
  try {
    const response = await fetch(`/api/uploadUrl`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Key, ContentType }),
    });
    const res = await response.json();
    return res?.url;
  } catch (e) {
    console.log("getUploadUrl: : ", e);
    return null;
  }
};

export const doUpload = async (
  Key: string,
  Name: string,
  ContentType: string,
  Body: any
) => {
  const url = await getUploadUrl(Key, ContentType);
  return fetch(url, {
    body: Body,
    method: "PUT",
    headers: {
      "Content-Type": ContentType,
      "Content-Disposition": `attachment; filename="${Name}"`,
    },
  });
};

const useAsset = () => {

  const saveAsset = async (userID: string, data: any) => {
    const files = data.files;

    const promises = files.map(async (file: any) => {
      const key = `${ASSET_IMAGE_FILE}/${userID}/${Date.now()}_${file.name}`;
      await doUpload(key, file.name, file.type, file);
      return key;
    });

    const ret = await Promise.all(promises)
      .then(async (results) => {
        data.images = results;
        delete data.files;
        const ret = await submitAsset(data);
        return ret !== null;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });

    return ret;
  };

  const updateAssetUserByAssetID = async (assetID: string, userID: string) => {
    const data = {
      userID,
    };

    try {
      const response = await fetch(
        `${BASE_URL_BACKEND_API}/asset/updateAssetUserByAssetID/${assetID}`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        return null;
      }
    } catch (e) {
      console.log(e);
    }

    return null;
  };

  const submitAsset = async (data: any) => {
    try {
      const response = await fetch(
        `${BASE_URL_BACKEND_API}/asset/createAsset`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (e) {
      console.log(e);
    }

    return null;
  };

  const updateAssetByID = async (assetID: string, data: any) => {
    const files = data.files;

    const promises = await files.map(async (file: any) => {
      const key = `${ASSET_IMAGE_FILE}/${data._id}/${Date.now()}_${file.name}`;
      await doUpload(key, file.name, file.type, file);
      return key;
    });
    const links = await Promise.all(promises);

    data.images = [...data.images, ...links];
    delete data.files;

    // ================ Save Asset ================
    try {
      const response = await fetch(
        `${BASE_URL_BACKEND_API}/asset/updateAssetByID/${assetID}`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (e) {
      console.log(e);
    }
    // ===============================================
    return null;
  };

  const getMyAllAssets = async (userID: string) => {
    try {
      const response = await fetch(
        `${BASE_URL_BACKEND_API}/asset/getAssetsByUserID/${userID}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (e) {
      console.log(e);
    }

    return null;
  };

  const queryAssets = async (
    query: string | object,
    pageNo: number = 0,
    pageSize: number = ROW_COUNT * 3
  ) => {
    try {
      const criteria =
        typeof query === "string" ? qs.parse(query) : query;
      const params: any = { criteria, options:  { skip: pageNo * pageSize, limit: pageSize } };
      const qry = qs.stringify(params);
      // console.log('====================================================================\n', params, '\n====================================================================\n');
      // console.log(`Query: `, qry);

      const response = await fetch(`${BASE_URL_BACKEND_API}/asset?${qry}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      // console.log('====================================================================\n', data, '\n====================================================================\n');
      if (response.ok) return data;
    } catch (e) {
      console.log(e);
    }
    return null;
  };

  const getAllAssets = async () => {
    try {
      const response = await fetch(
        `${BASE_URL_BACKEND_API}/asset/getAllAssets`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (e) {
      console.log(e);
    }

    return null;
  };

  const getAllSavedAssets = async (userID: string) => {
    try {
      const response = await fetch(
        `${BASE_URL_BACKEND_API}/asset/getSavedAssetsByUserID/${userID}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (e) {
      console.log(e);
    }

    return null;
  };

  const getAllSavedSearches = async (userID: string) => {
    try {
      const response = await fetch(
        `${BASE_URL_BACKEND_API}/asset/getSavedSearchesByUserID/${userID}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (e) {
      console.log(e);
    }

    return null;
  };

  const searchAssets = async (
    realAddress: string,
    assetType: string,
    assetClass: string,
    assetStatus: string,
    userID: string,

    isAdvancedSearch: boolean,
    advancedMinProperty: string,
    advancedMaxProperty: string,
    advancedMinUnity: string,
    advancedMaxUnity: string,
    advancedMinPurchase: string,
    advancedMaxPurchase: string,
    advancedMinPrice: string,
    advancedMaxPrice: string,
    advancedPropertyDevStatus: string,
    advancedMarketSegment: string,
    advancedRentType: string,
    advancedIsOpportunityZone: boolean
  ) => {
    let data = {
      address: realAddress,
      assetType: assetType,
      class: assetClass,
      status: assetStatus,
      userID: userID,

      isAdvancedSearch: isAdvancedSearch,
      advancedMinProperty,
      advancedMaxProperty,
      advancedMinUnity,
      advancedMaxUnity,
      advancedMinPurchase,
      advancedMaxPurchase,
      advancedMinPrice,
      advancedMaxPrice,
      advancedPropertyDevStatus,
      advancedMarketSegment,
      advancedRentType,
      advancedIsOpportunityZone,
    };
    try {
      const response = await fetch(`${BASE_URL_BACKEND_API}/asset/search`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("data:", data);
        return data;
      }
    } catch (e) {
      console.log(e);
    }

    return [];
  };

  const saveSearchedAssets = async (assets: Array<any>, userID: string) => {
    const data: Array<any> = [];
    for (let asset of assets) {
      data.push({
        assetID: asset._id,
        userID: userID,
      });
    }
    try {
      await fetch(`${BASE_URL_BACKEND_API}/asset/saveSearchedAssets`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (e) {
      return false;
    }
    return true;
  };

  const createSavedAsset = async (asset: any, userID: string) => {
    try {
      const data = {
        assetID: asset._id,
        userID: userID,
      };
      await fetch(`${BASE_URL_BACKEND_API}/asset/createSavedAsset`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (e) {
      return false;
    }

    return true;
  };

  const deleteSavedAsset = async (asset: any, userID: string) => {
    try {
      const data = {
        assetID: asset._id,
        userID: userID,
      };
      await fetch(`${BASE_URL_BACKEND_API}/asset/deleteSavedAsset`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return true;
    } catch (e) {
      return false;
    }
  };

  const getAssetByID = async (assetID: string, userID?: string) => {
    try {
      const data = {
        userID: userID,
      };

      const response = await fetch(
        `${BASE_URL_BACKEND_API}/asset/getAssetByID/${assetID}`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (e) {
      console.log(e);
    }

    return null;
  };

  const getAssetsByCompanyID = async (companyID: string, userID?: string) => {
    try {
      const data = {
        userID: userID,
      };

      const response = await fetch(
        `${BASE_URL_BACKEND_API}/asset/getAssetsByCompanyID/${companyID}`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (e) {
      console.log(e);
    }

    return null;
  };

  const deleteAssetUserByAssetID = async (id: string) => {
    try {
      const response = await fetch(
        `${BASE_URL_BACKEND_API}/asset/deleteAsset/${id}`,
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        return { status: true, data: data };
      } else {
        return { status: false, data: data.message };
      }
    } catch (e: any) {
      return { status: false, data: "Error occured, Try again later" };
    }
  };

  return {
    saveAsset,
    updateAssetUserByAssetID,
    createSavedAsset,
    deleteSavedAsset,
    getMyAllAssets,
    getAllSavedAssets,
    getAllSavedSearches,
    searchAssets,
    updateAssetByID,
    saveSearchedAssets,
    getAssetByID,
    getAssetsByCompanyID,
    getUploadUrl,
    doUpload,
    getAllAssets,
    deleteAssetUserByAssetID,
    queryAssets,
    submitAsset
  };
};

export default useAsset;
