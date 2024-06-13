import { Marker, GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useRouter } from "next/router";
import { styles, MAP_LIBRARIES } from "@/libs/constants";

const DEFAULT_CENTER = { lat: 39.424721, lng: -95.695 };

type Props = {
  assetData: Array<any>;
  mapRef: any;
};

const Map = ({ assetData, mapRef }: Props) => {
  const router = useRouter();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    libraries: MAP_LIBRARIES,
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
  });

  const containerStyle = {
    height: "45vh",
  };

  try {
    return (
      <div className="items-center rounded-lg lg:flex-row" ref={mapRef}>
        <div className="relative w-full rounded-lg">
          {isLoaded && location !== null && (
            <GoogleMap
              id="google-map"
              mapContainerStyle={containerStyle}
              center={DEFAULT_CENTER}
              zoom={4.2}
              options={{ styles: styles, fullscreenControl: false }}
              mapContainerClassName="rounded-lg"
            >
              {assetData.length > 0 &&
                assetData.map((item: any, index: number) => (
                  <Marker
                    key={index}
                    draggable={true}
                    position={item.address}
                    icon={{
                      url: "/images/p_bubble.png",
                      scaledSize: new window.google.maps.Size(35, 40),
                    }}
                    onClick={() => router.push("/admin/search")}
                  />
                ))}
            </GoogleMap>
          )}
        </div>
      </div>
    );
  } catch (e: any) {
    console.log(e);
    return <></>;
  }
};

export default Map;
