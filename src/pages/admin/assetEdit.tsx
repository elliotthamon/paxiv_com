import { useEffect, useState, useContext } from "react";
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
import AddIC from "@/components/icons/AddIC";

import useAsset from "@/hooks/useAsset";

import { getImageURL, getCurrentYear } from "@/libs/utils";
import {
  ROLE_AI_SEARCHER,
  ACCESS_RESTRICTION_MSG,
  ASSET_CLASSES,
  ASSET_STATUSES,
  ASSET_TYPES,
  MAP_LIBRARIES,
} from "@/libs/constants";
import LoadingSpinner from "@/components/LoadingSpinner";
import { AuthContext } from "@/contexts/AuthContext";

const schema = yup.object().shape({
  name: yup.string().required("Name of asset is required."),
  numberOfUnits: yup
    .string()
    .matches(/^\d+$/, "Number units must be a valid number.")
    .required("Number units is required"),
  price: yup
    .string()
    .matches(/^\d+$/, "Price must be a valid number.")
    .required("Price is required."),
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
});

const defaultAssetData = {
  name: "",
  numberOfUnits: "",
  price: "",
  yearPurchased: "",
  constructionYear: "",
  class: "",
  status: "",
  assetType: "",
  squareFeet: "",
  address: {
    lat: 45.424721,
    lng: -75.695,
  },
  realAddress: "",
};

const AssetEdit = () => {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const { id } = router.query;

  const { updateAssetByID, getAssetByID } = useAsset();

  const [isSaving, setIsSaving] = useState<boolean>(false);

  const [userID, setUserID] = useState<string>("");
  const [assetID] = useState<string>(id as string);
  const [assetData, setAssetData] = useState<any>(defaultAssetData);
  const [files, setFiles] = useState<Array<any>>([]);
  const [assetImageError, setAssetImageError] = useState<boolean>(false);
  const [opportunityZoneChecked, setOpportunityZoneChecked] =
    useState<boolean>(false);
  const [location, setLocation] = useState<any>(assetData.address);
  const [address, setAddress] = useState<string>(assetData.realAddress);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    values: assetData,
  });

  const handleFileInput = (e: any) => {
    const newFiles = Array.from(e.target.files);
    setFiles([...files, ...newFiles]);
    setAssetImageError(false);
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);

    validateAssetImage(newFiles, assetData.images);
  };

  const handleRemoveImage = (index: number) => {
    const images = [...assetData.images];
    images.splice(index, 1);
    setAssetData({
      ...assetData,
      images: images,
    });

    validateAssetImage(files, assetData.images);
  };

  const handleCheckboxChange = () => {
    setOpportunityZoneChecked(!opportunityZoneChecked);
  };

  const validateAssetImage = (_files: any, _images: any) => {
    if (_files.length > 0 || _images.length > 0) {
      setAssetImageError(false);
    } else {
      setAssetImageError(true);
    }
  };

  const onSubmitHandler = async (data: any) => {
    if (
      files.length === 0 &&
      (data.images.length === 0 || data.images === null)
    ) {
      setAssetImageError(true);
      return;
    }

    data.userID = userID;
    data.opportunityZone = opportunityZoneChecked;
    data.address = location;
    data.realAddress = address;
    data.files = files;

    if (data.realAddress?.length === 0 || !data.realAddress) {
      toast.warning("Address is required", { theme: "colored" });
      return;
    }

    setIsSaving(true);
    try {
      const ret = await updateAssetByID(assetID, data);
      if (ret) {
        toast.success("Successfully submitted!", { theme: "colored" });
        setTimeout(() => {
          router.back();
        }, 3000);
      } else throw "Failed to save asset.";
    } catch (e: any) {
      toast.error("Failed to save asset. Try again later", {
        theme: "colored",
      });
      console.log("e", e);
    }

    setIsSaving(false);
  };

  const errorHandle = () => {
    validateAssetImage(files, assetData.images);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      authContext.handleLoading(true);
      let userData = await authContext.getUser();
      if (userData?.role == ROLE_AI_SEARCHER) {
        toast.info(ACCESS_RESTRICTION_MSG, { theme: "colored" });
        router.back();
      }
      if (!!userData) {
        setUserID(userData._id);
        const assetData = await getAssetByID(assetID, userData._id);
        if (!!assetData) {
          setAssetData(assetData);
          setOpportunityZoneChecked(assetData?.opportunityZone);

          if (assetData?.realAddress) setAddress(assetData?.realAddress);
          if (assetData?.address) setLocation(assetData?.address);
        } else {
          toast.error("Error was occured. Try again later.", {
            theme: "colored",
          });
          router.push("/admin/dashboard");
        }
        authContext.handleLoading(false);
      }
    };

    if (authContext.isLoggedIn) {
      getUserInfo();
    }
    // eslint-disable-next-line
  }, [authContext.isLoggedIn]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    libraries: MAP_LIBRARIES,
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
  });

  return (
    <LayoutAdmin>
      {assetData != defaultAssetData ? (
        <BaseContainer>
          <div className="w-full">
            <div className="flex flex-col justify-between w-full text-center md:flex-row md:text-left">
              <h1 className="mt-2 text-xl font-bold text-white">Edit Asset</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmitHandler, errorHandle)}>
              <div className="flex flex-col rounded-[15px] mt-3 pb-5">
                <div className="flex flex-wrap justify-between gap-4 px-2 mx-auto">
                  <div className="flex flex-col mx-auto mt-6 lg:mx-0">
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
                      className={`w-[300px] mt-2 px-3 py-1 border-2 rounded-[8px] ${
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
                  <div className="flex flex-col mx-auto lg:mx-0 sm:mt-6">
                    <label
                      className={`text-sm uppercase ${
                        errors.numberOfUnits ? "text-red-600" : "text-white"
                      }`}
                    >
                      number units
                    </label>
                    <input
                      type="text"
                      {...register("numberOfUnits")}
                      className={`w-[300px] mt-2 px-3 py-1 border-2 rounded-[8px] ${
                        errors.numberOfUnits
                          ? "border-red-600 focus:border-red-600 focus:ring-0"
                          : "border-primary focus:ring-primary focus:border-primary"
                      } admin-box text-white`}
                      placeholder=""
                    />
                    {errors.numberOfUnits && (
                      <p className="text-red-600 error-text">
                        {errors.numberOfUnits.message?.toString()}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col mx-auto mt-1 lg:mx-0 md:mt-6">
                    <label
                      className={`text-sm uppercase ${
                        errors.price ? "text-red-600" : "text-white"
                      }`}
                    >
                      price
                    </label>
                    <input
                      type="text"
                      {...register("price")}
                      className={`w-[300px] mt-2 px-3 py-1 border-2 rounded-[8px] ${
                        errors.price
                          ? "border-red-600 focus:border-red-600 focus:ring-0"
                          : "border-primary focus:ring-primary focus:border-primary"
                      } admin-box text-white`}
                      placeholder=""
                    />
                    {errors.price && (
                      <p className="text-red-600 error-text">
                        {errors.price.message?.toString()}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col mx-auto mt-1 lg:mx-0 md:mt-6">
                    <label
                      className={`text-sm uppercase ${
                        errors.squareFeet ? "text-red-600" : "text-white"
                      }`}
                    >
                      square feet
                    </label>
                    <input
                      type="text"
                      {...register("squareFeet")}
                      className={`w-[300px] mt-2 px-3 py-1 border-2 rounded-[8px] ${
                        errors.squareFeet
                          ? "border-red-600 focus:border-red-600 focus:ring-0"
                          : "border-primary focus:ring-primary focus:border-primary"
                      } admin-box text-white`}
                      placeholder=""
                    />
                    {errors.squareFeet && (
                      <p className="text-red-600 error-text">
                        {errors.squareFeet.message?.toString()}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col mx-auto mt-1 lg:mx-0 md:mt-6">
                    <label
                      className={`text-sm uppercase ${
                        errors.yearPurchased ? "text-red-600" : "text-white"
                      }`}
                    >
                      year purchased
                    </label>
                    <input
                      type="text"
                      {...register("yearPurchased")}
                      className={`w-[300px] mt-2 px-3 py-1 border-2 rounded-[8px] ${
                        errors.yearPurchased
                          ? "border-red-600 focus:border-red-600 focus:ring-0"
                          : "border-primary focus:ring-primary focus:border-primary"
                      } admin-box text-white`}
                      placeholder=""
                    />
                    {errors.yearPurchased && (
                      <p className="text-red-600 error-text">
                        {errors.yearPurchased.message?.toString()}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col mx-auto mt-1 lg:mx-0 md:mt-6">
                    <label
                      className={`text-sm uppercase ${
                        errors.constructionYear ? "text-red-600" : "text-white"
                      }`}
                    >
                      construction year
                    </label>
                    <input
                      type="text"
                      {...register("constructionYear")}
                      className={`w-[300px] mt-2 px-3 py-1 border-2 rounded-[8px] ${
                        errors.constructionYear
                          ? "border-red-600 focus:border-red-600 focus:ring-0"
                          : "border-primary focus:ring-primary focus:border-primary"
                      } admin-box text-white`}
                      placeholder=""
                    />
                    {errors.constructionYear && (
                      <p className="text-red-600 error-text">
                        {errors.constructionYear.message?.toString()}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col mx-auto mt-1 lg:mx-0 md:mt-6">
                    <label
                      className={`text-sm uppercase ${
                        errors.class ? "text-red-600" : "text-white"
                      }`}
                    >
                      Class
                    </label>
                    <select
                      {...register("class")}
                      className={`mt-2 block w-[300px] px-3 py-1 text-gray-500 border-2 rounded-lg bg-white ${
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
                  <div className="flex flex-col mx-auto mt-1 lg:mx-0 md:mt-6">
                    <label
                      className={`text-sm uppercase ${
                        errors.status ? "text-red-600" : "text-white"
                      }`}
                    >
                      Status
                    </label>
                    <select
                      {...register("status")}
                      className={`mt-2 block w-[300px] px-3 py-1 text-gray-500 border-2 rounded-lg bg-white ${
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
                  <div className="flex flex-col mt-1 md:mt-6">
                    <label
                      className={`text-sm uppercase ${
                        errors.assetType ? "text-red-600" : "text-white"
                      }`}
                    >
                      asset type
                    </label>
                    <select
                      {...register("assetType")}
                      className={`mt-2 block w-[300px] px-3 py-1 text-gray-500 border-2 rounded-lg bg-white ${
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
                </div>
                <div className="flex flex-col w-full px-2 mx-auto mt-1 lg:mx-0 md:mt-6">
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
                <div className="flex flex-col mx-2 mt-6">
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
                    {assetData.images?.length > 0 && (
                      <>
                        {(assetData.images as Array<string>).map(
                          (url, index) => (
                            <div className="relative w-fit" key={index}>
                              <div className="relative w-[99px] h-[92px]">
                                <Image
                                  src={getImageURL(url)}
                                  className="object-contain rounded-lg"
                                  alt="thumbnail"
                                  fill
                                />
                              </div>
                              <button
                                type="button"
                                className="absolute bottom-0 flex items-center justify-center w-full p-2 bg-black rounded-b-lg cursor-pointer bg-opacity-40"
                                onClick={() => handleRemoveImage(index)}
                              >
                                <RecycleIC
                                  fill="#fff"
                                  className="bi bi-trash3"
                                />
                              </button>
                            </div>
                          )
                        )}
                      </>
                    )}

                    {files?.length > 0 && (
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
                              className="absolute bottom-0 flex items-center justify-center w-full p-2 bg-white cursor-pointer bg-opacity-60"
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
                          <AddIC className="primary bi bi-plus-circle" />
                          <p className="flex mt-2 text-sm text-primary">
                            Create a New
                          </p>
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
                      You must upload one asset at least.
                    </p>
                  )}
                </div>

                <div className="flex items-center mx-2 mt-6">
                  <input
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    checked={opportunityZoneChecked}
                    name="colored-radio"
                    className="w-4 h-4 bg-white cursor-pointer text-primary border-primary focus:ring-primary"
                  />
                  <label
                    className="ml-2 text-[16px] font-semibold text-[#2D3748] cursor-pointer"
                    onClick={handleCheckboxChange}
                  >
                    In an opportunizy zone
                  </label>
                </div>
                <div className="flex justify-center mx-auto mt-5 space-x-2 xs:space-x-4">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-20 py-2 text-base font-semibold text-white transition border rounded-lg cursor-pointer hover:text-primary border-primary bg-primary hover:bg-white disabled:cursor-not-allowed"
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </button>
                  <div className="px-[2px] text-white text-[16px] rounded-[30px]">
                    <button
                      type="button"
                      className="px-20 py-2 text-white transition-all rounded-lg cursor-pointer admin-box hover:bg-primary"
                      onClick={() => router.back()}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </BaseContainer>
      ) : (
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-screen">
          <LoadingSpinner />
        </div>
      )}
    </LayoutAdmin>
  );
};

export default AssetEdit;
