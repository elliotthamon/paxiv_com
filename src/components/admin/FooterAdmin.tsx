import Link from "next/link";

import MailIC from "@/components/icons/MailIC";
import LinkedinIC from "@/components/icons/LinkedinIC";

const Footer = () => {
  return (
    <div className={`absolute bottom-0 left-0 w-full bg-primary bg-opacity-60`}>
      <div
        className={`flex max-w-[1240px] mx-auto flex-col text-sm kl:text-3xl z-40 py-1 sm:py-2 kl:py-4 sm:font-medium px-4 xl:px-0`}
      >
        <div className="flex flex-col items-center justify-between sm:flex-row sm:my-1">
          <h1 className="hidden text-sm text-white sm:flex">
            Copyright 2023.&nbsp; All rights reserved by PAXIV.COM
          </h1>
          <div className="flex items-center space-x-2">
            <h1 className="text-white ">
              <Link href="/terms">Terms & Conditions</Link>&nbsp; • &nbsp;
              <Link href="/privacy">Privacy Policy</Link>
            </h1>
            <p className="text-white ">&nbsp;&nbsp;|&nbsp;&nbsp;</p>
            <div className="flex flex-row items-center justify-center space-x-2">
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
