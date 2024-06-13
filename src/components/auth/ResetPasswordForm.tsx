import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import useAuth from "@/hooks/useAuth";
import EyeNotOpenIC from "@/components/icons/EyeNotOpenIC";
import EyeOpenIC from "@/components/icons/EyeOpenIC";

const schema = yup.object().shape({
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
});

const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const auth = useAuth();
  const router = useRouter();
  const { email } = router.query;

  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);
  const input5Ref = useRef(null);
  const input6Ref = useRef(null);

  const [codeArray, setCodeArray] = useState<Array<number>>([]);
  const [codeError, setErrorCode] = useState<boolean>(false);
  const [isPasswordEyeOpen, setIsPasswordEyeOpen] = useState<boolean>(false);
  const [isPasswordConfirmEyeOpen, setIsPasswordConfirmEyeOpen] =
    useState<boolean>(false);

  const inputRefs = [
    input1Ref,
    input2Ref,
    input3Ref,
    input4Ref,
    input5Ref,
    input6Ref,
  ];

  const setNumber = (index: number, value: any) => {
    if (index < inputRefs.length) {
      const currentInputRef = inputRefs[index];

      if (
        // @ts-ignore
        currentInputRef.current.value.length <=
        // @ts-ignore
        currentInputRef.current.maxLength
      ) {
        if (index >= 0) {
          let tempCode = codeArray.slice();
          tempCode[index] = value;

          setCodeArray(tempCode);
          if (tempCode.length === 6) {
            setErrorCode(false);
          }
        }
        if (index < inputRefs.length - 1 && value !== "") {
          const nextInputRef = inputRefs[index + 1];
          // @ts-ignore
          nextInputRef.current.focus();
        }
      }
    }
  };

  const handlePaste = (event: any) => {
    event.preventDefault();
    // @ts-ignore
    const clipboardData = event.clipboardData || window.clipboardData;
    const pastedText = clipboardData.getData("text/plain");
    if (pastedText) {
      let tempCode: any[] = [];
      for (let i = 0; i < pastedText.length; i++) {
        const letter = pastedText[i];
        tempCode.push(letter);
      }

      setCodeArray(tempCode);
      if (tempCode.length === 6) {
        setErrorCode(false);
      }
    }
  };

  const onSubmitHandler = async (data: any) => {
    //@ts-ignore
    if (codeArray.includes("")) {
      toast.error("The code must be 6-digits!", { theme: "colored" });
    } else {
      try {
        if (email && typeof email == "string") {
          await auth.forgotPassword(email, codeArray.join(""), data.password);
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
    }
  };

  const handleErrors = () => {
    if (codeArray.length !== 6) {
      setErrorCode(true);
    } else {
      setErrorCode(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler, handleErrors)}
      className="w-[90%] xs:w-[80%] td:w-[60%] bg-black bg-opacity-60 rounded-3xl sm:rounded-[50px] kl:rounded-[100px] mx-auto px-[25px] kl:px-[50px] py-4 xs:py-8 kl:py-16"
    >
      <div className="flex flex-col">
        <div className="flex justify-center text-center">
          <h1 className="text-primary text-3xl sm:text-[35px] kl:text-[70px] font-semibold tracking-widest">
            Set up new password
          </h1>
        </div>

        <div className="flex justify-center text-center mt-6 kl:mt-12">
          <p className="text-white text-sm kl:text-3xl">Enter Code</p>
        </div>

        <div className="flex justify-center text-center mt-6 space-x-4">
          {Array(6)
            .fill(0)
            .map((item: any, idx: number) => (
              <div
                className="border-2 border-primary rounded-[8px] kl:rounded-4"
                key={idx}
              >
                <input
                  type="text"
                  className="bg-transparent text-white outline-none border-none w-[30px] ssm:w-[50px] kl:w-[100px] h-[30px] ssm:h-[50px] kl:h-[100px] text-center rounded-[8px] kl:rounded-4 focus:ring-0 focus:outline-none text-base kl:text-3xl"
                  maxLength={1}
                  value={codeArray[idx]}
                  ref={inputRefs[idx]}
                  onChange={(event) => setNumber(idx, event.target.value)}
                  onPaste={handlePaste}
                />
              </div>
            ))}
        </div>
        {codeError && (
          <div className="w-full flex justify-center mt-2">
            <p className="error-text text-red-500">Code is required</p>
          </div>
        )}

        <div className="flex justify-center text-center mt-8 kl:mt-16">
          <p className="text-white text-sm kl:text-3xl">Enter New Password</p>
        </div>

        <div className="w-full space-y-6 flex flex-col justify-center items-center mt-4 kl:mt-8">
          <div className="flex flex-col justify-between space-y-5 kl:space-y-10">
            <div className="flex flex-col">
              <label
                className={`text-sm kl:text-3xl uppercase ${
                  errors.password ? "text-red-500" : "text-white"
                }`}
              >
                new password
              </label>
              <div className="mt-1 kl:mt-2  flex flex-row items-center justify-between w-[280px] xs:w-[300px] kl:w-[600px] px-2 border-2 border-primary rounded-[8px] space-x-1 kl:space-x-2 text-white">
                <input
                  {...register("password")}
                  type={isPasswordEyeOpen ? "text" : "password"}
                  className="bg-transparent pl-0 py-1 border-0 ring-0 outline-none focus:ring-0 focus:outline-0 text-sm sm:text-base kl:text-3xl"
                />
                <div
                  className="hover:cursor-pointer"
                  onClick={() => setIsPasswordEyeOpen(!isPasswordEyeOpen)}
                >
                  {!isPasswordEyeOpen ? <EyeNotOpenIC /> : <EyeOpenIC />}
                </div>
              </div>
              {errors.password && (
                <p className="error-text text-red-500">
                  {errors.password.message?.toString()}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label
                className={`text-sm kl:text-3xl uppercase ${
                  errors.confirmPassword ? "text-red-500" : "text-white"
                }`}
              >
                confirm new password
              </label>
              <div className="mt-1 kl:mt-2 flex flex-row items-center justify-between w-[280px] xs:w-[300px] kl:w-[600px] px-2 border-2 border-primary rounded-[8px] space-x-1 kl:sapce-x-2 text-white">
                <input
                  {...register("confirmPassword")}
                  type={isPasswordConfirmEyeOpen ? "text" : "password"}
                  className="bg-transparent pl-0 py-1 border-0 ring-0 outline-none focus:ring-0 focus:outline-0 text-sm sm:text-base kl:text-3xl"
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
                <p className="error-text text-red-500">
                  {errors.confirmPassword.message?.toString()}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 kl:mt-12 flex justify-center">
          <button
            type="submit"
            className="bg-transparent hover:bg-primary rounded-full w-[280px] xs:w-[300px] kl:w-[600px] py-2 sm:p-3 kl:p-6 uppercase text-white border-2 border-primary text-sm sm:text-base kl:text-3xl"
          >
            Save and Login
          </button>
        </div>
      </div>
    </form>
  );
};
export default ResetPasswordForm;
