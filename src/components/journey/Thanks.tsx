import { StepProps } from "@/pages/journey";
import { useRouter } from "next/router";

const Thanks = ({ setCurrentStepID, userInfo, setUserInfo }: StepProps) => {
  const router = useRouter();

  const gotoBeforeStep = () => {
    router.push("/");
  };

  return (
    <div className="relative mt-8 lg:mt-0">
      <div className="w-full">
        <div className="flex flex-col">
          <div className="flex justify-center text-center">
            <h1 className="text-gradient text-[35px]">Thank You</h1>
          </div>

          <div className="flex justify-center text-center mt-6">
            <p className="text-[#A0AEC0] text-xl max-w-[500px]">
              We appreciate your interest in our inovation. Our team will review
              your submission and be in touch.
            </p>
          </div>

          <div className="mt-6 sm:mt-10 flex justify-center flex-col space-y-4">
            <button
              type="button"
              className="bg-white hover:bg-btnHover border-2 border-primary rounded-[30px] w-[200px] p-3 uppercase text-primary hover:text-white mx-auto"
              onClick={() => gotoBeforeStep()}
            >
              Return to Home Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Thanks;
