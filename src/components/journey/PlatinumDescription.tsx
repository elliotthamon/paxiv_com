import { FIFTH_STEP, FOURTH_STEP, THIRD_STEP } from "@/libs/constants";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ThankYouModal from "@/components/journey/ThankYouModal";
import useMember from "@/hooks/useMember";
import SmallSpinner from "@/components/SmallSpinner";

import { StepProps, defaultUserInfo } from "@/pages/journey";

const PlatinumDescription = ({
  setCurrentStepID,
  userInfo,
  setUserInfo,
}: StepProps) => {
  const { createJourneyPersonalInfo } = useMember();

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isScroll, setIsScroll] = useState<boolean>(false);
  const [showThankYouModal, setShowThankYouModal] = useState<boolean>(false);

  const save = async (isCompleted: boolean) => {
    setIsSaving(true);
    const saveData = {
      _id: userInfo._id,
      journeyStep: FOURTH_STEP,
      isCompleted,
    };

    try {
      const result = await createJourneyPersonalInfo(saveData);

      if (!result.status) {
        toast.error(result.data, { theme: "colored" });
      } else {
        if (isCompleted) {
          setUserInfo({ ...defaultUserInfo });
          setShowThankYouModal(true);
          toast.success("Submitted successfully!", { theme: "colored" });
        } else {
          setUserInfo({ ...userInfo, ...saveData });
          setCurrentStepID(FIFTH_STEP);
        }
      }
    } catch (e: any) {
      toast.error(e.message, { theme: "colored" });
    }
    setIsSaving(false);
  };

  const handleSubmit = async () => save(false);

  const gotoBeforeStep = () => {
    setCurrentStepID(THIRD_STEP);
  };

  useEffect(() => {
    const content = document.querySelector(".platinum");
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
    <>
      <div className="w-[90%] xs:w-[80%] xl:w-[60%] bg-black bg-opacity-60 rounded-3xl sm:rounded-[50px] mx-auto px-3xs:px-[25px] py-4 xl:py-8">
        <div
          className={`w-full flex flex-col overflow-hidden ${
            isScroll && "h-signup-content"
          } platinum`}
        >
          <div className="flex justify-center text-center">
            <h1 className="text-primary text-2xl sm:text-3xl td:text-[35px] kl:text-[70px] font-semibold tracking-widest">
              Paxiv Priority Waitlist
            </h1>
          </div>
          <div className="text-sm td:text-base kl:text-3xl text-white w-[90%] mx-auto mt-4 lg:mt-8 kl:mt-16 space-y-3 lg:space-y-6 kl:space-y-12">
            <p>
              Paxiv maintains an exclusive membership consisting of a limited
              and select network of Development and CRE Private Equity groups
              per State. Each Paxiv team is dedicated & designed to meticulously
              support & oversee the success of our select members, catering to
              each of their diverse needs. In order to reserve a coveted spot on
              our waitlist and demonstrate your earnest interest, we request a
              nominal application fee of $10.
            </p>
            <p>
              Should you not meet our admission criteria or choose to withdraw
              your reservation, please be assured that once we are notified,
              your application fee will be promptly and fully refunded, without
              any requirement for further explanation
            </p>
            <p>
              Paxiv operates as an exclusive network, accessible by application
              or invitation only. We take great pride in the quality of service
              we offer and the value we bring to our esteemed members. In order
              to ensure that each member receives the highest level of
              individual attention and care, we have deliberately limited our
              available memberships. If your application is approved, your
              position on the waitlist will determine when you are contacted
              with the opportunity to join Paxiv and gain access to our
              comprehensive offerings.
            </p>
          </div>
          <div className="flex justify-center text-center mt-3 sm:mt-6 kl:mt-12">
            <p className="text-white text-base xs:text-xl kl:text-4xl w-[600px] kl:w-[1200px] font-semibold sm:font-normal">
              Join Priority Waitlist?
            </p>
          </div>
          <div className="mt-6 sm:mt-10 kl:mt-20 flex justify-center flex-row space-x-3 sm:space-x-10 px-4">
            <button
              type="button"
              disabled={isSaving}
              className="bg-transparent hover:bg-primary rounded-full w-[300px] kl:w-[600px] py-2 xs:p-3 kl:p-6 uppercase text-white font-semibold tracking-widest border border-primary text-sm sm:text-base kl:text-3xl"
              onClick={() => gotoBeforeStep()}
            >
              No
            </button>
            <button
              type="button"
              disabled={isSaving}
              className="bg-transparent hover:bg-primary rounded-full w-[300px] kl:w-[600px] py-2 xs:p-3 kl:p-6 uppercase text-white font-semibold tracking-widest border border-primary text-sm sm:text-base kl:text-3xl"
              onClick={() => handleSubmit()}
            >
              {isSaving ? <SmallSpinner /> : "Yes"}
            </button>
          </div>
        </div>
      </div>

      <ThankYouModal
        showThankYouModal={showThankYouModal}
        setShowThankYouModal={setShowThankYouModal}
        isDemoRequest={true}
      />
    </>
  );
};
export default PlatinumDescription;
