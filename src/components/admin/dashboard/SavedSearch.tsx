import { useContext } from "react";
import { useRouter } from "next/router";
import useAsset from "@/hooks/useAsset";
import { AuthContext } from "@/contexts/AuthContext";
import ArrorRightIC from "@/components/icons/ArrorRightIC";
import {
  ACCESS_RESTRICTION_MSG,
  ROLE_ONBOARDING_ADMIN,
  ROLE_ONBOARDING_USER,
} from "@/libs/constants";
import { scrollToSection } from "@/libs/utils";
import { toast } from "react-toastify";

type Props = {
  isAISearcher: boolean;
  setAssetData: Function;
  status: string | string[] | undefined;
  userInfo: any;
  setIsSavedSearchesClicked: Function;
  mapRef: any;
};

const SavedSearch = ({
  isAISearcher,
  setAssetData,
  status,
  userInfo,
  setIsSavedSearchesClicked,
  mapRef,
}: Props) => {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  const { getAllSavedSearches } = useAsset();

  const onClick = async (e: any) => {
    if (isAISearcher) {
      e.preventDefault();
      toast.info(ACCESS_RESTRICTION_MSG, { theme: "colored" });
      return;
    } else if (
      userInfo.role == ROLE_ONBOARDING_ADMIN ||
      userInfo.role == ROLE_ONBOARDING_USER
    ) {
      e.preventDefault();
      toast.info(ACCESS_RESTRICTION_MSG, { theme: "colored" });
    } else {
      router.push("/admin/dashboard?status=savedSearches");
      setIsSavedSearchesClicked(true);
      authContext.handleLoading(true);
      const assets = await getAllSavedSearches(userInfo._id);
      authContext.handleLoading(false);
      const assetArr: Array<any> = [];
      assets.map((item: any) => {
        assetArr.push(item.assetData[0]);
      });
      setAssetData(assetArr);
      setTimeout(() => {
        scrollToSection(mapRef);
      }, 200);
    }
  };

  return (
    <div
      className={`rounded-lg w-1/2 p-6 border border-transparent ${
        status === "savedSearches" ? "bg-primary" : "admin-box"
      }`}
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
            d="M15.5834 28.3475C22.6328 28.3475 28.3475 22.6328 28.3475 15.5833C28.3475 8.53388 22.6328 2.81917 15.5834 2.81917C8.53393 2.81917 2.81921 8.53388 2.81921 15.5833C2.81921 22.6328 8.53393 28.3475 15.5834 28.3475Z"
            fill={`${status === "savedSearches" ? "#fff" : "#A37E2C"}`}
          />
          <path
            d="M19.8334 14.5208H11.3334C10.7525 14.5208 10.2709 14.0392 10.2709 13.4583C10.2709 12.8775 10.7525 12.3958 11.3334 12.3958H19.8334C20.4142 12.3958 20.8959 12.8775 20.8959 13.4583C20.8959 14.0392 20.4142 14.5208 19.8334 14.5208Z"
            fill={`${status === "savedSearches" ? "#fff" : "#A37E2C"}`}
          />
          <path
            d="M15.5834 18.7708H11.3334C10.7525 18.7708 10.2709 18.2892 10.2709 17.7083C10.2709 17.1275 10.7525 16.6458 11.3334 16.6458H15.5834C16.1642 16.6458 16.6459 17.1275 16.6459 17.7083C16.6459 18.2892 16.1642 18.7708 15.5834 18.7708Z"
            fill={`${status === "savedSearches" ? "#fff" : "#A37E2C"}`}
          />
          <path
            d="M31.1525 26.8458C30.685 25.9817 29.6934 25.5 28.3617 25.5C27.3559 25.5 26.4917 25.9108 25.9817 26.6192C25.4717 27.3275 25.3584 28.2767 25.67 29.2258C26.2792 31.0675 27.3417 31.4783 27.9225 31.5492C28.0075 31.5633 28.0925 31.5633 28.1917 31.5633C28.815 31.5633 29.7784 31.2942 30.7134 29.8917C31.4642 28.8008 31.6059 27.71 31.1525 26.8458Z"
            fill={`${status === "savedSearches" ? "#fff" : "#A37E2C"}`}
          />
        </svg>
      </div>
      <div className="mt-3 text-xl font-bold text-white">Saved Searches</div>
      <div className="mt-3 text-base font-semibold text-gray-200">
        Analyze all of your saved searches
      </div>
      <div className="mt-4 ">
        <button
          className={`flex items-center justify-center px-4 py-2 font-bold transition border rounded-lg ${
            status !== "savedSearches"
              ? "text-primary border-primary hover:bg-primary hover:text-white"
              : "text-white border-white hover:bg-white hover:text-primary"
          }`}
          onClick={(e: any) => onClick(e)}
        >
          View Searches →
        </button>
      </div>
    </div>
  );
};

export default SavedSearch;
