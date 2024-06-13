import { Dispatch, SetStateAction, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import { StepProps } from "@/pages/journey";
import { FIRST_STEP, SECOND_STEP } from "@/libs/constants";
import useMember from "@/hooks/useMember";

// import { AdminUpdateAuthEventFeedbackCommand } from "@aws-sdk/client-cognito-identity-provider";

const schema = yup.object().shape({
  firstname: yup.string().required("First Name is required."),
  lastname: yup.string().required("Last Name is required."),
  email: yup
    .string()
    .email("Email is not valid.")
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
  acceptTermsandConditions: yup
    .bool()
    .oneOf([true], "You must accept our terms of Use.")
    .required(),
});

const RequestDemo = ({
  setCurrentStepID,
  userInfo,
  setUserInfo,
}: StepProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    values: userInfo.personal,
  });

  const { w } = useRouter().query;
  const { createJourneyPersonalInfo } = useMember();

  const [isSaving, setIsSaving] = useState<boolean>(false);

  const onSubmitHandler = async (data: any) => {
    setIsSaving(true);
    const submit = { ...data, _id: data._id, journeyStep: FIRST_STEP };
    const result = await createJourneyPersonalInfo(submit);
    if (result.status === true) {
      setUserInfo({
        ...userInfo,
        _id: result.data._id,
        personal: data,
      });
      setIsSaving(false);
      setCurrentStepID(SECOND_STEP);
    } else {
      setIsSaving(false);
      toast.error(result.data, { theme: "colored" });
      setValue("firstname", "");
      setValue("lastname", "");
      setValue("email", "");
      setValue("phone", "");
      setValue("acceptTermsandConditions", false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="w-[90%] xs:w-[80%] md:w-[60%] bg-black bg-opacity-60 rounded-3xl sm:rounded-[50px] kl:rounded-[100px] mx-auto px-[25px] kl:px-[50px] py-4 xs:py-8 kl:py-16"
    >
      <div className="flex justify-center text-center">
        <h1 className="text-primary text-2xl sm:text-3xl td:text-[35px] kl:text-[70px] font-semibold tracking-widest">
          {w === "apply" ? "Apply Now" : "Request a Demo"}
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center w-full mt-6 space-y-6 kl:mt-12 kl:space-y-6">
        <div className="flex flex-col justify-between space-y-5">
          <div className="flex flex-col mx-auto lg:mx-0">
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
              className={`bg-transparent w-[280px] xs:w-[300px] kl:w-[600px] mt-2 kl:mt-4 px-3 kl:px-6 py-1 border-2 rounded-[8px] ${
                errors.firstname
                  ? "border-red-500 focus:border-red-500 focus:ring-0"
                  : "border-primary focus:ring-primary focus:border-primary"
              } text-white placeholder-gray-400 text-sm xs:text-base kl:text-3xl`}
              disabled={isSaving}
              placeholder="Enter First Name"
            />
            {errors.firstname && (
              <p className="text-red-500 error-text">
                {errors.firstname.message?.toString()}
              </p>
            )}
          </div>
          <div className="flex flex-col mx-auto mt-6 lg:mx-0 kl:mt-12">
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
              className={`bg-transparent w-[280px] xs:w-[300px] kl:w-[600px] mt-2 kl:mt-4 px-3 kl:px-6 py-1 border-2 rounded-[8px] ${
                errors.lastname
                  ? "border-red-500 focus:border-red-500 focus:ring-0"
                  : "border-primary focus:ring-primary focus:border-primary"
              } text-white placeholder-gray-400 text-sm xs:text-base kl:text-3xl`}
              disabled={isSaving}
              placeholder="Enter Last Name"
            />
            {errors.lastname && (
              <p className="text-red-500 error-text">
                {errors.lastname.message?.toString()}
              </p>
            )}
          </div>
          <div className="flex flex-col mx-auto mt-6 lg:mx-0 kl:mt-12">
            <label
              className={`text-sm kl:text-2xl uppercase ${
                errors.email ? "text-red-500" : "text-white"
              }`}
            >
              email
            </label>
            <input
              {...register("email")}
              type="text"
              className={`bg-transparent w-[280px] xs:w-[300px] kl:w-[600px] mt-2 kl:mt-4 px-3 kl:px-6 py-1 border-2 rounded-[8px] ${
                errors.email
                  ? "border-red-500 focus:border-red-500 focus:ring-0"
                  : "border-primary focus:ring-primary focus:border-primary"
              } text-white placeholder-gray-400 text-sm xs:text-base kl:text-3xl`}
              disabled={isSaving}
              placeholder="Enter Email"
            />
            {errors.email && (
              <p className="text-red-500 error-text">
                {errors.email.message?.toString()}
              </p>
            )}
          </div>
          <div className="flex flex-col mx-auto mt-6 lg:mx-0 kl:mt-12">
            <label
              className={`text-sm kl:text-2xl uppercase ${
                errors.phone ? "text-red-500" : "text-white"
              }`}
            >
              phone
            </label>
            <input
              {...register("phone")}
              type="text"
              className={`bg-transparent w-[280px] xs:w-[300px] kl:w-[600px] mt-2 kl:mt-4 px-3 kl:px-6 py-1 border-2 rounded-[8px] ${
                errors.phone
                  ? "border-red-500 focus:border-red-500 focus:ring-0"
                  : "border-primary focus:ring-primary focus:border-primary"
              } text-white placeholder-gray-400 text-sm xs:text-base kl:text-3xl`}
              disabled={isSaving}
              placeholder="Enter Phone Number"
            />
            {errors.phone && (
              <p className="text-red-500 error-text">
                {errors.phone.message?.toString()}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-6 kl:mt-12">
        <div className="bg-transparent w-[280px] xs:w-[300px] kl:w-[600px] mx-auto flex space-x-2">
          <input
            {...register("acceptTermsandConditions")}
            type="checkbox"
            className="w-4 h-4 bg-transparent cursor-pointer kl:w-8 kl:h-8 text-primary border-primary focus:ring-0"
            disabled={isSaving}
          />
          <label className="text-sm text-white kl:text-2xl">
            Agree to the &nbsp;
            <Link
              href="/terms"
              target="_blank"
              className={`underline font-semibold ${
                isSaving && "cursor-not-allowed"
              }`}
            >
              Terms of Use
            </Link>
          </label>
        </div>
        {errors.acceptTermsandConditions && (
          <p className="w-[280px] xs:w-[300px] kl:w-[600px] mx-auto error-text text-red-500">
            {errors.acceptTermsandConditions.message?.toString()}
          </p>
        )}
      </div>

      <div className="flex flex-col justify-center mt-6 kl:mt-12">
        <button
          type="submit"
          disabled={isSaving}
          className="bg-transparent hover:bg-primary rounded-[30px] w-[280px] xs:w-[300px] kl:w-[600px] py-2 sm:p-3 kl:p-6 uppercase text-white font-semibold tracking-widest border border-primary mx-auto text-sm xs:text-base kl:text-3xl"
        >
          {isSaving ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
};
export default RequestDemo;
