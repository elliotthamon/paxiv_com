import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import BaseContainer from "@/components/BaseContainer";
import MyAsset from "@/components/admin/company/MyAsset";
import LayoutAdmin from "@/components/admin/LayoutAdmin";
import ListMoreHiddenIC from "@/components/icons/ListMoreHiddenIC";
import Pagination from "@/components/Pagination";

import useAsset from "@/hooks/useAsset";
import { AuthContext } from "@/contexts/AuthContext";

import { ROW_COUNT } from "@/libs/constants";
import DetailIC from "@/components/icons/DetailIC";

const MyAssets = () => {
  const authContext = useContext(AuthContext);
  const { queryAssets } = useAsset();
  const [isListView, setIsListView] = useState<boolean>(false);
  const [myAssets, setMyAssets] = useState<Array<any>>([]);

  const [current, setCurrent] = useState<number>(0);
  const [pageData, setPageData] = useState<Array<Object>>([]);

  useEffect(() => {
    const getAllAssets = async () => {
      authContext.handleLoading(true);

      let userData = authContext.user;

      if (!!userData) {
        await queryAssets({ _id:  userData._id})
          .then((res) => {
            setMyAssets(res);
            setPageData(res.slice(0, ROW_COUNT * 3));
          })
          .catch((err: any) => {
            toast.error("Error occured. Try again later.", {
              theme: "colored",
            });
          });
      }

      authContext.handleLoading(false);
    };

    if (authContext.isLoggedIn) {
      getAllAssets();
    }
    // eslint-disable-next-line
  }, [authContext.isLoggedIn, current]);

  /*
  useEffect(() => {
    const temp = myAssets.slice(
      current * ROW_COUNT * 3,
      (current + 1) * ROW_COUNT * 3
    );
    setPageData(temp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);
  */

  const user = authContext.getUser();

  return (
    <LayoutAdmin>
      <BaseContainer>
        {myAssets.length ? (
          <div className="w-full h-full">
            <h1 className="flex flex-col justify-start md:justify-center text-[#0B1E25] text-[25px] font-semibold uppercase">
              my assets
            </h1>
            <div className="bg-white rounded-[15px] p-5">
              <div className="flex flex-col justify-between w-full text-center md:flex-row md:text-left">
                <div className="flex-row items-center justify-end hidden mt-4 space-x-6 md:flex md:justify-between md:mt-0">
                  <h1 className="text-base font-medium text-gray-200">View</h1>
                  <div
                    className="hover:cursor-pointer hover:scale-150"
                    onClick={() => {
                      setIsListView(false);
                    }}
                  >
                    <ListMoreHiddenIC
                      fill={!isListView ? "currentColor" : "#000"}
                    />
                  </div>
                  <div
                    className="hover:cursor-pointer hover:scale-150"
                    onClick={() => {
                      setIsListView(true);
                    }}
                  >
                    <DetailIC
                      fill={isListView ? "currentColor" : "#000"}
                      className="primary bi bi-list-ul"
                    />
                  </div>
                </div>
              </div>
              <div
                className={`flex justify-center ${
                  isListView ? "flex-col" : "flex-wrap"
                } w-full mt-6 gap-x-4 gap-y-8 mx-auto md:mx-0`}
              >
                {pageData.map((item: any, index: number) => (
                  <MyAsset
                    key={index}
                    item={item}
                    isListView={isListView}
                    userData={user}
                  />
                ))}
              </div>
              {myAssets.length > ROW_COUNT * 3 && (
                <div className="pt-8">
                  <Pagination
                    current={current}
                    setCurrent={setCurrent}
                    total={myAssets.length}
                  />
                </div>
              )}
              <div className="flex flex-col justify-between w-full mt-16 md:flex-row"></div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full">
            <div className="w-full h-full text-3xl text-center">
              Assets pending verification.
            </div>
          </div>
        )}
      </BaseContainer>
    </LayoutAdmin>
  );
};

export default MyAssets;
