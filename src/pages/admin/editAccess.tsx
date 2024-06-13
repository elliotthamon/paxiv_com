import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import BaseContainer from "@/components/BaseContainer";
import LayoutAdmin from "@/components/admin/LayoutAdmin";

import { AuthContext } from "@/contexts/AuthContext";
import useAuth from "@/hooks/useAuth";

import { getImageURL } from "@/libs/utils";
import CameraIC from "@/components/icons/CameraIC";
import EyeNotOpenIC from "@/components/icons/EyeNotOpenIC";
import EyeOpenIC from "@/components/icons/EyeOpenIC";

import useMember from "@/hooks/useMember";

const schema = yup.object().shape({
  firstname: yup.string().required("First Name is required."),
  lastname: yup.string().required("Last Name is required."),
  email: yup.string().email("Email is not valid."),
});

export type userUpdateDataType = {
  firstname: string;
  lastname: string;
  phone: string;
  // email: string,
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

const EditAccess = () => {
  const router = useRouter();
  const auth = useAuth();
  const authContext = useContext(AuthContext);
  const { updateUserData } = useMember();

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [user, setUser] = useState<any>(defaultUser);
  const [userID, setUserID] = useState<string>("");
  const [oldEmail, setOldEmail] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordError, setNewPasswordError] = useState<boolean>(false);
  const [newPasswordErrorMsg, setNewPasswordErrorMsg] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [confirmNewPasswordError, setConfirmNewPasswordError] =
    useState<boolean>(false);
  const [file, setFile] = useState<any>();
  const [isOldPasswordEyeOpen, setIsOldPasswordEyeOpen] =
    useState<boolean>(false);
  const [isNewPasswordEyeOpen, setIsNewPasswordEyeOpen] =
    useState<boolean>(false);
  const [isNewPasswordConfirmEyeOpen, setIsNewPasswordConfirmEyeOpen] =
    useState<boolean>(false);
  const [isPhoneRequired, setIsPhoneRequired] = useState<boolean>(false);

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
    let validatePasswordResult = false;
    let validateConfirmPasswordResult = false;

    if (newPassword !== "") {
      validatePasswordResult = validatePassword(newPassword);
      validateConfirmPasswordResult = validateConfirmPassword(
        newPassword,
        confirmNewPassword
      );
      if (
        validatePasswordResult &&
        validateConfirmPasswordResult &&
        oldEmail !== ""
      ) {
        let passwordUpdateResult = await updateUserPassword();
        passwordUpdateResult && handleUpdateUserData(data);
      }
    } else if (oldEmail !== "") {
      handleUpdateUserData(data);
    }
  };

  const updateUserPassword = async () => {
    try {
      await auth.changePassword(oldPassword, newPassword);
      toast.success("Password updated!", { theme: "colored" });
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
      setIsSaving(true);
      const userData = {
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
        phone: userInfo.phone,
        // email: userInfo.email,
        position: userInfo.position,
        file: file,
      };

      try {
        setIsSaving(true);
        await updateUserData(userID, userData);
        toast.success("Successfully updated!", { theme: "colored" });
        setIsSaving(false);
      } catch (error: any) {
        setIsSaving(false);
        console.log("err", error);
      }
    } catch (err: any) {
      console.log("err", err);
      toast.error("Try again later!", { theme: "colored" });
      setIsSaving(false);
    }
  };

  const handleFileInput = (e: any) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const validatePassword = (password: string) => {
    if (password.length < 8 || password.length > 32) {
      setNewPasswordErrorMsg(
        "Password must be between 8 and 32 characters long"
      );
      setNewPasswordError(true);
      return false;
    }

    if (!password.match(/[a-z]/)) {
      setNewPasswordErrorMsg(
        "Password must contain at least one lowercase character"
      );
      setNewPasswordError(true);
      return false;
    }

    if (!password.match(/[A-Z]/)) {
      setNewPasswordErrorMsg(
        "Password must contain at least one uppercase character"
      );
      setNewPasswordError(true);
      return false;
    }

    if (!password.match(/[@$!%*#?&]/)) {
      setNewPasswordErrorMsg(
        "Password must contain at least one special character"
      );
      setNewPasswordError(true);
      return false;
    }

    if (!password.match(/\d/)) {
      setNewPasswordErrorMsg("Password must contain at least one number");
      setNewPasswordError(true);
      return false;
    }

    setNewPasswordErrorMsg("");
    setNewPasswordError(false);
    return true;
  };

  const validateConfirmPassword = (
    confirmPassword: string,
    newPassword: string
  ) => {
    if (confirmPassword !== newPassword) {
      setConfirmNewPasswordError(true);
      return false;
    } else {
      setConfirmNewPasswordError(false);
      return true;
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
        //  toast.warning(MSG_TOKEN_EXPIRED, { theme: "colored" });
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
        <div className="relative flex flex-col mt-8 md:mt-0">
          <div className="flex justify-center md:justify-start text-center md:text-left text-[#0B1E25] text-[30px] font-semibold tracking-widest uppercase">
            Edit Access
          </div>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="bg-white border-1 border-[#DCDCDC] rounded-[20px] mt-4">
              <div className="flex flex-col td:flex-row justify-center p-3 md:p-0 md:space-x-[50px]">
                <div className="relative flex flex-row mx-auto td:mx-0 items-start mt-6">
                  <div className="relative w-[250px] h-[250px]">
                    <Image
                      src={
                        file
                          ? URL.createObjectURL(file)
                          : user.avatar
                          ? getImageURL(user.avatar)
                          : "/images/default_avatar.png"
                      }
                      className="object-cover rounded-xl"
                      alt="company logo"
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
                    >
                      <CameraIC
                        className="w-[30px] bi bi-camera-fill cursor-pointer"
                        onClick={handleFileInput}
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileInput}
                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col ml-0 mt-2 md:mt-0 md:p-10 md:pt-1">
                  <div className="w-full mt-4 space-y-6 flex flex-col justify-center items-center">
                    <div className="flex flex-col justify-between md:flex-row space-x-0 md:space-x-2 space-y-2 md:space-y-0">
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
                          className={`w-[300px] md:w-[250px] mt-2 px-3 py-1 border-2  rounded-[8px] ${
                            errors.firstname
                              ? "border-red-600 focus:border-red-600 focus:ring-0"
                              : "border-primary focus:ring-primary focus:border-primary"
                          }`}
                          disabled={isSaving}
                        />
                        {errors.firstname && (
                          <p className="error-text text-red-600">
                            {errors.firstname.message?.toString()}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col mt-4 md:mt-0">
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
                          className={`w-[300px] md:w-[250px] mt-2 px-3 py-1 border-2  rounded-[8px] ${
                            errors.lastname
                              ? "border-red-600 focus:border-red-600 focus:ring-0"
                              : "border-primary focus:ring-primary focus:border-primary"
                          }`}
                          disabled={isSaving}
                        />
                        {errors.lastname && (
                          <p className="error-text text-red-600">
                            {errors.lastname.message?.toString()}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col justify-between md:flex-row space-x-0 md:space-x-2 space-y-2 md:space-y-0">
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
                          disabled
                          {...register("email")}
                          className={`w-[300px] md:w-[250px] mt-2 px-3 py-1 border-2  rounded-[8px] ${
                            errors.email
                              ? "border-red-600 focus:border-red-600 focus:ring-0"
                              : "border-primary focus:ring-primary focus:border-primary"
                          } disabled:bg-gray-300`}
                        />
                        {errors.email && (
                          <p className="error-text text-red-600">
                            {errors.email.message?.toString()}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <label className="text-[10px] uppercase text-black">
                          position
                        </label>
                        <input
                          type="text"
                          {...register("position")}
                          className={`w-[300px] md:w-[250px] mt-2 px-3 py-1 border-2  rounded-[8px] border-primary focus:ring-primary focus:border-primary`}
                          disabled={isSaving}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col justify-between md:flex-row space-x-0 md:space-x-2 space-y-2 md:space-y-0">
                      <div className="flex flex-col">
                        <label className={`text-[10px] uppercase text-black`}>
                          phone
                        </label>
                        <input
                          type="text"
                          {...register("phone")}
                          className="w-[300px] md:w-[250px] mt-2 px-3 py-1 border-2  rounded-[8px] border-primary focus:ring-primary focus:border-primary"
                          disabled={isSaving}
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className={`text-[10px] uppercase text-black`}>
                          old password
                        </label>
                        <div
                          className={`mt-2 flex flex-row items-center justify-between w-[300px] md:w-[250px] px-2 border-2 rounded-[8px] space-x-1 border-primary focus:ring-primary focus:border-primary`}
                        >
                          <input
                            type={!isOldPasswordEyeOpen ? "password" : "text"}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="py-1 px-0 border-0 ring-0 outline-none focus:ring-0 focus:outline-none"
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
                          <p className="error-text text-red-600">
                            {errors.oldPassword.message?.toString()}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col justify-between md:flex-row space-x-0 md:space-x-2 space-y-2 md:space-y-0">
                      <div className="flex flex-col">
                        <label
                          className={`text-[10px] uppercase ${
                            errors.newPassword ? "text-red-600" : "text-black"
                          }`}
                        >
                          new password
                        </label>
                        <div
                          className={`mt-2 flex flex-row items-center justify-between w-[300px] md:w-[250px] px-2 border-2 rounded-[8px] space-x-1 ${
                            newPasswordError
                              ? "border-red-600 focus:border-red-600 focus:ring-0"
                              : "border-primary focus:ring-primary focus:border-primary"
                          }`}
                        >
                          <input
                            type={!isNewPasswordEyeOpen ? "password" : "text"}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="py-1 px-0 border-0 ring-0 outline-none focus:ring-0 focus:outline-none"
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
                        {newPasswordError && (
                          <p className="error-text text-red-600">
                            {newPasswordErrorMsg}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <label
                          className={`text-[10px] uppercase ${
                            confirmNewPasswordError
                              ? "text-red-600"
                              : "text-black"
                          }`}
                        >
                          confirm new password
                        </label>
                        <div
                          className={`mt-2 flex flex-row items-center justify-between w-[300px] md:w-[250px] px-2 border-2 rounded-[8px] space-x-1 ${
                            confirmNewPasswordError
                              ? "border-red-600 focus:border-red-600 focus:ring-0"
                              : "border-primary focus:ring-primary focus:border-primary"
                          }`}
                        >
                          <input
                            type={
                              !isNewPasswordConfirmEyeOpen ? "password" : "text"
                            }
                            onChange={(e) =>
                              setConfirmNewPassword(e.target.value)
                            }
                            className="py-1 px-0 border-0 ring-0 outline-none focus:ring-0 focus:outline-none"
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
                        {confirmNewPasswordError && (
                          <p className="error-text text-red-600">
                            Passwords do not match
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-col md:flex-row items-start md:items-center m-auto space-x-0 md:space-x-4">
                    <div className="flex items-center mr-4">
                      <input
                        type="checkbox"
                        defaultChecked
                        disabled
                        name="colored-radio"
                        className="w-4 h-4 text-primary border-primary focus:ring-0"
                      />
                      <label className="ml-2 text-[16px] font-medium text-[#2D3748]">
                        Email view (email required)
                      </label>
                    </div>
                    <div className="flex items-center mr-4">
                      <input
                        type="checkbox"
                        value=""
                        name="colored-radio"
                        className="w-4 h-4 text-primary border-primary focus:ring-0"
                        disabled={isSaving}
                      />
                      <label className="ml-2 text-[16px] font-medium text-[#2D3748]">
                        Phone number (optional)
                      </label>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-center space-x-4">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="rounded-[30px] w-[200px] py-1 text-white btn-gradient disabled:cursor-not-allowed"
                    >
                      {isSaving ? "Saving..." : "Save"}
                    </button>
                    <button
                      type="button"
                      disabled={isSaving}
                      className="bg-white border-[2px] btn-cancel border-primary rounded-[30px] w-[200px] py-1 text-primary disabled:cursor-not-allowed"
                      onClick={() => router.push("/admin/companyUsers")}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </BaseContainer>
    </LayoutAdmin>
  );
};
export default EditAccess;
