import { useState, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import useAuth from "@/hooks/useAuth";
import { AuthContext } from "@/contexts/AuthContext";

import { REMEMBER_ME_COOKIE } from "@/libs/constants";
import EyeNotOpenIC from "@/components/icons/EyeNotOpenIC";
import EyeOpenIC from "@/components/icons/EyeOpenIC";
import RightArrowIC from "@/components/icons/RightArrowIC";

const schema = yup.object().shape({
  username: yup
    .string()
    .email("Email is not valid.")
    .required("Email is required."),
  password: yup.string().required("Password is required."),
});

type loginProps = {
  loginData: {
    username: string;
    password: string;
  };
};
const LoginForm = ({ loginData }: loginProps) => {
  const authContext = useContext(AuthContext);
  const [isSigning, setIsSigning] = useState<boolean>(false);
  const [rememberMeChecked, setRememberMeChecked] = useState<boolean>(false);
  const [isPasswordEyeOpen, setIsPasswordEyeOpen] = useState<boolean>(false);

  const [isHovered, setIsHovered] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    values: loginData,
  });

  const auth = useAuth();

  const router = useRouter();

  const handleCheckboxChange = () => {
    setRememberMeChecked(!rememberMeChecked);
  };

  const onSubmitHandler = async (data: any) => {
    if (data.username && data.password) {
      setIsSigning(true);
      try {
        await auth.signInWithEmail(data.username, data.password);
        if (rememberMeChecked) {
          let loginData = {
            username: data.username,
            password: data.password,
          };
          // INSECURE
          Cookies.set(REMEMBER_ME_COOKIE, JSON.stringify(loginData), {
            expires: 30,
          });
        } else {
          Cookies.remove(REMEMBER_ME_COOKIE);
        }
        window.localStorage.setItem("password", data.password);
        const user = await auth.getUser();
        authContext.setUser(user);
        authContext.setIsLoggedIn(true);
        setIsSigning(false);
        router.push("/admin/dashboard");
      } catch (err: any) {
        console.log(`sign in failed ${err.code}`);

        setIsSigning(false);
        if (err.code === "UserNotConfirmedException") {
          router.push(`/auth/verify?email=${data.username}`);
        } else {
          toast.error(err.message, { theme: "colored" });
        }
      }
    } else {
      toast.error("Input valid data", { theme: "colored" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="w-[90%] xs:w-[80%] md:w-[60%] bg-black bg-opacity-60 rounded-3xl sm:rounded-[50px] kl:rounded-[100px] mx-auto px-4 td:px-[25px] kl:px-[50px] py-4 sm:py-8 kl:py-16"
    >
      <div className="flex justify-center text-center">
        <h1 className="text-primary text-2xl sm:text-3xl td:text-[35px] kl:text-[70px] font-semibold tracking-widest">
          Enter My Paxiv Experience
        </h1>
      </div>

      <div className="w-[95%] sm:w-[85%] td:w-[70%] flex justify-center text-center mt-3 xs:mt-6 kl:mt-12 mx-auto">
        <p className="text-sm text-white sm:text-lg kl:text-4xl">
          Log in to your Paxiv account and open the door to access the most
          exclusive network of qualified Commercial Real Estate leaders and
          organizations
        </p>
      </div>

      <div className="flex flex-col items-center justify-center w-full mt-4 space-y-6 text-white sm:mt-6 kl:mt-12 kl:space-y-12">
        <div className="flex flex-col justify-between space-y-3 sm:space-y-5 kl:space-y-10">
          <div className="flex flex-col mx-auto lg:mx-0">
            <label
              className={`text-sm kl:text-2xl uppercase ${
                errors.username ? "text-red-500" : "text-white"
              }`}
            >
              email
            </label>
            <input
              {...register("username")}
              type="text"
              className={`bg-transparent w-[280px] xs:w-[300px] kl:w-[600px] mt-2 kl:mt-4 px-3 kl:px-6 py-1 kl:py-2 border-2 rounded-[8px] kl:rounded-[16px] text-sm sm:text-base kl:text-3xl ${
                errors.username
                  ? "border-red-500 focus:border-red-500 focus:ring-0"
                  : "border-primary focus:ring-primary focus:border-primary"
              }`}
              disabled={isSigning}
            />
            {errors.username && (
              <p className="text-red-500 error-text">
                {errors.username.message?.toString()}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label
              className={`text-sm kl:text-2xl uppercase ${
                errors.password ? "text-red-500" : "text-white"
              }`}
            >
              password
            </label>
            <div
              className={`mt-2 kl:mt-4 flex flex-row items-center justify-between w-[280px] xs:w-[300px] kl:w-[600px] pr-2 kl:pr-4 border-2 rounded-[8px] kl:rounded-[16px] text-sm sm:text-base kl:text-3xl space-x-1 ${
                errors.password
                  ? "border-red-500 focus:border-red-500 focus:ring-0"
                  : "border-primary focus:ring-primary focus:border-primary"
              }`}
            >
              <input
                {...register("password")}
                type={isPasswordEyeOpen ? "text" : "password"}
                className="bg-transparent py-1 border-0 ring-0 rounded-[8px] kl:rounded-[16px] text-sm sm:text-base kl:text-3xl outline-none focus:ring-0"
                disabled={isSigning}
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
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6 space-x-2 kl:mt-12 kl:space-x-4">
        <div className="flex items-center space-x-2 kl:space-x-4">
          <input
            type="checkbox"
            name="rememberMe"
            checked={rememberMeChecked}
            onChange={handleCheckboxChange}
            className="w-3 h-3 bg-transparent cursor-pointer xs:w-4 kl:w-8 xs:h-4 kl:h-8 text-primary border-primary focus:ring-0 disabled:cursor-not-allowed"
            disabled={isSigning}
          />
          <label
            className="text-xs font-semibold text-white cursor-pointer xs:text-sm kl:text-2xl"
            onClick={() => handleCheckboxChange()}
          >
            Remember Me
          </label>
        </div>
        <button
          type="button"
          className="flex cursor-pointer"
          disabled={isSigning}
          onClick={(e: any) => {
            e.preventDefault();
            router.push("/auth/forgotPassword");
          }}
        >
          <span className="ml-2 text-sm font-semibold text-primary xs:text-base kl:text-3xl kl:ml-4">
            Forgot My Password?
          </span>
        </button>
      </div>

      <div className="flex justify-center mt-6">
        <button
          type="submit"
          disabled={isSigning}
          className="bg-transparent hover:bg-primary rounded-full w-[280px] xs:w-[300px] kl:w-[600px] py-2 sm:py-3 uppercase text-white font-semibold disabled:cursor-not-allowed disabled:opacity-70 border border-primary tracking-widest text-sm sm:text-base kl:text-3xl"
        >
          {isSigning ? "Logging in..." : "Login"}
        </button>
      </div>

      <Link href="/journey?w=apply" className="flex mt-6">
        <div
          className="w-[280px] xs:w-[300px] kl:w-[600px] flex items-center justify-center bg-transparent hover:bg-primary border-[2px] border-primary font-semibold px-5 py-2 sm:py-3 rounded-full mx-auto text-white tracking-widest text-sm sm:text-base kl:text-3xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button type="button" disabled={isSigning}>
            Apply Now
          </button>
          <RightArrowIC
            fill={`${isHovered ? "#fff" : "#fff"}`}
            className={`${!isHovered && "#fff"} ml-2 bi bi-arrow-right`}
          />
        </div>
      </Link>
    </form>
  );
};
export default LoginForm;
