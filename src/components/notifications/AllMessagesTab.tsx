import { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import Image from "next/image";
import CheckCircleIC from "@/components/icons/CheckCircleIC";
import QuestionCircleIC from "@/components/icons/QuestionCircleIC";
import ArchieveIC from "@/components/icons/ArchieveIC";
import Pagination from "@/components/Pagination";
import {
  getNotArchived,
  getNotification,
  sortNotifications,
} from "@/libs/utils";
import { COUNT_PER_PAGE } from "@/libs/constants";

type Props = {
  notifications: Array<any>;
  markAsReadOrUnread: Function;
  archieveNotification: Function;
};

const AllMessagesTab = ({
  notifications,
  markAsReadOrUnread,
  archieveNotification,
}: Props) => {
  const [current, setCurrent] = useState<number>(0);
  const [pageData, setPageData] = useState<Array<Object>>([]);

  useEffect(() => {
    setPageData(
      sortNotifications(getNotArchived(notifications)).slice(0, COUNT_PER_PAGE)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications]);

  useEffect(() => {
    const temp = sortNotifications(getNotArchived(notifications)).slice(
      current * COUNT_PER_PAGE,
      (current + 1) * COUNT_PER_PAGE
    );
    setPageData(temp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  return (
    <div>
      {getNotArchived(notifications).length > 0 ? (
        <ol className="relative space-y-5">
          {pageData.map((item: any, index: number) => (
            <li
              className="mb-2 ml-6 flex justify-between items-center"
              key={index}
            >
              <div className="flex space-x-2">
                <div className="flex items-center justify-between rounded-full">
                  {item.status == "Unread" ? (
                    <QuestionCircleIC width={25} height={25} />
                  ) : (
                    <CheckCircleIC width={25} height={25} fill="#00FF00" />
                  )}
                </div>
                <div className="flex flex-col cursor-pointer">
                  <div className="text-[#858585] text-lg text-center md:text-left">
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
              </div>
              <div className="flex space-x-2 items-end">
                {item.status == "Read" ? (
                  <Image
                    width={25}
                    height={25}
                    src="/images/read_msg.png"
                    className="cursor-pointer"
                    alt="read"
                    onClick={() => {
                      markAsReadOrUnread(item);
                    }}
                    data-tooltip-content={getNotification(
                      item.eventType,
                      item.userDetails[0].firstname +
                        " " +
                        item.userDetails[0].lastname,
                      item.userCompany[0].name,
                      item?.assetDetails[0]?.name
                    )}
                    data-tooltip-id={`tooltip-${item._id}`}
                  />
                ) : (
                  <Image
                    width={25}
                    height={25}
                    src="/images/unread_msg.png"
                    className="cursor-pointer"
                    alt="read"
                    onClick={() => {
                      markAsReadOrUnread(item);
                    }}
                    data-tooltip-content={getNotification(
                      item.eventType,
                      item.userDetails[0].firstname +
                        " " +
                        item.userDetails[0].lastname,
                      item.userCompany[0].name,
                      item?.assetDetails[0]?.name
                    )}
                    data-tooltip-id={`tooltip-${item._id}`}
                  />
                )}
                <ArchieveIC
                  className="cursor-pointer"
                  onClick={() => archieveNotification(item._id)}
                  data-tooltip-content={getNotification(
                    item.eventType,
                    item.userDetails[0].firstname +
                      " " +
                      item.userDetails[0].lastname,
                    item.userCompany[0].name,
                    item?.assetDetails[0]?.name
                  )}
                  data-tooltip-id={`tooltip-${item._id}`}
                />
              </div>
              <Tooltip
                id={`tooltip-${item._id}`}
                place="top"
                className="text-center"
                style={{ maxWidth: "300px" }}
              />
            </li>
          ))}
        </ol>
      ) : (
        <div className="text-center pt-6 text-xl">
          There are no notifications
        </div>
      )}
      {notifications.length > COUNT_PER_PAGE && (
        <Pagination
          current={current}
          setCurrent={setCurrent}
          total={notifications.length}
        />
      )}
    </div>
  );
};

export default AllMessagesTab;
