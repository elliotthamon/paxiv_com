import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { AuthContext } from "@/contexts/AuthContext";
import useCompany from "@/hooks/useCompany";

import BaseContainer from "@/components/BaseContainer";
import LayoutAdmin from "@/components/admin/LayoutAdmin";
import LoadingSpinner from "@/components/LoadingSpinner";

import { getImageURL } from "@/libs/utils";
import {
  ROLE_SITE_ADMIN,
  ROLE_COMPANY_ADMINISTRATOR,
  DEFAULT_COMPANY_DATA,
  ROLE_ONBOARDING_ADMIN,
} from "@/libs/constants";

import PhoneIC from "@/components/icons/PhoneIC";
import SMSIC from "@/components/icons/SMSIC";
import MonitorIC from "@/components/icons/MonitorIC";
import AddressIC from "@/components/icons/AddressIC";
import CubeIC from "@/components/icons/CubeIC";
import EditIC1 from "@/components/icons/EditIC1";

const CompanyResource = () => {
  const router = useRouter();
  const authContext = useContext(AuthContext);

  const { userId, companyId } = router.query;
  const companyID: string | undefined | string[] = companyId;

  const { getCompanyProfileByID } = useCompany();
  const [companyData, setCompanyData] = useState<any>(DEFAULT_COMPANY_DATA);
  const [userData, setUserData] = useState<any>(null);

  const [isEmailHovered, setIsEmailHovered] = useState<boolean>(false);
  const [isURLHovered, setIsURLHovered] = useState<boolean>(false);

  useEffect(() => {
    authContext.handleLoading(true);

    const getUserInfo = async () => {
      if (typeof userId == "string") {
        const data = await authContext.getUser();
        setUserData(data);
        if (data) {
          if (!!companyID && data.role === ROLE_SITE_ADMIN) {
            let companyData = await getCompanyProfileByID(companyID as string);
            if (!!companyData) {
              setCompanyData(companyData);
            }
          } else if (data.companyID) {
            let companyData = await getCompanyProfileByID(data.companyID);
            if (!!companyData) {
              setCompanyData(companyData);
            }
          }
        }
      } else {
        toast.info("User Id is required.", { theme: "colored" });
        router.push("/admin/dashboard");
      }

      authContext.handleLoading(false);
    };

    if (authContext.isLoggedIn) {
      getUserInfo();
    }
    // eslint-disable-next-line
  }, [authContext.isLoggedIn]);

  const isMyCompany =
    userData?.companyID === companyID || companyID == undefined;
  const canEdit =
    userData?.role === ROLE_SITE_ADMIN ||
    (isMyCompany &&
      (userData?.role == ROLE_COMPANY_ADMINISTRATOR ||
        userData?.role == ROLE_ONBOARDING_ADMIN));

  return (
    <LayoutAdmin>
      {companyData != DEFAULT_COMPANY_DATA ? (
        <BaseContainer>
          <div className="flex flex-col">
            <div className="mt-2 text-xl font-bold text-white">
              {companyData?.name} - Resource
            </div>

            <div className="relative z-0 flex flex-col mt-4">
              <div
                className="relative w-full h-[300px] rounded-2xl"
                style={{
                  background:
                    "linear-gradient(93deg, #282E3E 0%, #6981A0 101.04%)",
                }}
              >
                <Image
                  src={
                    companyData?.companyBgImageFile
                      ? getImageURL(companyData.companyBgImageFile)
                      : "/images/company_default_bg.png"
                  }
                  className="w-full h-full rounded-[15px]"
                  alt="company logo"
                  fill
                />
                <div className="absolute bottom-[-20px] left-4 w-[124px] h-[124px] admin-box rounded-xl border-4 border-white bg-[#6981A0]">
                  <Image
                    src={
                      companyData?.companyAvatarImageFile
                        ? getImageURL(companyData.companyAvatarImageFile)
                        : "/images/company_default_avatar.png"
                    }
                    className="object-cover w-full h-full rounded-xl"
                    alt="company logo"
                    fill
                  />
                </div>
              </div>
            </div>

            <div className="w-full pl-4 mt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    {companyData.name}
                  </h1>
                </div>
                <div className="flex flex-col space-x-6 font-medium md:flex-row">
                  {canEdit ? (
                    <button
                      type="button"
                      onClick={() => {
                        router.push(
                          `/admin/resourceEdit?Id=${userId}&companyId=${companyId}`
                        );
                      }}
                      className="flex flex-row justify-center items-center border hover:border-primary hover:bg-primary py-[11px] px-5 rounded-full btn"
                    >
                      <div className="flex items-center space-x-1 text-sm">
                        <EditIC1
                          stroke="#fff"
                          width={20}
                          height={20}
                          className="w-[15px] h-[15px]"
                        />
                        <p className="text-white">Edit</p>
                      </div>
                    </button>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => {
                      router.push(`/admin/companyAssets?id=${companyId}`);
                    }}
                    className="flex flex-row justify-center items-center hover:border-primary hover:bg-primary py-[11px] px-5 rounded-full btn"
                  >
                    <div className="flex items-center space-x-1 text-sm">
                      <CubeIC stroke="#fff" />
                      <p className="text-white">Assets</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <hr className="my-8" />

            <div className="w-full px-8 py-4 pt-8 rounded-lg admin-box">
              <p className="text-lg font-bold text-white">Contact Info</p>
              <div className="flex justify-between w-full mt-4">
                <div className="w-[20%] text-sm text-gray-100 font-medium">
                  <p>Phone Number</p>
                  <div className="w-full flex space-x-2 border border-primary text-primary rounded-lg px-[15px] py-[15px] mt-3">
                    <PhoneIC />
                    <p>{companyData.phone || "No Phone Number"}</p>
                  </div>
                </div>
                <div className="w-[20%] text-sm text-gray-100 font-medium">
                  <p>Email Address</p>
                  <div
                    className={`w-full flex space-x-2 ${
                      isEmailHovered ? "bg-primary" : ""
                    } border border-primary rounded-lg px-[15px] py-[15px] mt-3 ${
                      companyData.email
                        ? "cursor-pointer"
                        : "cursor-not-allowed"
                    }`}
                    onMouseEnter={() => setIsEmailHovered(true)}
                    onMouseLeave={() => setIsEmailHovered(false)}
                  >
                    <SMSIC color={`${isEmailHovered ? "#fff" : "#A37E2C"}`} />
                    <Link
                      href={`mailto:${companyData.email}`}
                      onClick={(e: any) => {
                        if (!companyData.email) {
                          e.preventDefault();
                        }
                      }}
                      className={`${
                        isEmailHovered ? "text-white" : "text-primary"
                      } ${
                        companyData.email
                          ? "cursor-pointer"
                          : "cursor-not-allowed"
                      }`}
                    >
                      {companyData.email || "No Email"}
                    </Link>
                  </div>
                </div>
                <div className="w-[20%] text-sm text-gray-100 font-medium">
                  <p>Website</p>
                  <div
                    className={`w-full flex space-x-2 ${
                      isURLHovered ? "bg-primary" : ""
                    } border border-primary rounded-lg px-[15px] py-[15px] mt-3 ${
                      companyData.website
                        ? "cursor-pointer"
                        : "cursor-not-allowed"
                    }`}
                    onMouseEnter={() => setIsURLHovered(true)}
                    onMouseLeave={() => setIsURLHovered(false)}
                  >
                    <MonitorIC color={`${isURLHovered ? "#fff" : "#A37E2C"}`} />
                    <Link
                      href={companyData.website || ""}
                      onClick={(e: any) => {
                        if (!companyData.website) {
                          e.preventDefault();
                        }
                      }}
                      target="_blank"
                      className={`${
                        isURLHovered ? "text-white" : "text-primary"
                      } ${
                        companyData.website
                          ? "cursor-pointer"
                          : "cursor-not-allowed"
                      }`}
                    >
                      {companyData.website}
                    </Link>
                  </div>
                </div>
                <div className="w-[35%] text-sm text-gray-100 font-medium">
                  <p>Address</p>
                  <div className="w-full flex space-x-2 border border-primary text-primary rounded-lg px-[15px] py-[15px] mt-3">
                    <AddressIC />
                    <p>{companyData.address}</p>
                  </div>
                </div>
              </div>
              <div className="w-full py-10">
                <h1 className="text-lg font-bold text-gray-100">
                  {companyData.title || `About ${companyData.name}`}
                </h1>
                <p className="w-full py-4 mb-8 text-base text-gray-100">
                  {companyData.description}
                </p>
              </div>
            </div>
          </div>
        </BaseContainer>
      ) : (
        <LoadingSpinner />
      )}
    </LayoutAdmin>
  );
};

export default CompanyResource;
