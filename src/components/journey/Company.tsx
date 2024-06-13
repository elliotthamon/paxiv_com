import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ThankYouModal from "@/components/journey/ThankYouModal";

import {
  FOURTH_STEP,
  SECOND_STEP,
  THIRD_STEP,
  assetLevels,
  assetTypes,
} from "@/libs/constants";

import useMember from "@/hooks/useMember";
import { StepProps, defaultUserInfo } from "@/pages/journey";
import { PickMany } from "@/components/widgets/PickMany";
import { PickOne } from "@/components/widgets/PickOne";

const assetLevelSchema = yup
  .string()
  .oneOf(assetLevels.map((a) => a[0]))
  .required("Total Asset under management is required");

const assetTypeSchema = yup
  .array(yup.string().oneOf(assetTypes))
  .min(1, "At least one asset type is required")
  .max(assetTypes.length);

const schema = yup.object().shape({
  companyName: yup.string().required("Company Name is required."),
  companyWebsite: yup
    .string()
    .matches(
      /^(https?:\/\/)?(?:[-A-Za-z0-9]+\.)+[A-Za-z]{2,6}$/,
      "Please enter a valid URL or domain"
    )
    .required("Company Website is required."),
  assetType: assetTypeSchema,
  totalAsset: assetLevelSchema,
});

const Company = ({ setCurrentStepID, userInfo, setUserInfo }: StepProps) => {
  const router = useRouter();
  const { w } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    values: userInfo.company,
    resetOptions: {
      keepDirtyValues: true,
      keepErrors: false,
    },
  });

  const { createJourneyPersonalInfo } = useMember();

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [showThankYouModal, setShowThankYouModal] = useState<boolean>(false);

  const [isDemoRequest, setDemoRequest] = useState<boolean>(false);

  const gotoBeforeStep = () => {
    setCurrentStepID(SECOND_STEP);
  };

  const onSubmitHandler = async (data: any) => {
    setIsSaving(true);
    try {
      const isCompleted = data.totalAsset === "100" || w === "request";

      let result = await createJourneyPersonalInfo({
        ...data,
        _id: userInfo._id,
        isCompleted,
        journeyStep: THIRD_STEP,
      });
      if (result.status === true) {
        if (isCompleted) {
          setDemoRequest(true);
          setShowThankYouModal(true);
          toast.success("Successfully submitted", { theme: "colored" });
          setUserInfo({ ...defaultUserInfo });
        } else {
          setUserInfo({ ...userInfo, company: { ...data } });
          setCurrentStepID(FOURTH_STEP);
        }
      } else {
        toast.error(
          "There was a problem recording your information. Please try again later.",
          { theme: "colored" }
        );
      }
    } catch (e: any) {
      toast.error(e.message, { theme: "colored" });
    }
    setIsSaving(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="w-[90%] xs:w-[80%] md:w-[60%] bg-black bg-opacity-60 rounded-3xl sm:rounded-[50px] kl:rounded-[100px] mx-auto px-0 sm:px-[25px] kl:px-[50px] py-4 sm:py-8 kl:py-16"
      >
        <div className="relative sm:mt-8 lg:mt-0">
          <div className="flex flex-col">
            <div className="flex justify-center text-center">
              <h1 className="text-primary text-2xl sm:text-3xl td:text-[35px] kl:text-[70px] font-semibold tracking-widest">
                {w === "apply" ? "Apply Now" : "Request a Demo"}
              </h1>
            </div>

            <div className="w-[90%] xl:w-[80%] mx-auto">
              <div className="w-full mt-3 sm:mt-6 kl:mt-12 space-y-6 flex flex-col justify-center items-center">
                <div className="w-full flex flex-col sm:flex-row justify-between space-x-0 sm:space-x-10 space-y-2 sm:space-y-0">
                  <div className="w-full flex-col lg:mx-0">
                    <label
                      className={`text-sm sm:text-base kl:text-3xl uppercase ${
                        errors.companyName ? "text-red-500" : "text-white"
                      }`}
                    >
                      Company Name
                    </label>
                    <input
                      {...register("companyName")}
                      type="text"
                      disabled={isSaving}
                      className={`bg-transparent w-full mt-2 kl:mt-4 px-3 kl:px-6 py-1 kl:py-2 border-2 rounded-[8px] ${
                        errors.companyName
                          ? "border-red-600 focus:border-red-600 focus:ring-0"
                          : "border-primary focus:ring-primary focus:border-primary"
                      } text-white  text-sm sm:text-base kl:text-3xl`}
                      placeholder="Enter Company Name"
                    />
                    {errors.companyName && (
                      <p className="error-text text-red-500">
                        {errors.companyName.message?.toString()}
                      </p>
                    )}
                  </div>
                  <div className="w-full">
                    <label
                      className={`text-sm sm:text-base kl:text-3xl uppercase ${
                        errors.companyWebsite ? "text-red-500" : "text-white"
                      }`}
                    >
                      company website
                    </label>
                    <input
                      {...register("companyWebsite")}
                      type="text"
                      disabled={isSaving}
                      className={`bg-transparent w-full mt-2 kl:mt-4 px-3 kl:px-6 py-1 kl:py-2 border-2 rounded-[8px] ${
                        errors.companyWebsite
                          ? "border-red-600 focus:border-red-600 focus:ring-0"
                          : "border-primary focus:ring-primary focus:border-primary"
                      } text-white text-sm sm:text-base kl:text-3xl`}
                      placeholder="Enter Company Website"
                    />
                    {errors.companyWebsite && (
                      <p className="error-text text-red-500">
                        {errors.companyWebsite.message?.toString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div
                className={`mt-3 sm:mt-6 kl:mt-12 flex flex-row ${
                  isSaving && "pointer-events-none"
                }`}
              >
                <div className="flex flex-col">
                  <h1
                    className={`text-sm sm:text-base kl:text-3xl uppercase ${
                      errors.assetType ? "text-red-500" : "text-white"
                    }`}
                  >
                    type of assets
                  </h1>

                  <Controller
                    control={control}
                    name="assetType"
                    render={({ field: { value, onChange } }) => (
                      <PickMany
                        value={value}
                        setValue={onChange}
                        options={assetTypes}
                      />
                    )}
                  />
                  {errors.assetType && (
                    <p className="error-text text-red-500">
                      {errors.assetType.message?.toString()}
                    </p>
                  )}
                </div>
              </div>

              <div
                className={`mt-6 kl:mt-12 flex flex-row ${
                  isSaving && "pointer-events-none"
                }`}
              >
                <div className="flex flex-col">
                  <h1
                    className={`text-sm sm:text-base kl:text-3xl uppercase ${
                      errors.totalAsset ? "text-red-500" : "text-white"
                    }`}
                  >
                    Total Assets Under Management
                  </h1>
                  <Controller
                    control={control}
                    name="totalAsset"
                    render={({ field: { value, onChange } }) => (
                      <PickOne
                        value={value}
                        setValue={onChange}
                        options={assetLevels}
                      />
                    )}
                  />
                  {errors.totalAsset && (
                    <p className="error-text text-red-500">
                      {errors.totalAsset.message?.toString()}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-10 kl:mt-20 flex justify-center flex-row space-x-6 kl:space-x-12">
              <button
                type="button"
                disabled={isSaving}
                className="bg-transparent hover:bg-primary border-2 border-primary rounded-full px-10 kl:px-20 py-2 kl:py-4 uppercase text-primary hover:text-white text-sm sm:text-base kl:text-3xl font-semibold"
                onClick={() => gotoBeforeStep()}
              >
                Previous
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="bg-transparent hover:bg-primary border-2 border-primary rounded-full px-10 kl:px-20 py-2 kl:py-4 uppercase text-primary hover:text-white text-sm sm:text-base kl:text-3xl font-semibold"
              >
                {isSaving ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </form>

      <ThankYouModal
        showThankYouModal={showThankYouModal}
        setShowThankYouModal={setShowThankYouModal}
        isDemoRequest={isDemoRequest}
      />
    </>
  );
};

export default Company;
