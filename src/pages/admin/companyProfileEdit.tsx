import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

import { useJsApiLoader } from "@react-google-maps/api";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import * as yup from "yup";

import BaseContainer from "@/components/BaseContainer";
import LayoutAdmin from "@/components/admin/LayoutAdmin";
import useCompany from "@/hooks/useCompany";
import MapComponent from "@/components/autoComplete/MapComponent";
import LoadingSpinner from "@/components/LoadingSpinner";

import BgEditModal from "@/components/modals/BgEditModal";
import CompanyAvatarEditModal from "@/components/modals/CompanyAvatarEditModal";

import { getImageURL } from "@/libs/utils";
import {
  ROLE_SITE_ADMIN,
  ROLE_COMPANY_ADMINISTRATOR,
  ROLE_ONBOARDING_ADMIN,
  DEFAULT_COMPANY_DATA,
  ACCESS_RESTRICTION_MSG,
  MAP_LIBRARIES,
} from "@/libs/constants";
import CameraIC from "@/components/icons/CameraIC";
import InputForm from "@/components/admin/InputForm";
import PhoneIC from "@/components/icons/PhoneIC";
import SMSIC from "@/components/icons/SMSIC";
import MonitorIC from "@/components/icons/MonitorIC";
import AutoSearchInput from "@/components/autoComplete/AutoSearchInput";
import AddressIC from "@/components/icons/AddressIC";
import ImageIC from "@/components/icons/ImageIC";

const schema = yup.object().shape({
  name: yup.string().required("Name is required."),
  title: yup.string(),
  description: yup.string().required("Description is required."),
  phone: yup
    .string()
    .transform((value, originalValue) => {
      if (originalValue.startsWith("+")) {
        return originalValue;
      } else if (originalValue.startsWith("1")) {
        return `+${originalValue}`;
      } else {
        return `+1${originalValue}`;
      }
    })
    .matches(/^\+1\d{10}$/, "Invalid US phone number format")
    .required("Phone number is required"),
  email: yup
    .string()
    .email("Email is not valid")
    .required("Email is required."),
  website: yup
    .string()
    .url("Invalid website link.")
    .matches(
      /^(https?:\/\/)?(?:[-A-Za-z0-9]+\.)+[A-Za-z]{2,6}$/,
      "Please enter a valid URL or domain"
    ),
});

const CompanyProfileEdit = () => {
  const router = useRouter();
  const authContext = useContext(AuthContext);

  const { id } = router.query;

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [companyID, setCompanyID] = useState<string>("");
  const [companyData, setCompanyData] = useState<any>(DEFAULT_COMPANY_DATA);

  const [bgImageFile, setBgImageFile] = useState<any>();
  const [companyAvatarFile, setCompanyAvatarFile] = useState<any>();

  const { getCompanyProfileByID, updateCompanyProfile } = useCompany();

  const [location, setLocation] = useState<any>(companyData.location);
  const [address, setAddress] = useState<string>(companyData.address);

  const [bgImage, setBgImage] = useState<any>(null);
  const [avatarImage, setAvatarImage] = useState<any>(null);

  const [isBgModal, setIsBgModal] = useState<boolean>(false);
  const [isAvatarModal, setIsAvatarModal] = useState<boolean>(false);

  const [isBgImageChanged, setIsBgImageChanged] = useState<boolean>(false);
  const [isAvatarImageChanged, setIsAvatarImageChanged] =
    useState<boolean>(false);

  const [isBgSvg, setIsBgSvg] = useState<boolean>(false);
  const [isAvatarSvg, setIsAvatarSvg] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    values: companyData,
  });

  const onSubmitHandler = async (data: any) => {
    if (bgImageFile != undefined || companyAvatarFile != undefined) {
      if (bgImageFile !== undefined) {
        data.bgImageFile = bgImageFile;
      }
      if (companyAvatarFile !== undefined) {
        data.companyAvatarFile = companyAvatarFile;
      }
    }
    if (address?.length > 0) {
      data.location = location;
      data.address = address;
    } else {
      toast.warn("Address is required", { theme: "colored" });
      return;
    }
    handleUpdateCompanyProfile(data);
  };

  const handleUpdateCompanyProfile = async (data: any) => {
    setIsSaving(true);

    try {
      const status = await updateCompanyProfile(companyID, data);
      if (status) {
        const user = authContext.getUser();
        if (bgImageFile != undefined || companyAvatarFile != undefined) {
          if (bgImageFile !== undefined) {
            data.companyBgImageFile = `companyBackgroundImageFile/${companyID}/${bgImageFile.name}`;
          }
          if (companyAvatarFile !== undefined) {
            data.companyAvatarImageFile = `companyAvatarImageFile/${companyID}/${companyAvatarFile.name}`;
          }
        }
        authContext.setUser({
          ...user,
          companyDetails: [
            {
              ...user.companyDetails[0],
              ...data,
            },
            ...user.companyDetails.slice(1),
          ],
        });
        toast.success("Company profile was successfully updated", {
          theme: "colored",
        });
        setTimeout(() => {
          router.push("/admin/company");
        }, 1000);
      }
    } catch (e: any) {
      toast.error("Try again later", { theme: "colored" });
      console.log("e", e);
    }

    setIsSaving(false);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      authContext.handleLoading(true);
      let userData = authContext.getUser();
      const role = userData?.role;
      if (
        role == ROLE_SITE_ADMIN ||
        ((role == ROLE_COMPANY_ADMINISTRATOR ||
          role == ROLE_ONBOARDING_ADMIN) &&
          userData?.companyID == id)
      ) {
        if (!!userData) {
          let _companyID;
          if (!!id && userData.role === ROLE_SITE_ADMIN) {
            setCompanyID(id as string);
            _companyID = id as string;
          } else if (userData.companyID) {
            setCompanyID(userData.companyID);
            _companyID = userData.companyID;
          }

          let companyData = await getCompanyProfileByID(_companyID);
          if (!!companyData) {
            setCompanyData(companyData);

            if (companyData?.address) setAddress(companyData?.address);
            if (companyData?.location) setLocation(companyData?.location);
          } else {
            toast.info("The user is not linked to the company", {
              theme: "colored",
            });
            router.push("admin/company");
          }
        }
      } else {
        toast.info(ACCESS_RESTRICTION_MSG, {
          theme: "colored",
        });
        router.back();
      }

      authContext.handleLoading(false);
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
      {companyData != DEFAULT_COMPANY_DATA ? (
        <BaseContainer>
          <div className="flex flex-col">
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="flex justify-between mt-2">
                <div className="flex items-center text-lg font-bold text-white">
                  Company Profile Edit
                </div>
                <div className="flex flex-row justify-end space-x-4 w-fit">
                  <button
                    type="button"
                    className="px-6 py-2 text-white transition-all rounded-lg admin-box hover:bg-primary"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-6 py-2 text-base text-white transition border rounded-lg cursor-pointer bg-primary hover:bg-gray-100 hover:text-primary border-primary disabled:cursor-not-allowed"
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>

              <div className="relative z-0 flex flex-col mt-4">
                <div
                  className="relative w-full h-[280px] rounded-xl flex items-center"
                  style={{
                    background:
                      "linear-gradient(93deg, #282E3E 0%, #6981A0 101.04%)",
                  }}
                >
                  <Image
                    src={
                      bgImageFile
                        ? URL.createObjectURL(bgImageFile)
                        : companyData?.companyBgImageFile
                        ? getImageURL(companyData.companyBgImageFile)
                        : "/images/company_default_bg.png"
                    }
                    className="w-full h-full rounded-[15px]"
                    alt="company banner"
                    fill
                  />
                  <div className="absolute flex left-1/2">
                    <div
                      className="flex p-3 bg-black rounded-full cursor-pointer bg-opacity-20 backdrop-blur-lg hover:bg-opacity-30 active:bg-opacity-40"
                      style={{ boxShadow: "0px 2px 5.5px rgba(0, 0, 0, 0.06)" }}
                      onClick={() => setIsBgModal(true)}
                    >
                      <ImageIC id="logoIC" />
                    </div>
                  </div>
                  <div className="absolute bottom-[-20px] left-4 w-[124px] h-[124px] bg-[#6981A0] rounded-xl border-4 border-white flex justify-center items-center">
                    <Image
                      src={
                        companyAvatarFile
                          ? URL.createObjectURL(companyAvatarFile)
                          : companyData?.companyAvatarImageFile
                          ? getImageURL(companyData.companyAvatarImageFile)
                          : "/images/company_default_avatar.png"
                      }
                      className="object-cover w-full h-full rounded-xl"
                      alt="company logo"
                      fill
                    />
                    <div className="absolute flex">
                      <div
                        onClick={() => setIsAvatarModal(true)}
                        className="flex p-3 bg-black rounded-full cursor-pointer bg-opacity-20 backdrop-blur-lg hover:bg-opacity-30 active:bg-opacity-40"
                        style={{
                          boxShadow: "0px 2px 5.5px rgba(0, 0, 0, 0.06)",
                        }}
                      >
                        <CameraIC id="avaterIC" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full pl-4 mt-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-primary ">
                      {companyData.name}
                    </h1>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex gap-5 mt-5">
                  <div className="w-1/2">
                    <InputForm
                      id="company"
                      label="Company Name"
                      placeholder="Your Company Name"
                      name="name"
                      register={register}
                      error={errors.name}
                    />
                  </div>
                </div>

                <div className="text-lg font-bold text-white">Contact Info</div>
                <div className="flex gap-5 mt-2">
                  <div>
                    <InputForm
                      id="phone"
                      label="Phone Number"
                      placeholder="Phone Number"
                      name="phone"
                      register={register}
                      error={errors.phone}
                      icon={<PhoneIC fill="#DEDEDE" />}
                    />
                  </div>
                  <div>
                    <InputForm
                      id="email"
                      label="Email Address"
                      placeholder="Email Address"
                      name="email"
                      register={register}
                      error={errors.email}
                      icon={<SMSIC color="#DEDEDE" />}
                    />
                  </div>
                  <div>
                    <InputForm
                      id="website"
                      label="Website"
                      placeholder="Website"
                      name="website"
                      register={register}
                      error={errors.website}
                      icon={<MonitorIC color="#DEDEDE" />}
                    />
                  </div>
                  <div className="flex-1">
                    <AutoSearchInput
                      id="address"
                      label="Address"
                      location={address}
                      placeholder="Search the places"
                      setLocation={setLocation}
                      setAddress={setAddress}
                      icon={<AddressIC fill="#DEDEDE" />}
                    />
                  </div>
                </div>

                <div className="mt-4 rounded-lg">
                  <MapComponent
                    location={location}
                    setLocation={setLocation}
                    setValue={setAddress}
                  />
                </div>

                <div className="flex flex-col my-6 rounded-lg">
                  <label
                    htmlFor="description"
                    className="text-lg font-bold text-white"
                  >
                    About {companyData.name}
                  </label>
                  <textarea
                    {...register("description")}
                    className={`mt-2 px-2 py-2 border border-primary bg-transparent rounded-[8px] text-[#DEDEDE] transition ${
                      errors.description
                        ? "border-red-600 focus:border-red-600 focus:ring-0"
                        : "border-primary focus:ring-primary focus:border-primary"
                    } admin-box`}
                    name="description"
                    id=""
                    rows={7}
                    placeholder="Description"
                  ></textarea>
                  {errors.description && (
                    <p className="text-red-600 error-text">
                      {errors.description.message?.toString()}
                    </p>
                  )}
                </div>
              </div>
            </form>
            {isBgModal && (
              <BgEditModal
                bgImage={bgImage}
                companyBgImageFile={companyData.companyBgImageFile}
                isBgModal={isBgModal}
                setBgImage={setBgImage}
                setIsBgModal={setIsBgModal}
                setBgImageFile={setBgImageFile}
                isBgImageChanged={isBgImageChanged}
                setIsBgImageChanged={setIsBgImageChanged}
                isBgSvg={isBgSvg}
                setIsBgSvg={setIsBgSvg}
              />
            )}
            {isAvatarModal && (
              <CompanyAvatarEditModal
                avatarImage={avatarImage}
                companyAvatarImageFile={companyData.companyAvatarImageFile}
                isAvatarModal={isAvatarModal}
                setAvatarImage={setAvatarImage}
                setIsAvatarModal={setIsAvatarModal}
                setCompanyAvatarFile={setCompanyAvatarFile}
                isAvatarImageChanged={isAvatarImageChanged}
                setIsAvatarImageChanged={setIsAvatarImageChanged}
                isAvatarSvg={isAvatarSvg}
                setIsAvatarSvg={setIsAvatarSvg}
              />
            )}
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

export default CompanyProfileEdit;
