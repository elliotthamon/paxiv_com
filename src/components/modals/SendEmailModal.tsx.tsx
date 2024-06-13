import { useState } from "react";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import CancelIC from "@/components/icons/CancelIC";

const schema = yup.object().shape({
  message: yup.string().required("Message is required."),
});

const SendEmailModal = (props: {
  isOpen: boolean;
  setIsOpen: Function;
  selectedID: string;
  selectedEmail: string;
  changeApproval: Function;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [sending, setSending] = useState<boolean>(false);

  const onSubmitHandler = async (data: any) => {
    try {
      setSending(true);

      props.changeApproval(props.selectedID, "denied");

      toast.success("Successfully sent the message.", { theme: "colored" });
      props.setIsOpen(false);
      reset();
    } catch (err: any) {
      toast.error(err, { theme: "colored" });
    }
    setSending(false);
  };

  const cancelClicked = () => {
    props.setIsOpen(false);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div
        className={`fixed top-0 left-0 right-0 backdrop-blur-md z-50 ${
          props.isOpen ? "" : "hidden"
        } p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative w-full max-w-md max-h-full mx-auto mt-20">
          <div className="relative bg-white rounded-lg shadow border-[1px] border-primary">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              onClick={() => props.setIsOpen(false)}
            >
              <CancelIC className="w-5 h-5" fill="currentColor" />
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6">
              <div className="flex flex-col mt-4">
                <h3
                  className={`text-xs ${
                    errors.message ? "text-red-600" : "text-[#515458]"
                  }`}
                >
                  Message
                </h3>
                <textarea
                  {...register("message")}
                  className={`border-2 border-[#B7BFC7] rounded-[8px] px-2 py-1 text-[#575757] focus:ring-0 focus:border-primary focus:outline-none`}
                  rows={5}
                  placeholder="Message"
                ></textarea>
                {errors.message && (
                  <p className="text-red-600 error-text">
                    {errors.message.message?.toString()}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-end pb-2 pr-6 my-2 space-x-1">
              <button
                type="submit"
                disabled={sending}
                className="text-white bg-primary hover:bg-btnHover focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-white focus:z-10 disabled:cursor-not-allowed"
              >
                {sending ? "Sending..." : "Send"}
              </button>
              <button
                type="button"
                disabled={sending}
                className="bg-white border-[2px] btn-cancel border-primary rounded-lg text-sm font-medium px-5 py-2.5 disabled:cursor-not-allowed"
                onClick={cancelClicked}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SendEmailModal;
