import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { AuthContext } from "@/contexts/AuthContext";

import BaseContainer from "@/components/BaseContainer";
import LayoutAdmin from "@/components/admin/LayoutAdmin";
import MemberRow from "@/components/admin/MemberRow";
import Pagination from "@/components/Pagination";

import {
  ACCESS_RESTRICTION_MSG,
  COUNT_PER_PAGE,
  ROLE_SITE_ADMIN,
} from "@/libs/constants";

import useMember from "@/hooks/useMember";
import { toast } from "react-toastify";

const AllUsers = () => {
  const router = useRouter();
  const authContext = useContext(AuthContext);

  const { getAllMembers, editMemberRole } = useMember();

  const [members, setMembers] = useState<Array<Object>>([]);

  const [selectedMember, setSelectedMember] = useState<Object>({});

  const [current, setCurrent] = useState<number>(0);
  const [pageData, setPageData] = useState<Array<Object>>([]);

  const filterData = (members: Array<any>, userData: any) => {
    const filteredMembers = members.filter(
      (member) => member._id !== userData._id
    );
    return filteredMembers;
  };

  const editRole = async (id: any, roleType: string) => {
    authContext.handleLoading(true);
    const res = await editMemberRole(id, roleType);
    if (res?.status) {
      authContext.handleLoading(false);
      toast.success("Successfully updated!", { theme: "colored" });
      const _members = members.slice().map((item: any) => {
        if (item._id == id) {
          return {
            ...item,
            role: roleType,
          };
        } else {
          return item;
        }
      });
      setMembers(_members);
      setSelectedMember({});
    } else {
      authContext.handleLoading(false);
      toast.error("Something went wrong.", { theme: "colored" });
      setSelectedMember({});
    }
  };

  const getMembers = async () => {
    authContext.handleLoading(true);

    let userData = authContext.getUser();
    if (userData?.role != ROLE_SITE_ADMIN) {
      toast.info(ACCESS_RESTRICTION_MSG, {
        theme: "colored",
      });
      router.push("/admin/dashboard");
    }
    if (!!userData) {
      const members = await getAllMembers();
      const allMembers = filterData(members, userData);
      setMembers(allMembers);
      setPageData(allMembers.slice(0, COUNT_PER_PAGE));
    }
    authContext.handleLoading(false);
  };

  useEffect(() => {
    setCurrent(0);
    if (authContext.isLoggedIn) {
      getMembers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContext.isLoggedIn]);

  useEffect(() => {
    const temp = members.slice(
      current * COUNT_PER_PAGE,
      (current + 1) * COUNT_PER_PAGE
    );
    setPageData(temp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, members]);

  return (
    <>
      <LayoutAdmin>
        <BaseContainer>
          <div className="flex flex-col w-full h-full">
            <h1 className="mt-2 text-xl font-bold text-white">All Users</h1>
            <div className="flex flex-col mt-6 text-sm text-white rounded-xl pb-9">
              <div className="flex flex-row gap-3 px-4 py-4 text-[#B0B0B0] bg-black bg-opacity-50 md:gap-0 rounded-t-xl">
                <div className="w-[20%] flex items-center">Name</div>
                <div className="w-[20%] flex items-center">Email</div>
                <div className="w-[20%] flex items-center">Company</div>
                <div className="w-[15%] flex items-center">Position</div>
                <div className="w-[20%]  items-center">Role</div>
                <div className="flex w-[5%] items-center">Edit</div>
              </div>
              <div className="w-full">
                {pageData &&
                  pageData.map((member: any, index: number) => (
                    <MemberRow
                      key={index}
                      index={index}
                      member={member}
                      selectedMember={selectedMember}
                      setSelectedMember={setSelectedMember}
                      members={members}
                      setMembers={setMembers}
                      editRole={editRole}
                    />
                  ))}
              </div>
            </div>
            {members.length > COUNT_PER_PAGE && (
              <Pagination
                current={current}
                setCurrent={setCurrent}
                total={members.length}
              />
            )}
          </div>
        </BaseContainer>
      </LayoutAdmin>
    </>
  );
};

export default AllUsers;
