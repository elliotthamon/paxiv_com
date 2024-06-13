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
import useMember from "@/hooks/useMember";

import { getImageURL } from "@/libs/utils";
import CameraIC from "@/components/icons/CameraIC";
import { USER_AVATAR_IMAGE_FILE } from "@/libs/constants";

const schema = yup.object().shape({
  firstname: yup.string().required("First Name is required."),
  lastname: yup.string().required("Last Name is required."),
  email: yup.string().email("Email is not valid."),
});

export type userUpdateDataType = {
  firstname: string;
  lastname: string;
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
  avatar: "",
};

const EditContact = () => {
  const router = useRouter();
  const authContext = useContext(AuthContext);

  const { id, assetID } = router.query;

  const { getUserDataFromDBByID, updateUserData } = useMember();

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [user, setUser] = useState<any>(defaultUser);

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
    handleUpdateUserData(data);
  };

  const handleUpdateUserData = async (userInfo: userUpdateDataType) => {
    try {
      setIsSaving(true);
      const userData = {
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
        phone: userInfo.phone,
        position: userInfo.position,
        file: userAvatarFile,
      };

      try {
        const result = await updateUserData(id, userData);
        const user = authContext.getUser();
        let newData: any;
        if (userAvatarFile == undefined) {
          newData = {
            firstname: userData.firstname,
            lastname: userData.lastname,
            phone: userData.phone,
            position: userData.position,
          };
        } else {
          newData = {
            firstname: userData.firstname,
            lastname: userData.lastname,
            phone: userData.phone,
            position: userData.position,
            avatar:
              userAvatarFile?.name === undefined
                ? ""
                : `${USER_AVATAR_IMAGE_FILE}/${id}/${userAvatarFile.name}`,
          };
        }
        if (user?._id == id) {
          authContext.setUser({ ...user, ...newData });
        }
        if (result != null) {
          toast.success("Successfully updated!", { theme: "colored" });
          setIsSaving(false);
          if (typeof assetID == "string") {
            router.push(`/admin/assetView?id=${assetID}`);
          } else {
            router.push("/admin/dashboard");
          }
        } else {
          toast.error("Failed.Try again!", { theme: "colored" });
        }
      } catch (error: any) {
        setIsSaving(false);
        console.log("err", error);
      }
    } catch (err: any) {
      console.log("err", err);
      toast.error("Failed.Try again!", { theme: "colored" });
      setIsSaving(false);
    }
  };

  useEffect(() => {
    const getContactInfo = async () => {
      authContext.handleLoading(true);
      if (typeof id === "string") {
        const userData = await getUserDataFromDBByID(id);
        setUser(userData);
        authContext.handleLoading(false);
      } else {
        toast.error("Try again!!!", { theme: "colored" });
        history.back();
      }
    };

    if (authContext.isLoggedIn) {
      getContactInfo();
    }
    // eslint-disable-next-line
  }, [authContext.isLoggedIn]);

  return (
    <LayoutAdmin>
      <BaseContainer>
        <div className="relative flex flex-col">
          <div className="mt-2 text-xl font-bold text-white">
            Edit Contact Info
          </div>
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
                      <CameraIC color="#000" />
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
                          className={`w-[300px] md:w-[250px] mt-2 px-3 py-1 border-2  rounded-[8px] ${
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
                          className={`w-[300px] md:w-[250px] mt-2 px-3 py-1 border-2  rounded-[8px] ${
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
                          disabled
                          {...register("email")}
                          className={`w-[300px] md:w-[250px] mt-2 px-3 py-1 border-2  rounded-[8px] ${
                            errors.email
                              ? "border-red-600 focus:border-red-600 focus:ring-0"
                              : "border-primary focus:ring-primary focus:border-primary"
                          } admin-box text-white disabled:bg-black disabled:cursor-not-allowed`}
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
                          className={`w-[300px] md:w-[250px] mt-2 px-3 py-1 border-2  rounded-[8px] border-primary focus:ring-primary focus:border-primary admin-box text-white`}
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
                          className="w-[300px] md:w-[250px] mt-2 px-3 py-1 border-2  rounded-[8px] border-primary focus:ring-primary focus:border-primary admin-box text-white"
                          disabled={isSaving}
                        />
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
                        className="w-4 h-4 bg-transparent cursor-pointer text-primary border-primary focus:ring-0"
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
                        className="w-4 h-4 bg-transparent cursor-pointer text-primary border-primary focus:ring-0"
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
                      className="rounded-lg w-[200px] py-2 text-white hover:text-primary bg-primary hover:bg-white border-2 border-primary disabled:cursor-not-allowed"
                    >
                      {isSaving ? "Saving..." : "Save"}
                    </button>
                    <button
                      type="button"
                      disabled={isSaving}
                      className="bg-white border-[2px] btn-cancel border-primary  rounded-lg w-[200px] py-2 text-primary disabled:cursor-not-allowed"
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
export default EditContact;
