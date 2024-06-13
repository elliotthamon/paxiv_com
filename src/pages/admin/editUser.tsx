import { useRouter } from "next/router";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { AuthContext } from "@/contexts/AuthContext";

import BaseContainer from "@/components/BaseContainer";
import LayoutAdmin from "@/components/admin/LayoutAdmin";
import CameraIC from "@/components/icons/CameraIC";

import { getImageURL } from "@/libs/utils";

import useMember from "@/hooks/useMember";

const schema = yup.object().shape({
  firstname: yup.string().required("First Name is required."),
  lastname: yup.string().required("Last Name is required."),
  email: yup
    .string()
    .email("Email must be valid.")
    .required("Email is required."),
  position: yup.string().required("Position is required."),
});

const defaultUserData = {
  firstname: "",
  lastname: "",
  email: "",
  position: "",
  phone: "",
};

const EditUser = () => {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const { Id, companyID } = router.query;
  const { getUserDataFromDBByID, updateUserData } = useMember();

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null);
  const [userFormData, setUserFormData] = useState<any>(defaultUserData);
  const [userAvatar, setUserAvatar] = useState<any>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    values: userFormData,
  });

  const handleUserAvatarFileInput = (e: any) => {
    const file = e.target.files[0];
    setUserAvatar(file);
  };

  const onSubmitHandler = async (data: any) => {
    if (typeof companyID == "string" && typeof Id == "string") {
      try {
        setIsSaving(true);
        const userData = {
          firstname: data.firstname,
          lastname: data.lastname,
          phone: data.phone,
          position: data.position,
          file: userAvatar !== undefined ? userAvatar : "",
        };

        await updateUserData(Id, userData);
        const user = authContext.getUser();
        if (user?._id == Id) {
          authContext.setUser({ ...user, ...userData });
        }
        toast.success("Successfuly updated!", { theme: "colored" });
        setIsSaving(false);
        reset();
        router.push(`/admin/companyResources?Id=${companyID}`);
      } catch (err) {
        setIsSaving(false);
        if (err instanceof Error) {
          toast.error(err.message, { theme: "colored" });
        }
      }
    } else if (typeof companyID != "string") {
      toast.error("User must be linked to the company.", { theme: "colored" });
    } else if (typeof Id != "string") {
      toast.error("User Id must be selected.", { theme: "colored" });
    }
  };

  useEffect(() => {
    if (companyID === undefined) {
      router.push("/admin/dashboard");
      return;
    }

    const getUserData = async () => {
      authContext.handleLoading(true);

      if (typeof Id == "string") {
        let userData = await getUserDataFromDBByID(Id);
        if (!!userData) {
          setUserData(userData);
          setUserFormData({
            firstname: userData.firstname,
            lastname: userData.lastname,
            email: userData.email,
            position: userData.position,
            phone: userData.phone,
          });
          authContext.handleLoading(false);
        } else {
          router.push("/admin/dashboard");
        }
      } else {
        authContext.handleLoading(false);
      }
    };

    if (authContext.isLoggedIn) {
      getUserData();
    }
    // eslint-disable-next-line
  }, [authContext.isLoggedIn]);

  return (
    <LayoutAdmin>
      <BaseContainer>
        <div className="relative flex flex-col mt-0">
          <div className="text-xl font-bold text-white mt-2">
            {typeof companyID === "string" && typeof Id === "string"
              ? "Edit User"
              : "New User"}
          </div>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="bg-black bg-opacity-50 rounded-[20px] mt-10">
              <div className="flex flex-col p-3 md:flex-row md:p-0">
                <div className="relative justify-center hidden md:flex md:justify-start">
                  <div className="hidden md:flex w-[120px] md:h-full justify-center md:justify-start border-[1px] border-primary rounded-[20px]"></div>
                  <div className="relative md:absolute left-[15px] top-[40px] w-[90px] h-[90px]">
                    <Image
                      src={
                        userAvatar
                          ? URL.createObjectURL(userAvatar)
                          : userData?.avatar
                          ? getImageURL(userData?.avatar)
                          : "/images/default_avatar.png"
                      }
                      className="object-cover rounded-full"
                      alt="user avatar"
                      fill
                    />
                  </div>

                  <div className="absolute flex top-28 right-4">
                    <div
                      className="flex p-2 bg-white rounded-full"
                      style={{
                        boxShadow: "0px 2px 5.5px rgba(0, 0, 0, 0.06)",
                      }}
                    >
                      <CameraIC
                        color="#000"
                        width="20"
                        height="20"
                        onClick={handleUserAvatarFileInput}
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleUserAvatarFileInput}
                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col ml-0 md:ml-[50px] mt-2 md:mt-0 md:p-10">
                  <div className="flex flex-col items-center justify-center w-full mt-1 space-y-6">
                    <div className="flex flex-col justify-between space-x-0 space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                      <div className="flex flex-col mx-auto md:mx-0">
                        <label className="text-[10px] text-white uppercase">
                          first name
                        </label>
                        <input
                          {...register("firstname")}
                          type="text"
                          className={`w-[300px] lg:w-[250px] mt-2 px-3 py-1 border-2  rounded-[8px] ${
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
                      <div className="flex flex-col mt-4 md:mt-0">
                        <label className="text-[10px] text-white uppercase">
                          last name
                        </label>
                        <input
                          {...register("lastname")}
                          type="text"
                          className={`w-[300px] lg:w-[250px] mt-2 px-3 py-1 border-2  rounded-[8px] ${
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
                      <div className="flex flex-col mx-auto md:mx-0">
                        <label
                          className={`text-[10px] uppercase ${
                            errors.position ? "text-red-600" : "text-white"
                          }`}
                        >
                          position
                        </label>
                        <input
                          {...register("position")}
                          type="text"
                          className={`w-[300px] lg:w-[250px] mt-2 px-3 py-1 border-2  rounded-[8px] ${
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
                        <label className={`text-[10px] uppercase text-white`}>
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

                  <div className="flex justify-center mt-6 mb-2 space-x-4">
                    <button
                      type="submit"
                      className="rounded-[30px] w-[200px] py-1 text-white hover:text-primary bg-primary hover:bg-white border-2 border-primary disabled:cursor-not-allowed"
                    >
                      {isSaving ? "Saving..." : "Save"}
                    </button>
                    <button
                      type="button"
                      className="bg-white border-2 border-primary rounded-[30px] w-[200px] py-1 text-primary btn-cancel"
                      onClick={() =>
                        router.push(`/admin/companyResources?Id=${companyID}`)
                      }
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
export default EditUser;
