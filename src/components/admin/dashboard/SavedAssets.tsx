import { useContext } from "react";
import { useRouter } from "next/router";
import useAsset from "@/hooks/useAsset";
import { AuthContext } from "@/contexts/AuthContext";
import ArrorRightIC from "@/components/icons/ArrorRightIC";
import {
  ROLE_SITE_ADMIN,
  ROLE_COMPANY_ADMINISTRATOR,
  ROLE_USER,
  ACCESS_RESTRICTION_MSG,
  ROLE_AI_SEARCHER,
} from "@/libs/constants";
import { scrollToSection } from "@/libs/utils";
import { toast } from "react-toastify";

type Props = {
  setAssetData: Function;
  status: string | string[] | undefined;
  userInfo: any;
  setIsSavedAssetsClicked: Function;
  mapRef: any;
};

const SavedAssets = ({
  setAssetData,
  status,
  userInfo,
  setIsSavedAssetsClicked,
  mapRef,
}: Props) => {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  const { getAllSavedAssets } = useAsset();

  const onClick = async (e: any) => {
    if (
      userInfo.role == ROLE_SITE_ADMIN ||
      userInfo.role == ROLE_COMPANY_ADMINISTRATOR ||
      userInfo.role == ROLE_USER
    ) {
      router.push("/admin/dashboard?status=savedAssets");
      setIsSavedAssetsClicked(true);
      authContext.handleLoading(true);
      const assets = await getAllSavedAssets(userInfo._id);
      authContext.handleLoading(false);
      const assetArr: Array<any> = [];
      assets.map((item: any) => {
        assetArr.push(item.assetData[0]);
      });
      setAssetData(assetArr);
      setTimeout(() => {
        scrollToSection(mapRef);
      }, 200);
    } else if (userInfo.role == ROLE_AI_SEARCHER) {
      toast.info(ACCESS_RESTRICTION_MSG, { theme: "colored" });
    } else {
      toast.info(ACCESS_RESTRICTION_MSG, { theme: "colored" });
    }
  };

  return (
    <div
      className={`rounded-lg w-1/2 p-6 border border-transparent ${
        status === "savedAssets" ? "bg-primary" : "admin-box"
      }`}
      ref={mapRef}
    >
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
        >
          <path
            opacity="0.4"
            d="M18.2608 8.33001H7.23906C4.81656 8.33001 2.83325 10.3133 2.83325 12.7358V28.8292C2.83325 30.8833 4.30658 31.7617 6.10575 30.7558L11.6732 27.6533C12.2682 27.3275 13.2316 27.3275 13.8124 27.6533L19.3799 30.7558C21.1791 31.7617 22.6524 30.8833 22.6524 28.8292V12.7358C22.6666 10.3133 20.6833 8.33001 18.2608 8.33001Z"
            fill={`${status === "savedAssets" ? "#fff" : "#A37E2C"}`}
          />
          <path
            d="M31.1666 7.23915V23.3325C31.1666 25.3867 29.6933 26.2508 27.8941 25.2592L22.6666 22.3408V12.7358C22.6666 10.3133 20.6833 8.33001 18.2608 8.33001H11.3333V7.23915C11.3333 4.81665 13.3166 2.83334 15.7391 2.83334H26.7608C29.1833 2.83334 31.1666 4.81665 31.1666 7.23915Z"
            fill={`${status === "savedAssets" ? "#fff" : "#A37E2C"}`}
          />
        </svg>
      </div>
      <div className="mt-3 text-xl font-bold text-white">Saved Assets</div>
      <div className="mt-3 text-base font-semibold text-gray-200">
        View all of your saved assets here
      </div>
      <div className="mt-4">
        <button
          className={`flex items-center justify-center px-4 py-2 font-bold transition border rounded-lg ${
            status !== "savedAssets"
              ? "text-primary border-primary hover:bg-primary hover:text-white"
              : "text-white border-white hover:bg-white hover:text-primary"
          }`}
          onClick={(e: any) => onClick(e)}
        >
          View Asset →
        </button>
      </div>
    </div>
  );
};

export default SavedAssets;
