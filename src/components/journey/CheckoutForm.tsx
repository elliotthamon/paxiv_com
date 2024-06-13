import { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";

import SmallSpinner from "@/components/SmallSpinner";

import { JOURNEY_MEMBER_INFO } from "@/libs/constants";
import { UserInfoType } from "@/pages/journey";

const CheckoutForm = (props: {
  paymentIntent: string | undefined;
  paySuccess: boolean;
  setPaySuccess: Function;
  setIsSaving: Function;
  userInfo: UserInfoType;
  onSubmitHandler: Function;
  setUserInfo: Function;
  setPayment: Function;
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showThankYouModal, setShowThankYouModal] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    // e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    localStorage.setItem(JOURNEY_MEMBER_INFO, JSON.stringify(props.userInfo));

    const return_url =
      process.env.NEXT_PUBLIC_STRIPE_RETURN_URL ??
      new URL("/journey", global.window.location.href).toString() ??
      "http://localhost:3000/journey";

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url,
      },
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        // @ts-ignore
        error.message && toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred.", { theme: "colored" });
      }
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  useEffect(() => {
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!stripe || !clientSecret) return;

    // if we get here , the stripe call has returned
    let info = localStorage.getItem(JOURNEY_MEMBER_INFO);
    if (info) {
      props.setUserInfo(info);
      // localStorage.removeItem(JOURNEY_MEMBER_INFO);
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      props.setPayment(paymentIntent);
    });

    /*
      console.log(`paymentIntent: `, paymentIntent);
      switch (paymentIntent?.status) {
        case "succeeded": {
          console.log(`payment succeeded.`);
          props.setPayment(paymentIntent);
          //props.setPaySuccess(true);
          // props.onSubmitHandler();
          //setShowThankYouModal(true);
          //toast.success("Payment succeeded!");
          break;
        }
        case "processing":
          toast.info("Your payment is processing.", { theme: "colored" });
          break;
        case "requires_payment_method":
          toast.info("Your payment was not successful, please try again.", {
            theme: "colored",
          });
          break;
        default:
          toast.info("Something went wrong.", { theme: "colored" });
          break;
      }
      //router.replace("/journey");
    });
    // eslint-disable-next-line
    */
  }, [stripe, props]);

  return !props.paySuccess ? (
    <>
      {!props.paySuccess && (
        <div className="bg-white border-primary border-[1px] p-3 sm:p-6 kl:p-12 mt-2 kl:mt-4 rounded-[8px] kl:rounded-4">
          <PaymentElement />
        </div>
      )}
      {
        !props.paySuccess ? (
          <button
            onClick={handleSubmit}
            type="button"
            disabled={isLoading || !stripe || !elements}
            id="submit"
            className="w-full mt-2 kl:mt-4 py-2 kl:py-4 text-white bg-primary rounded-[8px] kl:rounded-4"
          >
            <span id="button-text">
              {isLoading ? <SmallSpinner /> : "Pay $10 now"}
            </span>
          </button>
        ) : null
        // <div className="mt-10 flex justify-center flex-col space-y-4">
        //   <button
        //     type="submit"
        //     disabled={props.isSaving}
        //     className="bg-primary disabled:cursor-not-allowed hover:bg-btnHover rounded-[30px] w-[300px] p-3 uppercase text-white mx-auto"
        //   >
        //     {props.isSaving ? "Saving..." : "Submit Application"}
        //   </button>
        // </div>
        // <ThankYouModal
        //   showThankYouModal={showThankYouModal}
        //   setShowThankYouModal={setShowThankYouModal}
        // />
      }
    </>
  ) : (
    <SmallSpinner />
  );
};

export default CheckoutForm;
