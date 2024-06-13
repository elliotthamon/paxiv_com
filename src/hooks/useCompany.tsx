import {
  COMPANY_AVATAR_IMAGE_FILE,
  COMPANY_BACKGROUND_IMAGE_FILE,
} from "@/libs/constants";
import { doUpload } from "@/hooks/useAsset";

const BASE_URL_BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_ENDPOIONT;

export interface ICompanyHook {
  getAllCompanies: () => Promise<any>;
  updateCompanyProfile: any;
  createCompanyProfile: any;
  getCompanyProfileByID: any;
  getCompanyUsersByCompanyID: any;
  getCompanyResourcesByCompanyID: any;
}

const useCompany = (): ICompanyHook => {
  const getAllCompanies = async (): Promise<any> => {
    try {
      const response = await fetch(
        `${BASE_URL_BACKEND_API}/company/getAllCompanies`,
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

  const getCompanyUsersByCompanyID = async (companyID: string) => {
    try {
      const response = await fetch(
        `${BASE_URL_BACKEND_API}/company/getCompanyUsersByCompanyID/${companyID}`,
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

  const getCompanyResourcesByCompanyID = async (companyID: string) => {
    try {
      const response = await fetch(
        `${BASE_URL_BACKEND_API}/company/getCompanyResourcesByCompanyID/${companyID}`,
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

  const updateCompanyProfile = async (companyID: string, data: any) => {
    let ret;
    if (data?.companyAvatarFile?.name || data?.bgImageFile?.name) {
      ret = await uploadImages(companyID, {
        bgImageFile: data.bgImageFile,
        companyAvatarFile: data.companyAvatarFile,
      });
      if (ret === false) return false;

      delete data["companyAvatarFile"];
      delete data["bgImageFile"];
      delete data["companyAvatarImageFile"];
      delete data["companyBgImageFile"];
      return (await updateCompanyProfileByID(companyID, data)) !== null;
    } else {
      return (await updateCompanyProfileByID(companyID, data)) !== null;
    }
  };

  const createCompanyProfile = async (data: any) => {
    let ret;
    const bgImageFile = data.bgImageFile;
    const companyAvatarFile = data.companyAvatarFile;

    try {
      delete data["companyAvatarFile"];
      delete data["bgImageFile"];
      delete data["companyAvatarImageFile"];
      delete data["companyBgImageFile"];

      const response = await fetch(
        `${BASE_URL_BACKEND_API}/company/createCompany`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const savedCompanyData = await response.json();
        const companyID = savedCompanyData.id;
        ret = await uploadImages(companyID, {
          bgImageFile: bgImageFile,
          companyAvatarFile: companyAvatarFile,
        });
        if (ret === false) return false;
        return true;
      } else {
        return false;
      }
    } catch (e: any) {
      console.log(e);
      return false;
    }
  };

  const uploadImages = async (
    companyID: string,
    data: { bgImageFile: any; companyAvatarFile: any }
  ) => {
    const bgImg = data?.bgImageFile?.name
      ? await uploadImage(
          companyID,
          data.bgImageFile,
          COMPANY_BACKGROUND_IMAGE_FILE
        )
      : true;

    const avImg = data?.companyAvatarFile?.name
      ? await uploadImage(
          companyID,
          data.companyAvatarFile,
          COMPANY_AVATAR_IMAGE_FILE
        )
      : true;
    return bgImg && avImg;
  };

  const uploadImage = async (companyID: string, file: any, folder: string) => {
    try {
      const fileKey = `${folder}/${companyID}/${file.name}`;
      const result = await doUpload(fileKey, file.name, file.type, file);

      let tempData;
      if (folder === COMPANY_BACKGROUND_IMAGE_FILE) {
        tempData = { companyBgImageFile: fileKey };
      }
      if (folder === COMPANY_AVATAR_IMAGE_FILE) {
        tempData = { companyAvatarImageFile: fileKey };
      }

      return (await updateCompanyProfileByID(companyID, tempData)) != null;
    } catch (e) {
      return false;
    }
  };

  const updateCompanyProfileByID = async (companyID: string, data: any) => {
    delete data._id;
    try {
      const response = await fetch(
        `${BASE_URL_BACKEND_API}/company/updateCompanyByID/${companyID}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data.data ? data.data : null;
      }
      return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const getCompanyProfileByID = async (companyID: string) => {
    try {
      const response = await fetch(
        `${BASE_URL_BACKEND_API}/company/getCompanyProfileByID/${companyID}`,
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

  return {
    getAllCompanies,
    updateCompanyProfile,
    createCompanyProfile,
    getCompanyProfileByID,
    getCompanyUsersByCompanyID,
    getCompanyResourcesByCompanyID,
    // uploadImages,
  };
};

export default useCompany;
