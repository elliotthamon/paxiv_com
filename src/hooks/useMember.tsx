import qs from "qs";
import { USER_AVATAR_IMAGE_FILE } from "@/libs/constants";
import { doUpload } from "@/hooks/useAsset";
import API from "@/libs/api";

const api = new API();

const BASE_URL_BACKEND_API = process.env.NEXT_PUBLIC_API_URL;

export interface IJourneyFilter {
  companyID?: string;
  filterApproval?: string;
  filterStatus?: string;
  filterStep?: string;
}

const useMember = () => {
  const getUserDataFromDBByID = async (userID: string): Promise<any> => {
    return api.get(`/member/${userID}`);
  };

  const changeJourneyMember = async (id: any, data: object): Promise<any> => {
    return api.put(`/member/${id}`, data);
  };

  const changeJourneyMemberApproval = async (id: any, approval: string) => {
    return api.put(`/member/updateApproval/${id}`, { approval: approval });
  };

  const updateUserData = async (userID: any, data: any) => {
    let tempData = data;
    if (data.file !== undefined) {
      const key = `${USER_AVATAR_IMAGE_FILE}/${userID}/${data.file.name}`;
      try {
        const upload = await doUpload(
          key,
          data.file.name,
          data.file.type,
          data.file
        );
        tempData.avatar = key;
        delete tempData.file;
        try {
          await changeJourneyMember(userID, tempData);
          return { status: true };
        } catch (e: any) {
          return null;
        }
      } catch (e: any) {
        return null;
      }
    } else {
      delete tempData.file;
      try {
        await changeJourneyMember(userID, tempData);
        return { status: true };
      } catch (e: any) {
        return null;
      }
    }
  };

  const modifyJourneyMember = async (userID: any, data: any) => {
    try {
      const response = await fetch(
        `${BASE_URL_BACKEND_API}/member/journey/${userID}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const ret = await response.json();
      return { status: response.ok, data: ret };
    } catch (e) {
      return null;
    }
  };

  const getJourneyMembers = async (params: IJourneyFilter) => {
    const filters: any = {};

    if (params?.companyID) filters.companyID = params.companyID;
    if (params?.filterApproval) filters.approval = params.filterApproval;
    if (params?.filterStatus) filters.approval = params.filterStatus;
    if (params?.filterStep) filters.journeyStep = params.filterStep;

    const fs = `?${qs.stringify(filters)}`;
    const url = `/journey${fs === "?" ? "" : fs}`;

    console.log(`query: [${fs}] (${fs ? "y" : "n"}) - url: [${url}]`);

    return await api.get(url);
  };

  const getChatList = async () => {
    return [];
/*
    try {
      const result = await api.get(`/member/chatMember`);
      return result;
    } catch (e: any) {
      return [];
    }
    */
  };

  const getAllMembers = async () => {
    try {
      const result = await api.get(`/member`);
      return result;
    } catch (e: any) {
      return [];
    }
  };

  const getAllSiteAdmins = async () => {
    const result = await api.get(`/member/getAllSiteAdmins`);
    return result.ok ? result : null;
  };

  const saveJourneyMember = async (memberData: any) => {
    let tempData = memberData;
    if (memberData.file !== "") {
      const key = `${USER_AVATAR_IMAGE_FILE}/${memberData.companyID}/${memberData.file.name}`;

      doUpload(key, memberData.file.name, memberData.file.type, memberData.file)
        .then(async (result: any) => {
          // @ts-ignore
          tempData.avatar = key;
          delete tempData.file;
          // return await changeJourneyMember(userID, tempData);
          try {
            const response = await fetch(
              `${BASE_URL_BACKEND_API}/member/create`,
              {
                method: "post",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(tempData),
              }
            );

            const data = await response.json();
            if (response.ok) {
              return { status: true, message: "Successfully submitted." };
            } else {
              return { status: false, message: data.message };
            }
          } catch (e: any) {
            return { status: false, message: "Error occured, Try again later" };
          }
        })
        .catch((error: any) => {
          console.log(error);
          // handle upload error
        });
    } else {
      tempData.avatar = "";
      delete tempData.file;
      try {
        const response = await fetch(`${BASE_URL_BACKEND_API}/member/create`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tempData),
        });

        const data = await response.json();
        if (response.ok) {
          return { status: true, message: "Successfully submitted." };
        } else {
          return { status: false, message: data.message };
        }
      } catch (e: any) {
        return { status: false, message: "Error occured, Try again later" };
      }
    }
  };

  const createJourneyPersonalInfo = async (memberData: any) => {
    const email = memberData?.email;
    if (email !== undefined) {
      delete memberData.email;
      memberData.email = email.toLowerCase();
    }

    try {
      const response = await fetch(
        `${BASE_URL_BACKEND_API}/member/createPersonalInfo`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(memberData),
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

  const removeJourneyMember = async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL_BACKEND_API}/member/${id}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
      });

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

  const removeMember = async (data: any) => {
    try {
      const response = await fetch(
        `${BASE_URL_BACKEND_API}/member/removeMember`,
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const res = await response.json();
      if (response.ok) {
        return { status: true, data: res };
      } else {
        return { status: false, data: res.message };
      }
    } catch (e: any) {
      return { status: false, data: "Error occured, Try again later" };
    }
  };

  const editMemberRole = async (id: any, data: any) => {
    try {
      const response = await fetch(
        `${BASE_URL_BACKEND_API}/member/editRole/${id}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const ret = await response.json();
      return { status: response.ok, data: ret };
    } catch (e) {
      return null;
    }
  };

  return {
    changeJourneyMember,
    changeJourneyMemberApproval,
    updateUserData,
    getJourneyMembers,
    getChatList,
    getAllMembers,
    getAllSiteAdmins,
    saveJourneyMember,
    createJourneyPersonalInfo,
    modifyJourneyMember,
    getUserDataFromDBByID,
    removeJourneyMember,
    removeMember,
    editMemberRole,
  };
};

export default useMember;
