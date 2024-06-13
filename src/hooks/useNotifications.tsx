import { ObjectId } from "mongodb";

const BASE_URL_BACKEND_API = process.env.NEXT_PUBLIC_API_URL;

const useNotifications = () => {
  const createViewAssetNotification = async (
    eventType: string,
    origin_user: ObjectId,
    target_user: ObjectId,
    asset_id: ObjectId
  ) => {
    try {
      const data = {
        eventType: eventType,
        status: "Unread",
        origin_user: origin_user,
        target_user: target_user,
        asset_id: asset_id,
      };
      const response = await fetch(
        `${BASE_URL_BACKEND_API}/notifications/createViewAssetNotification`,
        {
          method: "post",
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

  const createClickedCompanyNotification = async (
    eventType: string,
    origin_user: ObjectId,
    target_user: any
  ) => {
    try {
      const data = {
        eventType: eventType,
        status: "Unread",
        origin_user: origin_user,
        target_user: target_user,
      };
      const response = await fetch(
        `${BASE_URL_BACKEND_API}/notifications/createClickedCompanyNotification`,
        {
          method: "post",
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

  const getNotificationsById = async (id: ObjectId) => {
    try {
      const response = await fetch(
        `${BASE_URL_BACKEND_API}/notifications/${id}`,
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

  const changeNotificationEventStatus = async (
    id: ObjectId,
    status: string
  ) => {
    const data = {
      status: status,
    };

    try {
      const response = await fetch(
        `${BASE_URL_BACKEND_API}/notifications/changeNotificationEventStatus/${id}`,
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
        return data;
      }
      return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return {
    createViewAssetNotification,
    createClickedCompanyNotification,
    getNotificationsById,
    changeNotificationEventStatus,
  };
};

export default useNotifications;
