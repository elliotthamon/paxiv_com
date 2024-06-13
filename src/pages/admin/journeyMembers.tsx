import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { AuthContext } from "@/contexts/AuthContext";

import BaseContainer from "@/components/BaseContainer";
import LayoutAdmin from "@/components/admin/LayoutAdmin";
import JourneyMemberDetailModal from "@/components/modals/JourneyMemberDetailModal";
import JourneyMemberRow from "@/components/admin/JourneyMemberRow";
import Pagination from "@/components/Pagination";

import {
  ACCESS_RESTRICTION_MSG,
  ApprovalStatusStringByType,
  COUNT_PER_PAGE,
  ROLE_SITE_ADMIN,
} from "@/libs/constants";

import { APPROVAL_STATUES } from "@/libs/constants";
import SmallSpinner from "@/components/SmallSpinner";
import useCompany from "@/hooks/useCompany";
import useMember from "@/hooks/useMember";

const JourneyMembers = () => {
  const router = useRouter();
  const authContext = useContext(AuthContext);

  const { filter } = router.query;
  const { getJourneyMembers } = useMember();
  const { getAllCompanies } = useCompany();

  const [user, setUser] = useState<any>(null);
  const [allCompanies, setAllComapnies] = useState<Array<any>>([]);
  const [members, setMembers] = useState<Array<Object>>([]);

  const [isBlockUI, setBlockUI] = useState<boolean>(false);
  const [isOpenDetailModal, setIsOpenDetailModal] = useState<boolean>(false);

  const [selectedMember, setSelectedMember] = useState<Object>({});

  const [filterApproval, setFilterApproval] = useState<string>(
    filter as string
  );
  const [filterStatus, setFilterStatus] = useState<number>(-1);
  const [filterStep, setFilterStep] = useState<string>("");

  const [current, setCurrent] = useState<number>(0);
  const [pageData, setPageData] = useState<Array<Object>>([]);

  useEffect(() => {
    const getCompanies = async () => {
      const companies = await getAllCompanies();
      if (!!companies) setAllComapnies(companies);
    };
    getCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMembers = async () => {
    authContext.handleLoading(true);

    let userData = authContext.getUser();

    if (userData?.role != ROLE_SITE_ADMIN) {
      toast.info(ACCESS_RESTRICTION_MSG, { theme: "colored" });
      router.back();
    }

    if (!!userData) {
      setUser(userData);

      const members = await getJourneyMembers({ filterStatus: "pending" });
      setMembers(members);
      setPageData(members.slice(0, COUNT_PER_PAGE));
    }
    authContext.handleLoading(false);
  };

  useEffect(() => {
    setCurrent(0);
    if (authContext.isLoggedIn) {
      getMembers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContext.isLoggedIn, filterApproval, filterStatus, filterStep]);

  useEffect(() => {
    const temp = members.slice(
      current * COUNT_PER_PAGE,
      (current + 1) * COUNT_PER_PAGE
    );
    setPageData(temp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, members]);

  useEffect(() => {
    if (isBlockUI) {
      setCurrent(0);
      getMembers();
      setBlockUI(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBlockUI]);

  return (
    <>
      <LayoutAdmin>
        <BaseContainer>
          <div className="flex flex-col w-full h-full">
            <div className="mt-2 text-xl font-bold text-white">
              Journey Members
            </div>
            <div className="flex flex-col py-4 text-sm text-white">
              <div className="flex flex-row gap-3 px-4 py-2 text-[#B0B0B0] bg-black bg-opacity-50 md:gap-0 rounded-t-xl">
                <div className="w-[80%] xs:w-[40%] md:w-[30%] flex items-center">
                  Name
                </div>
                <div className="hidden xs:flex w-[40%] md:w-[20%] items-center">
                  Company
                </div>
                <div className="hidden md:flex w-[10%]">
                  <select
                    className="w-full border-0 rounded-[100px] bg-transparent focus:border-primary focus:ring-0 cursor-pointer padding-l-0"
                    onChange={(e) => {
                      setFilterStep(e.target.value);
                    }}
                    value={filterStep}
                  >
                    <option
                      value=""
                      className="text-white bg-black bg-opacity-80"
                    >
                      Progress
                    </option>
                    <option
                      value="0"
                      className="text-white bg-black bg-opacity-80"
                    >
                      Step 1
                    </option>
                    <option
                      value="1"
                      className="text-white bg-black bg-opacity-80"
                    >
                      Step 2
                    </option>
                    <option
                      value="2"
                      className="text-white bg-black bg-opacity-80"
                    >
                      Step 3
                    </option>
                    <option
                      value="3"
                      className="text-white bg-black bg-opacity-80"
                    >
                      Step 4
                    </option>
                    <option
                      value="4"
                      className="text-white bg-black bg-opacity-80"
                    >
                      Step 5
                    </option>
                  </select>
                </div>
                <div className="hidden md:flex w-[10%]">
                  <select
                    className="w-full border-0 rounded-[100px] bg-transparent focus:border-primary focus:ring-0 cursor-pointer padding-l-0"
                    onChange={(e) => {
                      setFilterStatus(parseInt(e.target.value));
                    }}
                    value={filterStatus}
                  >
                    <option
                      value={-1}
                      className="text-white bg-black bg-opacity-80"
                    >
                      Payment
                    </option>
                    <option
                      value={0}
                      className="text-white bg-black bg-opacity-80"
                    >
                      None
                    </option>
                    <option
                      value={1}
                      className="text-white bg-black bg-opacity-80"
                    >
                      Paid
                    </option>
                  </select>
                </div>
                <div className="hidden md:flex w-[25%] gap-1">
                  <div className="flex md:w-[50%]">
                    <select
                      className="w-full border-0 rounded-[100px] bg-transparent focus:border-primary focus:ring-0 cursor-pointer padding-l-0"
                      onChange={(e) => {
                        setFilterApproval(e.target.value);
                      }}
                      value={filterApproval}
                    >
                      <option
                        value=""
                        className="text-white bg-black bg-opacity-80"
                      >
                        Status: ALL
                      </option>
                      {APPROVAL_STATUES.map((status: string, index: number) => (
                        <option
                          key={index}
                          value={status}
                          className="text-white bg-black bg-opacity-80"
                        >
                          Status: {ApprovalStatusStringByType(status)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex w-[20%] md:w-[5%] items-center">Edit</div>
              </div>
              <div className="w-full">
                {pageData &&
                  pageData.map((member: any, index: number) => (
                    <JourneyMemberRow
                      key={index}
                      index={index}
                      member={member}
                      setSelectedMember={setSelectedMember}
                      setIsOpenDetailModal={setIsOpenDetailModal}
                      members={members}
                      setMembers={setMembers}
                      user={user}
                      allCompanies={allCompanies}
                      setCurrent={setCurrent}
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
            {isBlockUI ? (
              <div className="absolute top-0 left-0 z-50 w-full h-full bg-gray-950/50">
                <div className="grid h-screen place-items-center">
                  <SmallSpinner />
                </div>
              </div>
            ) : null}
          </div>
        </BaseContainer>
      </LayoutAdmin>
      {isOpenDetailModal && (
        <JourneyMemberDetailModal
          setIsOpenDetailModal={setIsOpenDetailModal}
          selectedMember={selectedMember}
          allCompanies={allCompanies}
          setBlockUI={setBlockUI}
          user={user}
        />
      )}
    </>
  );
};

export default JourneyMembers;
