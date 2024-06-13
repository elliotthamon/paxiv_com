import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
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
import AutoSearchComponent from "@/components/autoComplete/AutoSearchComponent";
import MapComponent from "@/components/autoComplete/MapComponent";
import BgEditModal from "@/components/modals/BgEditModal";
import CompanyAvatarEditModal from "@/components/modals/CompanyAvatarEditModal";

import CameraIC from "@/components/icons/CameraIC";
import ImageIC from "@/components/icons/ImageIC";
import {
  ACCESS_RESTRICTION_MSG,
  DEFAULT_COMPANY_DATA,
  MAP_LIBRARIES,
  ROLE_SITE_ADMIN,
} from "@/libs/constants";

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

const CreateCompany = () => {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  authContext.handleLoading(false);

  const [isSaving, setIsSaving] = useState<boolean>(false);

  const [bgImageFile, setBgImageFile] = useState<any>();
  const [companyAvatarFile, setCompanyAvatarFile] = useState<any>();

  const { createCompanyProfile } = useCompany();

  const [location, setLocation] = useState<any>(DEFAULT_COMPANY_DATA.location);
  const [address, setAddress] = useState<string>(DEFAULT_COMPANY_DATA.address);

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
    values: DEFAULT_COMPANY_DATA,
  });

  const onSubmitHandler = async (data: any) => {
    if (bgImageFile !== undefined) {
      data.bgImageFile = bgImageFile;
    }
    if (companyAvatarFile !== undefined) {
      data.companyAvatarFile = companyAvatarFile;
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

  const handleUpdateCompanyProfile = async (data: object) => {
    setIsSaving(true);

    try {
      const status = await createCompanyProfile(data);
      if (status) {
        toast.success("Company profile was successfully created", {
          theme: "colored",
        });
        setTimeout(() => {
          router.back();
        }, 3000);
      }
    } catch (e: any) {
      toast.error("Try again later", { theme: "colored" });
      console.log("error in createCompanyProfile", e.message);
    }

    setIsSaving(false);
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    libraries: MAP_LIBRARIES,
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
  });

  useEffect(() => {
    const init = async () => {
      authContext.handleLoading(true);
      const userData = authContext.getUser();
      if (userData?.role != ROLE_SITE_ADMIN) {
        toast.info(ACCESS_RESTRICTION_MSG, { theme: "colored" });
        router.back();
      }
      authContext.handleLoading(false);
    };
    if (authContext.isLoggedIn) {
      init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContext.isLoggedIn]);

  return (
    <LayoutAdmin>
      <BaseContainer>
        <div className="flex flex-col">
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="flex justify-between mt-2">
              <div className="flex items-center text-lg font-bold text-white">
                New Company Profile
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
                  {isSaving ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
            <div className="relative flex flex-col mt-4">
              <div className="z-0 flex flex-col items-center">
                <div className="relative w-full h-[300px]">
                  <Image
                    src={
                      bgImageFile
                        ? URL.createObjectURL(bgImageFile)
                        : "/images/company_default_bg.png"
                    }
                    className="object-cover rounded-[15px]"
                    alt="company logo"
                    fill
                  />
                </div>
                <div className="absolute flex top-[40%]">
                  <div
                    className="flex p-3 bg-black rounded-full cursor-pointer bg-opacity-20 backdrop-blur-lg hover:bg-opacity-30 active:bg-opacity-40"
                    style={{ boxShadow: "0px 2px 5.5px rgba(0, 0, 0, 0.06)" }}
                  >
                    <ImageIC id="logoIC" onClick={() => setIsBgModal(true)} />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-[-20px] left-4 w-[124px] h-[124px] bg-[#6981A0] rounded-xl border-4 border-white flex justify-center items-center">
                <Image
                  src={
                    companyAvatarFile
                      ? URL.createObjectURL(companyAvatarFile)
                      : "/images/company_default_avatar.png"
                  }
                  className="object-cover w-full h-full rounded-xl"
                  id="avaterLogo"
                  alt="company logo"
                  fill
                />
                <div className="absolute flex">
                  <div
                    className="flex p-3 bg-black rounded-full cursor-pointer bg-opacity-20 backdrop-blur-lg hover:bg-opacity-30 active:bg-opacity-40"
                    style={{
                      boxShadow: "0px 2px 5.5px rgba(0, 0, 0, 0.06)",
                    }}
                    onClick={() => setIsAvatarModal(true)}
                  >
                    <CameraIC id="avaterIC" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center mt-1 text-left lg:flex-row">
              <div className="flex flex-col mt-2 ml-0">
                <div className="flex flex-col items-center justify-center w-full mt-4 space-y-6">
                  <div className="flex flex-col justify-center w-[300px] lg:w-full">
                    <label
                      className={`font-bold text-sm ${
                        errors.name ? "text-red-600" : "text-white"
                      }`}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      {...register("name")}
                      className={`w-[300px] lg:w-full mt-2 px-3 py-1 border-2  rounded-[8px] border-primary focus:ring-primary focus:border-primary admin-box text-[#DEDEDE]`}
                    />
                    {errors.name && (
                      <p className="text-red-600 error-text">
                        {errors.name.message?.toString()}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col justify-center w-[300px] lg:w-full">
                    <div className="flex flex-col mt-4 lg:mt-0">
                      <label
                        className={`font-bold text-sm ${
                          errors.title ? "text-red-600" : "text-white"
                        }`}
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        {...register("title")}
                        className={`w-[300px] lg:w-full mt-2 px-3 py-1 border-2  rounded-[8px] ${
                          errors.title
                            ? "border-red-600 focus:border-red-600 focus:ring-0"
                            : "border-primary focus:ring-primary focus:border-primary"
                        } admin-box text-[#DEDEDE]`}
                      />
                      {errors.title && (
                        <p className="text-red-600 error-text">
                          {errors.title.message?.toString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col w-[300px] lg:w-full">
                    <h3
                      className={`font-bold text-sm ${
                        errors.description ? "text-red-600" : "text-white"
                      }`}
                    >
                      Description
                    </h3>
                    <textarea
                      {...register("description")}
                      className={`mt-2 border-2 border-primary rounded-[8px] px-2 py-1 text-white ${
                        errors.description
                          ? "border-red-600 focus:border-red-600 focus:ring-0"
                          : "border-primary focus:ring-primary focus:border-primary"
                      } admin-box text-[#DEDEDE]`}
                      rows={5}
                      placeholder="Message"
                    ></textarea>
                    {errors.description && (
                      <p className="text-red-600 error-text">
                        {errors.description.message?.toString()}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col w-[300px] lg:w-full">
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
                  <div className="flex flex-col justify-between space-x-0 space-y-6 lg:flex-row lg:space-x-2 lg:space-y-0">
                    <div className="flex flex-col">
                      <label
                        className={`font-bold text-sm ${
                          errors.email ? "text-red-600" : "text-white"
                        }`}
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        {...register("email")}
                        className={`w-[300px] lg:w-[250px] mt-2 px-3 py-1 border-2  rounded-[8px] ${
                          errors.email
                            ? "border-red-600 focus:border-red-600 focus:ring-0"
                            : "border-primary focus:ring-primary focus:border-primary"
                        } admin-box text-[#DEDEDE] disabled:bg-gray-300`}
                      />
                      {errors.email && (
                        <p className="text-red-600 error-text">
                          {errors.email.message?.toString()}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <label
                        className={`font-bold text-sm ${
                          errors.phone ? "text-red-600" : "text-white"
                        }`}
                      >
                        Phone Number
                      </label>
                      <input
                        type="text"
                        {...register("phone")}
                        className={`w-[300px] lg:w-[250px] mt-2 px-3 py-1 border-2  rounded-[8px] border-primary focus:ring-primary focus:border-primary admin-box text-[#DEDEDE]`}
                      />
                      {errors.phone && (
                        <p className="text-red-600 error-text">
                          {errors.phone.message?.toString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center w-[300px] lg:w-full">
                    <label
                      className={`font-bold text-sm ${
                        errors.website ? "text-red-600" : "text-white"
                      }`}
                    >
                      Website
                    </label>
                    <input
                      type="text"
                      {...register("website")}
                      className={`w-[300px] lg:w-full mt-2 px-3 py-1 border-2  rounded-[8px] border-primary focus:ring-primary focus:border-primary admin-box text-[#DEDEDE]`}
                    />
                    {errors.website && (
                      <p className="text-red-600 error-text">
                        {errors.website.message?.toString()}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-row pt-8 mx-auto mb-8 space-x-5 md:hidden w-fit xs:mb-0">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="rounded-[30px] w-[130px] xs:w-[150px] py-1 text-white btn-gradient disabled:cursor-not-allowed"
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </button>
                  <button
                    type="button"
                    className="bg-white border-[2px] btn-cancel border-primary rounded-[30px] w-[130px] xs:w-[150px] py-1 text-primary"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
          {isBgModal && (
            <BgEditModal
              bgImage={bgImage}
              companyBgImageFile={null}
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
              companyAvatarImageFile={null}
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
    </LayoutAdmin>
  );
};

export default CreateCompany;
