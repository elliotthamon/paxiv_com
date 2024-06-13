import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import BaseContainer from "@/components/BaseContainer";
import LayoutAdmin from "@/components/admin/LayoutAdmin";
import UserEditProfileModal from "@/components/modals/UserEditProfileModal";

import { AuthContext } from "@/contexts/AuthContext";
import useAuth from "@/hooks/useAuth";
import useMember from "@/hooks/useMember";

import { getImageURL } from "@/libs/utils";
import EyeNotOpenIC from "@/components/icons/EyeNotOpenIC";
import EyeOpenIC from "@/components/icons/EyeOpenIC";
import CameraIC from "@/components/icons/CameraIC";
import { USER_AVATAR_IMAGE_FILE } from "@/libs/constants";

const schema = yup.object().shape({
  firstname: yup.string().required("First Name is required."),
  lastname: yup.string().required("Last Name is required."),
  email: yup
    .string()
    .email("Email is not valid")
    .required("Email is required."),
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
  oldPassword: yup.string().notRequired(),
  // yup.string().required("Current Password is required."),
  newPassword: yup.string().when("isOldPassword", {
    is: (v: string) => {
      v !== undefined && v !== null;
    },
    then: (schema) =>
      schema
        .required("Password is required.")
        .min(8, "Password must be at least 8 characters.")
        .max(32, "Password must be at most 32 characters.")
        .matches(
          /[a-z]+/,
          "password must contain at least 1 lowercase character."
        )
        .matches(
          /[A-Z]+/,
          "password must contain at least 1 uppercase character."
        )
        .matches(
          /[@$!%*#?&]+/,
          "password must contain at least one special character."
        )
        .matches(/\d+/, "password must contain at least one number."),

    otherwise: (schema) =>
      schema.oneOf([undefined, ""], "Current Password is required."),
  }),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must be matched."),
});

export type userUpdateDataType = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  position: string;
  file: any;
  companyUser: boolean;
};

const defaultUser = {
  firstname: "",
  lastname: "",
  email: "",
  position: "",
  phone: "",
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
  avatar: "",
};

const EditProfile = () => {
  const router = useRouter();
  const auth = useAuth();
  const authContext = useContext(AuthContext);
  const { updateUserData } = useMember();

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [user, setUser] = useState<any>(defaultUser);
  const [userID, setUserID] = useState<string>("");
  const [oldEmail, setOldEmail] = useState<string>("");
  const [isOldPasswordEyeOpen, setIsOldPasswordEyeOpen] =
    useState<boolean>(false);
  const [isNewPasswordEyeOpen, setIsNewPasswordEyeOpen] =
    useState<boolean>(false);
  const [isNewPasswordConfirmEyeOpen, setIsNewPasswordConfirmEyeOpen] =
    useState<boolean>(false);

  const [userAvatarFile, setUserAvatarFile] = useState<any>();
  const [avatarImage, setAvatarImage] = useState<any>(null);
  const [isEditProfileModalShow, setIsEditProfileModalShow] =
    useState<boolean>(false);
  const [isAvatarSvg, setIsAvatarSvg] = useState<boolean>(false);
  const [isAvatarImageChanged, setIsAvatarImageChanged] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    values: user,
  });

  const onSubmitHandler = async (data: any) => {
    setIsSaving(true);

    if (data.email === oldEmail || (await changeEmail(oldEmail, data.email))) {
      await processPasswordChange(data) && await handleUpdateUserData(data);
    }

    setIsSaving(true);
  };

  const processPasswordChange = async (data: any): Promise<boolean> => {
    // password change?
    if (data?.oldPassword) {
      const oldPassword = window.localStorage.getItem("password");

      if (oldPassword != data?.oldPassword) {
        toast.error("Current Password is not correct!", {
          theme: "colored",
        });
        return false;
      }

      if (!(await updateUserPassword(data.oldPassword, data.newPassword))) {
        toast.error("Password Update was failed. Try again!", {
          theme: "colored",
        });
        return false;
      }

      window.localStorage.setItem("password", data.newPassword);
    }
    return true;
  };

  const changeEmail = async (
    oldEmail: string,
    newEmail: string
  ): Promise<boolean> => {
    return true;
    /*
        const result = await auth.getUser(data.email);
        if (result == null) {
          try {
            // await auth.removeCognitoUser();
            await auth.signUpWithEmail(data.email, data.newPassword);
            await auth.signInWithEmail(data.email, data.newPassword);
            handleUpdateUserData(data);
          } catch (e: any) {
            setIsSaving(false);
            toast.error("User Profile Update was failed.Try again!", {
              theme: "colored",
            });
          }
        } else {
          setIsSaving(false);
          toast.error("This email was already registered!", {
            theme: "colored",
          });
        }

    */
  };

  const updateUserPassword = async (
    oldPassword: string,
    newPassword: string
  ) => {
    try {
      await auth.changePassword(oldPassword, newPassword);
      return true;
    } catch (err: any) {
      if (err instanceof Error) {
        toast.error(err.message, { theme: "colored" });
      }
      return false;
    }
  };

  const handleUpdateUserData = async (userInfo: userUpdateDataType) => {
    try {
      const userData = {
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
        email: userInfo.email,
        phone: userInfo.phone,
        position: userInfo.position,
        file: userAvatarFile,
      };

      const result = await updateUserData(userID, userData);
      const user = authContext.getUser();
      const newData: any = {
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userInfo.email,
        phone: userData.phone,
        position: userData.position,
      };

      if (userAvatarFile && userAvatarFile?.name)
        newData.avatar = `${USER_AVATAR_IMAGE_FILE}/${userID}/${userAvatarFile.name}`;

      authContext.setUser({ ...user, ...newData });
      if (result != null) {
        toast.success("Successfully updated!", { theme: "colored" });
        router.push("/admin/dashboard");
        return true;
      } else {
        toast.error("Failed.Try again!", { theme: "colored" });
        return false;
      }
    } catch (err: any) {
      console.log("err", err);
      toast.error("Failed.Try again!", { theme: "colored" });
      return false;
    }
  };

  useEffect(() => {
    const getUserInfo = async () => {
      authContext.handleLoading(true);
      let userData = await authContext.getUser();
      if (!!userData) {
        let tempUser = {
          firstname: userData.firstname,
          lastname: userData.lastname,
          email: userData.email,
          position: userData.position,
          phone: userData.phone,
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
          avatar: userData.avatar,
        };

        setUserID(userData._id);
        setOldEmail(userData.email);
        setUser(tempUser);
        authContext.handleLoading(false);
      } else {
        // toast.warning(MSG_TOKEN_EXPIRED, { theme: "colored" });
      }
    };

    if (authContext.isLoggedIn) {
      getUserInfo();
    }
    // eslint-disable-next-line
  }, [authContext.isLoggedIn]);

  return (
    <LayoutAdmin>
      <BaseContainer>
        <div className="relative flex flex-col">
          <div className="mt-2 text-xl font-bold text-white">Edit Profile</div>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="bg-black bg-opacity-50 rounded-[20px] mt-10">
              <div className="flex flex-col td:flex-row justify-center p-3 md:py-10 md:space-x-[50px]">
                <div className="relative flex flex-row items-start mx-auto mt-6 td:mx-0">
                  <div className="relative w-[250px] h-[250px]">
                    <Image
                      src={
                        userAvatarFile
                          ? URL.createObjectURL(userAvatarFile)
                          : user.avatar
                          ? getImageURL(user.avatar)
                          : "/images/default_avatar.png"
                      }
                      className="object-cover rounded-xl"
                      alt="user avatar"
                      fill
                    />
                  </div>

                  <div className="absolute top-[210px] left-[210px] flex">
                    <div
                      className={`flex bg-white p-3 rounded-[20px] ${
                        isSaving && "pointer-events-none opacity-50"
                      }`}
                      style={{
                        boxShadow: "0px 2px 5.5px rgba(0, 0, 0, 0.06)",
                      }}
                      onClick={() => setIsEditProfileModalShow(true)}
                    >
                      <CameraIC id="avatarIC" color="#000" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col mt-2 ml-0 md:mt-0 md:p-10 md:pt-1">
                  <div className="flex flex-col items-center justify-center w-full mt-4 space-y-6">
                    <div className="flex flex-col justify-between space-x-0 space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                      <div className="flex flex-col mx-auto md:mx-0">
                        <label
                          className={`text-sm uppercase ${
                            errors.firstname ? "text-red-600" : "text-white"
                          }`}
                        >
                          first name
                        </label>
                        <input
                          type="text"
                          {...register("firstname")}
                          className={`w-[300px] mt-2 px-3 py-1 border-2  rounded-[8px] ${
                            errors.firstname
                              ? "border-red-600 focus:border-red-600 focus:ring-0"
                              : "border-primary focus:ring-primary focus:border-primary"
                          } admin-box text-white`}
                          disabled={isSaving}
                        />
                        {errors.firstname && (
                          <p className="text-red-600 error-text">
                            {errors.firstname.message?.toString()}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col mt-4 md:mt-0">
                        <label
                          className={`text-sm uppercase ${
                            errors.lastname ? "text-red-600" : "text-white"
                          }`}
                        >
                          last name
                        </label>
                        <input
                          type="text"
                          {...register("lastname")}
                          className={`w-[300px] mt-2 px-3 py-1 border-2  rounded-[8px] ${
                            errors.lastname
                              ? "border-red-600 focus:border-red-600 focus:ring-0"
                              : "border-primary focus:ring-primary focus:border-primary"
                          } admin-box text-white`}
                          disabled={isSaving}
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
                          className={`text-sm uppercase ${
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
                          } admin-box text-white disabled:bg-black disabled:cursor-not-allowed`}
                          readOnly={true}
                        />
                        {errors.email && (
                          <p className="text-red-600 error-text">
                            {errors.email.message?.toString()}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <label className="text-sm text-white uppercase">
                          position
                        </label>
                        <input
                          type="text"
                          {...register("position")}
                          className={`w-[300px] mt-2 px-3 py-1 border-2  rounded-[8px] border-primary focus:ring-primary focus:border-primary admin-box text-white`}
                          disabled={isSaving}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col justify-between space-x-0 space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                      <div className="flex flex-col">
                        <label className={`text-sm uppercase text-white`}>
                          phone
                        </label>
                        <input
                          type="text"
                          {...register("phone")}
                          className={`w-[300px] mt-2 px-3 py-1 border-2  rounded-[8px] ${
                            errors.phone
                              ? "border-red-600 focus:border-red-600 focus:ring-0"
                              : "border-primary focus:ring-primary focus:border-primary"
                          } admin-box text-white disabled:bg-black disabled:cursor-not-allowed`}
                          disabled={isSaving}
                        />
                        {errors.phone && (
                          <p className="text-red-600 error-text">
                            {errors.phone.message?.toString()}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <label className={`text-sm uppercase text-white`}>
                          Current Password
                        </label>
                        <div
                          className={`mt-2 flex flex-row items-center justify-between w-[300px] px-2 border-2 rounded-[8px] space-x-1 ${
                            errors.oldPassword
                              ? "border-red-600 focus:border-red-600 focus:ring-0"
                              : "border-primary focus:ring-primary focus:border-primary"
                          }`}
                        >
                          <input
                            type={!isOldPasswordEyeOpen ? "password" : "text"}
                            {...register("oldPassword")}
                            className="px-0 py-1 text-white border-0 outline-none ring-0 focus:ring-0 focus:outline-none admin-box"
                            disabled={isSaving}
                          />
                          <div
                            onClick={() =>
                              setIsOldPasswordEyeOpen(!isOldPasswordEyeOpen)
                            }
                            className="hover:cursor-pointer"
                          >
                            {!isOldPasswordEyeOpen ? (
                              <EyeNotOpenIC />
                            ) : (
                              <EyeOpenIC />
                            )}
                          </div>
                        </div>
                        {errors.oldPassword && (
                          <p className="text-red-600 error-text">
                            {errors.oldPassword.message?.toString()}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col justify-between space-x-0 space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                      <div className="flex flex-col">
                        <label
                          className={`text-sm uppercase ${
                            errors.newPassword ? "text-red-600" : "text-white"
                          }`}
                        >
                          new password
                        </label>
                        <div
                          className={`mt-2 flex flex-row items-center justify-between w-[300px] px-2 border-2 rounded-[8px] space-x-1 ${
                            errors.newPassword
                              ? "border-red-600 focus:border-red-600 focus:ring-0"
                              : "border-primary focus:ring-primary focus:border-primary"
                          }`}
                        >
                          <input
                            type={!isNewPasswordEyeOpen ? "password" : "text"}
                            {...register("newPassword")}
                            className="px-0 py-1 text-white border-0 outline-none ring-0 focus:ring-0 focus:outline-none admin-box"
                            disabled={isSaving}
                          />
                          <div
                            onClick={() =>
                              setIsNewPasswordEyeOpen(!isNewPasswordEyeOpen)
                            }
                            className="hover:cursor-pointer"
                          >
                            {!isNewPasswordEyeOpen ? (
                              <EyeNotOpenIC />
                            ) : (
                              <EyeOpenIC />
                            )}
                          </div>
                        </div>
                        {errors.newPassword && (
                          <p className="text-red-600 error-text">
                            {errors.newPassword.message?.toString()}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <label
                          className={`text-sm uppercase ${
                            errors.confirmPassword
                              ? "text-red-600"
                              : "text-white"
                          }`}
                        >
                          confirm new password
                        </label>
                        <div
                          className={`mt-2 flex flex-row items-center justify-between w-[300px] px-2 border-2 rounded-[8px] space-x-1 ${
                            errors.confirmPassword
                              ? "border-red-600 focus:border-red-600 focus:ring-0"
                              : "border-primary focus:ring-primary focus:border-primary"
                          }`}
                        >
                          <input
                            type={
                              !isNewPasswordConfirmEyeOpen ? "password" : "text"
                            }
                            {...register("confirmPassword")}
                            className="px-0 py-1 text-white border-0 outline-none ring-0 focus:ring-0 focus:outline-none admin-box"
                            disabled={isSaving}
                          />
                          <div
                            onClick={() =>
                              setIsNewPasswordConfirmEyeOpen(
                                !isNewPasswordConfirmEyeOpen
                              )
                            }
                            className="hover:cursor-pointer"
                          >
                            {!isNewPasswordConfirmEyeOpen ? (
                              <EyeNotOpenIC />
                            ) : (
                              <EyeOpenIC />
                            )}
                          </div>
                        </div>
                        {errors.confirmPassword && (
                          <p className="text-red-600 error-text">
                            {errors.confirmPassword.message?.toString()}
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
                        disabled={isSaving}
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
                      className="rounded-[30px] w-[200px] py-1 text-white hover:text-primary bg-primary hover:bg-white border-2 border-primary disabled:cursor-not-allowed"
                    >
                      {isSaving ? "Saving..." : "Save"}
                    </button>
                    <button
                      type="button"
                      disabled={isSaving}
                      className="bg-white border-[2px] btn-cancel border-primary rounded-[30px] w-[200px] py-1 text-primary disabled:cursor-not-allowed"
                      onClick={() => router.back()}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          {isEditProfileModalShow && (
            <UserEditProfileModal
              avatarImage={avatarImage}
              userAvatarImageFile={user.avatar}
              setAvatarImage={setAvatarImage}
              isAvatarModal={isEditProfileModalShow}
              setIsAvatarModal={setIsEditProfileModalShow}
              setUserAvatarFile={setUserAvatarFile}
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
export default EditProfile;
