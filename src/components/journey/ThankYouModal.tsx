import { useRouter } from "next/router";

import CancelIC from "@/components/icons/CancelIC";

const ThankYouModal = (props: {
  showThankYouModal: boolean;
  setShowThankYouModal: Function;
  isDemoRequest?: boolean;
}) => {
  const router = useRouter();

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 bg-white backdrop-blur-md z-50 ${
          props.showThankYouModal ? "" : "hidden"
        } p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative w-full max-w-md max-h-full mx-auto mt-10 sm:mt-20">
          <div className="bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="w-full flex justify-end pt-4 ">
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                onClick={() => {
                  props.setShowThankYouModal(false);
                  router.push("/");
                }}
              >
                <CancelIC className="w-4 sm:w-5 h-4 sm:h-5" />
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-center">
              <h3 className="mb-5 text-base font-medium text-primary">
                {props.isDemoRequest
                  ? `Thank you for submitting 
                    your application. Our team will review your application and follow up with you 
                    shortly. You are welcome to contact us with any questions in the meantime.`
                  : `Your payment has been processed, a team member will reach out to you shortly.`}
              </h3>
              {props.isDemoRequest ? (
                <button
                  type="button"
                  className="text-white bg-primary hover:bg-btnHover focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-white focus:z-10"
                  onClick={() => {
                    props.setShowThankYouModal(false);
                    router.push("/contact");
                  }}
                >
                  Contact Us
                </button>
              ) : (
                <button
                  type="button"
                  className="text-white bg-primary hover:bg-btnHover focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-white focus:z-10"
                  onClick={() => {
                    props.setShowThankYouModal(false);
                    router.push("/");
                  }}
                >
                  Okay
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThankYouModal;
