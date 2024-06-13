import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { FIRST_STEP, SECOND_STEP, THIRD_STEP } from "@/libs/constants";
import useMember from "@/hooks/useMember";
import { StepProps } from "@/pages/journey";

const DEFAULT_PURPOSE = {
  acquisition: false,
  disposition: false,
  jointventure: false,
  network: false,
};

const Utility = ({ setCurrentStepID, userInfo, setUserInfo }: StepProps) => {
  const [purpose, setPurpose] = useState<any>(
    userInfo?.purpose ?? { ...DEFAULT_PURPOSE }
  );
  const [error, setError] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const router = useRouter();
  const { w } = router.query;

  const { createJourneyPersonalInfo } = useMember();

  const gotoBeforeStep = () => {
    setCurrentStepID(FIRST_STEP);
  };

  const onSubmitHandler = async () => {
    const { acquisition, disposition, jointventure, network } = purpose;
    const isOk = acquisition || disposition || jointventure || network;
    if (!isOk) {
      setError(true);
    } else {
      setError(false);
      setIsSaving(true);
      let result = await createJourneyPersonalInfo({
        ...purpose,
        _id: userInfo._id,
        journeyStep: SECOND_STEP,
      });
      if (result.status === true) {
        setUserInfo({ ...userInfo, purpose });
        setCurrentStepID(THIRD_STEP);
      } else {
        toast.error("Try again later.", { theme: "colored" });
      }
      setIsSaving(false);
    }
  };

  const toggleAcquisition = () => {
    setPurpose({ ...purpose, acquisition: !purpose.acquisition });
  };

  const toggleDisposition = () => {
    setPurpose({ ...purpose, disposition: !purpose.disposition });
  };

  const toggleJointVenture = () => {
    setPurpose({ ...purpose, jointventure: !purpose.jointventure });
  };

  const toggleNetwork = () => {
    setPurpose({ ...purpose, network: !purpose.network });
  };

  return (
    <div className="w-[90%] xs:w-[80%] md:w-[60%] bg-black bg-opacity-60 rounded-3xl sm:rounded-[50px] kl:rounded-[100px] mx-auto px-[25px] kl:px-[50px] py-4 xs:py-8 kl:py-16">
      <div className="flex flex-col">
        <div className="flex justify-center text-center">
          <h1 className="text-primary text-2xl sm:text-3xl td:text-[35px] kl:text-[70px] font-semibold tracking-widest">
            {w === "apply" ? "Apply Now" : "Request a Demo"}
          </h1>
        </div>

        <div className="flex justify-center text-center mt-3 xs:mt-6">
          <p className="text-primary text-lg sm:text-xl td:text-3xl kl:text-6xl font-medium">
            {userInfo.personal.firstname + " " + userInfo.personal.lastname}
          </p>
        </div>

        <div className="flex justify-center text-center mt-3 xs:mt-6">
          <p className="text-white text-sm xs:text-base kl:text-3xl">
            Tell us more about how you anticipate utilizing Paxiv (check all
            that apply)
          </p>
        </div>

        <div className="w-full mt-6 space-y-6 flex flex-col justify-center items-center">
          <div className="flex flex-col justify-between space-y-3 xs:space-y-5">
            <div
              className={`flex space-x-2 kl:space-x-4 items-center ${
                isSaving && "pointer-events-none"
              }`}
            >
              <input
                type="checkbox"
                checked={purpose.acquisition}
                name="util0"
                onChange={() => toggleAcquisition()}
                className="bg-transparent w-4 kl:w-8 h-4 kl:h-8 text-primary border-primary focus:ring-0 cursor-pointer"
              />
              <label
                className="text-white text-sm kl:text-2xl cursor-pointer"
                onClick={() => toggleAcquisition()}
              >
                Seeking Exclusive Acquisition Opportunities
              </label>
            </div>
            <div
              className={`flex space-x-2 kl:space-x-4 items-center ${
                isSaving && "pointer-events-none"
              }`}
            >
              <input
                type="checkbox"
                checked={purpose.disposition}
                onChange={() => toggleDisposition()}
                name="util1"
                className="bg-transparent w-4 kl:w-8 h-4 kl:h-8 text-primary border-primary focus:ring-0 cursor-pointer"
              />
              <label
                className="text-white text-sm kl:text-2xl cursor-pointer"
                onClick={() => toggleDisposition()}
              >
                Seeking Disposition Opportunities
              </label>
            </div>
            <div
              className={`flex space-x-2 kl:space-x-4 items-center ${
                isSaving && "pointer-events-none"
              }`}
            >
              <input
                type="checkbox"
                checked={purpose.jointventure}
                onChange={() => toggleJointVenture()}
                name="util2"
                className="bg-transparent w-4 kl:w-8 h-4 kl:h-8 text-primary border-primary focus:ring-0 cursor-pointer"
              />
              <label
                className="text-white text-sm kl:text-2xl cursor-pointer"
                onClick={() => toggleJointVenture()}
              >
                Seeking Joint Venture Opportunities
              </label>
            </div>
            <div
              className={`flex space-x-2 kl:space-x-4 items-center ${
                isSaving && "pointer-events-none"
              }`}
            >
              <input
                type="checkbox"
                checked={purpose.network}
                onChange={() => toggleNetwork()}
                name="util3"
                className="bg-transparent w-4 kl:w-8 h-4 kl:h-8 text-primary border-primary focus:ring-0 cursor-pointer"
              />
              <label
                className="text-white text-base kl:text-3xl cursor-pointer"
                onClick={() => toggleNetwork()}
              >
                Seeking To Grow My Network
              </label>
            </div>
          </div>
          {error && (
            <p className="error-text text-red-600">
              You must select at least one
            </p>
          )}
        </div>

        <div className="mt-6 sm:mt-10 flex justify-center flex-col space-y-4">
          <button
            type="button"
            disabled={isSaving}
            className="bg-transparent hover:bg-primary rounded-full w-[280px] xs:w-[300px] kl:w-[600px] py-2 xs:p-3 kl:p-6 uppercase text-white font-semibold tracking-widest border border-primary mx-auto text-sm xs:text-base kl:text-3xl"
            onClick={() => gotoBeforeStep()}
          >
            Previous
          </button>
          <button
            type="button"
            disabled={isSaving}
            className="bg-transparent hover:bg-primary rounded-full w-[280px] xs:w-[300px] kl:w-[600px] py-2 xs: p-3 kl:p-6 uppercase text-white font-semibold tracking-widest border border-primary mx-auto text-sm xs:text-base kl:text-3xl"
            onClick={onSubmitHandler}
          >
            {isSaving ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Utility;
