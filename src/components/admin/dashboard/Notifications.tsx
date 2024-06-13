import { useEffect, useState } from "react";
import useNotifications from "@/hooks/useNotifications";
import NotificationOverlay from "@/components/notifications/NotificationOverlay";
import BellIC from "@/components/icons/BellIC";
import BellUnreadIC from "@/components/icons/BellUnreadIC";
import CheckCircleIC from "@/components/icons/CheckCircleIC";
import QuestionCircleIC from "@/components/icons/QuestionCircleIC";
import {
  getNotArchived,
  getNotification,
  sortNotifications,
  setScrollHidden,
} from "@/libs/utils";

type Props = {
  notifications: Array<any>;
  setNotifications: Function;
};

const Notifications = ({ notifications, setNotifications }: Props) => {
  const { changeNotificationEventStatus } = useNotifications();

  const [unreadCnt, setUnreadCnt] = useState<number>(0);
  const [isNotificationOverlayShow, setIsNotificationOverlayShow] =
    useState<boolean>(false);

  const getUnreadCnt = (notifications: Array<any>) => {
    let unread_cnt = 0;
    for (let item of notifications) {
      if (item.status == "Unread") unread_cnt++;
    }
    setUnreadCnt(unread_cnt);
  };

  const markAsRead = async (notification: any, status: string) => {
    const result = await changeNotificationEventStatus(
      notification._id,
      status
    );
    if (result.id) {
      let _notifications = notifications.slice().map((item: any) => {
        if (notification._id == item._id) {
          return {
            ...item,
            status: "Read",
          };
        } else {
          return item;
        }
      });
      setNotifications(_notifications);
      getUnreadCnt(_notifications);
    }
  };

  const popupNotification = () => {
    if (!isNotificationOverlayShow) {
      setScrollHidden();
      setIsNotificationOverlayShow(true);
    }
  };

  useEffect(() => {
    getUnreadCnt(notifications);
  }, [notifications]);
  return (
    <div
      className={`flex flex-col w-full rounded-t-lg ${
        !isNotificationOverlayShow && "admin-box"
      }`}
    >
      <div
        className="flex flex-row items-center justify-between px-4 py-5 rounded-t-lg cursor-pointer bg-primary"
        onClick={() => popupNotification()}
      >
        <h1 className="text-lg font-bold text-white bg-red-">
          Notifications&nbsp;
          {unreadCnt > 0 && <span>({unreadCnt})</span>}
        </h1>
        {unreadCnt > 0 ? (
          <div className="relative">
            <BellUnreadIC />
            <div className="absolute w-2 h-2 bg-[#cb112d] rounded-full top-1.5 left-4"></div>
          </div>
        ) : (
          <BellIC width={20} height={20} fill="#fff" className="highlighted" />
        )}
      </div>
      <div className="w-full h-full px-4 py-6">
        {sortNotifications(getNotArchived(notifications)).length > 0 ? (
          <ol className="relative">
            {sortNotifications(getNotArchived(notifications))
              .slice(0, 4)
              .map((item: any, index: number) => (
                <li className="mb-2" key={index}>
                  <div className="flex items-center space-x-2 rounded-full">
                    {item.status == "Unread" ? (
                      <QuestionCircleIC />
                    ) : (
                      <CheckCircleIC fill="#00FF00" />
                    )}
                    {item.status == "Unread" ? (
                      <div
                        className="flex flex-col cursor-pointer"
                        onClick={() => {
                          markAsRead(item, "Read");
                        }}
                      >
                        <div className="text-[#858585] text-base text-center md:text-left">
                          <div>
                            {getNotification(
                              item.eventType,
                              item.userDetails[0].firstname +
                                " " +
                                item.userDetails[0].lastname,
                              item.userCompany[0].name,
                              item?.assetDetails[0]?.name
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col cursor-default">
                        <div className="text-[#858585] text-base text-center md:text-left">
                          <div>
                            {getNotification(
                              item.eventType,
                              item.userDetails[0].firstname +
                                " " +
                                item.userDetails[0].lastname,
                              item.userCompany[0].name,
                              item?.assetDetails[0]?.name
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              ))}
          </ol>
        ) : (
          <div className="flex flex-col text-base text-center text-[#949494] items-center h-[180px]">
            <svg
              width="38"
              height="38"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mt-12"
            >
              <path
                d="M22.5624 5.25666C21.4699 4.82916 20.2824 4.59166 19.0316 4.59166C17.7966 4.59166 16.6091 4.81332 15.5166 5.25666C16.1974 3.97416 17.5433 3.16666 19.0316 3.16666C20.5358 3.16666 21.8658 3.97416 22.5624 5.25666Z"
                fill="#A37E2C"
              />
              <path
                d="M23.481 33.6825C22.816 35.5192 21.0585 36.8333 19.0002 36.8333C17.7493 36.8333 16.5143 36.3267 15.6435 35.4242C15.1368 34.9492 14.7568 34.3158 14.5352 33.6667C14.741 33.6983 14.9468 33.7142 15.1685 33.7458C15.5327 33.7933 15.9127 33.8408 16.2927 33.8725C17.1952 33.9517 18.1135 33.9992 19.0318 33.9992C19.9343 33.9992 20.8368 33.9517 21.7235 33.8725C22.056 33.8408 22.3885 33.825 22.7052 33.7775C22.9585 33.7458 23.2118 33.7142 23.481 33.6825Z"
                fill="#A37E2C"
              />
              <path
                opacity="0.4"
                d="M23.6485 5.80863C22.2858 5.03438 20.7103 4.59167 19.0317 4.59167C13.8542 4.59167 9.65841 8.80334 9.65841 13.965V17.9708C9.65841 18.62 9.35757 19.7283 9.02507 20.2983L7.42591 22.9425C6.79257 24.0033 6.65007 25.175 7.04591 26.2517C7.42591 27.3125 8.32841 28.1358 9.50007 28.5317C10.7493 28.9567 12.0248 29.2926 13.3158 29.5417L23.6485 5.80863Z"
                fill="#A37E2C"
              />
              <path
                opacity="0.4"
                d="M15 31.8543C16.2189 32.0024 17.4465 32.0756 18.6741 32.0756C21.9041 32.0756 25.1341 31.5689 28.2058 30.5398C29.3141 30.1756 30.1691 29.3364 30.5808 28.2439C30.9924 27.1514 30.8816 25.9481 30.2641 24.9348L28.6808 22.3064C28.3483 21.7206 28.0474 20.6123 28.0474 19.9631V15.9573C28.0474 13.2022 26.8521 10.7178 24.9501 9L15 31.8543Z"
                fill="#A37E2C"
              />
            </svg>

            <div>There are no notifications</div>
          </div>
        )}
      </div>
      {isNotificationOverlayShow && (
        <NotificationOverlay
          isNotificationOverlayShow={isNotificationOverlayShow}
          setIsNotificationOverlayShow={setIsNotificationOverlayShow}
          notifications={notifications}
          setNotifications={setNotifications}
        />
      )}
    </div>
  );
};

export default Notifications;
