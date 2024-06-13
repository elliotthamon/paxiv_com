import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { toast } from "react-toastify";

import DetailIC from "@/components/icons/DetailIC";
import CancelIC from "@/components/icons/CancelIC";
import EyeNotOpenIC from "@/components/icons/EyeNotOpenIC";
import EyeOpenIC from "@/components/icons/EyeOpenIC";
import EditIC from "@/components/icons/EditIC";

import { getImageURL } from "@/libs/utils";
import useMember from "@/hooks/useMember";

type RowType = {
  item: {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    position: string;
    avatar: string;
    phone: string;
    phoneShow: boolean;
  };
  companyId: string | undefined | string[];
  canEdit: boolean;
};

const ResourceRow = ({ item, companyId, canEdit }: RowType) => {
  const { changeJourneyMember } = useMember();
  const router = useRouter();
  const [isShowPhoneNumber, setIsShowPhoneNumber] = useState<boolean>(
    item.phoneShow ? true : false
  );
  const [isMoreModalOpened, setIsMoreModalOpened] = useState<boolean>(false);

  const handlePhoneNumber = async (status: boolean) => {
    let data = { phoneShow: status };
    setIsShowPhoneNumber(status);
    await changeJourneyMember(item._id, data)
      .then((res) => {
        toast.success("Successfully changed.", { theme: "colored" });
      })
      .catch((e) => {
        toast.error("Try again later.", { theme: "colored" });
      });
  };

  return (
    <>
      <div className="w-[30%] flex flex-row items-center space-x-4">
        <div className="relative w-[49px] h-[49px]">
          <Image
            src={
              item.avatar
                ? getImageURL(item.avatar)
                : "/images/default_avatar.png"
            }
            className="object-cover rounded-full cursor-pointer bg-white"
            alt="user"
            onClick={() =>
              router.push(
                `/admin/companyResource?userId=${item._id}&companyId=${companyId}`
              )
            }
            fill
          />
        </div>
        <h1
          className="text-white cursor-pointer"
          onClick={() =>
            router.push(
              `/admin/companyResource?userId=${item._id}&companyId=${companyId}`
            )
          }
        >
          {item.firstname + " " + item.lastname}
        </h1>
      </div>
      <h1 className="w-[20%] hidden md:block text-left text-white text-sm uppercase break-all">
        {item.position}
      </h1>
      <div className="w-[20%] hidden md:block text-left text-white text-sm break-all">
        {item.email}
      </div>
      <div className="w-[20%] hidden md:flex flex-row justify-start items-center space-x-2">
        <div
          className="break-all hover:cursor-pointer"
          onClick={() => handlePhoneNumber(!isShowPhoneNumber)}
        >
          {!isShowPhoneNumber ? (
            <EyeNotOpenIC fill="#fff" className="white bi bi-eye-fill" />
          ) : (
            <EyeOpenIC fill="#fff" className="white bi bi-eye-fill" />
          )}
        </div>
        <h1 className="ml-2 text-sm text-white">{item.phone}</h1>
      </div>
      {canEdit && (
        <div
          className="w-[10%] hidden md:flex justify-start hover:cursor-pointer"
          onClick={() =>
            router.push(`/admin/editUser?Id=${item._id}&companyID=${companyId}`)
          }
        >
          <EditIC fill="#fff" />
        </div>
      )}
      <div
        className="w-[10%] flex md:hidden flex-row justify-center items-center space-x-2"
        onClick={() => setIsMoreModalOpened(true)}
      >
        <DetailIC fill="currentColor" className="primary bi bi-list-ul" />
      </div>
      {isMoreModalOpened && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-screen bg-transparent bg-opacity-60 ">
          <div className="w-[400px] bg-white border border-[#f3b007] rounded-lg px-8 py-8">
            <div className="flex justify-end w-full">
              <CancelIC onClick={() => setIsMoreModalOpened(false)} />
            </div>
            <div className="flex justify-center w-full">
              <div className="relative w-[60px] h-[60px]">
                <Image
                  src={
                    item.avatar
                      ? getImageURL(item.avatar)
                      : "/images/default_avatar.png"
                  }
                  className="object-cover rounded-full cursor-pointer"
                  alt="user"
                  onClick={() =>
                    router.push(
                      `/admin/companyResource?userId=${item._id}&companyId=${companyId}`
                    )
                  }
                  fill
                />
              </div>
            </div>
            <div className="w-full py-8">
              <div className="flex items-center w-full">
                <div className="w-[30%]">Name:</div>
                <div className="w-[70%] flex flex-row items-center justify-start">
                  <h1 className="text-white text-[16px] ml-2 cursor-pointer">
                    {item.firstname + " " + item.lastname}
                  </h1>
                </div>
              </div>
              <div className="flex items-center w-full py-2">
                <div className="w-[30%]">Position:</div>
                <div className="w-[70%] flex flex-row items-center justify-start">
                  <h1 className="ml-2 text-base text-white uppercase">
                    {item.position}
                  </h1>
                </div>
              </div>
              <div className="flex items-center w-full py-2">
                <div className="w-[30%]">Email:</div>
                <div className="w-[70%] flex justify-start items-center text-white text-[14px]">
                  <h1 className="ml-2 text-white text-[14px]">{item.email}</h1>
                </div>
              </div>
              <div className="flex items-center w-full pt-2">
                <div className="w-[30%]">Phone:</div>
                <div className="w-[70%] flex flex-row justify-start items-center space-x-2 pl-2">
                  <div
                    className="hover:cursor-pointer"
                    onClick={() => handlePhoneNumber(!isShowPhoneNumber)}
                  >
                    {!isShowPhoneNumber ? <EyeNotOpenIC /> : <EyeOpenIC />}
                  </div>
                  <h1 className="text-white text-[16px] ml-2">{item.phone}</h1>
                </div>
              </div>
              <div className="flex justify-center w-full pt-6 space-x-4">
                <button
                  className="rounded-full px-4 py-2 text-[#f4ba28] text-base border border-[#f4ba28]"
                  onClick={() => setIsMoreModalOpened(false)}
                >
                  Cancel
                </button>
                {canEdit && (
                  <button
                    className="py-2 text-base text-white rounded-full px-7 btn-gradient"
                    onClick={() =>
                      router.push(
                        `/admin/editUser?Id=${item._id}&companyID=${companyId}`
                      )
                    }
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResourceRow;
