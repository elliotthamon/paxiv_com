import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import CheckoutForm from "@/components/journey/CheckoutForm";

import { yupResolver } from "@hookform/resolvers/yup";
import useMember from "@/hooks/useMember";
import { FIFTH_STEP, JOURNEY_MEMBER_INFO, FOURTH_STEP } from "@/libs/constants";
import ThankYouModal from "@/components/journey/ThankYouModal";
import { StepProps, UserInfoType } from "@/pages/journey";
import SmallSpinner from "@/components/SmallSpinner";

const schema = yup.object().shape({
  companyName: yup.string().required("Company Name is required."),
});

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const Bill = ({ setCurrentStepID, userInfo, setUserInfo }: StepProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    values: { companyName: "" },
  });

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [showThankYouModal, setShowThankYouModal] = useState<boolean>(false);
  const [paySuccess, setPaySuccess] = useState<boolean>(false);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntent, setPaymentIntent] = useState<string>();
  const [payment, setPayment] = useState<any>({});

  const [isScroll, setIsScroll] = useState<boolean>(false);

  const { createJourneyPersonalInfo } = useMember();

  const onSubmitHandler = async () => {
    let info = localStorage.getItem(JOURNEY_MEMBER_INFO);
    if (!info) {
      router.push("/");
      // toast.error("Fetch error, Tray again", { theme: "colored" });
    } else {
      localStorage.clear();

      setIsSaving(true);

      const memberInfo = JSON.parse(info as any) as UserInfoType;
      setUserInfo(memberInfo);

      const saveData = {
        _id: memberInfo._id,
        paymentStatus: true,
        isCompleted: true,
        journeyStep: FIFTH_STEP,
      };

      try {
        const result = await createJourneyPersonalInfo(saveData);
        if (result.status) {
          setShowThankYouModal(true);
          setIsSaving(false);
          router.push("/");
          toast.success("Successfully submitted", { theme: "colored" });
        } else {
          setIsSaving(false);
          toast.error(result.data, { theme: "colored" });
        }
      } catch {
        setIsSaving(false);
        toast.error("Try again later", { theme: "colored" });
      }
    }
  };

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  const gotoBeforeStep = () => {
    setCurrentStepID(FOURTH_STEP);
  };

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ member: userInfo }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        setPaymentIntent(data.paymentIntent);
        setUserInfo({ ...userInfo, stripeId: data.customerId });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (payment?.status) {
      setIsSaving(true);
      if (payment?.status === "succeeded") {
        onSubmitHandler();
        setShowThankYouModal(true);
      } else {
        toast.info("Your payment was not successful, please try again.", {
          theme: "colored",
        });
      }
      setIsSaving(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payment]);

  useEffect(() => {
    const handleResize = () => {
      const screenHeight = window.innerHeight;
      const content = document.querySelector(".bill-content");
      const content_length = content?.clientHeight || 0;

      if (screenHeight - 200 < content_length) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };

    window.addEventListener("resize", handleResize);

    const saveInterval = setInterval(() => {
      handleResize();
    }, 500);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(saveInterval);
    };
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className={`w-[90%] xs:w-[80%] md:w-[60%] bg-black bg-opacity-60 rounded-3xl sm:rounded-[50px] kl:rounded-[100px] mx-auto px-3 sm:px-[25px] kl:px-[50px] py-4 kl:py-8 bill-content`}
      >
        <div className={`relative ${isScroll && "h-bill-content"}`}>
          <div className="w-full">
            <div className="flex flex-col px-4 xs:px-0">
              <div className="flex justify-center text-center">
                <h1 className="text-primary text-2xl sm:text-3xl td:text-[35px] kl:text-[70px] font-semibold tracking-widest">
                  Reserve Waitlist Position
                </h1>
              </div>

              {isSaving ? (
                <SmallSpinner />
              ) : (
                <>
                  <div className="flex justify-center mt-6 text-center kl:mt-12">
                    <p className="text-white text-sm sm:text-base kl:text-3xl w-[90%] sm:w-[80%]">
                      Paxiv requires your billing information and will process a
                      $10 fee to reserve your position on our waitlist.
                    </p>
                  </div>

                  <div className="flex flex-col items-center justify-center w-full mt-4 space-y-6 sm:mt-6 kl:mt-12 kl:space-y-12">
                    <div className="w-full text-xs text-center text-white sm:text-sm kl:text-2xl">
                      PAXIV WILL NOT PROCESS ANY ADDITIONAL CHARGES PRIOR TO
                      YOUR APPLICATION ACCEPTANCE AND APPROVAL. IF YOU ARE NOT
                      ACCEPTED, PAXIV WILL REFUND YOUR RESERVATION FEE.
                    </div>
                  </div>

                  {payment?.status !== "succeeded" && (
                    <div className="w-[90%] sm:w-[80%] mx-auto py-3 sm:py-4 kl:py-8">
                      {clientSecret && (
                        // @ts-ignore
                        <Elements options={options} stripe={stripePromise}>
                          <CheckoutForm
                            paymentIntent={paymentIntent}
                            paySuccess={paySuccess}
                            setPaySuccess={setPaySuccess}
                            setIsSaving={setIsSaving}
                            userInfo={userInfo}
                            onSubmitHandler={onSubmitHandler}
                            setUserInfo={setUserInfo}
                            setPayment={setPayment}
                          />
                        </Elements>
                      )}

                      <div className="flex flex-row justify-center mt-5 space-x-2 kl:space-x-4 sm:mt-10 kl:mt-20">
                        <button
                          type="button"
                          disabled={isSaving}
                          className="px-10 py-1 text-sm font-semibold tracking-widest uppercase bg-transparent border-2 rounded-full hover:bg-btnHover border-primary kl:px-20 sm:py-2 kl:py-4 text-primary hover:text-white sm:text-base kl:text-3xl"
                          onClick={() => gotoBeforeStep()}
                        >
                          Previous
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </form>

      <ThankYouModal
        showThankYouModal={showThankYouModal}
        setShowThankYouModal={setShowThankYouModal}
      />
    </>
  );
};
export default Bill;
