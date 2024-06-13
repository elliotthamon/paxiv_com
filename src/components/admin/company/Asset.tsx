import { useState, useRef, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { toast } from "react-toastify";

import SmallSpinner from "@/components/SmallSpinner";
import AssetSavedIC from "@/components/icons/AssetSavedIC";
import AssetIC from "@/components/icons/AssetIC";

import useAsset from "@/hooks/useAsset";

import { AssetType } from "@/interfaces/AssetType";
import { getImageURL, priceFormat } from "@/libs/utils";
import { AssetStatusNameByValue } from "@/libs/constants";
import { AuthContext } from "@/contexts/AuthContext";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1368 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1368, min: 925 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 925, min: 0 },
    items: 1,
  },
};

const Asset = (props: {
  item: AssetType;
  isListView: boolean;
  isSidebar: boolean;
  userData?: any;
}) => {
  const { createSavedAsset, deleteSavedAsset } = useAsset();

  const authContext = useContext(AuthContext);

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveState, setSaveState] = useState<boolean>(props.item.isSaved);

  const ref = useRef(null);

  const updateSaveState = async () => {
    setIsSaving(true);
    let userData = props.userData;
    if (!userData) userData = await authContext.getUser();

    if (userData) {
      try {
        const userID = userData._id;
        let status = false;
        if (props.item.isSaved) {
          status = await deleteSavedAsset(props.item, userID);
        } else {
          status = await createSavedAsset(props.item, userID);
        }

        if (status) {
          props.item.isSaved = !props.item.isSaved;
          setSaveState(!saveState);

          if (props.item.isSaved)
            toast.success("Successfully added in Saved Assets!", {
              theme: "colored",
            });
          else
            toast.success("Successfully removed in Saved Assets!", {
              theme: "colored",
            });
        } else {
          toast.error("Faild to process", { theme: "colored" });
        }
      } catch (e) {
        toast.error("Faild to process", { theme: "colored" });
      }
    } else {
      toast.error("Faild to process", { theme: "colored" });
    }
    setIsSaving(false);
  };

  return (
    <div
      id={`assetcard-${props?.item._id}`}
      className={`${!isSaving && "admin-box"} ${
        props.isListView ? "w-2/3 rounded-l-lg" : "w-full rounded-lg"
      }`}
    >
      <div
        className={`flex ${
          props.isListView ? "flex-row w-full" : "flex-col w-full"
        } shadow-md`}
      >
        <div
          className={`relative ${
            props.isListView ? "w-[60%] max-w-[400px]" : "w-full"
          } h-[224px] `}
        >
          <Carousel
            ref={ref}
            swipeable={true}
            draggable={true}
            showDots={false}
            arrows={false}
            responsive={responsive}
            ssr={true}
            infinite={true}
            keyBoardControl={true}
            transitionDuration={500}
            containerClass="rounded-xl"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass=""
          >
            {props.item?.images?.length > 0 ? (
              // @ts-ignore
              props.item.images.map((img: any, index: number) => (
                <div key={index} className="rounded-t-lg bg-primary">
                  <Link
                    href={`/admin/assetView?id=${props.item._id}`}
                    className="select-none drag-none"
                  >
                    <Image
                      key={index}
                      src={getImageURL(img)}
                      width={382}
                      height={203}
                      className="w-full h-[224px] aspect-square pointer-events-none mx-auto object-cover drag-none select-none"
                      alt="asset"
                    />
                  </Link>
                  {props.item.images.length != 0 && (
                    <div className="absolute flex items-center justify-center px-4 py-2 text-white bg-black rounded-full bottom-3 right-3 bg-opacity-20">
                      {index + 1} / {props.item.images.length}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="bg-yellow-400 rounded-t-lg">
                <Link
                  href={`/admin/assetView?id=${props.item._id}`}
                  className="select-none drag-none"
                >
                  <Image
                    src="/images/p_logo_white.svg"
                    width={101}
                    height={153}
                    className="w-full h-[224px] aspect-square pointer-events-none drag-none select-none"
                    alt="no asset image"
                  />
                </Link>
              </div>
            )}
          </Carousel>
          <div className="absolute top-3 right-3 bg-white w-[32px] h-[32px] flex justify-center items-center rounded-full">
            <button onClick={() => updateSaveState()} disabled={isSaving}>
              {props.item.isSaved === true ? (
                <AssetSavedIC className="bi bi-bookmark-check-fill w-[16px]" />
              ) : (
                <AssetIC className="w-[16px]" />
              )}
            </button>
          </div>
          <div className="absolute flex items-center justify-center px-4 py-2 text-sm font-semibold text-white uppercase rounded-full top-3 left-3 bg-primary">
            {AssetStatusNameByValue(props.item.status)}
          </div>
        </div>
        <div className={`w-full text-white py-4`}>
          <Link href={`/admin/assetView?id=${props.item._id}`}>
            <h1
              className={`${
                props.isSidebar ? "text-white" : "text-white"
              } text-lg font-bold uppercase text-center md:text-left px-4`}
            >
              {props.item.name}
            </h1>
          </Link>
          <p className="px-4 mt-1 text-sm font-semibold leading-tight text-gray-200">
            {props.item.realAddress}
          </p>
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-1">
              <div className="relative w-[30px] h-[30px]">
                <Image
                  src={
                    props.item?.userData && props.item?.userData[0]?.avatar
                      ? getImageURL(props.item?.userData[0]?.avatar)
                      : "/images/default_avatar.png"
                  }
                  className="object-cover rounded-full"
                  alt="user avatar"
                  fill
                />
              </div>
              <p className="text-white">
                {props.item?.userData
                  ? props.item?.userData[0]?.firstname +
                    " " +
                    props.item?.userData[0]?.lastname
                  : ""}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-200">Price: </span>
              <span className="text-sm font-semibold text-white">
                {props.item.price && !isNaN(props.item.price)
                  ? "$" + Number(priceFormat(props.item.price)).toLocaleString()
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
      {isSaving && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-screen bg-gray-950/50">
          <SmallSpinner />
        </div>
      )}
    </div>
  );
};

export default Asset;
