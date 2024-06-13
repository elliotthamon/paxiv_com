import { useCallback, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useJsApiLoader } from "@react-google-maps/api";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import BaseContainer from "@/components/BaseContainer";
import LayoutAdmin from "@/components/admin/LayoutAdmin";
import AutoSearchComponent from "@/components/autoComplete/AutoSearchComponent";
import MapComponent from "@/components/autoComplete/MapComponent";
import RecycleIC from "@/components/icons/RecycleIC";

import useAsset from "@/hooks/useAsset";
import useCompany from "@/hooks/useCompany";

import { getCurrentYear, getImageURL } from "@/libs/utils";
import {
  ASSET_CLASSES,
  ASSET_STATUSES,
  ASSET_TYPES,
  PROPERTY_DEV_STATUS_TYPES,
  MARKET_SEGMENT_TYPES,
  RENT_TYPES,
  ROLE_SITE_ADMIN,
  MAP_LIBRARIES,
} from "@/libs/constants";
import { AuthContext } from "@/contexts/AuthContext";
import LoadingSpinner from "@/components/LoadingSpinner";

const schema = yup.object().shape({
  name: yup.string().required("Name of asset is required."),
  numberOfUnits: yup
    .string()
    .required("Number units is required.")
    .matches(/^\d+$/, "Number units must be a valid number."),
  price: yup.string().required("Price is required.").matches(/^\d+$/, {
    message: "Price must be a valid number.",
    excludeEmptyString: true,
  }),
  yearPurchased: yup
    .number()
    .typeError("Year purchased must be a valid number.")
    .max(getCurrentYear(), "Year purchased must be less than 2023.")
    .required("Year purchased is required."),
  constructionYear: yup
    .number()
    .typeError("Construction year must be a valid number.")
    .max(getCurrentYear(), "Construction year must be less than 2023.")
    .required("Construction year is required."),
  class: yup.string().required("Class is required."),
  status: yup.string().required("Status is required."),
  assetType: yup.string().required("Asset Type is required."),
  squareFeet: yup.string().required("Square feet is required."),
  propertyDevStatus: yup.string().required("Square feet is required."),
  marketSegment: yup.string().required("Square feet is required."),
  rentType: yup.string().required("Square feet is required."),
});

const CreateAsset = () => {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const { getCompanyProfileByID } = useCompany();
  const { id } = router.query;
  let companyID = id;
  const [data] = useState<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    values: data,
  });

  const { saveAsset } = useAsset();

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [files, setFiles] = useState<Array<any>>([]);
  const [userID, setUserID] = useState<string>("");
  const [assetImageError, setAssetImageError] = useState<boolean>(false);
  const [opportunityZoneChecked, setOpportunityZoneChecked] =
    useState<boolean>(false);
  const [location, setLocation] = useState<any>({
    lat: 45.424721,
    lng: -75.695,
  });
  const [address, setAddress] = useState<string>("");
  const [companyData, setCompanyData] = useState<any>(null);
  const [nonNumberChecked, setNonNumberChecked] = useState<boolean>(false);
  const [nonPriceChecked, setNonPriceChecked] = useState<boolean>(false);
  const [nonSquareFeetChecked, setNonSquareFeetChecked] =
    useState<boolean>(false);
  const [nonYearPurchasedChecked, setNonYearPurchasedChecked] =
    useState<boolean>(false);
  const [nonConstructionYearChecked, setNonConstructionYearChecked] =
    useState<boolean>(false);

  const handleFileInput = (e: any) => {
    const newFiles = Array.from(e.target.files);
    setFiles([...files, ...newFiles]);
    setAssetImageError(false);
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    validateAssetImage(newFiles);
  };

  const handleCheckboxChange = useCallback(() => {
    setOpportunityZoneChecked(!opportunityZoneChecked);
  }, [opportunityZoneChecked]);

  const handleNonNumberChecked = useCallback(() => {
    setNonNumberChecked(!nonNumberChecked);
    if (!nonNumberChecked) {
      setValue("numberOfUnits", 0);
    } else {
      setValue("numberOfUnits", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nonNumberChecked]);

  const handleNonPriceChecked = useCallback(() => {
    setNonPriceChecked(!nonPriceChecked);
    if (!nonPriceChecked) {
      setValue("price", 0);
    } else {
      setValue("price", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nonPriceChecked]);

  const handleNonYearPurchasedChecked = useCallback(() => {
    setNonYearPurchasedChecked(!nonYearPurchasedChecked);
    if (!nonYearPurchasedChecked) {
      setValue("yearPurchased", 0);
    } else {
      setValue("yearPurchased", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nonYearPurchasedChecked]);

  const handleNonConstructionYearChecked = useCallback(() => {
    setNonConstructionYearChecked(!nonConstructionYearChecked);
    if (!nonConstructionYearChecked) {
      setValue("constructionYear", 0);
    } else {
      setValue("constructionYear", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nonConstructionYearChecked]);

  const handleNonSquareFeetChecked = useCallback(() => {
    setNonSquareFeetChecked(!nonSquareFeetChecked);
    if (!nonSquareFeetChecked) {
      setValue("squareFeet", 0);
    } else {
      setValue("squareFeet", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nonSquareFeetChecked]);

  const validateAssetImage = (_files: any) => {
    if (_files.length > 0) {
      setAssetImageError(false);
    } else {
      setAssetImageError(true);
    }
  };

  const onSubmitHandler = async (data: any) => {
    if (files.length === 0) {
      setAssetImageError(true);
      return;
    }

    data.userID = userID;
    data.opportunityZone = opportunityZoneChecked;
    data.address = location;
    data.realAddress = address;
    data.files = files;
    data.companyID = companyID;
    if (nonNumberChecked) {
      data.numberOfUnits = "N/A";
    }
    if (nonPriceChecked) {
      data.price = "N/A";
    }
    if (nonSquareFeetChecked) {
      data.squareFeet = "N/A";
    }
    if (nonYearPurchasedChecked) {
      data.yearPurchased = "N/A";
    }
    if (nonConstructionYearChecked) {
      data.constructionYear = "N/A";
    }

    if (data.realAddress?.length === 0 || !data.realAddress) {
      toast.warning("Address is required", { theme: "colored" });
      return;
    }
    setIsSaving(true);

    try {
      if (!userID || userID?.length == 0) throw "Failed to create asset.";

      const ret = await saveAsset(userID, data);
      if (ret) {
        toast.success("Successfully submitted!", { theme: "colored" });
        setTimeout(() => {
          router.back();
        }, 3000);
      } else throw "Failed to create asset.";
    } catch (e: any) {
      toast.error("Failed to create asset. Try again later", {
        theme: "colored",
      });
      console.log("e", e);
    }

    setIsSaving(false);
  };

  const errorHandle = () => {
    validateAssetImage(files);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      authContext.handleLoading(true);
      let userData = await authContext.getUser();
      if (
        userData?.role == ROLE_SITE_ADMIN ||
        userData?.companyID == companyID ||
        companyID == undefined
      ) {
        setUserID(userData._id);
        if (typeof companyID == "string") {
          const companyData = await getCompanyProfileByID(companyID);
          setCompanyData(companyData);
          authContext.handleLoading(false);
        } else {
          router.push("/admin/companyAssets");
        }
      } else {
        router.back();
      }
    };

    if (authContext.isLoggedIn) {
      getUserInfo();
    }
    // eslint-disable-next-line
  }, [authContext.isLoggedIn]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
    libraries: MAP_LIBRARIES,
  });

  return (
    <LayoutAdmin>
      {companyData != null ? (
        <BaseContainer>
          <div className="flex flex-col justify-between w-full text-center md:flex-row md:text-left">
            <h1 className="text-lg font-bold text-white">Create New Asset</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmitHandler, errorHandle)}>
            <div className="flex flex-col rounded-[15px] mt-3 pb-5">
              <div className="relative w-full h-full">
                <Image
                  src={
                    companyData.companyBgImageFile
                      ? getImageURL(companyData.companyBgImageFile)
                      : "/images/company_default_bg.png"
                  }
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="w-full h-auto rounded-[15px]"
                  alt="company logo"
                />
                <div className="absolute bottom-[-20px] left-4 w-[124px] h-[124px] bg-[#6981A0] rounded-xl border-4 border-white flex justify-center items-center">
                  <Image
                    src={
                      companyData.companyAvatarImageFile
                        ? getImageURL(companyData.companyAvatarImageFile)
                        : "/images/company_default_avatar.png"
                    }
                    className="object-cover w-full h-full rounded-xl"
                    alt="background"
                    fill
                  />
                </div>
              </div>

              <div className="grid w-full grid-cols-2 gap-4 mx-auto mt-12 td:grid-cols-3 xl:grid-cols-4">
                <div className="flex flex-col w-full mx-auto mt-1 md:mx-0 md:mt-3">
                  <label
                    className={`text-sm uppercase ${
                      errors.name ? "text-red-600" : "text-white"
                    }`}
                  >
                    Asset Name
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    className={`w-full mt-2 px-3 py-1 border-2 rounded-[8px] ${
                      errors.name
                        ? "border-red-600 focus:border-red-600 focus:ring-0"
                        : "border-primary focus:ring-primary focus:border-primary"
                    } admin-box text-white`}
                    placeholder=""
                  />
                  {errors.name && (
                    <p className="text-red-600 error-text">
                      {errors.name.message?.toString()}
                    </p>
                  )}
                </div>

                <div className="flex flex-col w-full mx-auto mt-1 md:mx-0 md:mt-3">
                  <div className="flex items-center space-x-3">
                    <label
                      className={`text-sm  ${
                        errors.numberOfUnits && !nonNumberChecked
                          ? "text-red-600"
                          : "text-white"
                      } uppercase`}
                    >
                      Number Of Units
                    </label>
                    <div className="flex items-center space-x-1">
                      <input
                        type="checkbox"
                        checked={nonNumberChecked}
                        onChange={() => handleNonNumberChecked()}
                        className="w-3 h-3 text-primary border-primary focus:ring-primary admin-box"
                      />
                      <label
                        className="text-sm text-white cursor-pointer"
                        onClick={() => handleNonNumberChecked()}
                      >
                        N/A
                      </label>
                    </div>
                  </div>
                  <input
                    type="text"
                    {...register("numberOfUnits")}
                    className={`w-full mt-2 px-3 py-1 border-2 rounded-[8px] ${
                      errors.numberOfUnits && !nonNumberChecked
                        ? "border-red-600 focus:border-red-600 focus:ring-0"
                        : "border-primary focus:ring-primary focus:border-primary"
                    } ${
                      nonNumberChecked &&
                      "hide-value text-black cursor-not-allowed"
                    } admin-box text-white`}
                    placeholder=""
                    disabled={nonNumberChecked}
                  />
                  {errors.numberOfUnits && !nonNumberChecked && (
                    <p className="text-red-600 error-text">
                      {errors.numberOfUnits.message?.toString()}
                    </p>
                  )}
                </div>

                <div className="flex flex-col w-full mx-auto mt-1 md:mx-0 md:mt-3">
                  <div className="flex items-center space-x-3">
                    <label
                      className={`text-sm uppercase ${
                        errors.price && !nonPriceChecked
                          ? "text-red-600"
                          : "text-white"
                      }`}
                    >
                      price
                    </label>
                    <div className="flex items-center space-x-1">
                      <input
                        type="checkbox"
                        checked={nonPriceChecked}
                        onChange={() => handleNonPriceChecked()}
                        className="w-3 h-3 text-primary border-primary focus:ring-primary admin-box"
                      />
                      <label
                        className="text-sm text-white cursor-pointer"
                        onClick={() => handleNonPriceChecked()}
                      >
                        N/A
                      </label>
                    </div>
                  </div>
                  <input
                    type="text"
                    {...register("price")}
                    className={`w-full mt-2 px-3 py-1 border-2 rounded-[8px] ${
                      errors.price && !nonPriceChecked
                        ? "border-red-600 focus:border-red-600 focus:ring-0"
                        : "border-primary focus:ring-primary focus:border-primary"
                    } ${
                      nonPriceChecked &&
                      "hide-value text-black cursor-not-allowed"
                    } admin-box text-white`}
                    placeholder=""
                    disabled={nonPriceChecked}
                  />
                  {errors.price && !nonPriceChecked && (
                    <p className="text-red-600 error-text">
                      {errors.price.message?.toString()}
                    </p>
                  )}
                </div>

                <div className="flex flex-col w-full mx-auto mt-1 md:mx-0 md:mt-3">
                  <div className="flex items-center space-x-3">
                    <label
                      className={`text-sm uppercase ${
                        errors.squareFeet && !nonSquareFeetChecked
                          ? "text-red-600"
                          : "text-white"
                      }`}
                    >
                      square feet
                    </label>
                    <div className="flex items-center space-x-1">
                      <input
                        type="checkbox"
                        checked={nonSquareFeetChecked}
                        onChange={() => handleNonSquareFeetChecked()}
                        className="w-3 h-3 text-primary border-primary focus:ring-primary admin-box"
                      />
                      <label
                        className="text-sm text-white cursor-pointer"
                        onClick={() => handleNonSquareFeetChecked()}
                      >
                        N/A
                      </label>
                    </div>
                  </div>

                  <input
                    type="text"
                    {...register("squareFeet")}
                    className={`w-full mt-2 px-3 py-1 border-2 rounded-[8px] ${
                      errors.squareFeet && !nonSquareFeetChecked
                        ? "border-red-600 focus:border-red-600 focus:ring-0"
                        : "border-primary focus:ring-primary focus:border-primary"
                    } ${
                      nonSquareFeetChecked &&
                      "hide-value text-black cursor-not-allowed"
                    } admin-box text-white`}
                    placeholder=""
                    disabled={nonSquareFeetChecked}
                  />
                  {errors.squareFeet && !nonSquareFeetChecked && (
                    <p className="text-red-600 error-text">
                      {errors.squareFeet.message?.toString()}
                    </p>
                  )}
                </div>

                <div className="flex flex-col w-full mx-auto mt-1 md:mx-0 md:mt-3">
                  <div className="flex items-center space-x-3">
                    <label
                      className={`text-sm uppercase ${
                        errors.yearPurchased && !nonYearPurchasedChecked
                          ? "text-red-600"
                          : "text-white"
                      }`}
                    >
                      year acquired
                    </label>
                    <div className="flex items-center space-x-1">
                      <input
                        type="checkbox"
                        checked={nonYearPurchasedChecked}
                        onChange={() => handleNonYearPurchasedChecked()}
                        className="w-3 h-3 text-primary border-primary focus:ring-primary admin-box"
                      />
                      <label
                        className="text-sm text-white cursor-pointer"
                        onClick={() => handleNonYearPurchasedChecked()}
                      >
                        N/A
                      </label>
                    </div>
                  </div>

                  <input
                    type="text"
                    {...register("yearPurchased")}
                    className={`w-full mt-2 px-3 py-1 border-2 rounded-[8px] ${
                      errors.yearPurchased && !nonYearPurchasedChecked
                        ? "border-red-600 focus:border-red-600 focus:ring-0"
                        : "border-primary focus:ring-primary focus:border-primary"
                    }  ${
                      nonYearPurchasedChecked &&
                      "hide-value text-black cursor-not-allowed"
                    } admin-box text-white`}
                    placeholder=""
                    disabled={nonYearPurchasedChecked}
                  />
                  {errors.yearPurchased && !nonYearPurchasedChecked && (
                    <p className="text-red-600 error-text">
                      {errors.yearPurchased.message?.toString()}
                    </p>
                  )}
                </div>

                <div className="flex flex-col w-full mx-auto mt-1 md:mx-0 md:mt-3">
                  <div className="flex items-center space-x-3">
                    <label
                      className={`text-sm uppercase ${
                        errors.constructionYear && !nonConstructionYearChecked
                          ? "text-red-600"
                          : "text-white"
                      }`}
                    >
                      construction year
                    </label>
                    <div className="flex items-center space-x-1">
                      <input
                        type="checkbox"
                        checked={nonConstructionYearChecked}
                        onChange={() => handleNonConstructionYearChecked()}
                        className="w-3 h-3 text-primary border-primary focus:ring-primary admin-box"
                      />
                      <label
                        className="text-sm text-white cursor-pointer"
                        onClick={() => handleNonConstructionYearChecked()}
                      >
                        N/A
                      </label>
                    </div>
                  </div>

                  <input
                    type="text"
                    {...register("constructionYear")}
                    className={`w-full mt-2 px-3 py-1 border-2 rounded-[8px] ${
                      errors.constructionYear && !nonConstructionYearChecked
                        ? "border-red-600 focus:border-red-600 focus:ring-0"
                        : "border-primary focus:ring-primary focus:border-primary"
                    } ${
                      nonConstructionYearChecked &&
                      "hide-value text-black cursor-not-allowed"
                    } admin-box text-white`}
                    placeholder=""
                    disabled={nonConstructionYearChecked}
                  />
                  {errors.constructionYear && !nonConstructionYearChecked && (
                    <p className="text-red-600 error-text">
                      {errors.constructionYear.message?.toString()}
                    </p>
                  )}
                </div>
                <div className="flex flex-col w-full mx-auto mt-1 md:mx-0 md:mt-3">
                  <label
                    className={`text-sm uppercase ${
                      errors.class ? "text-red-600" : "text-white"
                    }`}
                  >
                    Class
                  </label>
                  <select
                    {...register("class")}
                    className={`mt-2 block w-full px-3 py-1 text-gray-500 border-2 rounded-lg bg-white ${
                      errors.class
                        ? "border-red-600 focus:border-red-600 focus:ring-0"
                        : "border-primary focus:ring-primary focus:border-primary"
                    } admin-box text-white`}
                  >
                    {ASSET_CLASSES.map((item, index) => {
                      return (
                        <option key={index} value={item.value}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                  {errors.class && (
                    <p className="text-red-600 error-text">
                      {errors.class.message?.toString()}
                    </p>
                  )}
                </div>
                <div className="flex flex-col w-full mx-auto mt-1 md:mx-0 md:mt-3">
                  <label
                    className={`text-sm uppercase ${
                      errors.status ? "text-red-600" : "text-white"
                    }`}
                  >
                    Status
                  </label>
                  <select
                    {...register("status")}
                    className={`mt-2 block w-full px-3 py-1 text-gray-500 border-2 rounded-lg bg-white ${
                      errors.status
                        ? "border-red-600 focus:border-red-600 focus:ring-0"
                        : "border-primary focus:ring-primary focus:border-primary"
                    } admin-box text-white`}
                  >
                    {ASSET_STATUSES.map((item, index) => {
                      return (
                        <option key={index} value={item.value}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                  {errors.status && (
                    <p className="text-red-600 error-text">
                      {errors.status.message?.toString()}
                    </p>
                  )}
                </div>
                <div className="flex flex-col w-full mx-auto mt-1 sm:mx-0 md:mt-3">
                  <label
                    className={`text-sm uppercase ${
                      errors.assetType ? "text-red-600" : "text-white"
                    }`}
                  >
                    asset type
                  </label>
                  <select
                    {...register("assetType")}
                    className={`mt-2 block w-full px-3 py-1 text-gray-500 border-2 rounded-lg bg-white ${
                      errors.assetType
                        ? "border-red-600 focus:border-red-600 focus:ring-0"
                        : "border-primary focus:ring-primary focus:border-primary"
                    } admin-box text-white`}
                  >
                    {ASSET_TYPES.map((item, index) => {
                      return (
                        <option key={index} value={item.value}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                  {errors.assetType && (
                    <p className="text-red-600 error-text">
                      {errors.assetType.message?.toString()}
                    </p>
                  )}
                </div>
                <div className="flex flex-col w-full mx-auto mt-1 sm:mx-0 md:mt-3">
                  <label
                    className={`text-sm uppercase ${
                      errors.propertyDevStatus ? "text-red-600" : "text-white"
                    }`}
                  >
                    Property Development Status
                  </label>
                  <select
                    {...register("propertyDevStatus")}
                    className={`mt-2 block w-full px-3 py-1 text-gray-500 border-2 rounded-lg bg-white ${
                      errors.propertyDevStatus
                        ? "border-red-600 focus:border-red-600 focus:ring-0"
                        : "border-primary focus:ring-primary focus:border-primary"
                    } admin-box text-white`}
                  >
                    {PROPERTY_DEV_STATUS_TYPES.map((item, index) => {
                      return (
                        <option key={index} value={item.value}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                  {errors.propertyDevStatus && (
                    <p className="text-red-600 error-text">
                      {errors.propertyDevStatus.message?.toString()}
                    </p>
                  )}
                </div>
                <div className="flex flex-col w-full mx-auto mt-1 sm:mx-0 md:mt-3">
                  <label
                    className={`text-sm uppercase ${
                      errors.marketSegment ? "text-red-600" : "text-white"
                    }`}
                  >
                    Market Segment
                  </label>
                  <select
                    {...register("marketSegment")}
                    className={`mt-2 block w-full px-3 py-1 text-gray-500 border-2 rounded-lg bg-white ${
                      errors.marketSegment
                        ? "border-red-600 focus:border-red-600 focus:ring-0"
                        : "border-primary focus:ring-primary focus:border-primary"
                    } admin-box text-white`}
                  >
                    {MARKET_SEGMENT_TYPES.map((item, index) => {
                      return (
                        <option key={index} value={item.value}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                  {errors.marketSegment && (
                    <p className="text-red-600 error-text">
                      {errors.marketSegment.message?.toString()}
                    </p>
                  )}
                </div>
                <div className="flex flex-col w-full mx-auto mt-1 sm:mx-0 md:mt-3">
                  <label
                    className={`text-sm uppercase ${
                      errors.rentType ? "text-red-600" : "text-white"
                    }`}
                  >
                    RENT TYPE
                  </label>
                  <select
                    {...register("rentType")}
                    className={`mt-2 block w-full px-3 py-1 text-gray-500 border-2 rounded-lg bg-white ${
                      errors.rentType
                        ? "border-red-600 focus:border-red-600 focus:ring-0"
                        : "border-primary focus:ring-primary focus:border-primary"
                    } admin-box text-white`}
                  >
                    {RENT_TYPES.map((item, index) => {
                      return (
                        <option key={index} value={item.value}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                  {errors.rentType && (
                    <p className="text-red-600 error-text">
                      {errors.rentType.message?.toString()}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col w-full mx-auto mt-1 md:mx-0 md:mt-6">
                <label
                  className={`text-sm uppercase ${
                    errors.description ? "text-red-600" : "text-white"
                  }`}
                >
                  Description
                </label>
                <textarea
                  rows={4}
                  {...register("description")}
                  className={`w-full mt-2 px-3 py-1 border-2 rounded-[8px] ${
                    errors.description
                      ? "border-red-600 focus:border-red-600 focus:ring-0"
                      : "border-primary focus:ring-primary focus:border-primary"
                  } admin-box text-white`}
                  placeholder=""
                />
                {errors.description && (
                  <p className="text-red-600 error-text">
                    {errors.description.message?.toString()}
                  </p>
                )}
              </div>
              <div className="flex flex-col w-full mx-auto mt-1 md:mx-0 md:mt-6">
                {/* @ts-ignore */}
                {isLoaded && (
                  <>
                    <AutoSearchComponent
                      setLocation={setLocation}
                      location={address}
                      setAddress={setAddress}
                    />
                    <div className="mt-2">
                      <MapComponent
                        location={location}
                        setLocation={setLocation}
                        setValue={setAddress}
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="flex flex-col mt-6">
                <label
                  className={`text-sm uppercase ${
                    assetImageError ? "text-red-600" : "text-white"
                  }`}
                >
                  Gallery
                </label>
                <div
                  className={`flex flex-wrap gap-3 border-[1px] rounded-lg mt-2 p-2 md:p-10 ${
                    assetImageError ? "border-red-600" : "border-primary"
                  }`}
                >
                  {files.length > 0 && (
                    <>
                      {files.map((file, index) => (
                        <div className="relative w-fit" key={index}>
                          <div className="relative w-[99px] h-[92px]">
                            <Image
                              src={URL.createObjectURL(file)}
                              className="object-contain rounded-lg"
                              alt="thumbnail"
                              fill
                            />
                          </div>
                          <button
                            type="button"
                            className="absolute bottom-0 flex items-center justify-center w-full p-2 bg-gray-600 cursor-pointer bg-opacity-80"
                            onClick={() => handleRemoveFile(index)}
                          >
                            <RecycleIC fill="#fff" className="bi bi-trash3" />
                          </button>
                        </div>
                      ))}
                    </>
                  )}
                  <div className="flex items-center justify-center w-[99px] h-[92px]">
                    <label className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed rounded-lg cursor-pointer border-primary">
                      <div className="flex flex-col items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          fill="currentColor"
                          className="primary bi bi-plus-circle"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>
                        <p className="flex mt-2 text-sm text-primary">Import</p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileInput}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
                {assetImageError && (
                  <p className="text-red-600 error-text">
                    You must upload one or more images to publish your asset.
                  </p>
                )}
              </div>
              <div className="flex items-center mt-6">
                <input
                  type="checkbox"
                  checked={opportunityZoneChecked}
                  onChange={handleCheckboxChange}
                  name="colored-radio"
                  className="w-4 h-4 cursor-pointer text-primary border-primary focus:ring-primary admin-box"
                />
                <label
                  className="ml-2 text-[16px] font-semibold text-[#2D3748] cursor-pointer"
                  onClick={() => handleCheckboxChange()}
                >
                  In an opportunizy zone
                </label>
              </div>
              <div className="flex justify-center mx-auto mt-5 space-x-4">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-10 py-2 text-base text-white transition border rounded-lg cursor-pointer bg-primary hover:bg-gray-100 hover:text-primary border-primary disabled:cursor-not-allowed"
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>
                <div className="px-[2px] text-white text-[16px] rounded-[30px]">
                  <button
                    type="button"
                    className="px-10 py-2 text-white transition-all rounded-lg admin-box hover:bg-primary"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </BaseContainer>
      ) : (
        <LoadingSpinner />
      )}
    </LayoutAdmin>
  );
};

export default CreateAsset;
