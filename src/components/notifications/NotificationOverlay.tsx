import { useRef } from "react";
import { Tabs, TabPanel, Tab, TabList } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import cx from "classnames";
import CloseIC from "@/components/icons/CloseIC";
import BellIC from "@/components/icons/BellIC";

import useOutsideClick from "@/hooks/useOutsideClick";
import useNotifications from "@/hooks/useNotifications";
import AllMessagesTab from "@/components/notifications/AllMessagesTab";
import ArchivedMessagesTab from "@/components/notifications/ArchivedMessagesTab";
import { ObjectId } from "mongodb";
import { setScrollHidden } from "lambdas/shared/utils";

const tabClasses = {
  default: "font-medium cursor-pointer",
  selected: "text-[#00b3de] font-medium  border-b-2 border-[#00b3de]",
};

type Props = {
  isNotificationOverlayShow: boolean;
  setIsNotificationOverlayShow: Function;
  notifications: Array<any>;
  setNotifications: Function;
};

const NotificationOverlay = ({
  isNotificationOverlayShow,
  setIsNotificationOverlayShow,
  notifications,
  setNotifications,
}: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const { changeNotificationEventStatus } = useNotifications();

  const archieveNotification = async (id: ObjectId) => {
    const result = await changeNotificationEventStatus(id, "Archived");
    if (result.id) {
      let _notifications = notifications.slice().map((item: any) => {
        if (id == item._id) {
          return {
            ...item,
            status: "Archived",
          };
        } else {
          return item;
        }
      });
      setNotifications(_notifications);
    }
  };

  const markAsReadOrUnread = async (notification: any) => {
    const result = await changeNotificationEventStatus(
      notification._id,
      notification.status == "Read" ? "Unread" : "Read"
    );
    if (result.id) {
      let _notifications = notifications.slice().map((item: any) => {
        if (notification._id == item._id && notification.status == "Unread") {
          return {
            ...item,
            status: "Read",
          };
        } else if (
          notification._id == item._id &&
          notification.status == "Read"
        ) {
          return {
            ...item,
            status: "Unread",
          };
        } else {
          return item;
        }
      });
      setNotifications(_notifications);
    }
  };

  useOutsideClick(
    modalRef,
    isNotificationOverlayShow,
    setIsNotificationOverlayShow
  );

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-60 justify-center items-center overflow-y-auto inset-0 z-50 outline-none focus:outline-none">
      <div
        className="w-full xs:w-[80%] mx-auto opacity-100 bg-white text-[#212529] border-1 border-2-gray-400 shadow-md rounded-lg pb-4 my-20"
        ref={modalRef}
      >
        <div className="w-full px-6 py-6 space-y-4 bg-primary rounded-t-lg p-[14px] cursor-pointer">
          <div className="flex justify-between text-left">
            <div className="flex items-center space-x-3">
              <label className="form-label inline-block text-xl font-bold text-white">
                Notifications
              </label>
              <BellIC fill="#fff" width={25} height={25} />
            </div>
            <CloseIC
              className="cursor-pointer"
              fill="#fff"
              onClick={() => {
                setIsNotificationOverlayShow(false);
                setScrollHidden();
              }}
            />
          </div>
        </div>
        <div className="w-full flex flex-col bg-white rounded-b-[12px] px-10 pt-10 pb-[35px] space-y-3 h-full">
          <Tabs>
            <div className="flex justify-between items-end px-8">
              <TabList className="flex border-b-1">
                <Tab
                  className={cx(tabClasses.default, "mr-8 pb-3")}
                  selectedClassName={cx(tabClasses.selected, "mr-8 pb-3")}
                >
                  All
                </Tab>
                <Tab
                  className={cx(tabClasses.default, "mr-8 pb-3")}
                  selectedClassName={cx(tabClasses.selected, "mr-8 pb-3")}
                >
                  Archived
                </Tab>
              </TabList>
            </div>
            <div className="border-b border-[#d3d3d3] ml-8"></div>
            <TabPanel className="pt-8">
              <AllMessagesTab
                notifications={notifications}
                markAsReadOrUnread={markAsReadOrUnread}
                archieveNotification={archieveNotification}
              />
            </TabPanel>
            <TabPanel>
              <ArchivedMessagesTab notifications={notifications} />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default NotificationOverlay;
