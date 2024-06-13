import { useEffect, useState } from "react";
import { Autocomplete } from "@react-google-maps/api";

type searchType = {
  setLocation: Function;
  location: string;
  setAddress: Function;
};

const AutoSearchComponent = ({
  setLocation,
  location,
  setAddress,
}: searchType) => {
  const [autoCom, setAutoCom] = useState(null);
  const [realAddress, setRealAddress] = useState<string>(location);

  const onLoad = (autocomplete: any) => {
    try {
      if (autocomplete) setAutoCom(autocomplete);
    } catch (e) {
      console.log(`onLoad: `, e);
    }
  };

  const onPlaceChanged = () => {
    try {
      if (autoCom) {
        // @ts-ignore
        const place = autoCom.getPlace();
        if (place.geometry) {
          const lat = place.geometry.location.lat();
          const lon = place.geometry.location.lng();
          setLocation({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          });
          setRealAddress(place.formatted_address);
        }
      } else {
        console.log("Autocomplete is not loaded yet!");
      }
    } catch (e) {
      console.log(`onPlaceChanged: `, e);
    }
  };

  useEffect(() => {
    setRealAddress(location);
  }, [location]);

  useEffect(() => {
    setAddress(realAddress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [realAddress]);

  return (
    <Autocomplete
      onLoad={onLoad}
      onPlaceChanged={onPlaceChanged}
      options={
        {
          // types: ["establishment"],
          // componentRestrictions: { country: "ca" },
        }
      }
    >
      <div className="flex flex-col w-full">
        <label className={`font-bold text-sm text-white`}>address</label>
        <input
          type="search"
          className={`w-full mt-2 px-3 py-1 border-2 rounded-[8px] border-primary focus:ring-primary focus:border-primary admin-box text-[#DEDEDE]`}
          placeholder="Search the places"
          value={realAddress}
          onChange={(e) => {
            setRealAddress(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
        />
      </div>
    </Autocomplete>
  );
};

export default AutoSearchComponent;
