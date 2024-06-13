import { useRouter } from "next/router";
import AISearchIC from "@/components/icons/AISearchIC";
import ArrorRightIC from "@/components/icons/ArrorRightIC";
import { toast } from "react-toastify";
import {
  ROLE_ONBOARDING_ADMIN,
  ROLE_ONBOARDING_USER,
  ACCESS_RESTRICTION_MSG,
} from "@/libs/constants";

type Props = {
  status: string | string[] | undefined;
  userInfo: any;
  setIsAISearchClicked: Function;
};

const AISearch = ({ status, userInfo, setIsAISearchClicked }: Props) => {
  const router = useRouter();
  return (
    <div className="flex flex-col w-[280px] mx-auto md:mx-0">
      <div
        className={`bg-white rounded-xl p-[14px] text-[#808080] h-full flex flex-col justify-between ${
          status == "aisearch" && "selected-box"
        }`}
      >
        <div className="w-full flex justify-center py-4">
          <AISearchIC />
        </div>
        <div className="w-[160px] mx-auto">
          <h1 className="text-center text-xl text-primary font-bold tracking-widest">
            AI Search
          </h1>
        </div>
        <div className="w-[200px] text-sm text-center mx-auto">
          Input your specific site requirements and allow Paxiv AI to find the
          perfect parcel for your next Development.
        </div>
        <button
          className="flex justify-center items-center text-sm py-2"
          onClick={() => {
            if (
              userInfo.role == ROLE_ONBOARDING_ADMIN ||
              userInfo.role == ROLE_ONBOARDING_USER
            ) {
              toast.info(ACCESS_RESTRICTION_MSG, {
                theme: "colored",
              });
            } else {
              router.push("/admin/dashboard?status=aisearch");
              setIsAISearchClicked(true);
            }
          }}
        >
          <p>Begin</p>
          <ArrorRightIC fill="#d8c285" />
        </button>
      </div>
    </div>
  );
};

export default AISearch;
