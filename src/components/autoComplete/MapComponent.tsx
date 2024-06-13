import { useState, useEffect } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { styles } from "@/libs/constants";

const containerStyle = {
  height: "40vh",
};

type mapComponentTypes = {
  location: any;
  setValue: Function;
  setLocation: Function;
};

const MapComponent = ({
  location,
  setValue,
  setLocation,
}: mapComponentTypes) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const onMarkerDragEnd = (e: any) => {
    getReverseGeocodingData(e.latLng.lat(), e.latLng.lng());
    setLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };

  const getReverseGeocodingData = (lat: number, lng: number) => {
    if (google) {
      var latlng = new google.maps.LatLng(lat, lng);
      // This is making the Geocode request
      var geocoder = new google.maps.Geocoder();
      // @ts-ignore
      geocoder.geocode({ latLng: latlng }, (results, status) => {
        if (status !== google.maps.GeocoderStatus.OK) {
          console.log("Google Map Geocode Error");
        }
        // This is checking to see if the Geoeode Status is OK before proceeding
        if (status == google.maps.GeocoderStatus.OK) {
          // @ts-ignore
          let address = results[0].formatted_address;
          setValue(address);
        }
      });
    }
  };

  if (google) {
    return (
      <GoogleMap
        id="google-map"
        mapContainerStyle={containerStyle}
        center={location}
        zoom={6}
        options={{ styles: styles, fullscreenControl: false }}
        mapContainerClassName="rounded-lg transition"
      >
        {isMounted && (
          <Marker
            draggable={true}
            onDragEnd={onMarkerDragEnd}
            position={location}
          />
        )}
      </GoogleMap>
    );
  } else {
    console.log("Google is not correctly configured.");
    return <></>;
  }
};

export default MapComponent;
