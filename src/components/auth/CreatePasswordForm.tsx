import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from "@/hooks/useAuth";

import { AuthContext } from "@/contexts/AuthContext";
import EyeNotOpenIC from "@/components/icons/EyeNotOpenIC";
import EyeOpenIC from "@/components/icons/EyeOpenIC";

const schema = yup.object().shape({
  /*
  password: yup
    .string()
    .required("Password is required.")
    .min(8, "Password must be at least 8 characters.")
    .max(32, "Password must be at most 32 characters.")
    .matches(/[a-z]+/, "password must contain at least 1 lowercase character.")
    .matches(/[A-Z]+/, "password must contain at least 1 uppercase character.")
    .matches(
      /[@$!%*#?&]+/,
      "password must contain at least one special character."
    )
    .matches(/\d+/, "password must contain at least one number."),
    */

  newpassword: yup
    .string()
    .required("Password is required.")
    .min(8, "Password must be at least 8 characters.")
    .max(32, "Password must be at most 32 characters.")
    .matches(/[a-z]+/, "password must contain at least 1 lowercase character.")
    .matches(/[A-Z]+/, "password must contain at least 1 uppercase character.")
    .matches(
      /[@$!%*#?&]+/,
      "password must contain at least one special character."
    )
    .matches(/\d+/, "password must contain at least one number."),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newpassword"), null || ""], "Passwords must be matched.")
    .required("Confirm password is required."),
});

type AcceptProps = {
  email: string;
  code: string;
};

const CreatePasswordForm = ({ email, code }: AcceptProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const oldPassword = Buffer.from(code, "base64").toString();

  const auth = useAuth();
  const router = useRouter();
  const authContext = useContext(AuthContext);

  const [isPasswordEyeOpen, setIsPasswordEyeOpen] = useState<boolean>(false);
  const [isPasswordConfirmEyeOpen, setIsPasswordConfirmEyeOpen] =
    useState<boolean>(false);

  useEffect(() => {
    authContext.setPasswordExpired(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*
  if (typeof email == "string") {
    if (email.toLowerCase() !== authContext?.lastLoginEmail?.toLowerCase()) {
      toast.error("There was an error preparing to change your password.", {
        theme: "colored",
      });
      router.push("/auth/login");
    }
  }
  */

  const onSubmitHandler = async (data: any) => {
    //@ts-ignore
    try {
      if (typeof email === "string") {
        await auth.setInitialPassword(email, oldPassword, data.newpassword);
        toast.success("Successfully set new password!", { theme: "colored" });
        setTimeout(() => {
          router.push("/auth/login");
        }, 500);
      } else {
        router.push("/auth/login");
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message, { theme: "colored" });
      }
      return;
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="w-[90%] xs:w-[80%] sm:w-[60%] bg-black bg-opacity-60 rounded-3xl sm:rounded-[50px] kl:rounded-[100px] mx-auto px-[25px] kl:px-[50px] py-8 kl:py-16"
    >
      <div className="flex flex-col">
        <div className="flex justify-center text-center">
          <h1 className="text-primary text-3xl sm:text-[35px] kl:text-[70px] font-semibold tracking-widest">
            Set Password
          </h1>
        </div>

        <div className="flex justify-center mt-6 text-center kl:mt-12">
          <p className="text-sm text-white sm:text-base kl:text-3xl">
            Set Password for {email}
          </p>
        </div>

        {/* 
        <div className="flex flex-col items-center justify-center w-full mt-6 space-y-6 kl:mt-12 kl:space-y-12">
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className={`text-sm kl:text-2xl uppercase ${
                errors.password ? "text-red-500" : "text-white"
              }`}
            >
              Old Password
            </label>
            <div
              className={`mt-2 kl:mt-4 flex flex-row items-center justify-between w-[280px] xs:w-[300px] kl:w-[600px] pr-2 kl:pr-4 border-2 rounded-[8px] kl:rounded-4 space-x-1 ${
                errors.password
                  ? "border-red-500 focus:border-red-500 focus:ring-0"
                  : "border-primary focus:ring-primary focus:border-primary"
              }`}
            >
              <input
                id="password"
                {...register("password")}
                type={isPasswordEyeOpen ? "text" : "password"}
                className="bg-transparent py-1 border-0 ring-0 rounded-[8px] kl:rounded-4 outline-none focus:ring-0 text-white text-sm sm:text-base"
              />
              <div
                className="hover:cursor-pointer"
                onClick={() => setIsPasswordEyeOpen(!isPasswordEyeOpen)}
              >
                {!isPasswordEyeOpen ? <EyeNotOpenIC /> : <EyeOpenIC />}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 error-text">
                {errors.password.message?.toString()}
              </p>
            )}
            {!errors.password && (
              <p className="text-red-500 opacity-0 error-text">hidden</p>
            )}
          </div>
        </div>
*/}

        <div className="flex flex-col items-center justify-center w-full mt-3 space-y-6 kl:space-y-12 sm:mt-6 kl:mt-12">
          <div className="flex flex-col justify-between space-y-5 text-base kl:space-y-10 kl:text-3xl">
            <div className="flex flex-col">
              <label
                className={`text-sm kl:text-2xl uppercase ${
                  errors.newpassword ? "text-red-500" : "text-white"
                }`}
              >
                new password
              </label>
              <div className="mt-1 flex flex-row items-center justify-between w-[280px] xs:w-[300px] kl:w-[600px] px-2 kl:px-4 border-2 border-primary rounded-[8px] kl:rounded-4 space-x-1">
                <input
                  {...register("newpassword")}
                  type={isPasswordEyeOpen ? "text" : "password"}
                  className="py-1 pl-0 text-sm text-white bg-transparent border-0 outline-none ring-0 focus:ring-0 focus:outline-0 sm:text-base"
                />
                <div
                  className="hover:cursor-pointer"
                  onClick={() => setIsPasswordEyeOpen(!isPasswordEyeOpen)}
                >
                  {!isPasswordEyeOpen ? <EyeNotOpenIC /> : <EyeOpenIC />}
                </div>
              </div>
              {errors.newpassword && (
                <p className="text-red-500 error-text">
                  {errors.newpassword.message?.toString()}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label
                className={`text-sm kl:text-2xl uppercase ${
                  errors.confirmPassword ? "text-red-500" : "text-white"
                }`}
              >
                confirm new password
              </label>
              <div className="mt-1 flex flex-row items-center justify-between w-[280px] xs:w-[300px] kl:w-[600px] px-2 kl:px-4 border-2 border-primary rounded-[8px] kl:rounded-4 space-x-1">
                <input
                  {...register("confirmPassword")}
                  type={isPasswordConfirmEyeOpen ? "text" : "password"}
                  className="py-1 pl-0 text-sm text-white bg-transparent border-0 outline-none ring-0 focus:ring-0 focus:outline-0 sm:text-base"
                />
                <div
                  className="hover:cursor-pointer"
                  onClick={() =>
                    setIsPasswordConfirmEyeOpen(!isPasswordConfirmEyeOpen)
                  }
                >
                  {!isPasswordConfirmEyeOpen ? <EyeNotOpenIC /> : <EyeOpenIC />}
                </div>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 error-text">
                  {errors.confirmPassword.message?.toString()}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-transparent hover:bg-primary rounded-full w-[280px] xs:w-[300px] kl:w-[600px] py-2 sm:p-3 kl:p-6 uppercase text-white font-semibold tracking-widest border-2 border-primary text-sm sm:text-base kl:text-3xl"
          >
            Save and Login
          </button>
        </div>
      </div>
    </form>
  );
};
export default CreatePasswordForm;
