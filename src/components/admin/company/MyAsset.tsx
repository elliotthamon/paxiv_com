import { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { useRouter } from "next/router";

import Asset from "@/components/admin/company/Asset";
import Marker from "@/components/admin/company/Marker";

import { AssetType } from "@/interfaces/AssetType";
import { styles } from "@/libs/constants";

const MyAsset = (props: {
  item: AssetType;
  isListView: boolean;
  userData?: any;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => setIsMounted(true), []);

  return (
    <div
      className={`${
        router.pathname.includes("admin/company") && "px-2"
      } w-full flex flex-col md:flex-row ${
        props.isListView && "justify-between w-full"
      }`}
    >
      <Asset
        item={props.item}
        isListView={props.isListView}
        isSidebar={false}
        userData={props.userData}
      />
      <div
        className={`w-1/3 max-w-[400px] h-[224px] ${
          props.isListView ? "flex" : "hidden"
        } overflow-hidden rounded-r-lg`}
      >
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
          }}
          // @ts-ignore
          defaultCenter={props.item.address}
          defaultZoom={11}
          options={{ styles: styles, fullscreenControl: false }}
        >
          {isMounted && (
            // @ts-ignore
            <Marker lat={props.item?.address?.lat} lng={props.item?.address?.lng} />
          )}
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default MyAsset;
