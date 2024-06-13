import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { toast } from "react-toastify";

import useCompany from "@/hooks/useCompany";
import { AuthContext } from "@/contexts/AuthContext";

import CompanyRow from "@/components/admin/company/CompanyRow";
import BaseContainer from "@/components/BaseContainer";
import LayoutAdmin from "@/components/admin/LayoutAdmin";
import Pagination from "@/components/Pagination";

import {
  ROLE_SITE_ADMIN,
  ROLE_AI_SEARCHER,
  ACCESS_RESTRICTION_MSG,
  COUNT_PER_PAGE,
} from "@/libs/constants";

const AllCompanies = () => {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  const [companies, setCompanies] = useState<Array<any>>([]);
  const [current, setCurrent] = useState<number>(0);
  const [pageData, setPageData] = useState<Array<Object>>([]);
  const [user, setUser] = useState<any>(null);

  const { getAllCompanies } = useCompany();

  useEffect(() => {
    const geAllCompanies = async () => {
      authContext.handleLoading(true);
      let userData = authContext.getUser();
      if (userData?.role == ROLE_AI_SEARCHER) {
        toast.info(ACCESS_RESTRICTION_MSG, { theme: "colored" });
        router.push("/admin/dashboard");
      }
      if (userData?.role != ROLE_SITE_ADMIN) {
        toast.info(ACCESS_RESTRICTION_MSG, { theme: "colored" });
        router.back();
      }
      setUser(userData);
      if (!!userData) {
        if (userData.role === ROLE_SITE_ADMIN) {
          let allCompanies = await getAllCompanies();
          setCompanies(allCompanies);
          setPageData(allCompanies.slice(0, COUNT_PER_PAGE));
        }
      }
      authContext.handleLoading(false);
    };

    if (authContext.isLoggedIn) {
      geAllCompanies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContext.isLoggedIn]);

  useEffect(() => {
    const temp = companies.slice(
      current * COUNT_PER_PAGE,
      (current + 1) * COUNT_PER_PAGE
    );
    setPageData(temp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const canAdd = user?.role === ROLE_SITE_ADMIN;

  return (
    <LayoutAdmin>
      <BaseContainer>
        {companies.length > 0 ? (
          <div className="flex flex-col">
            <div className="flex flex-row items-center justify-between w-full mt-2">
              <h1 className="text-xl font-bold text-white">All Companies</h1>
              <div className="flex flex-row items-center justify-end pr-6 mt-8 space-x-6 md:justify-between md:mt-0 xs:pr-0">
                {canAdd ? (
                  <button
                    className="px-6 py-2 text-base text-white transition border rounded-lg hover:text-primary text-primary border-primary bg-primary hover:bg-transparent"
                    onClick={() => router.push("/admin/createCompany")}
                  >
                    New company
                  </button>
                ) : null}
              </div>
            </div>

            <div className="flex flex-row">
              <div className="flex flex-col w-full pt-6 space-x-0 pb-9">
                <div className="flex md:grid md:grid-cols-4 flex-wrap md:flex-nowrap flex-row justify-center items-center px-4 lg:px-12 py-5 text-[#B0B0B0] bg-black bg-opacity-50 text-sm rounded-t-xl">
                  <div className="w-[80%] md:w-auto pl-8 lg:px-2">Name</div>
                  <div className="hidden px-2 md:block">Website</div>
                  <div className="hidden px-2 md:block">Email</div>
                  <div className="hidden px-2 md:block">Resources</div>
                  <div className="block mr-6 md:hidden">More</div>
                </div>

                <div className="w-full text-white">
                  {pageData &&
                    pageData.map((item: any, index: number) => (
                      <div
                        key={index}
                        className={`${
                          index % 2 == 0 ? "tbl-even" : "tbl-odd"
                        } backdrop-blur w-full flex md:grid md:grid-cols-4 justify-center items-center px-2 md:px-4 py-4`}
                      >
                        <CompanyRow item={item} user={user} />
                      </div>
                    ))}
                </div>
              </div>
            </div>
            {companies.length > COUNT_PER_PAGE && (
              <Pagination
                current={current}
                setCurrent={setCurrent}
                total={companies.length}
              />
            )}
          </div>
        ) : (
          <div className="w-full h-full">
            <h1 className="text-xl font-bold text-black mt-7">All Companies</h1>
            <div className="w-full h-full mt-20">
              <div className="flex justify-center w-full">
                <Image
                  width={461}
                  height={308}
                  src="/images/no_asset.png"
                  alt="no asset"
                />
              </div>
              <div>
                <div className="w-full h-full text-3xl text-center">
                  There are no registered companies.
                </div>
                <div className="absolute bottom-0 w-full h-full py-32 right-10 xs:px-5 lg:mx-10">
                  {canAdd ? (
                    <div className="flex items-end justify-end w-full h-full">
                      <button
                        className="px-6 py-2 ml-8 text-base text-white transition border rounded-lg hover:text-primary text-primary border-primary bg-primary hover:bg-transparent"
                        onClick={() => router.push("/admin/createCompany")}
                      >
                        New company
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        )}
      </BaseContainer>
    </LayoutAdmin>
  );
};

export default AllCompanies;
