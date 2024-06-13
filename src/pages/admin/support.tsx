import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import BaseContainer from "@/components/BaseContainer";
import LayoutAdmin from "@/components/admin/LayoutAdmin";

import useContact from "@/hooks/useContact";

const schema = yup.object().shape({
  name: yup.string().required("Name is required."),
  email: yup
    .string()
    .email("Email is not valid")
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
  subject: yup.string().required("Subject is required."),
  message: yup.string().required("Message is required."),
});

const Support = () => {
  const { saveQuestion } = useContact();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isSending, setIsSending] = useState<boolean>(false);
  const [screenHeight, setScreenHeight] = useState<number>(0);

  const onSubmitHandler = async (data: any) => {
    try {
      setIsSending(true);
      let result = await saveQuestion(data);
      setIsSending(false);
      if (result) {
        toast.success("Successfully submitted", { theme: "colored" });
        reset();
      }
    } catch {
      toast.error("Try again later", { theme: "colored" });
      setIsSending(false);
    }
  };

  useEffect(() => {
    function handleResize() {
      setScreenHeight(window.innerHeight);
    }

    setScreenHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <LayoutAdmin>
      <BaseContainer>
        <div className="absolute top-0 left-0 w-full pb-20 kl:pb-40">
          <h1 className="mt-8 text-xl font-bold text-white">Support</h1>
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="w-full bg-black bg-opacity-70 rounded-3xl text-white mx-auto px-[30px] md:px-[60px] kl:px-[120px] py-6 sm:py-8 kl:py-16 mt-6 kl:mt-12"
          >
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 td:space-x-8 sm:space-y-0">
              <div className="flex flex-col w-full">
                <h3
                  className={`text-sm sm:text-base kl:text-3xl ${
                    errors.name ? "text-red-500" : "text-white"
                  }`}
                >
                  Your Name
                </h3>
                <input
                  {...register("name")}
                  type="text"
                  className={`bg-transparent border-2 border-primary rounded-[8px] kl:rounded-[16px] px-2 kl:px-4 py-1 kl:py-2 text-white ${
                    errors.name
                      ? "border-red-500 focus:border-red-500 focus:ring-0"
                      : "border-primary focus:ring-[#B7BFC7] focus:border-primary"
                  } disabled:cursor-not-allowed mt-1 kl:mt-2 placeholder-gray-400 text-sm sm:text-base kl:text-3xl`}
                  disabled={isSending}
                  placeholder="First and last name"
                />
                {errors.name && (
                  <p className="text-red-500 error-text">
                    {errors.name.message?.toString()}
                  </p>
                )}
              </div>
              <div className="flex flex-col w-full">
                <h3
                  className={`text-sm sm:text-base kl:text-3xl ${
                    errors.email ? "text-red-500" : "text-white"
                  }`}
                >
                  Email Address
                </h3>
                <input
                  {...register("email")}
                  type="text"
                  className={`bg-transparent border-2 border-primary rounded-[8px] kl:rounded-[16px] px-2 kl:px-4 py-1 kl:py-2 text-white ${
                    errors.email
                      ? "border-red-500 focus:border-red-500 focus:ring-0"
                      : "border-primary focus:ring-[#B7BFC7] focus:border-primary"
                  } disabled:cursor-not-allowed mt-1 kl:mt-2 placeholder-gray-400 text-sm sm:text-base kl:text-3xl`}
                  disabled={isSending}
                  placeholder="What's your email?"
                />
                {errors.email && (
                  <p className="text-red-500 error-text">
                    {errors.email.message?.toString()}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col mt-2 space-y-2 sm:flex-row sm:space-x-4 td:space-x-8 sm:space-y-0 sm:mt-8">
              <div className="flex flex-col w-full">
                <h3
                  className={`text-sm sm:text-base kl:text-3xl ${
                    errors.phone ? "text-red-500" : "text-white"
                  }`}
                >
                  Phone
                </h3>
                <input
                  {...register("phone")}
                  type="text"
                  className={`bg-transparent border-2 border-primary rounded-[8px] kl:rounded-[16px] px-2 kl:px-4 py-1 kl:py-2 text-white ${
                    errors.phone
                      ? "border-red-500 focus:border-red-500 focus:ring-0"
                      : "border-primary focus:ring-[#B7BFC7] focus:border-primary"
                  } disabled:cursor-not-allowed mt-1 kl:mt-2 placeholder-gray-400 text-sm sm:text-base kl:text-3xl`}
                  disabled={isSending}
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="text-red-500 error-text">
                    {errors.phone.message?.toString()}
                  </p>
                )}
              </div>
              <div className="flex flex-col w-full">
                <h3
                  className={`text-sm sm:text-base kl:text-3xl ${
                    errors.subject ? "text-red-500" : "text-white"
                  }`}
                >
                  Subject
                </h3>
                <input
                  {...register("subject")}
                  type="text"
                  className={`bg-transparent border-2 border-primary rounded-[8px] kl:rounded-[16px] px-2 kl:px-4 py-1 kl:py-2 text-white ${
                    errors.subject
                      ? "border-red-500 focus:border-red-500 focus:ring-0"
                      : "border-primary focus:ring-[#B7BFC7] focus:border-primary"
                  } disabled:cursor-not-allowed mt-1 kl:mt-2 placeholder-gray-400 text-sm sm:text-base kl:text-3xl`}
                  disabled={isSending}
                  placeholder="Enter subject"
                />
                {errors.subject && (
                  <p className="text-red-500 error-text">
                    {errors.subject.message?.toString()}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-2 sm:mt-8">
              <div className="flex flex-col">
                <h3
                  className={`text-sm sm:text-base kl:text-3xl ${
                    errors.message ? "text-red-500" : "text-white"
                  }`}
                >
                  Message
                </h3>
                <textarea
                  {...register("message")}
                  className={`bg-transparent border-2 border-primary rounded-[8px] kl:rounded-[16px] px-2 kl:px-4 py-1 kl:py-2 text-white ${
                    errors.message
                      ? "border-red-500 focus:border-red-500 focus:ring-0"
                      : "border-primary focus:ring-[#B7BFC7] focus:border-primary"
                  } mt-1 kl:mt-2 placeholder-gray-400 text-sm sm:text-base kl:text-3xl`}
                  rows={5}
                  disabled={isSending}
                  placeholder="Write your message"
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 error-text">
                    {errors.message.message?.toString()}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-center mt-6 sm:mt-10">
              <button
                type="submit"
                disabled={isSending}
                className="bg-primary hover:bg-white text-white hover:text-primary font-semibold border-2 border-primary text-sm sm:text-base kl:text-3xl px-[12px] lg:px-[20px] kl:px-[40px] py-[2px] lg:py-[4px] kl:py-2 rounded-full disabled:cursor-not-allowed"
              >
                {isSending ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </BaseContainer>
    </LayoutAdmin>
  );
};

export default Support;
