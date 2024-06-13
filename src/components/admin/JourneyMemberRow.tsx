import { useState, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

import DetailIC from "@/components/icons/DetailIC";
import CheckIC from "@/components/icons/CheckIC";
import DeleteIC from "@/components/icons/DeleteIC";
import DeleteConfirmationModal from "@/components/modals/DeleteConfirmationModal";
import useMember from "@/hooks/useMember";
import { toast } from "react-toastify";

import { ApprovalStatusStringByType, ROLE_SITE_ADMIN } from "@/libs/constants";

type Props = {
  index: number;
  member: any;
  setSelectedMember: Function;
  setIsOpenDetailModal: Function;
  members: Array<Object>;
  setMembers: Function;
  user: any;
  allCompanies: Array<any>;
  setCurrent: Function;
};

const JourneyMemberRow = ({
  index,
  member,
  setSelectedMember,
  setIsOpenDetailModal,
  members,
  setMembers,
  user,
  allCompanies,
  setCurrent,
}: Props) => {
  const authContext = useContext(AuthContext);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);

  const { removeJourneyMember } = useMember();

  const deleteUser = async () => {
    setIsShowDeleteModal(false);
    const id = member?._id;
    authContext.handleLoading(true);
    const res = await removeJourneyMember(id);
    if (res.status) {
      const _members = members.slice();
      const updatedMembers = _members.filter(
        (member: any) => member._id !== id
      );
      setMembers(updatedMembers);
      toast.success("Successfully removed!", { theme: "colored" });
      setCurrent(0);
    }
    authContext.handleLoading(false);
  };

  const checkCompanyLinked = (name: string, website: string) => {
    for (let item of allCompanies) {
      if (item.name === name && item.website === website) return true;
    }
    return false;
  };

  return (
    <div
      key={index}
      className={`${index % 2 == 0 ? "tbl-even" : "tbl-odd"} ${
        !isShowDeleteModal && "backdrop-blur"
      } flex flex-row items-center px-4 py-4 gap-2 md:gap-0 text-white`}
    >
      <div className="w-[80%] xs:w-[40%] md:w-[30%] flex-col text-base text-left break-all">
        <span>{member.firstname + " " + member.lastname}</span>
        <span className="italic text-slate-400">
          ({member.email ?? "no email"})
        </span>
      </div>
      <div className="hidden xs:block w-[40%] md:w-[20%] text-base break-all">
        <span>{member?.companyName ?? ""}</span>
        &nbsp;
        {checkCompanyLinked(member?.companyName, member?.companyWebsite) ? (
          <span style={{ color: "#9ca3af" }}>
            <small>
              <i>(linked)</i>
            </small>
          </span>
        ) : (
          <span style={{ color: "#fb7185" }}>
            <small>
              <i>(not linked)</i>
            </small>
          </span>
        )}
      </div>
      <div className="hidden md:flex w-[10%] items-center space-x-2 text-base">
        <p>{`Step ${
          !!member.journeyStep ? parseInt(member.journeyStep) + 1 : 1
        }`}</p>
        {member?.isCompleted && <CheckIC />}
      </div>
      <div className="hidden md:flex w-[10%] items-center">
        <div
          className={`h-2.5 w-2.5 rounded-full ${
            member?.paymentStatus ? "bg-green-500" : "bg-white"
          } mr-2`}
        ></div>
        {`${member?.paymentStatus === true ? "Paid" : "None"}`}
      </div>
      <div className="hidden md:flex w-[25%] items-center gap-1">
        <div className="w-full border-primary  rounded-[100px] md:rounded-[100px] focus:border-primary focus:ring-0">
          {ApprovalStatusStringByType(member.approval)}
        </div>
      </div>
      <div className="flex w-[20%] md:w-[5%] items-center cursor-pointer">
        <div className="flex space-x-2 items-center md:w-[100%]  text-base">
          <DetailIC
            fill="currentColor"
            className="white hover-primary bi bi-list-ul"
            onClick={() => {
              setSelectedMember(member);
              setIsOpenDetailModal(true);
            }}
          />
          {user?.role == ROLE_SITE_ADMIN && (
            <DeleteIC
              fill="#fff"
              className="white hover-primary"
              onClick={() => setIsShowDeleteModal(true)}
            />
          )}
        </div>
      </div>
      {isShowDeleteModal && (
        <DeleteConfirmationModal
          item={
            "this user (" + (member.firstname + " " + member.lastname) + ")"
          }
          onDelete={deleteUser}
          setIsState={setIsShowDeleteModal}
        />
      )}
    </div>
  );
};

export default JourneyMemberRow;
