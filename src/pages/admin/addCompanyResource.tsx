import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import BaseContainer from "@/components/BaseContainer";
import LayoutAdmin from "@/components/admin/LayoutAdmin";
import UploadIC from "@/components/icons/UploadIC";

import {
  MSG_TOKEN_EXPIRED,
  ROLE_AI_SEARCHER,
  ROLE_ONBOARDING_USER,
  ROLE_USER,
  ACCESS_RESTRICTION_MSG,
} from "@/libs/constants";
import { AuthContext } from "@/contexts/AuthContext";
import useMember from "@/hooks/useMember";

const schema = yup.object().shape({
  firstname: yup.string().required("First Name is required."),
  lastname: yup.string().required("Last Name is required."),
  position: yup.string().required("Position is required."),
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
    .email("Email must be valid.")
    .required("Email is required."),
});

const AddCompanyResource = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();
  const authContext = useContext(AuthContext);
  const { saveJourneyMember } = useMember();
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [userAvatar, setUserAvatar] = useState<any>();
  const [companyID, setCompanyID] = useState<string>("");
  const [isPhone, setIsPhone] = useState<boolean>(false);

  const handleUserAvatarFileInput = (e: any) => {
    const file = e.target.files[0];
    setUserAvatar(file);
  };

  const onSubmitHandler = async (data: any) => {
    try {
      setIsSaving(true);
      data.userId = "";
      data.companyID = companyID;
      data.paymentStatus = false;
      data.file = userAvatar !== undefined ? userAvatar : "";
      if (companyID != "") {
        await saveJourneyMember(data);
        toast.success("Successfully submitted!", { theme: "colored" });
        setIsSaving(false);
        router.push(`/admin/companyResources?Id=${companyID}`);
      }
      setIsSaving(false);
    } catch (e: any) {
      setIsSaving(false);
      toast.error("Try again later", { theme: "colored" });
      console.log("error:", e);
    }
  };

  useEffect(() => {
    const getUserInfo = async () => {
      authContext.handleLoading(true);
      let userData = authContext.user;
      if (
        userData?.role == ROLE_AI_SEARCHER ||
        userData?.role == ROLE_USER ||
        userData?.role == ROLE_ONBOARDING_USER
      ) {
        toast.info(ACCESS_RESTRICTION_MSG, { theme: "colored" });
        router.back();
      }
      if (!!userData) {
        if (userData.companyID) {
          setCompanyID(userData.companyID);
        }
      } else {
        toast.warning(MSG_TOKEN_EXPIRED, { theme: "colored" });
      }
      authContext.handleLoading(false);
    };

    if (authContext.user != null) {
      getUserInfo();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <LayoutAdmin>
      <BaseContainer>
        <div className="relative flex flex-col mt-8 md:mt-0">
          <div className="flex justify-center md:justify-start text-center md:text-left text-[#0B1E25] text-[30px] font-semibold tracking-widest uppercase">
            New Company Resource
          </div>
          <div className="bg-white border-1 border-[#DCDCDC] rounded-[20px] mt-4">
            <div className="flex flex-col p-3 md:flex-row md:p-0">
              <div className="relative justify-center hidden md:flex md:justify-start">
                <div className="hidden md:flex w-[120px] md:h-full justify-center md:justify-start border-[1px] border-primary rounded-[20px]"></div>
                <Image
                  src={
                    userAvatar
                      ? URL.createObjectURL(userAvatar)
                      : "/images/default_avatar.png"
                  }
                  width={168}
                  height={168}
                  className="relative md:absolute right-[-45px] top-[30px] w-[90px] h-[90px] rounded-full"
                  alt="user"
                />
              </div>

              <div className="relative flex justify-center my-4 md:hidden md:justify-start">
                <div className="hidden md:flex w-[120px] md:h-full justify-center md:justify-start border-[1px] border-primary rounded-[20px]"></div>
                <Image
                  src={
                    userAvatar
                      ? URL.createObjectURL(userAvatar)
                      : "/images/default_avatar.png"
                  }
                  width={168}
                  height={168}
                  className="relative w-[90px] h-[90px] rounded-full"
                  alt="user"
                />
              </div>

              <form onSubmit={handleSubmit(onSubmitHandler)}>
                <div className="flex flex-col ml-0 md:ml-[50px] mt-2 md:mt-0 md:p-10">
                  <div className="flex items-center justify-center w-[300px] md:w-full mx-auto">
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer border-primary">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadIC />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>
                          &nbsp; or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>

                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleUserAvatarFileInput}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div className="flex flex-col items-center justify-center w-full mt-4 space-y-2 md:mt-6 md:space-y-6">
                    <div className="flex flex-col justify-between space-x-0 space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                      <div className="flex flex-col mx-auto md:mx-0">
                        <label
                          className={`text-[10px] uppercase ${
                            errors.firstname ? "text-red-600" : "text-black"
                          }`}
                        >
                          first name
                        </label>
                        <input
                          type="text"
                          {...register("firstname")}
                          className={`w-[300px] mt-2 px-3 py-1 border-2 rounded-[8px] ${
                            errors.firstname
                              ? "border-red-600 focus:border-red-600 focus:ring-0"
                              : "border-primary focus:ring-primary focus:border-primary"
                          }`}
                        />
                        {errors.firstname && (
                          <p className="text-red-600 error-text">
                            {errors.firstname.message?.toString()}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col mx-auto md:mx-0">
                        <label
                          className={`text-[10px] uppercase ${
                            errors.lastname ? "text-red-600" : "text-black"
                          }`}
                        >
                          last name
                        </label>
                        <input
                          type="text"
                          {...register("lastname")}
                          className={`w-[300px] mt-2 px-3 py-1 border-2 rounded-[8px] ${
                            errors.lastname
                              ? "border-red-600 focus:border-red-600 focus:ring-0"
                              : "border-primary focus:ring-primary focus:border-primary"
                          }`}
                        />
                        {errors.lastname && (
                          <p className="text-red-600 error-text">
                            {errors.lastname.message?.toString()}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col justify-between space-x-0 space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                      <div className="flex flex-col">
                        <label
                          className={`text-[10px] uppercase ${
                            errors.email ? "text-red-600" : "text-black"
                          }`}
                        >
                          email
                        </label>
                        <input
                          type="text"
                          {...register("email")}
                          className={`w-[300px] mt-2 px-3 py-1 border-2 rounded-[8px] ${
                            errors.email
                              ? "border-red-600 focus:border-red-600 focus:ring-0"
                              : "border-primary focus:ring-primary focus:border-primary"
                          }`}
                        />
                        {errors.email && (
                          <p className="text-red-600 error-text">
                            {errors.email.message?.toString()}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <label
                          className={`text-[10px] uppercase ${
                            errors.position ? "text-red-600" : "text-black"
                          }`}
                        >
                          position
                        </label>
                        <input
                          type="text"
                          {...register("position")}
                          className={`w-[300px] mt-2 px-3 py-1 border-2 rounded-[8px] ${
                            errors.position
                              ? "border-red-600 focus:border-red-600 focus:ring-0"
                              : "border-primary focus:ring-primary focus:border-primary"
                          }`}
                        />
                        {errors.position && (
                          <p className="text-red-600 error-text">
                            {errors.position.message?.toString()}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col justify-between space-x-0 space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                      <div className="flex flex-col">
                        <label
                          className={`text-[10px] uppercase ${
                            errors.phone ? "text-red-600" : "text-black"
                          }`}
                        >
                          phone
                        </label>
                        <input
                          type="text"
                          {...register("phone")}
                          className={`w-[300px] mt-2 px-3 py-1 border-2 rounded-[8px] ${
                            errors.phone
                              ? "border-red-600 focus:border-red-600 focus:ring-0"
                              : "border-primary focus:ring-primary focus:border-primary"
                          }`}
                        />
                        {errors.phone && (
                          <p className="text-red-600 error-text">
                            {errors.phone.message?.toString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start m-auto mt-6 space-x-0 md:flex-row md:items-center md:space-x-4">
                    <div className="flex items-center mr-4">
                      <input
                        type="checkbox"
                        defaultChecked
                        disabled
                        value=""
                        name="colored-radio"
                        className="w-4 h-4 cursor-pointer text-primary border-primary focus:ring-0"
                      />
                      <label className="ml-2 text-[16px] font-medium text-[#2D3748] cursor-pointer">
                        Email view (email required)
                      </label>
                    </div>
                    <div className="flex items-center mr-4">
                      <input
                        type="checkbox"
                        checked={isPhone}
                        onChange={() => setIsPhone(!isPhone)}
                        name="colored-radio"
                        className="w-4 h-4 cursor-pointer text-primary border-primary focus:ring-0"
                      />
                      <label
                        className="ml-2 text-[16px] font-medium text-[#2D3748] cursor-pointer"
                        onClick={() => setIsPhone(!isPhone)}
                      >
                        Phone number (optional)
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-center mt-6 space-x-4">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="rounded-[30px] w-[200px] py-1 text-white btn-gradient disabled:cursor-not-allowed"
                    >
                      {isSaving ? "Saving..." : "Save"}
                    </button>
                    <button
                      className="bg-white border-[2px] btn-cancel border-primary rounded-[30px] w-[200px] py-1 text-primary"
                      onClick={() => router.push("/admin/companyResources")}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </BaseContainer>
    </LayoutAdmin>
  );
};
export default AddCompanyResource;
