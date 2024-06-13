/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import { Tooltip } from "react-tooltip";
import "react-multi-carousel/lib/styles.css";

import ArchiveIC from "@/components/icons/ArchiveIC";
import PreviousIC from "@/components/icons/PreviousIC";

import useAsset from "@/hooks/useAsset";

import { ROLE_SITE_ADMIN, ACCESS_RESTRICTION_MSG } from "@/libs/constants";
import { getImageURL } from "@/libs/utils";
import NextIC from "@/components/icons/NextIC";
import AssetSavedIC from "@/components/icons/AssetSavedIC";
import useMember from "@/hooks/useMember";
import { toast } from "react-toastify";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1368 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1368, min: 925 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 925, min: 0 },
    items: 1,
  },
};

type Props = {
  myInfo: any;
};

const Network = ({ myInfo }: Props) => {
  const ref = useRef(null);

  const { getJourneyMembers } = useMember();
  const { getAllSavedAssets } = useAsset();

  const [cntPendingMembers, setCntPendingMembers] = useState<string>("---");
  const [savedAssets, setSavedAssets] = useState<Array<any>>([]);

  const goToPrevious = (e: any) => {
    e.preventDefault();
    // @ts-ignore
    ref.current?.previous();
  };

  const goToNext = (e: any) => {
    // @ts-ignore
    ref.current?.next();
  };

  useEffect(() => {
    if (ref.current) {
      // @ts-ignore
      ref.current.goToSlide(0);
    }
  }, [ref]);

  useEffect(() => {
    const getMembers = async () => {
      let members = await getJourneyMembers({ filterStatus: "pending" });
      return members ?? [];
    };

    if (myInfo?.role === ROLE_SITE_ADMIN) {
      getMembers()
        .then(function (res) {
          setCntPendingMembers(res?.length?.toString() ?? '');
        })
        .catch(function (error) {
          console.log("Error", error);
        });
    }
  }, [getJourneyMembers]);

  useEffect(() => {
    const getAssets = async () => {
      let assets = await getAllSavedAssets(myInfo?._id);
      return assets == null ? [] : assets;
    };

    if (myInfo?.role !== ROLE_SITE_ADMIN) {
      getAssets()
        .then(function (res) {
          let assets: Array<any> = [];
          res.map((item: any, index: number) => {
            if (item.assetData && item.assetData.length > 0) {
              (item.assetData[0].images as Array<string>).forEach((url) => {
                assets.push({
                  img: getImageURL(url),
                  _id: item.assetID,
                });
              });
            }
          });

          setSavedAssets(assets);
        })
        .catch(function (error) {
          console.log("Error", error);
        });
    }
  }, []);

  //     { ( myInfo?.role? === ROLE_SITE_ADMIN && 
  return (


    <div className="absolute -top-4 right-0"
    >
      <div
        className="w-[60px] h-[60px] bg-primary rounded-full flex justify-center items-center cursor-pointer"
        data-tooltip-content="Pending Members"
        data-tooltip-id="pending-id"
      >
        <Link
          href="/admin/journeyMembers?filter=pending"
          className="cursor-pointer"
          onClick={(e: any) => {
            if (myInfo?.role != ROLE_SITE_ADMIN) {
              e.preventDefault();
              toast.info(ACCESS_RESTRICTION_MSG, { theme: "colored" });
            }
          }}
        >
          <ArchiveIC width={20} height={20} />
          {parseInt(cntPendingMembers) != 0 && (
            <div className="absolute top-0 right-0 w-[20px] h-[20px] rounded-full flex justify-center items-center bg-[#cb112d] text-white">
              <div className="text-center">
                  {cntPendingMembers}
              </div>
            </div>
          )}
        </Link>
      </div>
      <Tooltip
            id="pending-id"
            place="top"
            className="text-center"
            style={{ maxWidth: "300px" }}
          />
    </div>
  );

  /*
</div>


      <div className="flex flex-col w-full h-full rounded-t-lg admin-box">
          <div className="flex flex-col w-full h-full rounded-t-lg">
            <div className="flex flex-row items-center justify-between px-4 py-5 rounded-t-lg bg-primary">
              <h1 className="text-xl font-bold text-white">Pending Members</h1>
              <ArchiveIC width={20} height={20} />
            </div>
            <div
              className="w-full flex flex-col items-center justify-center p-4 pb-[35px] h-full"
              style={{ boxShadow: "0 0 5px rgba(0, 0, 0, 0.5)" }}
            >
              <Link
                href="/admin/journeyMembers?filter=pending"
                className="cursor-pointer"
                onClick={(e: any) => {
                  if (myInfo?.role != ROLE_SITE_ADMIN) {
                    e.preventDefault();
                    toast.info(ACCESS_RESTRICTION_MSG, { theme: "colored" });
                  }
                }}
              >
                <div className="text-center">
                  <h1 className="text-[36px] font-bold text-primary">
                    {cntPendingMembers}
                  </h1>
                </div>
              </Link>
            </div>
        </div>
      </div>
  );
  */
};

export default Network;
