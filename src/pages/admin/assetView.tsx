import { useRef, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { toast } from "react-toastify";

import { AuthContext } from "@/contexts/AuthContext";
import useAsset from "@/hooks/useAsset";
import useNotifications from "@/hooks/useNotifications";

import BaseContainer from "@/components/BaseContainer";
import LayoutAdmin from "@/components/admin/LayoutAdmin";
import DeleteConfirmationModal from "@/components/modals/DeleteConfirmationModal";
import SmallSpinner from "@/components/SmallSpinner";
import AssetSavedIC from "@/components/icons/AssetSavedIC";
import EditIC1 from "@/components/icons/EditIC1";
import AssetIC from "@/components/icons/AssetIC";
import SMSIC from "@/components/icons/SMSIC";
import PhoneIC from "@/components/icons/PhoneIC";
import { getImageURL, priceFormat } from "@/libs/utils";
import {
  AssetStatusNameByValue,
  ROLE_SITE_ADMIN,
  ROLE_COMPANY_ADMINISTRATOR,
  ROLE_ONBOARDING_ADMIN,
} from "@/libs/constants";
import AssignedIC from "@/components/icons/AssignedIC";
import AssignModal from "@/components/modals/AssignModal";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
    partialVisibilityGutter: 40,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1368 },
    items: 1,
    partialVisibilityGutter: 40,
  },
  tablet: {
    breakpoint: { max: 1368, min: 925 },
    items: 1,
    partialVisibilityGutter: 30,
  },
  mobile: {
    breakpoint: { max: 925, min: 0 },
    items: 1,
    partialVisibilityGutter: 10,
  },
};

const AssetView = () => {
  const ref = useRef(null);

  const authContext = useContext(AuthContext);
  const router = useRouter();
  const {
    getAssetByID,
    createSavedAsset,
    deleteSavedAsset,
    updateAssetUserByAssetID,
    deleteAssetUserByAssetID,
  } = useAsset();
  const { createViewAssetNotification } = useNotifications();

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [assetData, setAssetData] = useState<any>(null);
  const [assetUser, setAssetUser] = useState<any>(null);
  const [isEmailHovered, setIsEmailHovered] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [isAssignModal, setIsAssignModal] = useState<boolean>(false);
  const [isDeleteConfirmationModalOpened, setIsDeleteConfirmationModalOpened] =
    useState<boolean>(false);

  const { id } = router.query;
  const assetID = id;

  useEffect(() => {
    const getCompanyInfo = async () => {
      authContext.handleLoading(true);

      if (typeof id == "string") {
        const userData = await authContext.getUser();
        setUser(userData);
        let assetData: any;
        if (userData) {
          assetData = await getAssetByID(id, userData._id);
        } else {
          assetData = await getAssetByID(id);
        }
        const origin_user = userData._id;
        const target_user = assetData?.createdBy;
        if (origin_user != target_user) {
          await createViewAssetNotification(
            "ViewAsset",
            origin_user,
            target_user,
            assetData?._id
          );
        }
        setAssetData(assetData);
        setAssetUser(assetData.user);
      } else {
        history.back();
      }

      authContext.handleLoading(false);
    };

    if (authContext.isLoggedIn) {
      getCompanyInfo();
    }
    // eslint-disable-next-line
  }, [authContext.isLoggedIn]);

  const onAssetUserchange = async (user: any) => {
    setIsSaving(true);

    try {
      await updateAssetUserByAssetID(assetID as string, user?.userID);
      toast.success(
        `${assetData.name} was successfully assigned to ${
          user.firstname + " " + user.lastname
        }.`,
        { theme: "colored" }
      );
    } catch {
      toast.error("Failed to process", { theme: "colored" });
    }

    setIsSaving(false);
  };

  const updateSaveState = async () => {
    setIsSaving(true);
    const userData = authContext.getUser();
    if (userData) {
      try {
        const userID = userData._id;
        let status = false;
        if (assetData.isSaved) {
          status = await deleteSavedAsset(assetData, userID);
        } else {
          status = await createSavedAsset(assetData, userID);
        }

        if (status) {
          assetData.isSaved = !assetData.isSaved;
          setAssetData(assetData);
          setAssetUser(assetData.user);

          if (assetData.isSaved)
            toast.success("Successfully submitted!", { theme: "colored" });
          else toast.success("Successfully removed!", { theme: "colored" });
        } else {
          toast.error("Failed to process", { theme: "colored" });
        }
      } catch (e) {
        toast.error("Failed to process", { theme: "colored" });
      }
    } else {
      toast.error("Failed to process", { theme: "colored" });
    }
    setIsSaving(false);
  };

  const deleteAsset = async () => {
    setIsDeleteConfirmationModalOpened(false);
    setIsSaving(true);
    try {
      await deleteAssetUserByAssetID(assetID as string);
      toast.success("The asset was successfully deleted!", {
        theme: "colored",
      });
    } catch {
      toast.error("Failed to delete", { theme: "colored" });
    }
    setIsSaving(false);
    router.push(`/admin/companyAssets?id=${assetData?.company?._id}`);
  };

  const isMyCompany = user?.companyID === assetData?.company?._id;
  const canEdit = user?.role === ROLE_SITE_ADMIN || isMyCompany;
  const canDelete =
    user?.role == ROLE_SITE_ADMIN ||
    (user?.role == ROLE_COMPANY_ADMINISTRATOR && isMyCompany) ||
    (user?.role == ROLE_ONBOARDING_ADMIN && isMyCompany);

  return (
    <LayoutAdmin>
      <BaseContainer>
        <div
          className={`w-full flex flex-col px-4 xs:px-0 ${
            assetData == null && "h-screen"
          }`}
        >
          {assetData ? (
            <div className="w-full">
              <div className="flex items-center justify-between">
                <h1 className="mt-2 text-xl font-bold text-white">
                  Asset View
                </h1>
                <div className="flex items-center space-x-2">
                  {canDelete && (
                    <button
                      type="button"
                      className="px-6 py-2 text-white transition-all rounded-lg cursor-pointer admin-box hover:bg-primary"
                      onClick={() => setIsDeleteConfirmationModalOpened(true)}
                    >
                      Delete Asset
                    </button>
                  )}
                  {canEdit ? (
                    <button
                      className="px-6 py-2 text-base font-semibold text-white transition border rounded-lg cursor-pointer hover:text-primary border-primary bg-primary hover:bg-white"
                      onClick={() =>
                        router.push(`/admin/assetEdit?id=${assetID}`)
                      }
                    >
                      Edit Asset
                    </button>
                  ) : null}
                </div>
              </div>
              <div className="flex items-center justify-between w-full mt-4">
                <div
                  className={`relative ${
                    assetData?.images?.length > 0
                      ? "w-[56%] xl:w-[724px]"
                      : "w-full"
                  } h-full border border-gray-500 rounded-xl`}
                >
                  <Carousel
                    ref={ref}
                    additionalTransfrom={0}
                    swipeable={true}
                    draggable={true}
                    showDots={false}
                    autoPlay={true}
                    arrows={false}
                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    infinite={true}
                    keyBoardControl={true}
                    transitionDuration={10000}
                    containerClass="rounded-xl"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    dotListClass="custom-dot-list-style"
                    itemClass="rounded-xl"
                  >
                    {assetData?.images?.length > 0 ? (
                      assetData.images.map((item: string, index: number) => (
                        <div
                          className="w-full h-[504px] rounded-xl"
                          key={index}
                        >
                          <Image
                            src={getImageURL(item)}
                            width={724}
                            height={504}
                            className="w-full h-full select-none rounded-xl drag-none"
                            alt="asset"
                          />
                          {assetData.images.length != 0 && (
                            <div className="absolute flex items-center justify-center px-4 py-2 text-white bg-black rounded-full bottom-3 right-3 bg-opacity-20">
                              {index + 1} / {assetData.images.length}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="bg-yellow-400 w-full h-[504px]">
                        <Image
                          src="/images/p_logo_white.svg"
                          width={724}
                          height={504}
                          className="w-full h-full select-none rounded-xl drag-none"
                          alt="asset"
                        />
                        <div className="absolute flex items-center justify-center px-4 py-2 text-white bg-black rounded-full bottom-3 right-3 bg-opacity-20">
                          1 / 1
                        </div>
                      </div>
                    )}
                  </Carousel>
                  <div className="absolute flex items-center justify-center px-4 py-2 text-sm font-semibold text-white uppercase rounded-full top-3 left-3 bg-primary">
                    {AssetStatusNameByValue(assetData?.status)}
                  </div>
                  <div className="absolute top-3 right-3 bg-white hover:bg-[#d4d2d2] w-[32px] h-[32px] flex justify-center items-center rounded-full">
                    {assetData.isSaved !== undefined ||
                    assetData.isSaved !== null ? (
                      isSaving ? (
                        <SmallSpinner />
                      ) : (
                        <button
                          onClick={() => updateSaveState()}
                          disabled={isSaving}
                        >
                          {assetData?.isSaved === true ? (
                            <AssetSavedIC className="bi bi-bookmark-check-fill w-[16px]" />
                          ) : (
                            <AssetIC className="w-[16px]" />
                          )}
                        </button>
                      )
                    ) : null}
                  </div>
                </div>
                <div className="w-[43%] xl:w-full flex-1 grid grid-cols-2 grid-rows-2">
                  {Array.from({ length: 4 }).map((_, index) => {
                    return Array.isArray(assetData?.images) && assetData?.images[index] !== undefined ? (
                      <div key={index} className="px-[6px] py-[6px]">
                        <Image
                          width={246}
                          height={246}
                          src={getImageURL(assetData.images[index])}
                          className="w-[246px] h-[246px] rounded-xl"
                          alt="asset"
                        />
                      </div>
                    ) : (
                      ""
                    );
                  })}
                </div>
              </div>
              <div className="flex items-start justify-between w-full py-4 mt-6 rounded-lg">
                <div className="w-[56%] xl:w-[724px] bg-black bg-opacity-60 px-4 pt-4 rounded-xl">
                  <div className="flex items-center justify-between w-full">
                    <div className="space-y-2">
                      <p className="text-xl font-bold text-white">
                        {assetData?.name}
                      </p>
                      <p className="text-base font-medium text-gray-200">
                        {assetData?.realAddress}
                      </p>
                    </div>
                    <div className="text-3xl font-bold text-white">
                      {assetData?.price ?
                       '$' + Number(priceFormat(assetData?.price)).toLocaleString()
                       : ("Not Available") 
                       }

                    </div>
                  </div>
                  <hr className="w-full my-4" />
                  <div className="flex justify-between w-full">
                    <div>
                      <p className="text-base font-medium text-gray-200">
                        Square Feet
                      </p>
                      <p className="text-base font-semibold text-white">
                        {assetData?.squareFeet}
                      </p>
                    </div>
                    <div>
                      <p className="text-base font-medium text-gray-200">
                        Classes
                      </p>
                      <p className="text-base font-semibold text-white">
                        {assetData?.class}
                      </p>
                    </div>
                    <div>
                      <p className="text-base font-medium text-gray-200">
                        Year Purchased
                      </p>
                      <p className="text-base font-semibold text-white">
                        {assetData?.yearPurchased}
                      </p>
                    </div>
                    <div>
                      <p className="text-base font-medium text-gray-200">
                        Construction Start
                      </p>
                      <p className="text-base font-semibold text-white">
                        {assetData?.constructionYear}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between w-full pt-4">
                    <div>
                      <p className="text-base font-medium text-gray-200">
                        Construction Complete
                      </p>
                      <p className="text-base font-semibold text-white">
                        {assetData?.constructionYear}
                      </p>
                    </div>
                    <div>
                      <p className="text-base font-medium text-gray-200">
                        In an Opportunity Zone
                      </p>
                      <p className="text-base font-semibold text-white">
                        {assetData?.opportunityZone ? "Yes" : "No"}
                      </p>
                    </div>
                    <div>
                      <p className="text-base font-medium text-gray-200">
                        Asset Type
                      </p>
                      <p className="text-base font-semibold text-white">
                        {assetData?.assetType}
                      </p>
                    </div>
                  </div>
                  <hr className="w-full my-4" />
                  <div className="flex items-center w-full space-x-2">
                    <div className="relative w-[66px] h-[66px]">
                      <Image
                        src={
                          assetData?.company?.companyAvatarImageFile
                            ? getImageURL(
                                assetData.company.companyAvatarImageFile
                              )
                            : "/images/default_avatar.png"
                        }
                        className="object-cover w-full h-full border rounded-full border-primary"
                        alt="company avatar"
                        fill
                      />
                    </div>
                    <div>
                      <p className="text-base font-semibold text-white">
                        {assetData.company?.name}
                      </p>
                      <p className="w-[230px] text-base font-medium text-gray-200">
                        {assetData.company?.address}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center mt-4 mb-6 space-x-6">
                    <div className="flex space-x-2 border border-primary text-primary rounded-full px-[15px] py-3 mt-3">
                      <PhoneIC />
                      <p>{assetData.company.phone || "No Phone Number"}</p>
                    </div>
                    <div
                      className={`flex space-x-2 ${
                        isEmailHovered
                          ? "bg-primary text-white"
                          : "text-primary"
                      } border border-primary rounded-full px-[15px] py-3 mt-3 ${
                        assetData?.company.email
                          ? "cursor-pointer"
                          : "cursor-not-allowed"
                      }`}
                      onMouseEnter={() => setIsEmailHovered(true)}
                      onMouseLeave={() => setIsEmailHovered(false)}
                    >
                      <SMSIC color={`${isEmailHovered ? "#fff" : "#A37E2C"}`} />
                      <Link
                        href={`mailto:${assetData?.company.email}`}
                        onClick={(e: any) => {
                          if (!assetData?.company.email) {
                            e.preventDefault();
                          }
                        }}
                        className={`${
                          isEmailHovered ? "text-white" : "text-primary"
                        } ${
                          assetData?.company.email
                            ? "cursor-pointer"
                            : "cursor-not-allowed"
                        }`}
                      >
                        {assetData?.company.email || "No Email"}
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="w-[43%] xl:w-full flex-1 rounded-xl px-4 py-4 space-y-4 ml-2 bg-black bg-opacity-60">
                  <div className="flex items-center justify-between w-full">
                    <p className="text-base font-bold text-white">
                      Contact Info
                    </p>
                    <div className="flex space-x-4">
                      <button
                        className="flex items-center space-x-1"
                        onClick={() => setIsAssignModal(true)}
                      >
                        <AssignedIC stroke="white" />
                        <div className="text-sm font-semibold text-white hover:text-primary">
                          Assigned
                        </div>
                      </button>
                      <button
                        className="flex items-center space-x-1 cursor-pointer"
                        onClick={() =>
                          router.push(
                            `/admin/editContact?id=${assetUser?._id}&assetID=${assetID}`
                          )
                        }
                      >
                        <EditIC1 stroke="#fff" width={16} height={16} />
                        <div className="text-sm font-semibold text-white hover:text-primary">
                          Edit Contact
                        </div>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-full space-x-2">
                    <div className="flex items-center space-x-2">
                      <div className="relative w-[52px] h-[52px]">
                        <Image
                          src={
                            assetUser?.avatar
                              ? getImageURL(assetUser?.avatar)
                              : "/images/default_avatar.png"
                          }
                          className="rounded-full border border-1.5 border-primary object-cover object-top"
                          alt="user avatar"
                          fill
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="text-base font-semibold text-white">
                          {assetUser?.firstname + " " + assetUser?.lastname}
                        </div>
                        <div className="text-sm font-semibold text-gray-200">
                          {assetUser?.position}
                        </div>
                      </div>
                    </div>
                    <button className="px-8 py-3 text-base font-bold border rounded-lg text-primary border-primary">
                      Contact
                    </button>
                  </div>
                  <div className="flex items-center w-full space-x-2">
                    <PhoneIC />
                    <div className="text-sm font-semibold text-gray-200">
                      {assetUser?.phone || "No Phone Number"}
                    </div>
                  </div>
                  <div className="flex items-center w-full space-x-2">
                    <SMSIC color="#A37E2C" />
                    <Link
                      href={`mailto:${assetUser?.email}`}
                      className="text-sm font-semibold text-gray-200 hover:text-primary"
                    >
                      {assetUser?.email}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          {isAssignModal && (
            <AssignModal
              users={assetData.users}
              user={assetUser}
              setAssetUser={setAssetUser}
              isAssignModal={isAssignModal}
              setIsAssignModal={setIsAssignModal}
              onAssetUserchange={onAssetUserchange}
            />
          )}
        </div>
        {isDeleteConfirmationModalOpened && (
          <DeleteConfirmationModal
            item="Do you really want to remove this asset?"
            onDelete={deleteAsset}
            setIsState={setIsDeleteConfirmationModalOpened}
          />
        )}
      </BaseContainer>
    </LayoutAdmin>
  );
};

export default AssetView;
