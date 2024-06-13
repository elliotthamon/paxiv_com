import Link from "next/link";
import ArrorRightIC from "@/components/icons/ArrorRightIC";
import {
  ACCESS_RESTRICTION_MSG,
  ROLE_AI_SEARCHER,
  ROLE_ONBOARDING_ADMIN,
  ROLE_ONBOARDING_USER,
} from "@/libs/constants";
import { toast } from "react-toastify";

type Props = {
  myInfo: any;
};

const SearchAllOpportunities = ({ myInfo }: any) => {
  return (
    <div className="w-1/2 p-6 border border-transparent rounded-lg admin-box">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
        >
          <path
            d="M29.8775 9.88833C28.6733 8.55667 26.6616 7.89083 23.7433 7.89083H23.4033V7.83417C23.4033 5.45417 23.4033 2.5075 18.0766 2.5075H15.9233C10.5966 2.5075 10.5966 5.46833 10.5966 7.83417V7.905H10.2566C7.32414 7.905 5.32664 8.57083 4.12247 9.9025C2.71997 11.4608 2.76247 13.5575 2.90414 14.9883L2.9183 15.0875L3.05997 16.575C3.07414 16.5892 3.10247 16.6175 3.13081 16.6317C3.59831 16.9433 4.07997 17.255 4.58997 17.5383C4.7883 17.6658 5.0008 17.7792 5.2133 17.8925C7.63581 19.2242 10.2991 20.1167 13.005 20.5558C13.1325 21.8875 13.7133 23.4458 16.8158 23.4458C19.9183 23.4458 20.5275 21.9017 20.6266 20.5275C23.5166 20.06 26.3075 19.0542 28.8291 17.5808C28.9141 17.5383 28.9708 17.4958 29.0416 17.4533C29.6933 17.085 30.3025 16.6883 30.8975 16.2492C30.9258 16.235 30.9541 16.2067 30.9683 16.1783L31.025 15.6683L31.0958 15.0025C31.11 14.9175 31.11 14.8467 31.1241 14.7475C31.2375 13.3167 31.2091 11.3617 29.8775 9.88833ZM18.5441 19.5925C18.5441 21.0942 18.5441 21.3208 16.8016 21.3208C15.0591 21.3208 15.0591 21.0517 15.0591 19.6067V17.8217H18.5441V19.5925ZM12.6225 7.89083V7.83417C12.6225 5.42583 12.6225 4.53333 15.9233 4.53333H18.0766C21.3775 4.53333 21.3775 5.44 21.3775 7.83417V7.905H12.6225V7.89083Z"
            fill="#A37E2C"
          />
          <path
            opacity="0.4"
            d="M29.0417 17.425C28.9709 17.4675 28.9001 17.51 28.8292 17.5525C26.3076 19.0258 23.5167 20.0175 20.6267 20.4992C20.5134 21.8592 19.9184 23.4175 16.8159 23.4175C13.7134 23.4175 13.1184 21.8733 13.0051 20.5275C10.2992 20.1025 7.63589 19.21 5.21339 17.8642C5.00089 17.7508 4.78839 17.6375 4.59006 17.51C4.08006 17.2267 3.59839 16.915 3.13089 16.6033C3.10256 16.5892 3.07423 16.5608 3.06006 16.5467L3.92423 25.7692C4.22173 28.5883 5.38339 31.4925 11.6167 31.4925H22.4117C28.6451 31.4925 29.8067 28.5883 30.1042 25.755L30.9967 16.15C30.9826 16.1783 30.9542 16.2067 30.9259 16.2208C30.3167 16.66 29.6934 17.0708 29.0417 17.425Z"
            fill="#A37E2C"
          />
        </svg>
      </div>
      <div className="mt-3 text-xl font-bold text-white">
        Search All Opportunities
      </div>
      <div className="mt-3 text-base font-semibold text-gray-200">
        Search all of the assets within Paxiv
      </div>
      <div className="mt-4 ">
        <Link
          className="flex items-center justify-center flex-shrink px-4 py-2 font-bold transition border rounded-lg text-primary border-primary hover:bg-primary hover:text-white"
          href="/admin/search"
          onClick={(e: any) => {
            if (myInfo.role == ROLE_AI_SEARCHER) {
              e.preventDefault();
              toast.info(ACCESS_RESTRICTION_MSG, { theme: "colored" });
            } else if (
              myInfo.role == ROLE_ONBOARDING_ADMIN ||
              myInfo.role == ROLE_ONBOARDING_USER
            ) {
              e.preventDefault();
              toast.info(ACCESS_RESTRICTION_MSG, { theme: "colored" });
            }
          }}
        >
          Search Opportunities →
        </Link>
      </div>
    </div>
  );
};

export default SearchAllOpportunities;
