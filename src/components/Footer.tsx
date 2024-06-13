import Link from "next/link";

import MailIC from "@/components/icons/MailIC";
import LinkedinIC from "@/components/icons/LinkedinIC";

const Footer = () => {
  return (
    <div
      className={`flex w-full flex-col bg-black bg-opacity-60 text-sm kl:text-3xl absolute bottom-0 z-40 py-1 sm:py-2 kl:py-4 sm:font-medium`}
    >
      <div
        className={`flex flex-col text-sm kl:text-3xl z-40 py-1 sm:py-2 sm:font-medium sm:px-4 md:px-8`}
      >
        <div className="flex flex-row items-center justify-center space-x-2 sm:hidden">
          <Link href="mailto:contact@paxiv.com">
            <div className="w-[30px] h-[30px] flex justify-center items-center bg-white bg-opacity-10 rounded-lg">
              <MailIC />
            </div>
          </Link>
          <Link
            href="https://www.linkedin.com/company/paxiv/about/?viewAsMember=true"
            target="_blank"
          >
            <div className="w-[30px] h-[30px] flex justify-center items-center bg-white bg-opacity-10 rounded-lg">
              <LinkedinIC />
            </div>
          </Link>
        </div>
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <h1 className="text-sm text-white">
            Copyright 2023.&nbsp; All rights reserved by PAXIV.COM
          </h1>
          <div className="flex items-center space-x-2">
            <h1 className="text-white">
              <Link href="/terms">Terms & Conditions</Link>&nbsp; • &nbsp;
              <Link href="/privacy">Privacy Policy</Link>
            </h1>
            <p className="hidden text-white sm:block">
              &nbsp;&nbsp;|&nbsp;&nbsp;
            </p>
            <div className="flex-row items-center justify-center hidden space-x-2 sm:flex">
              <Link href="mailto:contact@paxiv.com">
                <div className="w-[30px] h-[30px] flex justify-center items-center bg-white bg-opacity-10 rounded-lg">
                  <MailIC />
                </div>
              </Link>
              <Link
                href="https://www.linkedin.com/company/paxiv/about/?viewAsMember=true"
                target="_blank"
              >
                <div className="w-[30px] h-[30px] flex justify-center items-center bg-white bg-opacity-10 rounded-lg">
                  <LinkedinIC />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
