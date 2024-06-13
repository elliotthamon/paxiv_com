import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import Image from "next/image";

import { AuthContext } from "@/contexts/AuthContext";
import useCompany from "@/hooks/useCompany";

import ResourceRow from "@/components/admin/company/ResourceRow";
import BaseContainer from "@/components/BaseContainer";
import LayoutAdmin from "@/components/admin/LayoutAdmin";
import Pagination from "@/components/Pagination";

import {
  ROLE_SITE_ADMIN,
  ROLE_COMPANY_ADMINISTRATOR,
  COUNT_PER_PAGE,
  ROLE_ONBOARDING_USER,
  ACCESS_RESTRICTION_MSG,
  ROLE_AI_SEARCHER,
  ROLE_ONBOARDING_ADMIN,
} from "@/libs/constants";
import { toast } from "react-toastify";

const CompanyResources = () => {
  const router = useRouter();
  const { Id } = router.query;
  const authContext = useContext(AuthContext);

  const [companyResources, setCompanyResources] = useState<Array<any>>([]);
  const [pageData, setPageData] = useState<Array<Object>>([]);
  const [userData, setUserData] = useState<any>(null);
  const [companyData, setCompanyData] = useState<any>({});
  const [current, setCurrent] = useState<number>(0);

  const { getCompanyResourcesByCompanyID, getCompanyProfileByID } =
    useCompany();

  const getInitData = async () => {
    authContext.handleLoading(true);
    const user = authContext.getUser();
    if (user.role == ROLE_ONBOARDING_USER || user.role == ROLE_AI_SEARCHER) {
      toast.info(ACCESS_RESTRICTION_MSG, { theme: "colored" });
      router.back();
    }
    if (typeof Id === "string") {
      await getCompanyResourcesByCompanyID(Id).then((d: any) => {
        setCompanyResources(d);
        setPageData(d.slice(0, COUNT_PER_PAGE));
      });

      setCompanyData(await getCompanyProfileByID(Id));
      setUserData(user);
      authContext.handleLoading(false);
    } else {
      const companyID = user?.companyDetails[0]?._id;
      await getCompanyResourcesByCompanyID(companyID).then((d: any) => {
        setCompanyResources(d);
        setPageData(d.slice(0, COUNT_PER_PAGE));
      });
      setCompanyData(user?.companyDetails[0]);
      setUserData(user);
      authContext.handleLoading(false);
    }
  };

  useEffect(() => {
    if (authContext.isLoggedIn) {
      getInitData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContext.isLoggedIn]);

  useEffect(() => {
    const temp = companyResources.slice(
      current * COUNT_PER_PAGE,
      (current + 1) * COUNT_PER_PAGE
    );
    setPageData(temp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const canEdit =
    userData?.role == ROLE_SITE_ADMIN ||
    (userData?.companyID == companyData?._id &&
      (userData?.role == ROLE_COMPANY_ADMINISTRATOR ||
        userData?.role == ROLE_ONBOARDING_ADMIN));

  return (
    <LayoutAdmin>
      <BaseContainer>
        {companyResources.length > 0 ? (
          <div className="flex flex-col mt-2">
            <div className="my-6 py-1.5 text-white text-xl font-semibold tracking-[-0.4px]">
              Company Directory
            </div>

            <div className="w-full">
              <div className="w-full flex text-[#B0B0B0] text-sm font-semibold px-5 py-[15px] admin-box rounded-t-lg">
                <div className="w-[30%]">Name</div>
                <div className="hidden w-1/5 md:block">Position</div>
                <div className="hidden w-1/5 md:block">Email</div>
                <div className="hidden w-1/5 md:block">Phone</div>
                <div className="w-[10%]">Action</div>
              </div>
              <div>
                {pageData &&
                  pageData.map((item: any, index: number) => (
                    <div
                      key={index}
                      className={`${
                        index % 2 == 0 ? "tbl-even" : "tbl-odd"
                      } backdrop-blur flex items-center px-6 py-4`}
                    >
                      <ResourceRow
                        item={item}
                        companyId={Id}
                        canEdit={canEdit}
                      />
                    </div>
                  ))}
              </div>
              {companyResources.length > COUNT_PER_PAGE && (
                <Pagination
                  current={current}
                  setCurrent={setCurrent}
                  total={companyResources.length}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col mt-2">
            <div className="my-6 py-1.5 text-white text-xl font-semibold tracking-[-0.4px]">
              Company Directory
            </div>
            <div className="w-full h-full mt-20">
              <div className="flex justify-center w-full">
                <Image
                  width={461}
                  height={308}
                  src="/images/no_asset.png"
                  alt="no asset"
                />
              </div>
              <p className="mt-6 text-xl font-semibold text-center text-white">
                There are no company resources!
              </p>
            </div>
          </div>
        )}
      </BaseContainer>
    </LayoutAdmin>
  );
};

export default CompanyResources;
