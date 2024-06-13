import { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

import DeleteConfirmationModal from "@/components/modals/DeleteConfirmationModal";
import CompanyUserEditModal from "@/components/modals/CompanyUserEditModal";
import SmallSpinner from "@/components/SmallSpinner";
import PencilIC from "@/components/icons/PencilIC";
import DeleteIC from "@/components/icons/DeleteIC";

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
    approval: string;
  };
  DBChanged: boolean;
  setDBChanged: Function;
};

const UserRow = ({ item, DBChanged, setDBChanged }: RowType) => {
  const { changeJourneyMember } = useMember();

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleDeleteConfirmed = async () => {
    const updateData = { companyUserDeleted: true };
    try {
      setShowDeleteModal(false);
      setIsSaving(true);
      await changeJourneyMember(item._id, updateData);
      toast.success("Successfully deleted.", { theme: "colored" });
      setDBChanged(true);
    } catch (e: any) {
      toast.error(e.message, { theme: "colored" });
    }
    setIsSaving(false);
  };

  const handleDeleteCancelled = () => {
    setShowDeleteModal(false);
  };

  const handleEditCancelled = () => {
    setShowEditModal(false);
  };

  const handleDBChanged = () => {
    setDBChanged(!DBChanged);
  };

  return (
    <div className="flex flex-nowrap justify-center md:justify-between items-center border-[1px] border-[#F0F0F0] rounded-[6px] md:rounded-[100px] px-2 md:px-12 py-2 gap-3">
      <div className="flex w-1/2 md:w-[30%] flex-row items-center justify-start">
        <div className="relative w-[49px] h-[49px]">
          <Image
            src={
              item?.avatar != "" && item?.avatar != undefined
                ? getImageURL(item?.avatar)
                : "/images/default_avatar.png"
            }
            className="object-cover rounded-full"
            alt="user"
            fill
          />
        </div>
        <h1 className="text-[#323232] text-[16px] ml-2">
          {item.firstname + " " + item.lastname}
        </h1>
      </div>
      <h1 className="flex w-[15%] md:w-[30%] justify-start text-[#323232] text-[14px] uppercase">
        {item.position}
      </h1>
      <div className="flex w-[15%] md:w-[20%] justify-start items-center text-[#323232] text-[14px]">
        {item.approval}
      </div>
      <div className="flex w-[20%] md:w-[20%] flex-row justify-center space-x-0.5 xs:space-x-3">
        <div
          className="hover:cursor-pointer"
          onClick={() => setShowEditModal(true)}
        >
          <PencilIC
            fill="currentColor"
            className="primary bi bi-pencil-square"
          />
        </div>
        <div
          className="hover:cursor-pointer"
          onClick={() => setShowDeleteModal(true)}
        >
          <DeleteIC className="hover-primary cursor-pointer" />
        </div>
      </div>
      {isSaving && (
        <div className="fixed left-0 top-0 w-full h-screen flex justify-center items-center z-50 bg-gray-950/50">
          <SmallSpinner />
        </div>
      )}

      {showDeleteModal && (
        <DeleteConfirmationModal
          item={item.firstname + " " + item.lastname}
          onDelete={handleDeleteConfirmed}
          setIsState={setShowDeleteModal}
        />
      )}
      {showEditModal && (
        <CompanyUserEditModal
          item={item}
          onCancel={handleEditCancelled}
          setDBChanged={handleDBChanged}
        />
      )}
    </div>
  );
};

export default UserRow;
