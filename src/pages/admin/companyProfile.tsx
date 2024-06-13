import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import BaseContainer from "@/components/BaseContainer";
import LayoutAdmin from "@/components/admin/LayoutAdmin";
import RightArrowIC from "@/components/icons/RightArrowIC";

import { AuthContext } from "@/contexts/AuthContext";
import useCompany from "@/hooks/useCompany";
import { getImageURL } from "@/libs/utils";
import LoadingSpinner from "@/components/LoadingSpinner";

const CompanyProfile = () => {
  const { getCompanyProfileByID } = useCompany();

  const router = useRouter();
  const authContext = useContext(AuthContext);
  const { Id } = router.query;

  const [companyProfile, setCompanyProfile] = useState<any>(null);

  useEffect(() => {
    const getCompanyInfo = async () => {
      authContext.handleLoading(true);

      if (typeof Id == "string") {
        let companyData = await getCompanyProfileByID(Id);
        setCompanyProfile(companyData);

        authContext.handleLoading(false);
      } else {
        router.push("/admin/dashboard");
      }
    };

    getCompanyInfo();
    // eslint-disable-next-line
  }, []);

  return (
    <LayoutAdmin>
      {companyProfile != null ? (
        <BaseContainer>
          <div className="flex flex-col">
            <div className="flex justify-end uppercase text-[#0B1E25] text-[20px] md:text-[30px]">
              company profile
            </div>

            <div className="flex flex-col relative mt-2">
              <div className="relative w-[1763px] h-[300px]">
                <Image
                  src={
                    companyProfile.companyBgImageFile
                      ? getImageURL(companyProfile.companyBgImageFile)
                      : "/images/company_default_bg.png"
                  }
                  className="object-cover w-full h-full rounded-[15px]"
                  alt="company logo"
                  fill
                />
              </div>
              <Image
                src={
                  companyProfile.companyAvatarImageFile
                    ? getImageURL(companyProfile.companyAvatarImageFile)
                    : "/images/company_default_avatar.png"
                }
                width={182}
                height={182}
                className="absolute left-[60px] -bottom-[35px] md:-bottom-[50px] w-[70px] md:w-[100px] h-[70px] md:h-[100px]"
                alt="user avatar"
              />
            </div>
            <div className="flex flex-row justify-end mt-16 space-x-2">
              <button
                className="flex flex-row items-center justify-center space-x-2 rounded-[25px] px-2 py-1 w-[160px] text-white text-[16px] bg-primary hover:bg-btnHover"
                onClick={() => router.push(`/admin/companyResources?Id=${Id}`)}
              >
                <h1>Users</h1>
                <RightArrowIC
                  fill="currentColor"
                  className="bi bi-arrow-right"
                />
              </button>
              <button
                className="flex flex-row items-center justify-center space-x-2 rounded-[25px] px-2 py-1 w-[160px] text-white text-[16px]  bg-primary hover:bg-btnHover"
                onClick={() => router.push(`/admin/companyResources?Id=${Id}`)}
              >
                <h1>Resources</h1>
                <RightArrowIC
                  fill="currentColor"
                  className="bi bi-arrow-right"
                />
              </button>
            </div>
            <div className="flex flex-col md:flex-row space-x-0 md:space-x-2 space-y-4 md:space-y-0 mt-16 text-center md:text-left">
              <div className="min-w-[30%] flex flex-col bg-white rounded-[20px] py-10 px-3 md:px-[20px] space-y-[30px]">
                <div className="text-center mx-auto uppercase">
                  <p className="text-gradient text-[16px] mt-2">
                    {companyProfile.name}
                  </p>
                </div>
                <hr className="bg-[#E8E8E8] opacity-50 h-[1px] mt-5" />

                <div className="text-center mx-auto uppercase">
                  <h1 className="text-[#718096] text-[14px]">address</h1>
                  <p className="text-[#2D3748] text-[16px] mt-2">
                    {companyProfile.address}
                  </p>
                </div>
                <hr className="bg-[#E8E8E8] opacity-50 h-[1px] mt-5" />

                <div className="text-center mx-auto uppercase">
                  <h1 className="text-[#718096] text-[14px]">phone</h1>
                  <p className="text-[#2D3748] text-[16px] mt-2">
                    {companyProfile.phone}
                  </p>
                </div>
                <hr className="bg-[#E8E8E8] opacity-50 h-[1px] mt-5" />

                <div className="text-center mx-auto uppercase">
                  <h1 className="text-[#718096] text-[14px]">email</h1>
                  <p className="text-[#2D3748] text-[16px] mt-2">
                    {companyProfile.email}
                  </p>
                </div>
              </div>
              <div className="w-full bg-white rounded-[20px] px-3 md:px-[20px] py-10">
                <h1 className="text-[#000000] text-[30px] md:text-[40px] font-semibold">
                  {companyProfile.title
                    ? companyProfile.title
                    : "Company Title"}
                </h1>
                <div className="mt-10 space-y-8">
                  <p className="text-[16px ]md:text-[20px] text-[black]">
                    {companyProfile.description
                      ? companyProfile.description
                      : "Company Description"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </BaseContainer>
      ) : (
        <LoadingSpinner />
      )}
    </LayoutAdmin>
  );
};

export default CompanyProfile;
