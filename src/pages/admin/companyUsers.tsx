import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";

import BaseContainer from "@/components/BaseContainer";
import LayoutAdmin from "@/components/admin/LayoutAdmin";
import UserRow from "@/components/admin/company/UserRow";
import Pagination from "@/components/Pagination";

import useCompany from "@/hooks/useCompany";
import { AuthContext } from "@/contexts/AuthContext";

import { COUNT_PER_PAGE } from "@/libs/constants";

const CompanyUsers = () => {
  const router = useRouter();
  const { Id } = router.query;
  const authContext = useContext(AuthContext);

  const [DBChanged, setDBChanged] = useState<boolean>(false);
  const [companyUsers, setCompanyUsers] = useState<Array<any>>([]);

  const [current, setCurrent] = useState<number>(0);
  const [pageData, setPageData] = useState<Array<Object>>([]);

  const { getCompanyUsersByCompanyID } = useCompany();

  useEffect(() => {
    const getCompanyUsers = async () => {
      authContext.handleLoading(true);
      if (typeof Id === "string") {
        let companyUsers = await getCompanyUsersByCompanyID(Id);
        setCompanyUsers(companyUsers);
        setPageData(companyUsers.slice(0, COUNT_PER_PAGE));
        authContext.handleLoading(false);
      } else {
        router.push("/admin/dashboard");
      }
    };

    getCompanyUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DBChanged]);

  useEffect(() => {
    const temp = companyUsers.slice(
      current * COUNT_PER_PAGE,
      (current + 1) * COUNT_PER_PAGE
    );
    setPageData(temp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  return (
    <LayoutAdmin>
      <BaseContainer>
        <div className="flex flex-col">
          <div className="flex justify-center md:justify-end text-center md:text-right text-[#0B1E25] text-[30px] font-semibold tracking-widest uppercase">
            Company users
          </div>
          <div className="flex flex-col bg-white rounded-xl py-9 xs:px-2 md:px-6 xs:ml-4 mt-6">
            <div className="flex flex-row justify-center text-center items-center px-2 md:px-12 py-2">
              <div className="flex flex-row w-1/2 md:w-[30%] text-left items-center justify-start">
                <h1 className="text-[#718096] text-[14px] ml-2">Name</h1>
              </div>
              <div className="flex w-[15%] md:w-[30%] text-left justify-start text-[#718096] text-[14px]">
                Position
              </div>
              <div className="flex w-[15%] md:w-[20%] text-left items-center justify-start text-[#718096] text-[14px]">
                <h1 className="text-[#718096] text-[14px] ml-2">Status</h1>
              </div>
              <div className="flex w-[20%] md:w-[20%] text-center flex-row justify-center space-x-6">
                <h1 className="text-[#718096] text-[14px] ml-2">Edit</h1>
              </div>
            </div>
            <div className="w-full space-y-8 mt-4">
              {pageData &&
                pageData.map((item: any, index: number) => (
                  <UserRow
                    key={index}
                    item={item}
                    DBChanged={DBChanged}
                    setDBChanged={setDBChanged}
                  />
                ))}
            </div>
            {companyUsers.length > COUNT_PER_PAGE && (
              <Pagination
                current={current}
                setCurrent={setCurrent}
                total={companyUsers.length}
              />
            )}
          </div>
        </div>
      </BaseContainer>
    </LayoutAdmin>
  );
};

export default CompanyUsers;
