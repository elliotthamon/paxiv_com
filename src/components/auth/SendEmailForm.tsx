import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from "@/hooks/useAuth";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email is not valid.")
    .required("Email is required."),
});

const SendEmailForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const auth = useAuth();

  const onSubmitHandler = async (data: any) => {
    try {
      const res = await auth.sendCode(data.email);
      console.log(JSON.stringify(res, null, 2));
      router.push(`/auth/resetPassword?email=${data.email}`);
      reset();
    } catch (err: any) {
      console.log("error:", err);
      toast.error(
        "If we have an account matching the provided email address, a reset code will be sent to it.",
        { theme: "colored" }
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="w-[80%] sm:w-[60%] bg-black bg-opacity-60 rounded-3xl sm:rounded-[50px] kl:rounded-[100px] mx-auto px-[25px] kl:px-[50px] py-8 kl:py-16"
    >
      <div className="flex flex-col">
        <div className="flex justify-center text-center">
          <h1 className="text-primary text-3xl sm:text-[35px] kl:text-[70px] font-semibold tracking-widest">
            It happens!
          </h1>
        </div>

        <div className="flex justify-center text-center mt-6 kl:mt-12">
          <p className="w-[90%] md:w-[80%]  text-white text-base kl:text-3xl">
            By entering your email, our security team will be notified to ensure
            no security measures have been breached to ensure your data is
            protected.
          </p>
        </div>

        <div className="w-full mt-6 kl:mt-12 space-y-6 kl:space-y-12 flex flex-col justify-center items-center">
          <div className="flex flex-col">
            <div className="flex flex-col mx-auto lg:mx-0">
              <label
                className={`text-sm kl:text-2xl uppercase ${
                  errors.email ? "text-red-600" : "text-white"
                }`}
              >
                email address
              </label>
              <input
                {...register("email")}
                type="text"
                className={`bg-transparent w-[280px] xs:w-[300px] kl:w-[600px] mt-2 kl:mt-4 px-3 kl:px-6 py-1 kl:py-2 border-2 rounded-[8px] ${
                  errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-0"
                    : "border-primary focus:ring-primary focus:border-primary"
                } text-white text-sm sm:text-base kl:text-3xl`}
              />
              {errors.email && (
                <p className="error-text text-red-500">
                  {errors.email.message?.toString()}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button className="bg-transparent hover:bg-primary rounded-full w-[280px] xs:w-[300px] kl:w-[600px] py-2 sm:py-3 kl:py-6 uppercase text-white border border-primary font-semibold tracking-widest text-sm sm:text-base kl:text-3xl">
            Reset Password
          </button>
        </div>
      </div>
    </form>
  );
};
export default SendEmailForm;
