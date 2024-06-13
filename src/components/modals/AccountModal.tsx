/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import UserIC from "@/components/icons/UserIC";
import BoxArrowLeft from "@/components/icons/BoxArrowLeft";

import { getImageURL } from "@/libs/utils";
import { RoleStringByType, ROLE_ONBOARDING_USER } from "@/libs/constants";
import { AuthContext } from "@/contexts/AuthContext";
import useAuth from "@/hooks/useAuth";
import useOutsideClick from "@/hooks/useOutsideClick";

const AccountModal = (props: {
  isMyAccountShow: boolean;
  setIsMyAccountShow: Function;
  user: any;
}) => {
  const auth = useAuth();
  const authContext = useContext(AuthContext);
  const modalRef = useRef<HTMLDivElement>(null);

  const user = props.user;

  const signOut = async () => {
    await auth.signOut();
    authContext.setIsLoggedIn(false);
  };

  useOutsideClick(modalRef, props.isMyAccountShow, props.setIsMyAccountShow);

  return (
    <div
      className="normal-case absolute right-0 top-[65px] w-[280px] bg-[#0D0D0D] p-6 z-40 rounded-xl"
      ref={modalRef}
    >
      <div
        className="flex items-end justify-end"
        onClick={() => {
          props.setIsMyAccountShow(false);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <g clipPath="url(#clip0_525_3887)">
            <path
              d="M13.5 4.5L4.5 13.5"
              stroke="#666666"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.5 4.5L13.5 13.5"
              stroke="#666666"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_525_3887">
              <rect width="18" height="18" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col items-center justify-center w-[61px] h-[61px] mb-2 relative">
          <Image
            src={
              user?.avatar
                ? getImageURL(user.avatar)
                : "/images/default_avatar.png"
            }
            className="object-cover object-top bg-white border rounded-full border-primary"
            alt="user"
            fill
          />
        </div>
        <div className="mb-1 text-sm font-semibold text-white">
          {user?.firstname + " " + user?.lastname}
        </div>
        <div className="mb-4 text-xs text-white opacity-60">
          {user?.companyDetails[0].name}
        </div>
        <div className="w-full h-[1px] bg-[#2E2E2E]"></div>
        <div className="my-2 flex gap-1.5 text-white text-sm items-center justify-center">
          <div className="opacity-60">Email:</div>
          <div className="font-semibold">{user.email}</div>
        </div>
        <div className="my-2 flex gap-1.5 text-white tracking-sm">
          <div className="opacity-60">User Level:</div>
          <div className="">{RoleStringByType(user.role)}</div>
        </div>
        <div className="w-full">
          {user.role != ROLE_ONBOARDING_USER && (
            <Link
              href="/admin/editProfile"
              className="my-3 w-full rounded-lg flex gap-1.5 items-center justify-center bg-[#A37E2C] text-white hover:text-black hover:bg-white py-2.5 fill-white hover:fill-black"
            >
              <UserIC />
              <div className="text-sm">Edit Profile</div>
            </Link>
          )}
        </div>
        <button
          className="flex items-center justify-center w-full gap-1 mt-2 cursor-pointer"
          onClick={() => signOut()}
        >
          <BoxArrowLeft />
          <div className="flex items-center justify-center text-sm font-semibold text-white opacity-60">
            Logout
          </div>
        </button>
      </div>
    </div>
  );
};

export default AccountModal;
