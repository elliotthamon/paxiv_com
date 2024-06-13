import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import BaseContainer from "@/components/BaseContainer";
import LayoutAdmin from "@/components/admin/LayoutAdmin";

import { AuthContext } from "@/contexts/AuthContext";
import useMember from "@/hooks/useMember";

import { getImageURL } from "@/libs/utils";
import UploadIC from "@/components/icons/UploadIC";

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
    .email("Email is not valid.")
    .required("Email is required."),
});

const ResourceEdit = () => {
  const router = useRouter();
  const { Id, companyId } = router.query;
  const { updateUserData, getUserDataFromDBByID } = useMember();
  const authContext = useContext(AuthContext);

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [userAvatar, setUserAvatar] = useState<any>();
  const [userData, setUserData] = useState<any>(null);
  const [companyID, setCompanyID] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleUserAvatarFileInput = (e: any) => {
    const file = e.target.files[0];
    setUserAvatar(file);
  };

  const onSubmitHandler = async (data: any) => {
    try {
      setIsSaving(true);
      data.companyID = companyID;
      data.paymentStatus = false;
      data.file = userAvatar;
      companyID && (await updateUserData(Id, data));
      toast.success("Successfully submitted!", { theme: "colored" });
      setIsSaving(false);
      router.push(`/admin/companyResources?Id=${companyID}`);
    } catch (e: any) {
      setIsSaving(false);
      toast.error("Try again later", { theme: "colored" });
      console.log("e", e);
    }
  };

  useEffect(() => {
    const getUserInfo = async () => {
      authContext.handleLoading(true);
      let data: any = null;
      if (typeof Id == "string") {
        data = await getUserDataFromDBByID(Id);
        setValue("firstname", data?.firstname);
        setValue("lastname", data?.lastname);
        setValue("email", data?.email);
        setValue("position", data?.position);
        setValue("phone", data?.phone);
        setUserData(data);
      }
      if (!!data) {
        if (data.companyID) {
          setCompanyID(data.companyID);
        }
      }
      authContext.handleLoading(false);
    };

    if (authContext.isLoggedIn) {
      getUserInfo();
    }
    // eslint-disable-next-line
  }, [authContext.isLoggedIn]);

  return (
    <LayoutAdmin>
      <BaseContainer>
        <div className="relative flex flex-col mt-8 md:mt-0">
          <h1 className="mt-2 text-xl font-bold text-white">Resource Edit</h1>
          <div className="bg-black bg-opacity-50 rounded-[20px] mt-4">
            <div className="flex flex-col p-3 md:flex-row md:p-0">
              <div className="relative justify-center hidden md:flex md:justify-start">
                <div className="hidden md:flex w-[120px] md:h-full justify-center md:justify-start border-[1px] border-primary rounded-[20px]"></div>
                <div className="absolute left-[15px] top-[15px] w-[90px] h-[90px]">
                  <Image
                    src={
                      userAvatar
                        ? URL.createObjectURL(userAvatar)
                        : userData?.avatar != null
                        ? getImageURL(userData?.avatar)
                        : "/images/default_avatar.png"
                    }
                    className="object-cover rounded-full"
                    alt="user"
                    fill
                  />
                </div>
              </div>

              <div className="relative flex justify-center my-4 md:hidden md:justify-start">
                <div className="hidden md:flex w-[120px] md:h-full justify-center md:justify-start border-[1px] border-primary rounded-[20px]"></div>
                <div className="relative w-[90px] h-[90px]">
                  <Image
                    src={
                      userAvatar
                        ? URL.createObjectURL(userAvatar)
                        : userData?.avatar != null
                        ? getImageURL(userData?.avatar)
                        : "/images/default_avatar.png"
                    }
                    className="object-cover rounded-full"
                    alt="user"
                    fill
                  />
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmitHandler)}>
                <div className="flex flex-col ml-0 md:ml-[50px] mt-2 md:mt-0 md:p-10">
                  <div className="flex items-center justify-center w-[300px] md:w-full mx-auto">
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer border-primary">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadIC />
                        <p className="mb-2 text-sm text-white">
                          <span className="font-semibold">Click to upload</span>
                          &nbsp; or drag and drop
                        </p>
                        <p className="text-xs text-white">
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
                  <div className="flex flex-col items-center justify-center w-full mt-4 space-y-6 md:mt-6">
                    <div className="flex flex-col justify-between space-x-0 space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                      <div className="flex flex-col mx-auto md:mx-0">
                        <label
                          className={`text-[10px] uppercase ${
                            errors.firstname ? "text-red-600" : "text-white"
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
                          } admin-box text-white`}
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
                            errors.lastname ? "text-red-600" : "text-white"
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
                          } admin-box text-white`}
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
                            errors.email ? "text-red-600" : "text-white"
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
                          } admin-box text-white`}
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
                            errors.position ? "text-red-600" : "text-white"
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
                          } admin-box text-white`}
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
                            errors.phone ? "text-red-600" : "text-white"
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
                          } admin-box text-white`}
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
                        className="w-4 h-4 bg-transparent text-primary border-primary focus:ring-0"
                      />
                      <label className="ml-2 text-[16px] font-medium text-white">
                        Email view (email required)
                      </label>
                    </div>
                    <div className="flex items-center mr-4">
                      <input
                        type="checkbox"
                        value=""
                        name="colored-radio"
                        className="w-4 h-4 bg-transparent text-primary border-primary focus:ring-0"
                      />
                      <label className="ml-2 text-[16px] font-medium text-white">
                        Phone number (optional)
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-center mt-6 space-x-4">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="px-10 py-2 text-base font-semibold text-white transition border rounded-lg cursor-pointer hover:text-primary border-primary bg-primary hover:bg-white disabled:cursor-not-allowed"
                    >
                      {isSaving ? "Saving..." : "Save"}
                    </button>
                    <button
                      className="px-8 py-2 text-white transition-all rounded-lg cursor-pointer admin-box hover:bg-primary"
                      onClick={() =>
                        router.push(`/admin/companyResources?Id=${companyId}`)
                      }
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
export default ResourceEdit;
