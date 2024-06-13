import { useRouter } from "next/router";
import { useStripe } from "@stripe/react-stripe-js";

import CancelIC from "@/components/icons/CancelIC";

const PaymentSuccessModal = (props: {
  showPaymentResultModal: boolean;
  setShowPaymentResultModal: Function;
  paySuccess: boolean;
  setPaySuccess: Function;
}) => {
  const stripe = useStripe();
  const router = useRouter();
  // const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 backdrop-blur-md z-50 ${
          props.showPaymentResultModal ? "" : "hidden"
        } p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative w-full max-w-md max-h-full mx-auto mt-20">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              onClick={() => props.setShowPaymentResultModal(false)}
            >
              <CancelIC className="w-4 sm:w-5 h-4 sm:h-5" fill="currentColor" />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccessModal;
