import { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import ArchieveIC from "@/components/icons/ArchieveIC";
import { getArchived, getNotification, sortNotifications } from "@/libs/utils";
import Pagination from "@/components/Pagination";
import { COUNT_PER_PAGE } from "@/libs/constants";

type Props = {
  notifications: Array<any>;
};

const ArchivedMessagesTab = ({ notifications }: Props) => {
  const [current, setCurrent] = useState<number>(0);
  const [pageData, setPageData] = useState<Array<Object>>([]);

  useEffect(() => {
    setPageData(
      sortNotifications(getArchived(notifications)).slice(0, COUNT_PER_PAGE)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications]);

  useEffect(() => {
    const temp = sortNotifications(getArchived(notifications)).slice(
      current * COUNT_PER_PAGE,
      (current + 1) * COUNT_PER_PAGE
    );
    setPageData(temp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  return (
    <div>
      {sortNotifications(getArchived(notifications)).length > 0 ? (
        <ol className="relative space-y-5">
          {pageData.map((item: any, index: number) => (
            <li
              className="mb-2 ml-6 flex justify-between items-center"
              key={index}
            >
              <div className="flex">
                <div className="flex flex-col cursor-pointer">
                  <div className="text-[#858585] text-lg text-center md:text-left">
                    <div>
                      {getNotification(
                        item.eventType,
                        item.userDetails[0].firstname +
                          " " +
                          item.userDetails[0].lastname,
                        "Paxiv",
                        item.asset_id
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-end">
                <ArchieveIC
                  className="cursor-default"
                  fill="#EBEBE4"
                  data-tooltip-content={getNotification(
                    item.eventType,
                    item.userDetails[0].firstname +
                      " " +
                      item.userDetails[0].lastname,
                    "Paxiv",
                    item.asset_id
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
        <div className="pt-5 text-center text-xl">
          There are no archieved notifications.
        </div>
      )}
      {sortNotifications(getArchived(notifications)).length >
        COUNT_PER_PAGE && (
        <Pagination
          current={current}
          setCurrent={setCurrent}
          total={sortNotifications(getArchived(notifications)).length}
        />
      )}
    </div>
  );
};

export default ArchivedMessagesTab;
