import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useRouter } from "next/router";

import { AuthContext } from "@/contexts/AuthContext";
import useAsset from "@/hooks/useAsset";
import useCompany from "@/hooks/useCompany";
import MyAsset from "@/components/admin/company/MyAsset";

import BaseContainer from "@/components/BaseContainer";
import LayoutAdmin from "@/components/admin/LayoutAdmin";
import EditIC1 from "@/components/icons/EditIC1";
import CompanyBlackIC from "@/components/icons/CompanyBlackIC";
import PhoneIC from "@/components/icons/PhoneIC";
import SMSIC from "@/components/icons/SMSIC";
import MonitorIC from "@/components/icons/MonitorIC";
import AddressIC from "@/components/icons/AddressIC";
import { toast } from "react-toastify";

import { getImageURL } from "@/libs/utils";
import {
  ROLE_SITE_ADMIN,
  ROLE_COMPANY_ADMINISTRATOR,
  ROLE_ONBOARDING_ADMIN,
  ROLE_ONBOARDING_USER,
  ROLE_AI_SEARCHER,
  ACCESS_RESTRICTION_MSG,
} from "@/libs/constants";
import CubeIC from "@/components/icons/CubeIC";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1368 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1368, min: 925 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 925, min: 0 },
    items: 1,
  },
};

const Company = () => {
  const router = useRouter();
  const authContext = useContext(AuthContext);

  const { id } = router.query;
  const companyID: string | undefined | string[] = id;

  const { getCompanyProfileByID } = useCompany();
  const { getAssetsByCompanyID, queryAssets } = useAsset();
  const [companyData, setCompanyData] = useState<any>({});

  const [user, setUser] = useState<any>({});
  const [companyAssets, setCompanyAssets] = useState<Array<any>>([]);

  const [isEmailHovered, setIsEmailHovered] = useState<boolean>(false);
  const [isURLHovered, setIsURLHovered] = useState<boolean>(false);

  useEffect(() => {
    const getUserInfo = async () => {
      authContext.handleLoading(true);
      let userData = authContext.getUser();
      if (userData?.role == ROLE_AI_SEARCHER) {
        toast.info(ACCESS_RESTRICTION_MSG, { theme: "colored" });
        router.back();
      }
      setUser(userData);

      if (!!userData) {
        if (!!companyID && userData.role === ROLE_SITE_ADMIN) {
          let companyData = await getCompanyProfileByID(companyID as string);
          if (!!companyData) {
            setCompanyData(companyData);
          }
          await queryAssets({ companyID }, 0, 4)
            .then((res) => {
              setCompanyAssets(res?.data ?? []);
            })
            .catch((err: any) => {
              toast.error("Error occured. Try again later.", {
                theme: "colored",
              });
            });
        } else if (userData.companyID) {
          setCompanyData(userData.companyDetails[0]);
          await getAssetsByCompanyID(userData.companyID, userData._id)
            .then((res) => {
              setCompanyAssets(res);
            })
            .catch((err: any) => {
              toast.error("Error occured. Try again later.", {
                theme: "colored",
              });
            });
        }
      }
      authContext.handleLoading(false);
    };

    if (authContext.isLoggedIn) {
      getUserInfo();
    }
    // eslint-disable-next-line
  }, [authContext.isLoggedIn]);

  const isMyCompany = user?.companyID === companyID || companyID == undefined;
  const canEdit =
    user?.role === ROLE_SITE_ADMIN ||
    (isMyCompany &&
      (user?.role == ROLE_COMPANY_ADMINISTRATOR ||
        user?.role == ROLE_ONBOARDING_ADMIN));

  return (
    <LayoutAdmin>
      <BaseContainer>
        <div className="flex flex-col w-full">
          <h1 className="mt-2 text-xl font-bold text-white">Company Profile</h1>
          <div className="relative z-0 flex flex-col mt-4">
            <div
              className="relative w-full h-[180px] rounded-2xl"
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
                className="h-40 object-contain h-full" // h-full rounded-[15px]
                alt="company logo"
                fill
                //width={1200}
                //height={20}
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
                        `/admin/companyProfileEdit?id=${companyData._id}`
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
                    router.push(`/admin/companyAssets?id=${companyData._id}`);
                  }}
                  className="flex flex-row justify-center items-center hover:border-primary hover:bg-primary py-[11px] px-5 rounded-full btn"
                >
                  <div className="flex items-center space-x-1 text-sm">
                    <CubeIC stroke="#fff" />
                    <p className="text-white">Assets</p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (user.role != ROLE_ONBOARDING_USER) {
                      router.push(
                        `/admin/companyResources?Id=${companyData._id}`
                      );
                    } else {
                      toast.info(ACCESS_RESTRICTION_MSG, {
                        theme: "colored",
                      });
                    }
                  }}
                  className="flex flex-row justify-center items-center hover:border-primary hover:bg-primary py-[11px] px-5 rounded-full btn"
                >
                  <div className="flex items-center space-x-1 text-sm">
                    <CompanyBlackIC
                      stroke="#fff"
                      className="w-[11px] h-[11px]"
                    />
                    <p className="text-white">Company Directory</p>
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
                    companyData.email ? "cursor-pointer" : "cursor-not-allowed"
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
            <div className="w-full pt-10">
              <h1 className="text-lg font-bold text-gray-100">
                {companyData.title || `About ${companyData.name}`}
              </h1>
              <p className="w-full py-4 text-base text-gray-100">
                {companyData.description}
              </p>
            </div>
            {companyAssets && companyAssets.length > 0 && (
              <div className="pt-4">
                <div className="flex flex-row items-end justify-between w-full mt-2">
                  <p className="text-lg font-bold text-white">Assets</p>
                  <button
                    className="px-6 py-2 text-base text-white transition border rounded-lg hover:text-primary text-primary border-primary bg-primary hover:bg-transparent"
                    onClick={() => {
                      router.push(`/admin/companyAssets?id=${user.companyID}`);
                    }}
                  >
                    View All Assets
                  </button>
                </div>
                <div className="w-full my-6">
                  <Carousel
                    swipeable
                    draggable
                    showDots={false}
                    responsive={responsive}
                    infinite
                    autoPlay={false}
                    autoPlaySpeed={1000}
                    keyBoardControl
                    customTransition="transform 500ms ease-in-out"
                  >
                    {companyAssets.map((item: any, index: number) => (
                      <MyAsset key={index} item={item} isListView={false} />
                    ))}
                  </Carousel>
                </div>
              </div>
            )}
          </div>
        </div>
      </BaseContainer>
    </LayoutAdmin>
  );
};

export default Company;
