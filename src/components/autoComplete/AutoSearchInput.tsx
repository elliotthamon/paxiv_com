import { useEffect, useState } from "react";
import { Autocomplete } from "@react-google-maps/api";

interface AutoSearchInputProps {
  id: string;
  label: string;
  location: string;
  placeholder?: string;
  icon?: React.ReactNode;
  setLocation: Function;
  setAddress: Function;
}

const AutoSearchInput = ({
  id,
  label,
  location,
  placeholder,
  icon,
  setLocation,
  setAddress,
}: AutoSearchInputProps) => {
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
        <label htmlFor={id} className="block mb-2 text-sm font-bold text-white">
          {label}
        </label>
        <div className="relative mb-6">
          {icon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none z-50">
              {icon}
            </div>
          )}
          <input
            type="search"
            id={id}
            className={`bg-transparent border border-primary text-[#DEDEDE] rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full ${
              icon ? "pl-10" : "pl-4"
            } admin-box p-3`}
            placeholder={placeholder}
            value={realAddress}
            onChange={(e) => {
              setRealAddress(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
          />
        </div>
      </div>
    </Autocomplete>
  );
};

export default AutoSearchInput;
