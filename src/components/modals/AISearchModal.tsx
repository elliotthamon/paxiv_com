import { useRouter } from "next/router";
import { setScrollHidden } from "lambdas/shared/utils";

type Props = {
  setIsModalShow: Function;
  setValue: Function;
};

const AISearchModal = ({ setIsModalShow, setValue }: Props) => {
  const router = useRouter();

  const InventoryOptionalField = () => {
    setValue("cost", "");
    setValue("property", "");
    setValue("subType", "");
    setValue("locations", "");
    setValue("characteristics", "");
    setValue("requirements", "");
    setValue("other", "");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed z-50 inset-0 overflow-y-hidden">
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                Thank you for submitting your Ai search request. A Paxiv team
                member will review your search criteria and reach out to your
                company soon.
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-between">
            <button
              onClick={() => {
                setIsModalShow(false);
                router.push("/admin/dashboard");
              }}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
            >
              Return to dashboard
            </button>
            <button
              onClick={() => {
                setScrollHidden();
                InventoryOptionalField();
                setIsModalShow(false);
                scrollToTop();
              }}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#cb112d] text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Submit another AI search request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISearchModal;
