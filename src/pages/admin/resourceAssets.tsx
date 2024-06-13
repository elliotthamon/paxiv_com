import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import BaseContainer from "@/components/BaseContainer";
import MyAsset from "@/components/admin/company/MyAsset";
import LayoutAdmin from "@/components/admin/LayoutAdmin";

import useAsset from "@/hooks/useAsset";
import { AuthContext } from "@/contexts/AuthContext";

import ListMoreHiddenIC from "@/components/icons/ListMoreHiddenIC";
import DetailIC from "@/components/icons/DetailIC";
import { ACCESS_RESTRICTION_MSG, ROLE_AI_SEARCHER } from "@/libs/constants";

const ResourceAssets = () => {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  const { getAllSavedAssets } = useAsset();
  const [isListView, setIsListView] = useState<boolean>(false);
  const [resourceAssets, setResourceAssets] = useState<Array<any>>([]);

  useEffect(() => {
    const getAllResourceAssets = async () => {
      authContext.handleLoading(true);

      let userData = await authContext.getUser();

      if (userData?.role == ROLE_AI_SEARCHER) {
        toast.info(ACCESS_RESTRICTION_MSG, { theme: "colored" });
        router.back();
      }

      if (!!userData) {
        await getAllSavedAssets(userData._id)
          .then((res) => {
            setResourceAssets(res);
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
      getAllResourceAssets();
    }
    // eslint-disable-next-line
  }, [authContext.isLoggedIn]);

  return (
    <LayoutAdmin>
      <BaseContainer>
        {resourceAssets.length > 0 ? (
          <div>
            <h1 className="flex flex-col justify-start md:justify-center text-[#0B1E25] text-[25px] font-semibold uppercase">
              resource assets
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
                } w-full mt-6 gap-x-4 gap-y-8 mx-auto md:mx-0  mb-16`}
              >
                {resourceAssets.map((item: any, index: number) => (
                  <MyAsset
                    item={{ ...item.assetData[0], isSaved: true }}
                    key={index}
                    isListView={isListView}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full text-3xl text-center">
            Resource assets pending verification.
          </div>
        )}
      </BaseContainer>
    </LayoutAdmin>
  );
};

export default ResourceAssets;
