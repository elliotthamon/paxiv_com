import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from "@/hooks/useAuth";

import EyeNotOpenIC from "@/components/icons/EyeNotOpenIC";
import EyeOpenIC from "@/components/icons/EyeOpenIC";

const schema = yup.object().shape({
  firstname: yup.string().required("First Name is required."),
  lastname: yup.string().required("Last Name is required."),
  email: yup
    .string()
    .email("Email is not valid")
    .required("Email is required."),
  companyName: yup.string().required("Company Name is required."),
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
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null || ""], "Passwords must be matched.")
    .required("Confirm password is required."),
  acceptTermsandConditions: yup
    .bool()
    .oneOf([true], "You must accept our terms & conditions.")
    .required(),
});

const SignupForm = () => {
  const auth = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isRegisteration, setIsRegisteration] = useState<boolean>(false);
  const [isPasswordEyeOpen, setIsPasswordEyeOpen] = useState<boolean>(false);
  const [isPasswordConfirmEyeOpen, setIsPasswordConfirmEyeOpen] =
    useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isScroll, setIsScroll] = useState<boolean>(false);

  const onSubmitHandler = (data: any) => {
    let email = data.email;
    if (email) {
      // const newPassword = generatePassword();
      const newPassword = data.password;
      handleRegister(email, newPassword);
    }
  };

  const handleRegister = async (email: string, password: string) => {
    try {
      setIsRegisteration(true);
      await auth.signUpWithEmail(email, password);
      toast.success("Registration Successful!", { theme: "colored" });
      setIsRegisteration(false);
      reset();
    } catch (err) {
      setIsRegisteration(false);
      if (err instanceof Error) {
        toast.error(err.message, { theme: "colored" });
      }
    }
  };

  useEffect(() => {
    const content = document.querySelector(".signup");
    const content_length = content?.clientHeight || 0;
    const screen_height = window.innerHeight;
    if (screen_height - 200 < content_length) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="w-[90%] sm:w-[638px] md:w-[80%] xl:w-[60%] bg-black bg-opacity-60 rounded-xl xs:rounded-[25px] sm:rounded-[50px] kl:rounded-[100px] mx-auto px-1 sm:px-[25px] kl:px-[50px]  py-4 sm:py-8 kl:py-16"
    >
      <div
        className={`flex flex-col overflow-hidden ${
          isScroll && "h-signup-content"
        } signup`}
      >
        <div className="flex justify-center text-center">
          <h1 className="text-primary text-2xl sm:text-3xl td:text-[35px] kl:text-[70px] font-semibold tracking-widest">
            Apply
          </h1>
        </div>

        <div className="flex justify-center mt-6 text-center kl:mt-12">
          <p className="text-white text-sm sm:text-base kl:text-3xl w-[90%] md:w-[60%]">
            Paxiv members are admitted by application or invitation only. Apply
            below and one of our team members will reach out shortly
          </p>
        </div>

        <div className="flex flex-col items-center justify-center w-full mt-6 space-y-6 kl:mt-12 kl:space-y-12">
          <div className="flex flex-col justify-between space-x-0 space-y-2 text-sm sm:flex-row sm:space-x-2 sm:space-y-0 sm:text-base kl:text-3xl">
            <div className="flex flex-col mx-auto md:mx-0">
              <label
                className={`text-sm kl:text-2xl uppercase ${
                  errors.firstname ? "text-red-500" : "text-white"
                }`}
              >
                first name
              </label>
              <input
                {...register("firstname")}
                type="text"
                className={`bg-transparent w-[280px] xs:w-[300px] kl:w-[600px] mt-2 px-3 py-1 border-2  rounded-[8px] ${
                  errors.firstname
                    ? "border-red-500 focus:border-red-500 focus:ring-0"
                    : "border-primary focus:ring-primary focus:border-primary"
                } text-white text-sm sm:text-base kl:text-3xl`}
              />
              {errors.firstname && (
                <p className="text-red-500 error-text">
                  {errors.firstname.message?.toString()}
                </p>
              )}
            </div>
            <div className="flex flex-col mt-4 md:mt-0">
              <label
                className={`text-sm kl:text-2xl uppercase ${
                  errors.lastname ? "text-red-500" : "text-white"
                }`}
              >
                last name
              </label>
              <input
                {...register("lastname")}
                type="text"
                className={`bg-transparent w-[280px] xs:w-[300px] kl:w-[600px] mt-2 px-3 py-1 border-2  rounded-[8px] ${
                  errors.lastname
                    ? "border-red-500 focus:border-red-500 focus:ring-0"
                    : "border-primary focus:ring-primary focus:border-primary"
                } text-white text-sm sm:text-base kl:text-3xl`}
              />
              {errors.lastname && (
                <p className="text-red-500 error-text">
                  {errors.lastname.message?.toString()}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-between space-x-0 space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
            <div className="flex flex-col">
              <label
                className={`text-sm kl:text-2xl uppercase ${
                  errors.email ? "text-red-500" : "text-white"
                }`}
              >
                email address
              </label>
              <input
                {...register("email")}
                type="text"
                className={`bg-transparent w-[280px] xs:w-[300px] kl:w-[600px] mt-2 px-3 py-1 border-2 rounded-[8px] ${
                  errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-0"
                    : "border-primary focus:ring-primary focus:border-primary"
                } text-white text-sm sm:text-base kl:text-3xl`}
              />
              {errors.email && (
                <p className="text-red-500 error-text">
                  {errors.email.message?.toString()}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label
                className={`text-sm kl:text-2xl uppercase ${
                  errors.companyName ? "text-red-500" : "text-white"
                } text-white text-sm sm:text-base kl:text-3xl`}
              >
                company name
              </label>
              <input
                {...register("companyName")}
                type="text"
                className={`bg-transparent w-[280px] xs:w-[300px] kl:w-[600px] mt-2 px-3 py-1 border-2  rounded-[8px] ${
                  errors.companyName
                    ? "border-red-500 focus:border-red-500 focus:ring-0"
                    : "border-primary focus:ring-primary focus:border-primary"
                } text-white text-sm sm:text-base kl:text-3xl`}
              />
              {errors.companyName && (
                <p className="text-red-500 error-text">
                  {errors.companyName.message?.toString()}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-between space-x-0 space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
            <div className="flex flex-col">
              <label
                className={`text-sm kl:text-2xl uppercase ${
                  errors.password ? "text-red-500" : "text-white"
                }`}
              >
                password
              </label>
              <div
                className={`mt-2 flex flex-row items-center justify-between w-[280px] xs:w-[300px] kl:w-[600px] px-2 border-2 rounded-[8px] space-x-1 ${
                  errors.password
                    ? "border-red-500 focus:border-red-500 focus:ring-0"
                    : "border-primary focus:ring-primary focus:border-primary"
                }`}
              >
                <input
                  {...register("password")}
                  type={!isPasswordEyeOpen ? "password" : "text"}
                  className="px-0 py-1 text-sm text-white bg-transparent border-0 outline-none ring-0 focus:border-red-500 focus:ring-0 sm:text-base kl:text-3xl"
                />
                <div
                  onClick={() => setIsPasswordEyeOpen(!isPasswordEyeOpen)}
                  className="hover:cursor-pointer"
                >
                  {!isPasswordEyeOpen ? <EyeNotOpenIC /> : <EyeOpenIC />}
                </div>
              </div>
              {errors.password && (
                <p className="text-red-500 error-text">
                  {errors.password.message?.toString()}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label
                className={`text-sm kl:text-2xl uppercase ${
                  errors.confirmPassword ? "text-red-500" : "text-white"
                }`}
              >
                confirm password
              </label>
              <div
                className={`mt-2 flex flex-row items-center justify-between w-[280px] xs:w-[300px] kl:w-[600px] px-2 border-2 rounded-[8px] space-x-1 ${
                  errors.confirmPassword
                    ? "border-red-500 focus:border-red-500 focus:ring-0"
                    : "border-primary focus:ring-primary focus:border-primary"
                } text-white text-sm sm:text-base kl:text-3xl`}
              >
                <input
                  {...register("confirmPassword")}
                  type={!isPasswordConfirmEyeOpen ? "password" : "text"}
                  className="px-0 py-1 text-sm bg-transparent border-0 outline-none ring-0 focus:ring-0 focus:outline-none sm:text-base kl:text-3xl"
                />
                <div
                  onClick={() =>
                    setIsPasswordConfirmEyeOpen(!isPasswordConfirmEyeOpen)
                  }
                  className="hover:cursor-pointer"
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

        <div className="flex flex-col m-auto mt-6 space-y-4 kl:mt-12">
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              name="update"
              className="w-3 h-3 bg-transparent cursor-pointer sm:w-4 kl:w-8 sm:h-4 kl:h-8 text-primary border-primary focus:ring-0"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            <label
              className="text-sm text-white cursor-pointer kl:text-2xl"
              onClick={() => setIsChecked(!isChecked)}
            >
              I want to receive product updates and information about campaigns
            </label>
          </div>
          <div>
            <div className="flex items-center space-x-4">
              <input
                {...register("acceptTermsandConditions")}
                type="checkbox"
                className="w-3 h-3 bg-transparent cursor-pointer sm:w-4 kl:w-8 sm:h-4 kl:h-8 text-primary border-primary focus:ring-0"
              />
              <div className="flex flex-col">
                <label className="text-sm text-white kl:text-2xl">
                  I accept the &nbsp;
                  <Link
                    href="/terms"
                    target="_blank"
                    className="font-semibold cursor-pointer text-primary"
                  >
                    Terms of service
                  </Link>
                </label>
              </div>
            </div>
            {errors.acceptTermsandConditions && (
              <p className="text-red-500 error-text">
                {errors.acceptTermsandConditions.message?.toString()}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-6 kl:mt-12">
          <button
            type="submit"
            disabled={isRegisteration ? true : false}
            className={`bg-transparent hover:bg-primary ${
              isRegisteration
                ? "hover: cursor-not-allowed opacity-80"
                : "opacity-100"
            } rounded-full w-[280px] xs:w-[300px] kl:w-[600px] py-2 sm:p-3 kl:p-6 uppercase text-white border-2 border-primary text-sm sm:text-base kl:text-3xl`}
          >
            {isRegisteration ? "Applying" : "Apply"}
          </button>
        </div>

        <div className="flex justify-center mt-4 smLmt-6 kl:mt-12 whitespace-nowrap">
          <div className="text-sm text-white kl:text-2xl">
            Already have an account?
            <Link href="/auth/login">
              <span className="ml-2 text-sm font-semibold text-primary sm:text-base sm:font-medium kl:text-3xl kl:ml-4">
                Signin
              </span>
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};
export default SignupForm;
