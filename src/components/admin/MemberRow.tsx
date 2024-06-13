import { useState, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import useAuth from "@/hooks/useAuth";

import EditIC from "@/components/icons/EditIC";
import DeleteIC from "@/components/icons/DeleteIC";
import SaveIC from "@/components/icons/SaveIC";
import CancelIC from "@/components/icons/CancelIC";
import DeleteConfirmationModal from "@/components/modals/DeleteConfirmationModal";
import useMember from "@/hooks/useMember";
import { toast } from "react-toastify";

import { RoleStringByType, ROLES } from "@/libs/constants";

type Props = {
  index: number;
  member: any;
  selectedMember: any;
  setSelectedMember: Function;
  members: Array<Object>;
  setMembers: Function;
  editRole: Function;
};

const MemberRow = ({
  index,
  member,
  selectedMember,
  setSelectedMember,
  members,
  setMembers,
  editRole,
}: Props) => {
  const authContext = useContext(AuthContext);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  const [roleType, setRoleType] = useState<string>(member.role);

  const { removeMember } = useMember();
  // const { removeEmail } = useAuth();

  const deleteUser = async () => {
    setIsShowDeleteModal(false);
    authContext.handleLoading(true);
    const res = await removeMember(member);

    // await removeEmail(member.email);
    if (res.status) {
      const _members = members.slice();
      const updatedMembers = _members.filter(
        (item: any) => item._id !== member._id
      );
      setMembers(updatedMembers);
      toast.success("Successfully removed!", { theme: "colored" });
    }
    authContext.handleLoading(false);
  };

  return (
    <div
      key={index}
      className={`${index % 2 == 0 ? "tbl-even" : "tbl-odd"} ${
        !isShowDeleteModal && "backdrop-blur"
      } flex flex-row items-center px-4 py-4 gap-2 md:gap-0 text-white`}
    >
      <div className="w-[20%] flex-col text-base text-left break-all">
        <span>{member.firstname + " " + member.lastname}</span>
      </div>
      <div className="w-[20%] flex-col text-base text-left break-all">
        <span>{member.email}</span>
      </div>
      <div className="w-[20%] text-base break-all">
        <span>{member?.companyName ?? ""}</span>
      </div>
      <div className="w-[15%] text-base break-all">
        <span>{member?.position ?? ""}</span>
      </div>
      <div className="w-[20%] text-base break-all">
        {member._id == selectedMember._id ? (
          <select
            className="border-primary text-center md:rounded-[25px] focus:border-primary focus:ring-0 text-xs px-3 py-2 rounded-[25px] bg-transparent"
            onChange={(e) => {
              setRoleType(e.target.value);
            }}
            value={roleType}
          >
            {ROLES.map((roleType: string, index: number) => (
              <option
                key={index}
                value={roleType}
                className="text-white bg-black bg-opacity-80"
              >
                {RoleStringByType(roleType)}
              </option>
            ))}
          </select>
        ) : (
          <span>{member?.role ? RoleStringByType(member?.role) : ""}</span>
        )}
      </div>
      <div className="flex w-[5%] items-center cursor-pointer">
        <div className="flex space-x-2 items-center md:w-[100%] text-base">
          {member._id == selectedMember._id ? (
            <SaveIC
              fill="currentColor"
              className="white hover-primary"
              onClick={() => editRole(member._id, roleType)}
            />
          ) : (
            <EditIC
              fill="currentColor"
              className="white hover-primary bi bi-list-ul"
              width={16}
              height={16}
              onClick={() => {
                setSelectedMember(member);
              }}
            />
          )}

          {member._id == selectedMember._id ? (
            <CancelIC
              fill="currentColor"
              stroke="#fff"
              onClick={() => setSelectedMember({})}
              className="w-6 h-6 cursor-pointer hover-stroke"
            />
          ) : (
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

export default MemberRow;
