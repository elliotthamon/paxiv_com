import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import useAuth from "@/hooks/useAuth";

const VerifyForm = () => {
  const router = useRouter();
  const auth = useAuth();
  const { email } = router.query;

  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);
  const input5Ref = useRef(null);
  const input6Ref = useRef(null);

  const [isResend, setIsResend] = useState<boolean>(false);
  const [code, setCode] = useState<Array<number>>([]);

  const inputRefs = [
    input1Ref,
    input2Ref,
    input3Ref,
    input4Ref,
    input5Ref,
    input6Ref,
  ];

  const sendCodeClicked = async () => {
    try {
      if (typeof email === "string") {
        await auth.sendCode(email);
        setIsResend(true);
      } else {
        router.push("/auth/signup");
      }
    } catch (err) {
      console.log("err", err);
      toast.error("Unknown user", { theme: "colored" });
    }
  };

  const setNumber = (index: number, value: any) => {
    if (index < inputRefs.length) {
      const currentInputRef = inputRefs[index];

      if (
        // @ts-ignore
        currentInputRef.current.value.length <=
        // @ts-ignore
        currentInputRef.current.maxLength
      ) {
        if (index >= 0) {
          let tempCode = code.slice();
          tempCode[index] = value;
          setCode(tempCode);
        }
        if (index < inputRefs.length - 1 && value !== "") {
          const nextInputRef = inputRefs[index + 1];
          // @ts-ignore
          nextInputRef.current.focus();
        }
      }
    }
  };

  const handlePaste = (event: any) => {
    event.preventDefault();
    // @ts-ignore
    const clipboardData = event.clipboardData || window.clipboardData;
    const pastedText = clipboardData.getData("text/plain");

    if (pastedText) {
      let tempCode: any[] = [];
      for (let i = 0; i < pastedText.length; i++) {
        const letter = pastedText[i];
        tempCode.push(letter);
      }

      setCode(tempCode);
    }
  };

  const codeVerify = async () => {
    if (code.length !== 6) {
      toast.info("Enter valid code", { theme: "colored" });
      return;
    }
    try {
      if (typeof email === "string") {
        await auth.verifyCode(email, code.join(""));
        toast.success("Successfully verified!", { theme: "colored" });
        setTimeout(() => {
          router.push("/auth/login");
        }, 500);
      } else {
        router.push("/auth/login");
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message, { theme: "colored" });
      }
      return;
    }
  };

  return (
    <div className="w-[90%] xs:w-[80%] md:w-[60%] bg-black bg-opacity-60 rounded-3xl sm:rounded-[50px] kl:rounded-[100px] mx-auto px-[25px] kl:px-[50px] py-4 sm:py-8 kl:py-16">
      <div className="flex flex-col">
        <div className="flex justify-center text-center">
          <h1 className="text-primary text-2xl sm:text-3xl td:text-[35px] kl:text-[70px] font-semibold tracking-widest">
            2 factor authentication
          </h1>
        </div>

        <div className="flex justify-center text-center mt-6 kl:mt-12">
          <p className="text-white text-sm sm:text-base kl:text-3xl">
            Enter your confirmation code to verify your account.
          </p>
        </div>

        <div className="flex justify-center text-center mt-6">
          <p className="text-white text-sm kl:text-2xl">Enter Code</p>
        </div>

        <div className="flex justify-between xs:justify-center text-center mt-6 space-x-2 sm:space-x-4">
          {Array(6)
            .fill(0)
            .map((item: any, idx: number) => (
              <div
                className="border-2 border-primary rounded-[8px] text-white"
                key={idx}
              >
                <input
                  type="text"
                  className="bg-transparent outline-none border-none w-[30px] xs:w-[50px] kl:w-[100px] h-[30px] xs:h-[50px] kl:h-[100px] text-center rounded-[8px] kl:rounded-4 focus:ring-0 focus:outline-none"
                  maxLength={1}
                  value={code[idx]}
                  ref={inputRefs[idx]}
                  onChange={(event) => setNumber(idx, event.target.value)}
                  onPaste={handlePaste}
                />
              </div>
            ))}
        </div>

        <div className="mt-3 sm:mt-6 kl:mt-12 flex justify-center text-base kl:text-3xl">
          <button
            type="button"
            className="bg-transparent hover:bg-primary disabled:cursor-not-allowed disabled:bg-primary rounded-[30px] w-[280px] xs:w-[300px] kl:w-[600px] py-2 sm:p-3 kl:p-6 uppercase text-white border-2 border-primary font-semibold tracking-widest text-sm sm:text-base"
            disabled={code ? false : true}
            onClick={codeVerify}
          >
            Verify
          </button>
        </div>

        <div className="mt-3 sm:mt-6 kl:mt-12 flex justify-center text-base kl:text-3xl">
          <button
            type="button"
            className="bg-transparent hover:bg-primary border-2 border-primary rounded-[30px] w-[280px] xs:w-[300px] kl:w-[600px] py-2 sm:p-3 kl:p-6 uppercase text-primary text-white font-semibold tracking-widest text-sm sm:text-base"
            onClick={() => router.push("/auth/login")}
          >
            Cancel
          </button>
        </div>

        <div className="mt-6 kl:mt-12 flex justify-center whitespace-nowrap">
          <div className="text-white text-sm kl:text-2xl uppercase">
            Didn&apos;t receive code?
            <span
              className="text-primary text-base kl:text-3xl ml-2 kl:ml-4 uppercase cursor-pointer font-semibold"
              onClick={sendCodeClicked}
            >
              {isResend ? "sent" : "Send again"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VerifyForm;
