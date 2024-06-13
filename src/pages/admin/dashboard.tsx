import { useContext, useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/contexts/AuthContext";

import Map from "@/components/admin/dashboard/Map";
import SearchAllOpportunities from "@/components/admin/dashboard/SearchAllOpportunities";
import SavedAssets from "@/components/admin/dashboard/SavedAssets";
import AISearchForm from "@/components/admin/dashboard/AISearchForm";
import SavedSearch from "@/components/admin/dashboard/SavedSearch";
import Network from "@/components/admin/dashboard/Network";
import Notifications from "@/components/admin/dashboard/Notifications";
import AIIC from "@/components/icons/AIIC";

import useNotifications from "@/hooks/useNotifications";
import useAsset from "@/hooks/useAsset";

import { toast } from "react-toastify";
import {
  ROLE_AI_SEARCHER,
  ROLE_ONBOARDING_ADMIN,
  ROLE_ONBOARDING_USER,
  ACCESS_RESTRICTION_MSG,
  ROLE_SITE_ADMIN,
  ROLE_COMPANY_ADMINISTRATOR,
} from "@/libs/constants";
import { scrollToSection } from "@/libs/utils";
import LayoutAdmin from "@/components/admin/LayoutAdmin";
import BaseContainer from "@/components/BaseContainer";

const Dashboard = () => {
  const userRef = useRef<any>(null);
  const aiSearchRef = useRef<any>(null);
  const mapRef = useRef<any>(null);

  const authContext = useContext(AuthContext);
  const router = useRouter();

  const { status } = router.query;

  const { getNotificationsById } = useNotifications();
  const { getAssetsByCompanyID } = useAsset();

  const [user, setUser] = useState<any>(null);
  const [notifications, setNotifications] = useState<Array<any>>([]);
  const [isAISearcher, setIsAISearcher] = useState<boolean>(false);
  const [assetData, setAssetData] = useState<Array<any>>([]);

  const [isAISearchClicked, setIsAISearchClicked] = useState<boolean>(false);
  const [isSavedSearchesClicked, setIsSavedSearchesClicked] =
    useState<boolean>(false);
  const [isSavedAssetsClicked, setIsSavedAssetsClicked] =
    useState<boolean>(false);

  if (
    status != undefined &&
    !isAISearchClicked &&
    !isSavedSearchesClicked &&
    !isSavedAssetsClicked
  ) {
    router.push("/admin/dashboard");
  }

  const init = async () => {
    authContext.handleLoading(true);
    const user = authContext.getUser();
    setIsAISearcher(user?.role == ROLE_AI_SEARCHER);
    userRef.current = user;
    try {
      await getNotifications(user);
    } catch (e: any) {
      console.log("error:", e);
    }
    setUser(user);
    try {
      const res = await getAssetsByCompanyID(user.companyDetails[0]._id);
      setAssetData(res);
    } catch (e: any) {
      console.log("Error is occurred in getting the assets by company id.");
    }
    authContext.handleLoading(false);
  };

  const getNotifications = async (user: any) => {
    if(user?._id) {
      const initial_notifications = await getNotificationsById(user._id);
      if (initial_notifications != null) {
        setNotifications(initial_notifications);
      }  
    }
  };

  useEffect(() => {
    if (authContext.isLoggedIn && status != "aisearch") {
      init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContext.isLoggedIn, status]);

  useEffect(() => {
    if (authContext.isPasswordExpired) {
      router.push(`/auth/newPassword`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContext.isPasswordExpired]);

  useEffect(() => {
    const inteval = setInterval(() => {
      if (userRef.current != null) {
        getNotifications(userRef.current);
      }
    }, 300000);

    return () => {
      clearInterval(inteval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LayoutAdmin>
      <BaseContainer>
        <div className="flex flex-col mt-2">
          <h1 className="text-xl font-bold text-white">Dashboard</h1>

          { [ROLE_SITE_ADMIN, ROLE_COMPANY_ADMINISTRATOR].includes(user?.role) && (
          <Network myInfo={user} />            
          )}

          <div className="flex justify-center w-full  gap-5 my-5">
            <div className="flex w-1/2">
              <Notifications
                notifications={notifications}
                setNotifications={setNotifications}
              />
            </div>

            <div className="flex flex-col gap-5 w-1/2">

              <div className="flex justify-center w-full gap-5">

                {/* AI Search */}
                <div className="w-[50%] py-[30px] px-[30px] admin-box rounded-lg">
                  <div className="flex items-center pb-4 space-x-2 text-primary">
                    <AIIC />
                    <p className="text-lg font-semibold text-white">
                      AI Search
                    </p>
                  </div>
                  <div className="pb-4 text-base font-semibold tracking-tighter text-white">
                    Input your specific site requirements and allow Paxiv AI to
                    find the perfect parcel for your next Development
                  </div>
                  <button
                    type="button"
                    className="flex items-center px-6 py-2 text-base font-semibold hover:text-white transition border-2 rounded-lg cursor-pointer hover:bg-primary bg-transparent text-primary border-primary"
                    onClick={() => {
                      if (
                        user?.role == ROLE_ONBOARDING_ADMIN ||
                        user?.role == ROLE_ONBOARDING_USER
                      ) {
                        toast.info(ACCESS_RESTRICTION_MSG, {
                          theme: "colored",
                        });
                      } else {
                        router.push("/admin/dashboard?status=aisearch");
                        setIsAISearchClicked(true);
                        setTimeout(() => {
                          scrollToSection(aiSearchRef);
                        }, 200);
                      }
                    }}
                  >
                    Get Started →
                  </button>
                </div>

                <SearchAllOpportunities myInfo={user} />
              </div>

              <div className="flex justify-center w-full gap-5">

                <SavedAssets
                  setAssetData={setAssetData}
                  status={status}
                  userInfo={user}
                  setIsSavedAssetsClicked={setIsSavedAssetsClicked}
                  mapRef={mapRef}
                />

                <SavedSearch
                  isAISearcher={isAISearcher}
                  setAssetData={setAssetData}
                  status={status}
                  userInfo={user}
                  setIsSavedSearchesClicked={setIsSavedSearchesClicked}
                  mapRef={mapRef}
                />
              </div>
            </div>
          </div>

          <div className="my-5 rounded-lg">
            {status == "aisearch" ? (
              <AISearchForm aiSearchRef={aiSearchRef} />
            ) : (
              <Map assetData={assetData} mapRef={mapRef} />
            )}
          </div>

        </div>
      </BaseContainer>
    </LayoutAdmin>
  );
};

export default Dashboard;
