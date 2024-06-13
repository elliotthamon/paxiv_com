import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

import AccountModal from "@/components/modals/AccountModal";
import DashboardIC from "@/components/icons/DashboardIC";
import SearchIC from "@/components/icons/SearchIC";
import NetworkIC from "@/components/icons/NetworkIC";
import CompanyIC from "@/components/icons/CompanyIC";
import SupportIC from "@/components/icons/SupportIC";
import MoreIC from "@/components/icons/MoreIC";
import UsersIC from "@/components/icons/UsersIC";

import { AuthContext } from "@/contexts/AuthContext";

import {
  ROLE_SITE_ADMIN,
  ROLE_AI_SEARCHER,
  ROLE_ONBOARDING_ADMIN,
  ROLE_ONBOARDING_USER,
  ACCESS_RESTRICTION_MSG,
} from "@/libs/constants";
import { getImageURL } from "@/libs/utils";

type Props = {
  setIsChatOpened: Function;
};

const HeaderAdmin = ({ setIsChatOpened }: Props) => {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [isMyAccountShow, setIsMyAccountShow] = useState<boolean>(false);

  const avatar = user ? user.avatar : "";
  const userRole = user ? user.role : "";
  const isAISearcher = userRole === ROLE_AI_SEARCHER;

  const AISearcherInform = (e: any) => {
    if (
      isAISearcher ||
      user.role == ROLE_ONBOARDING_ADMIN ||
      user.role == ROLE_ONBOARDING_USER
    ) {
      e.preventDefault();
      toast.info(ACCESS_RESTRICTION_MSG, { theme: "colored" });
    }
  };

  useEffect(() => {
    if (authContext.isLoggedIn) {
      authContext.handleLoading(true);
      const user = authContext.getUser();
      setUser(user);
      authContext.handleLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContext.isLoggedIn]);

  return (
    <div className="w-full font-medium">
      <div className="max-w-[1240px] mx-auto flex justify-between py-4">
        <Image
          width={223}
          height={36}
          src="/images/paxiv_logo1.png"
          alt="paxiv_text"
          className="z-10"
        />
        <div
          className={`flex flex-row items-center space-x-0 xl:space-x-2 uppercase tracking-tight text-white font-thin bg-transparent px-2 td:px-4`}
        >
          <Link href="/admin/dashboard">
            <div className="relative flex flex-row items-center px-2 py-2 space-x-1 rounded-full stroke-white hover:text-primary hover:stroke-primary">
              <div className="flex">
                <DashboardIC
                  fill={`${
                    router.pathname === "/admin/dashboard" ? "#A37E2C" : ""
                  } `}
                  stroke={`${
                    router.pathname === "/admin/dashboard" ? "#A37E2C" : ""
                  } `}
                />
              </div>
              <h1
                className={`${
                  router.pathname === "/admin/dashboard" ? "text-primary" : ""
                } text-sm font-medium lg:tracking-wide`}
              >
                Dashboard
              </h1>
              {router.pathname === "/admin/dashboard" && (
                <div className="menu_active"></div>
              )}
            </div>
          </Link>
          <Link href="/admin/search" onClick={(e) => AISearcherInform(e)}>
            <div className="relative flex flex-row items-center px-2 py-2 space-x-1 rounded-full stroke-white hover:text-primary hover:stroke-primary">
              <div className="flex">
                <SearchIC
                  stroke={`${
                    router.pathname === "/admin/search" ? "#A37E2C" : ""
                  } `}
                  width={18}
                  height={18}
                  className="bi bi-search"
                />
              </div>
              <h1
                className={`${
                  router.pathname === "/admin/search" ? " text-primary" : ""
                } text-sm font-medium lg:tracking-wide`}
              >
                Search
              </h1>
              {router.pathname === "/admin/search" && (
                <div className="menu_active"></div>
              )}
            </div>
          </Link>
          <Link
            href="/admin/company"
            className="relative flex flex-row items-center px-2 py-2 space-x-1 rounded-full stroke-white hover:text-primary hover:stroke-primary"
            onClick={(e) => {
              if (isAISearcher) {
                e.preventDefault();
                toast.info(ACCESS_RESTRICTION_MSG, { theme: "colored" });
              }
            }}
          >
            <div className="flex">
              <CompanyIC
                stroke={`${
                  router.pathname === "/admin/company" ||
                  router.pathname === "/admin/companyProfileEdit" ||
                  router.pathname === "/admin/companyAssets" ||
                  router.pathname === "/admin/assetView"
                    ? "#A37E2C"
                    : ""
                } `}
              />
            </div>
            <h1
              className={`${
                router.pathname === "/admin/company" ||
                router.pathname === "/admin/companyProfileEdit" ||
                router.pathname === "/admin/companyAssets" ||
                router.pathname === "/admin/assetView"
                  ? " text-primary"
                  : ""
              } text-sm font-medium lg:tracking-wide`}
            >
              My Company
            </h1>
            {(router.pathname === "/admin/company" ||
              router.pathname === "/admin/companyProfileEdit" ||
              router.pathname === "/admin/companyAssets" ||
              router.pathname === "/admin/assetView") && (
              <div className="menu_active"></div>
            )}
          </Link>
          <Link
            href={
              userRole === ROLE_SITE_ADMIN
                ? "/admin/allCompanies"
                : `/admin/companyResources`
            }
            className="flex flex-row items-center"
            onClick={(e) => AISearcherInform(e)}
          >
            <div className="relative flex flex-row items-center px-2 py-2 space-x-1 rounded-full fill-white hover:fill-primary stroke-white hover:text-primary hover:stroke-primary">
              <div className="flex">
                <NetworkIC
                  fill={`${
                    router.pathname == "/admin/companyResources" ||
                    router.pathname == "/admin/allCompanies"
                      ? "#A37E2C"
                      : ""
                  } `}
                />
              </div>
              <h1
                className={`${
                  router.pathname == "/admin/companyResources" ||
                  router.pathname == "/admin/allCompanies"
                    ? " text-primary"
                    : ""
                } text-sm font-medium lg:tracking-wide`}
              >
                network
              </h1>
              {(router.pathname == "/admin/companyResources" ||
                router.pathname == "/admin/allCompanies") && (
                <div className="menu_active"></div>
              )}
            </div>
          </Link>
          {userRole == ROLE_SITE_ADMIN && (
            <Link href="/admin/allUsers">
              <div className="relative flex flex-row items-center px-2 py-2 space-x-1 rounded-full fill-white hover:fill-primary stroke-white hover:text-primary hover:stroke-primary">
                <div className="flex">
                  <UsersIC
                    stroke={`${
                      router.pathname === "/admin/allUsers" ? "#A37E2C" : ""
                    } `}
                  />
                </div>
                <h1
                  className={`${
                    router.pathname === "/admin/allUsers" ? " text-primary" : ""
                  } hover:header-text-gradient text-sm font-medium lg:tracking-wide`}
                >
                  Users
                </h1>
                {router.pathname === "/admin/allUsers" && (
                  <div className="menu_active"></div>
                )}
              </div>
            </Link>
          )}
          <Link href="/admin/support">
            <div className="relative flex flex-row items-center px-2 py-2 space-x-1 rounded-full fill-white hover:fill-primary stroke-white hover:text-primary hover:stroke-primary">
              <div className="flex">
                <SupportIC
                  fill={`${
                    router.pathname === "/admin/support" ? "#A37E2C" : "#000"
                  } `}
                />
              </div>
              <h1
                className={`${
                  router.pathname === "/admin/support" ? " text-primary" : ""
                } hover:header-text-gradient text-sm font-medium lg:tracking-wide`}
              >
                Support
              </h1>
              {router.pathname === "/admin/support" && (
                <div className="menu_active"></div>
              )}
            </div>
          </Link>

          <div
            className="relative flex flex-row items-center px-2 space-x-1 cursor-pointer"
            onClick={() => {
              setIsMyAccountShow(!isMyAccountShow);
              setIsChatOpened(false);
            }}
          >
            <div className="relative w-[38px] h-[38px]">
              <Image
                src={
                  avatar ? getImageURL(avatar) : "/images/default_avatar.png"
                }
                className="rounded-full object-cover border border-1.5 border-primary object-top bg-white"
                alt="user avatar"
                fill
              />
            </div>
            {user != null && (
              <div className="hidden xl:block text-sm font-medium lg:tracking-wide normal-case space-y-0.5 pr-1">
                <p>{user?.firstname + " " + user?.lastname}</p>
                <p className="text-gray-300">{user?.email}</p>
              </div>
            )}
            <MoreIC width={12} height={12} fill="#fff" />
            {isMyAccountShow && (
              <AccountModal
                isMyAccountShow={isMyAccountShow}
                setIsMyAccountShow={setIsMyAccountShow}
                user={user}
              />
            )}
          </div>
        </div>
      </div>
      <hr className="absolute w-full border-white opacity-30"></hr>
    </div>
  );
};
export default HeaderAdmin;
