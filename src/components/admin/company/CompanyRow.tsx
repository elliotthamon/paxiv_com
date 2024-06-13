import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

import CancelIC from "@/components/icons/CancelIC";
import DetailIC from "@/components/icons/DetailIC";

import useNotifications from "@/hooks/useNotifications";
import useCompany from "@/hooks/useCompany";

import { getImageURL } from "@/libs/utils";

type RowType = {
  _id: string;
  name: string;
  website: string;
  email: string;
  companyAvatarImageFile: string;
  users: number;
};

type Props = {
  item: RowType;
  user: any;
};

const CompanyRow = ({ item, user }: Props) => {
  const [isMoreModalOpened, setIsMoreModalOpened] = useState<boolean>(false);

  const { createClickedCompanyNotification } = useNotifications();
  const { getCompanyUsersByCompanyID } = useCompany();

  const createClickedNotification = async (eventType: string) => {
    const companyUsers = await getCompanyUsersByCompanyID(item._id);
    const origin_user = user._id;
    let target_user = [];
    for (let user of companyUsers) {
      target_user.push(user._id);
    }
    const res = await createClickedCompanyNotification(
      eventType,
      origin_user,
      target_user
    );
    if (res.status) {
      toast.info("Informed all company employees", { theme: "colored" });
    }
  };

  return (
    <>
      <div className="w-[80%] md:w-auto flex flex-row items-start items-left">
        <Link
          href={`/admin/company?id=${item._id}`}
          className="flex flex-row items-center justify-start"
        >
          <div className="relative w-[49px] h-[49px]">
            <Image
              src={
                item.companyAvatarImageFile
                  ? getImageURL(item.companyAvatarImageFile)
                  : "/images/company_default_avatar.png"
              }
              className="object-cover rounded-full"
              alt="user"
              fill
            />
          </div>
          <h1 className="ml-2">{item.name}</h1>
        </Link>
      </div>
      <Link
        href={item.website ? item.website : "#"}
        target="_blank"
        className="w-full margin-l-0"
      >
        <p
          className="hidden w-full px-2 text-sm uppercase break-all md:block"
          onClick={() => createClickedNotification("ClickedWebsite")}
        >
          {item.website ? item.website : ""}
        </p>
      </Link>
      <p
        className="hidden px-2 text-sm break-all cursor-pointer md:block"
        onClick={() => createClickedNotification("ClickedEmail")}
      >
        {item.email}
      </p>
      <p className="hidden px-2 space-x-2 text-base break-all md:block">
        {item.users}
      </p>
      <div
        className="flex flex-row items-center justify-start mr-6 space-x-2 md:hidden"
        onClick={() => setIsMoreModalOpened(true)}
      >
        <DetailIC
          fill="currentColor"
          className="white hover-primary bi bi-list-ul"
        />
      </div>
      {isMoreModalOpened && (
        <div className="fixed top-0 left-0 flex justify-center items-center w-[90%] xs:w-full h-screen bg-transparent bg-opacity-60 z-50 ">
          <div className="w-[400px] bg-white border border-[#f3b007] rounded-lg px-8 py-8">
            <div className="flex justify-end w-full">
              <CancelIC onClick={() => setIsMoreModalOpened(false)} />
            </div>

            <div className="flex justify-center w-full py-4">
              <div className="relatvie w-[80px] h-[80px]">
                <Image
                  src={
                    item.companyAvatarImageFile
                      ? getImageURL(item.companyAvatarImageFile)
                      : "/images/company_default_avatar.png"
                  }
                  className="object-contain rounded-full"
                  alt="user"
                  fill
                />
              </div>
            </div>
            <div className="w-full pt-4 pb-8">
              <div className="flex items-center w-full">
                <div className="w-[20%]">Name:</div>
                <div className="w-[80%] flex flex-row items-center justify-center">
                  <Link
                    href={`/admin/company?id=${item._id}`}
                    className="flex flex-row items-center"
                  >
                    <h1 className="text-[16px] ml-2">{item.name}</h1>
                  </Link>
                </div>
              </div>
              <div className="flex items-center w-full py-2">
                <div className="w-[20%]">Website:</div>
                <Link
                  href={item.website ? item.website : "#"}
                  target="_blank"
                  className="w-[80%]"
                >
                  <h1
                    className="flex justify-center lg:justify-start text-[14px] uppercase truncate"
                    onClick={() => createClickedNotification("ClickedWebsite")}
                  >
                    {item.website ? item.website : ""}
                  </h1>
                </Link>
              </div>
              <div className="flex items-center w-full py-2">
                <div className="w-[20%]">Email:</div>
                <div className="w-[80%] flex justify-center lg:justify-start items-center text-[14px]">
                  <h1 className="flex text-[14px]">{item.email}</h1>
                </div>
              </div>
              <div className="flex items-center w-full pt-2">
                <div className="w-[20%]">Resources:</div>
                <div className="flex flex-row items-center justify-center space-x-2 lg:justify-start">
                  <h1 className="text-[16px] ml-2">{item.users}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CompanyRow;
