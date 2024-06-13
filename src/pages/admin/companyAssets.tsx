import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import BaseContainer from "@/components/BaseContainer";
import MyAsset from "@/components/admin/company/MyAsset";
import LayoutAdmin from "@/components/admin/LayoutAdmin";
import DetailIC from "@/components/icons/DetailIC";
import ListMoreHiddenIC from "@/components/icons/ListMoreHiddenIC";
import Pagination from "@/components/Pagination";

import useAsset from "@/hooks/useAsset";
import { AuthContext } from "@/contexts/AuthContext";

import { ReactSpreadsheetImport } from "react-spreadsheet-import";

import {
  ROLE_AI_SEARCHER,
  ROLE_SITE_ADMIN,
  ACCESS_RESTRICTION_MSG,
} from "@/libs/constants";

const fields = [
  {
    label: "Name",
    key: "name",
    alternateMatches: ["first name", "first"],
    fieldType: { type: "input" },
    validations: [
      { rule: "required", errorMessage: "Name is required", level: "error" },
    ],
  },

  {
    label: "Address",
    key: "realAddress",
    alternateMatches: ["address", "address1"],
    fieldType: { type: "input" },
    validations: [
      { rule: "required", errorMessage: "Address is required", level: "error" },
    ],
  },
  {
    label: "Number Of Units",
    key: "numberOfUnits",
    alternateMatches: ["units"],
    fieldType: { type: "input" },
  },
  {
    label: "Price",
    key: "price",
    fieldType: { type: "input" },
  },
  {
    label: "SquareFeet",
    key: "squareFeet",
    fieldType: { type: "input" },
  },
  {
    label: "yearPurchased",
    key: "yearPurchased",
    fieldType: { type: "input" },
  },
  {
    label: "constructionYear",
    key: "constructionYear",
    fieldType: { type: "input" },
  },
  {
    label: "assetType",
    key: "assetType",
    fieldType: { type: "input" },
  },
  {
    label: "class",
    key: "class",
    fieldType: { type: "input" },
  },
  {
    label: "status",
    key: "status",
    fieldType: { type: "input" },
  },
];

const PAGE_SIZE = 4;

const CompanyAssets = () => {
  const router = useRouter();
  const authContext = useContext(AuthContext);

  const { id } = router.query;

  const { queryAssets, submitAsset } = useAsset();
  const [isListView, setIsListView] = useState<boolean>(true);
  const [companyID, setCompanyID] = useState<string>("");
  const [userCompanyID, setUserCompanyID] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");
  const [userID, setUserID] = useState<string>("");
  // const [user, setUser] = useState<any>(null);

  const [current, setCurrent] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [importData, setImportData] = useState<boolean>(false);
  const [pageData, setPageData] = useState<Array<Object>>([]);

  useEffect(() => {
    const userData = authContext.getUser();
    setUserID(userData?._id);
    setUserRole(userData?.role);
    setUserCompanyID(userData?._companyID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContext.isLoggedIn]);

  useEffect(() => {
    if (userRole == ROLE_AI_SEARCHER) {
      router.back();
      toast.info(ACCESS_RESTRICTION_MSG, { theme: "colored" });
    }

    const company = Array.isArray(id) ? id[0] : id;
    setCompanyID(
      company && userRole === ROLE_SITE_ADMIN ? company : userCompanyID
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userRole, userCompanyID, id]);

  useEffect(() => {
    const getAssets = async () => {
      authContext.handleLoading(true);

      await queryAssets({ companyID }, current, PAGE_SIZE)
        .then((res) => {
          setTotal(res._meta.total);
          setPageData(res.data);
        })
        .catch((err: any) => {
          toast.error("Error occured. Try again later.", {
            theme: "colored",
          });
        });
      authContext.handleLoading(false);
    };
    getAssets();

    // eslint-disable-next-line
  }, [companyID, current]);

  const canEdit =
    userRole === ROLE_SITE_ADMIN || companyID == id || id == undefined;
  const canImport = userRole === ROLE_SITE_ADMIN;

  const onImportSubmit = async (data: any, file: any): Promise<any> => {
    console.log("submit");
    console.log(file);
    const geocoder = new google.maps.Geocoder();

    const adds = data.validData.map(async (asset: any) => {
      const address = await geocoder.geocode({ address: asset.realAddress });
      console.log(asset.realAddress, " -- ", address);
      const loc = address?.results[0]?.geometry?.location;
      const toAdd = {
        userID,
        companyID,
        address: { lat: loc.lat(), lng: loc.lng() },
        ...asset,
      };
      console.log(toAdd);
      return submitAsset(toAdd);
    });

    const res = await Promise.allSettled(adds);

    toast.info("Import complete.", { theme: "colored" });

    // address = location; // coords
  };

  return (
    <LayoutAdmin>
      <BaseContainer>
        {pageData?.length > 0 ? (
          <div className="pb-8">
            <div className="flex flex-row justify-between w-full mt-2">
              <h1 className="text-xl font-bold text-white">Company Assets</h1>
              <div className="flex flex-row items-center justify-end pr-6 mt-8 space-x-6 md:justify-between md:mt-0 xs:pr-0">
                {/* <h1 className="text-base font-medium text-gray-200">View</h1>
                <div className="flex items-center space-x-2">
                  <div
                    className="hover:cursor-pointer hover:scale-150"
                    onClick={() => setIsListView(false)}
                  >
                    <ListMoreHiddenIC fill="#fff" />
                  </div>
                  <div
                    className="hover:cursor-pointer hover:scale-150"
                    onClick={() => setIsListView(true)}
                  >
                    <DetailIC fill="#fff" className="white bi bi-list-ul" />
                  </div>
                </div>
                */}
                {canEdit ? (
                  <button
                    className="px-6 py-2 text-base text-white transition border rounded-lg hover:text-primary text-primary border-primary bg-primary hover:bg-transparent"
                    onClick={() => {
                      router.push(`/admin/createAsset?id=${companyID}`);
                    }}
                  >
                    Add New Asset
                  </button>
                ) : null}

                {canImport ? (
                  <button
                    className="px-6 py-2 text-base text-white transition border rounded-lg hover:text-primary text-primary border-primary bg-primary hover:bg-transparent"
                    onClick={() => {
                      setImportData(true);
                    }}
                  >
                    Import Assets
                  </button>
                ) : null}

                <ReactSpreadsheetImport
                  isOpen={importData}
                  onClose={() => setImportData(false)}
                  onSubmit={onImportSubmit}
                  fields={fields}
                />
              </div>
            </div>
            <div
              className={`${
                isListView ? "flex flex-col" : "grid grid-cols-2 lg:grid-cols-3"
              } w-full mt-6 gap-x-4 gap-y-8 mx-auto md:mx-0 items-start`}
            >
              {pageData &&
                pageData.map((item: any, index: number) => (
                  <MyAsset key={index} item={item} isListView={isListView} />
                ))}
            </div>
            {Array.isArray(pageData) && total > PAGE_SIZE && (
              <div className="pt-8">
                <Pagination
                  current={current}
                  setCurrent={setCurrent}
                  total={total}
                  pageSize={PAGE_SIZE}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="w-full">
            <h1 className="mt-2 text-xl font-bold text-white">
              Company Assets
            </h1>
            <div className="w-full h-full mt-10">
              <div className="flex justify-center w-full">
                <Image
                  width={461}
                  height={308}
                  src="/images/no_asset.png"
                  alt="no asset"
                />
              </div>
              <p className="mt-6 text-xl font-semibold text-center text-white">
                You have no assets yet!
              </p>
              {canEdit && (
                <p className="w-[260px] mx-auto text-base font-medium text-gray-200 text-center">
                  By clicking on the button below you can upload your assets
                </p>
              )}

              {canEdit ? (
                <div className="flex justify-center w-full mt-6">
                  <button
                    className="px-8 py-2 text-base text-white transition border-2 rounded-lg bg-primary hover:bg-white hover:text-primary border-primary"
                    onClick={() => {
                      router.push(`/admin/createAsset?id=${companyID}`);
                    }}
                  >
                    Add New Asset
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </BaseContainer>
    </LayoutAdmin>
  );
};

export default CompanyAssets;
