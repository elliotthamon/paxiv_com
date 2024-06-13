import { useRef, useState } from "react";
import AssignModalUserItem from "./UserItem";
import useOutsideClick from "@/hooks/useOutsideClick";

interface AssignModalProps {
  users: Object[];
  user: Object;
  setAssetUser: Function;
  isAssignModal: boolean;
  setIsAssignModal: Function;
  onAssetUserchange: Function;
}

const AssignModal = (props: AssignModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const {
    users,
    user,
    setAssetUser,
    isAssignModal,
    setIsAssignModal,
    onAssetUserchange,
  } = props;
  const [filteredUsers, setFilteredUsers] = useState<Object[]>(users);

  const [current, setCurrent] = useState<any>(user);
  const [searchStr, setSearchStr] = useState<string>("");

  useOutsideClick(modalRef, isAssignModal, setIsAssignModal);

  const onSearchFormInput = (value: string) => {
    setSearchStr(value);

    setFilteredUsers(
      users.filter((user: any) => {
        return (
          (user.firstname + " " + user.lastname)
            .toLowerCase()
            .indexOf(value.toLowerCase()) >= 0 ||
          user.email.toLowerCase().indexOf(value.toLowerCase()) >= 0
        );
      })
    );
  };

  const onChange = () => {
    if (current._id !== (user as any)._id) {
      onAssetUserchange(current);
      setAssetUser(current);
    }
    setIsAssignModal(false);
  };

  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-screen bg-black bg-opacity-60">
      <div
        className="px-2.5 shadow-2xl bg-[#0d0d0d] rounded-xl w-[480px]"
        ref={modalRef}
      >
        <div className="flex flex-col justify-center pt-5">
          <div className="flex-1 text-xl font-semibold tracking-tight text-center text-neutral-100">
            Change Asset Assigned Person
          </div>
          <div className="p-[15px] flex gap-2.5">
            <input
              type="text"
              className="flex-1 rounded-md focus:border-primary focus:ring-primary border border-[#1C1C1C] bg-black placeholder:text-[#949494] text-white text-sm font-normal tracking-[-0.28px] p-4 transition"
              placeholder="Search here..."
              value={searchStr}
              onChange={(e) => {
                onSearchFormInput(e.target.value);
              }}
            />
            {/* <button className="px-5 py-3.5 flex items-center justify-center bg-[#1C1C1C] border border-[#1C1C1C] rounded-md text-[#949494] hover:text-white hover:border-primary hover:border">
              Search
            </button> */}
          </div>
          <div className="ml-[15px] mb-2.5 tracking-[-0.28px] text-[#3B3B3B] text-sm font-semibold">
            Assign to:
          </div>
          <div className="max-h-[350px] overflow-y-scroll scrollbar-thin scrollbar-thumb-primary">
            {filteredUsers.map((user: any, index) => (
              <AssignModalUserItem
                key={index}
                user={user}
                current={current}
                setCurrent={setCurrent}
              />
            ))}
          </div>
        </div>
        <div className="flex w-full items-center p-[25px]">
          <button
            type="button"
            className="bg-primary text-white text-base font-semibold tracking-[-0.32px] rounded-lg flex items-center text-center justify-center w-full py-4 hover:text-black hover:bg-white active:text-white active:bg-primary"
            onClick={() => {
              onChange();
            }}
          >
            Confirm Assigning
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignModal;
