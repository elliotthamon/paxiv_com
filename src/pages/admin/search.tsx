import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { toast } from "react-toastify";

import Asset from "@/components/admin/company/Asset";
import LayoutAdmin from "@/components/admin/LayoutAdmin";
import Marker from "@/components/Marker";
import CloseIC from "@/components/icons/CloseIC";
import AddressIC from "@/components/icons/AddressIC";
import FullScreenIC from "@/components/icons/FullScreenIC";
import ExitFullScreenIC from "@/components/icons/ExitFullScreenIC";

import useAsset from "@/hooks/useAsset";

import {
  ASSET_TYPES,
  ASSET_CLASSES,
  ASSET_STATUSES,
  ROLE_AI_SEARCHER,
  ROLE_ONBOARDING_ADMIN,
  ROLE_ONBOARDING_USER,
  ACCESS_RESTRICTION_MSG,
  PROPERTY_DEV_STATUS_TYPES,
  MARKET_SEGMENT_TYPES,
  RENT_TYPES,
} from "@/libs/constants";
import { AuthContext } from "@/contexts/AuthContext";
import BaseContainer from "@/components/BaseContainer";

const Search = () => {
  const router = useRouter();
  const { searchAssets, saveSearchedAssets, getAllAssets } = useAsset();
  const authContext = useContext(AuthContext);

  const [isFirstLoading, setIsFirstLoading] = useState<boolean>(true);
  const [isRightBarShow, setIsRightBarShow] = useState<boolean>(false);
  const [isAdvancedSearch, setIsAdvancedSearch] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [searchPossible, setSearchPossible] = useState<boolean>(false);
  const [initResult, setInitResult] = useState<Array<any>>([]);
  const [searchResult, setSearchResult] = useState<Array<any>>([]);
  const [searchAddress, setSearchAddress] = useState<string>("");
  const [searchAssetType, setSearchAssetType] = useState<string>("");
  const [searchAssetClass, setSearchAssetClass] = useState<string>("");
  const [searchAssetStatus, setSearchAssetStatus] = useState<string>("");

  // Advanced items
  const [advancedMinProperty, setAdvancedMinProperty] = useState<string>("");
  const [advancedMaxProperty, setAdvancedMaxProperty] = useState<string>("");
  const [advancedMinUnity, setAdvancedMinUnity] = useState<string>("");
  const [advancedMaxUnity, setAdvancedMaxUnity] = useState<string>("");
  const [advancedMinPurchase, setAdvancedMinPurchase] = useState<string>("");
  const [advancedMaxPurchase, setAdvancedMaxPurchase] = useState<string>("");
  const [advancedMinPrice, setAdvancedMinPrice] = useState<string>("");
  const [advancedMaxPrice, setAdvancedMaxPrice] = useState<string>("");
  const [advancedIsOpportunityZone, setAdvancedIsOpportunityZone] =
    useState<boolean>(false);
  const [advancedPropertyDevStatus, setAdvancedPropertyDevStatus] =
    useState<string>("");
  const [advancedMarketSegment, setAdvancedMarketSegment] =
    useState<string>("");
  const [advancedRentType, setAdvancedRentType] = useState<string>("");

  const [isFullScreenView, setIsFullScreenView] = useState<boolean>(false);

  const handlePropertyDevStatusChange = (event: any) => {
    setAdvancedPropertyDevStatus(event.target.value);
  };

  const handleMarketSegment = (event: any) => {
    setAdvancedMarketSegment(event.target.value);
  };

  const handleRentType = (event: any) => {
    setAdvancedRentType(event.target.value);
  };

  const defaultProps = {
    center: {
      lat: 36.99835602,
      lng: -95.01502627,
    },
    zoom: 4.3,
    styles: [
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
      },
    ],
  };

  const defaultMapOptions = {
    fullscreenControl: false,
    styles: defaultProps.styles,
  };

  const handleSearch = async () => {
    const userData = await authContext.getUser();
    if (!userData || !userData._id) {
      return;
    }

    if (!isFirstLoading && searchResult.length > 0 && isSaved == false) {
      // save search
      setIsSaving(true);
      const result = await saveSearchedAssets(searchResult, userData._id);
      setIsSaving(false);

      setIsSaved(true);

      if (result == false) {
        toast.error("Faild to save.", { theme: "colored" });
      } else {
        toast.success("Successfully saved!", { theme: "colored" });
        searchResult.forEach((asset) => {
          asset.isSaved = true;
        });
        setSearchResult(searchResult);

        setTimeout(() => {
          router.push("/admin/dashboard?status=savedSearches");
        }, 3000);
      }
    } else {
      // search
      setIsSearching(true);
      const result = await searchAssets(
        searchAddress,
        searchAssetType,
        searchAssetClass,
        searchAssetStatus,
        userData._id,

        isAdvancedSearch,
        advancedMinProperty,
        advancedMaxProperty,
        advancedMinUnity,
        advancedMaxUnity,
        advancedMinPurchase,
        advancedMaxPurchase,
        advancedMinPrice,
        advancedMaxPrice,
        advancedPropertyDevStatus,
        advancedMarketSegment,
        advancedRentType,
        advancedIsOpportunityZone
      );
      setIsSearching(false);
      setIsFirstLoading(false);
      setIsSaved(false);

      setSearchResult(result);

      if (result.length == 0) {
        toast.info("No search result.", { theme: "colored" });
      } else {
        setIsRightBarShow(true);
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }, 100);
      }
    }
  };

  const validateSearchPossible = () => {
    if (
      searchAddress !== "" ||
      searchAssetType !== "" ||
      searchAssetClass !== "" ||
      searchAssetStatus !== "" ||
      (isAdvancedSearch &&
        (advancedMinProperty !== "" ||
          advancedMaxProperty !== "" ||
          advancedMinUnity !== "" ||
          advancedMaxUnity !== "" ||
          advancedMinPurchase !== "" ||
          advancedMaxPurchase !== "" ||
          advancedMinPrice !== "" ||
          advancedMaxPrice !== "" ||
          advancedIsOpportunityZone !== false ||
          advancedPropertyDevStatus !== "" ||
          advancedMarketSegment !== "" ||
          advancedRentType !== ""))
    ) {
      setSearchPossible(true);
    } else {
      setSearchPossible(false);
    }
  };

  const cancel = () => {
    setIsAdvancedSearch(false);

    setIsSearching(false);
    setIsSaving(false);
    setIsSaved(true);
    setSearchPossible(false);
    setSearchResult(initResult);
    setSearchAddress("");
    setSearchAssetType("");
    setSearchAssetClass("");
    setSearchAssetStatus("");
    setAdvancedMinProperty("");
    setAdvancedMaxProperty("");
    setAdvancedMinUnity("");
    setAdvancedMaxUnity("");

    setAdvancedMinPurchase("");
    setAdvancedMaxPurchase("");
    setAdvancedMinPrice("");
    setAdvancedMaxPrice("");

    setAdvancedIsOpportunityZone(false);
    setAdvancedPropertyDevStatus("");
    setAdvancedMarketSegment("");
    setAdvancedRentType("");
  };

  useEffect(() => {
    validateSearchPossible();
    // eslint-disable-next-line
  }, [
    searchAddress,
    searchAssetClass,
    searchAssetStatus,
    searchAssetType,
    advancedMinProperty,
    advancedMaxProperty,
    advancedMinUnity,
    advancedMaxUnity,
    advancedMinPurchase,
    advancedMaxPurchase,
    advancedMinPrice,
    advancedMaxPrice,
    advancedIsOpportunityZone,
    advancedPropertyDevStatus,
    advancedMarketSegment,
    advancedRentType,
  ]);

  useEffect(() => {
    const init = async () => {
      authContext.handleLoading(true);
      const userData = authContext.getUser();
      if (
        userData?.role == ROLE_AI_SEARCHER ||
        userData?.role == ROLE_ONBOARDING_ADMIN ||
        userData?.role == ROLE_ONBOARDING_USER
      ) {
        toast.info(ACCESS_RESTRICTION_MSG, { theme: "colored" });
        router.back();
      }
      const asset_result = await getAllAssets();
      if (asset_result != null) {
        authContext.handleLoading(false);
        setTimeout(() => {
          setInitResult(asset_result);
          setSearchResult(asset_result);
        }, 1000);
      } else {
        authContext.handleLoading(false);
      }
    };
    if (authContext.isLoggedIn) {
      init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContext.isLoggedIn]);

  return (
    <LayoutAdmin>
      <BaseContainer>
        <h1 className="mt-2 text-xl font-bold text-white">Search</h1>

          <div
            className={`${
              isFullScreenView
                ? "fixed top-[82px] kl:top-[120px] left-0 w-full h-full-map"
                : "relative top-0 left-[23px] rounded-xl custom-full-width h-map"
            } bottom-0 overflow-hidden bg-[#17263c] z-0`}
          >


            {/* right bar collapsed */}
            <div
              className={
                //isFullScreenView
                //  ? "hidden"
                //  : 
                  "absolute right-0 z-30 hover:cursor-pointer"
              }
              onClick={() => setIsRightBarShow(true)}
            >
              <Image
                src="/images/arrow-left.png"
                width={42}
                height={1056}
                className="w-auto h-full rounded-tr-xl rounded-br-xl"
                alt="arrow right"
              />
            </div>

            {/* right bar expanded */}
            <div
              className={`absolute right-0 ${
                //isFullScreenView
                //  ? "hidden"
                // :
                  isRightBarShow && searchResult.length > 0
                  ? "flex h-full"
                  : "hidden"
              } z-50`}
            >
              <div
                className="hover:cursor-pointer"
                onClick={() => setIsRightBarShow(false)}
              >
                <Image
                  src="/images/arrow-right.png"
                  width={42}
                  height={1056}
                  className="h-full"
                  alt="arrow right"
                />
              </div>
              <div className="w-[400px] flex flex-col h-full overflow-y-scroll py-1 px-3 bg-[#262626] bg-opacity-100 space-y-5 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-200 scrollbar-thumb-rounded-br-xl scrollbar-track-rounded-tr-xl">
                {searchResult.map((item: any, index: number) => (
                  <Asset
                    item={item}
                    key={index}
                    isListView={false}
                    isSidebar={true}
                  />
                ))}
              </div>
            </div>

            {/* search map */}
            <div
              className="absolute top-2 right-10 w-[40px] h-[40px] bg-[#fff] rounded-sm z-20 flex justify-center items-center cursor-pointer"
              onClick={() => setIsFullScreenView(!isFullScreenView)}
            >
              {isFullScreenView ? <ExitFullScreenIC /> : <FullScreenIC />}
            </div>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
              }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
              options={defaultMapOptions}
            >
              {searchResult.map((result, index) =>
                result?.address ? (
                  <Marker
                    key={index}
                    lat={result.address.lat}
                    lng={result.address.lng}
                    id={result?._id}
                    onClick={(id)=>{ router.push(`/admin/assetView?id=${id}`) }}
                    onHover={(id, show)=>{ 
                      if(show) setIsRightBarShow(true);
                      const elem = document.getElementById(`assetcard-${id}`);
                      elem?.scrollIntoView({ behavior: "smooth"});
                    }}
                  />
                ) : null
              )}
            </GoogleMapReact>
        </div>

        {/* search bar */}
        <div
          className={
            isFullScreenView ? "fixed bottom-[60px] flex justify-center w-map" : 
              "flex justify-center w-full mt-4 mb-20"
          }
        >
          <div className="z-60 flex items-center justify-center w-full">
            <div className="w-full flex flex-col items-start justify-start bg-[#152031] rounded-lg px-3 xs:px-6 sm:px-3 py-3 overflow-auto">
              <div className="flex justify-between w-full">
                <p className="flex justify-start text-[16px] text-white">
                  {isAdvancedSearch ? "Advanced Search" : "Search"}
                </p>
                {isAdvancedSearch ? (
                  <div
                    className="cursor-pointer"
                    onClick={() => setIsAdvancedSearch(false)}
                  >
                    <CloseIC fill="#fff" className="bi bi-x-lg" />
                  </div>
                ) : (
                  searchPossible && (
                    <div className="cursor-pointer" onClick={() => cancel()}>
                      <CloseIC fill="#fff" className="bi bi-x-lg" />
                    </div>
                  )
                )}
              </div>
              <div className="flex flex-row justify-between w-full mt-2 space-x-3">
                <div className="flex flex-row">
                  <div className="relative w-[300px] flex items-center justify-start">
                    <input
                      type="text"
                      value={searchAddress}
                      className="w-full text-[#DEDEDE] placeholder-[#DEDEDE] border-0 focus:border-0 focus:ring-0 admin-box rounded-lg pl-8"
                      onChange={(e) => setSearchAddress(e.target.value)}
                      placeholder="Address, Location"
                    />
                    <AddressIC class="absolute top-3 left-2" fill="#DEDEDE" />
                  </div>
                  <div className="flex items-center px-3">
                    <select
                      className="border-0 text-[#DEDEDE] admin-box text-sm rounded-lg focus:ring-0 focus:border-0 block w-full p-2.5"
                      onChange={(e) => setSearchAssetType(e.target.value)}
                      value={searchAssetType}
                    >
                      <option value="">Asset Type</option>
                      {ASSET_TYPES.map((type, index) => (
                        <option key={index} value={type.value}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center px-3">
                    <select
                      className="border-0 text-[#DEDEDE] admin-box text-sm rounded-lg focus:ring-0 focus:border-0 block w-full p-2.5"
                      onChange={(e) => setSearchAssetClass(e.target.value)}
                      value={searchAssetClass}
                    >
                      <option value="">Asset Class</option>
                      {ASSET_CLASSES.map((type, index) => (
                        <option key={index} value={type.value}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center px-3">
                    <select
                      className="border-0 text-[#DEDEDE] admin-box text-sm rounded-lg focus:ring-0 focus:border-0 block w-full p-2.5"
                      onChange={(e) => setSearchAssetStatus(e.target.value)}
                      value={searchAssetStatus}
                    >
                      <option value="">Sales Status</option>
                      {ASSET_STATUSES.map((type, index) => (
                        <option key={index} value={type.value}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="relative flex flex-row mt-2 space-x-3 md:mt-0">
                  <button
                    className={`${
                      isAdvancedSearch ? "hidden" : "flex"
                    } px-3 py-2 text-white text-[16px] rounded-lg my-1 bg-primary hover:bg-btnHover`}
                    onClick={() => {
                      setIsAdvancedSearch(true);
                      setTimeout(() => {
                        window.scrollTo({
                          top: window.innerHeight,
                          behavior: "smooth",
                        });
                      }, 100);
                    }}
                  >
                    Advanced Search
                  </button>

                  {!isAdvancedSearch && (
                    <button
                      type="button"
                      disabled={!searchPossible || isSearching || isSaving}
                      className="bg-primary hover:bg-btnHover px-3 xs:px-5 py-2 text-white text-[16px] rounded-lg my-1 disabled:cursor-not-allowed"
                      onClick={() => handleSearch()}
                    >
                      {searchResult.length > 0 && !isSaved && !isFirstLoading
                        ? isSaving
                          ? "Saving..."
                          : "Save Search"
                        : isSearching
                        ? "Searching..."
                        : "Search"}
                    </button>
                  )}
                </div>
              </div>

              <div className={`${isAdvancedSearch ? "block" : "hidden"}`}>
                <div className="z-50 flex flex-col w-full mt-2">
                  <div className="flex flex-col justify-between w-full mt-5 gap-x-1 gap-y-3 lg:flex-row">
                    <div className="flex flex-col">
                      <h1 className="text-white text-[14px]">Property Size</h1>
                      <div className="flex justify-between border-[1px] border-[#E7E7F2] rounded-lg">
                        <div className="flex flex-col px-2 py-1">
                          <h1 className="text-[#E7E7F2] text-[12px]">Min Sf</h1>
                          <input
                            type="text"
                            className="w-full p-0 text-white bg-transparent border-0 ring-0 focus:ring-0 focus:border-0"
                            placeholder="Min Sf"
                            onChange={(e) =>
                              setAdvancedMinProperty(e.target.value)
                            }
                          />
                        </div>
                        <div className="flex flex-col px-2 py-1 border-l-[1px] border-[#E7E7F2]">
                          <h1 className="text-[#E7E7F2] text-[12px]">Max Sf</h1>
                          <input
                            type="text"
                            className="w-full p-0 text-white bg-transparent border-0 ring-0 focus:ring-0 focus:border-0"
                            placeholder="Max Sf"
                            onChange={(e) =>
                              setAdvancedMaxProperty(e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <h1 className="text-white text-[14px]">
                        Number of Units
                      </h1>
                      <div className="flex justify-between border-[1px] border-[#E7E7F2] rounded-lg">
                        <div className="flex flex-col px-2 py-1">
                          <h1 className="text-[#E7E7F2] text-[12px]">Min Sf</h1>
                          <input
                            type="text"
                            className="w-full p-0 text-white bg-transparent border-0 ring-0 focus:ring-0 focus:border-0"
                            placeholder="Min Sf"
                            onChange={(e) =>
                              setAdvancedMinUnity(e.target.value)
                            }
                          />
                        </div>
                        <div className="flex flex-col px-2 py-1 border-l-[1px] border-[#E7E7F2]">
                          <h1 className="text-[#E7E7F2] text-[12px]">Max Sf</h1>
                          <input
                            type="text"
                            className="w-full p-0 text-white bg-transparent border-0 ring-0 focus:ring-0 focus:border-0"
                            placeholder="Max Sf"
                            onChange={(e) =>
                              setAdvancedMaxUnity(e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <h1 className="text-white text-[14px]">Year Acquired</h1>
                      <div className="flex justify-between border-[1px] border-[#E7E7F2] rounded-lg">
                        <div className="flex flex-col px-2 py-1">
                          <h1 className="text-[#E7E7F2] text-[12px]">Min</h1>
                          <input
                            type="text"
                            className="w-full p-0 text-white bg-transparent border-0 ring-0 focus:ring-0 focus:border-0"
                            placeholder="Min"
                            onChange={(e) =>
                              setAdvancedMinPurchase(e.target.value)
                            }
                          />
                        </div>
                        <div className="flex flex-col px-2 py-1 border-l-[1px] border-[#E7E7F2]">
                          <h1 className="text-[#E7E7F2] text-[12px]">Max</h1>
                          <input
                            type="text"
                            className="w-full p-0 text-white bg-transparent border-0 ring-0 focus:ring-0 focus:border-0"
                            placeholder="Max"
                            onChange={(e) =>
                              setAdvancedMaxPurchase(e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <h1 className="text-white text-[14px]">Price</h1>
                      <div className="flex justify-between border-[1px] border-[#E7E7F2] rounded-lg">
                        <div className="flex flex-col px-2 py-1">
                          <h1 className="text-[#E7E7F2] text-[12px]">Min</h1>
                          <input
                            type="text"
                            className="w-full p-0 text-white bg-transparent border-0 ring-0 focus:ring-0 focus:border-0"
                            placeholder="Min"
                            onChange={(e) =>
                              setAdvancedMinPrice(e.target.value)
                            }
                          />
                        </div>

                        <div className="flex flex-col px-2 py-1 border-l-[1px] border-[#E7E7F2]">
                          <h1 className="text-[#E7E7F2] text-[12px]">Max</h1>
                          <input
                            type="text"
                            className="w-full p-0 text-white bg-transparent border-0 ring-0 focus:ring-0 focus:border-0"
                            placeholder="Max"
                            onChange={(e) =>
                              setAdvancedMaxPrice(e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mt-5">
                    <h1 className="text-[#fff] text-[14px]">
                      Property Development Status
                    </h1>
                    <div className="flex flex-wrap w-fit rounded-lg border-[1px] border-[#E7E7F2]">
                      {PROPERTY_DEV_STATUS_TYPES.map(
                        (item: any, index: number) => {
                          return (
                            <div
                              className="flex flex-row items-center p-3 space-x-2"
                              key={index}
                            >
                              <input
                                type="radio"
                                value={item.value}
                                name="propertyDevStatus"
                                checked={
                                  advancedPropertyDevStatus === item.value
                                }
                                className="w-4 h-4 bg-transparent cursor-pointer text-primary border-primary focus:ring-primary"
                                onChange={handlePropertyDevStatusChange}
                              />
                              <label className="text-[16px] font-medium text-white">
                                {item.name}
                              </label>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row gap-x-4">
                    <div className="flex flex-col mt-5">
                      <h1 className="text-[#fff] text-[14px]">
                        Market Segment
                      </h1>
                      <div className="flex justify-between">
                        <div className="flex flex-row w-fit rounded-lg border-[1px] border-[#E7E7F2]">
                          {MARKET_SEGMENT_TYPES.map(
                            (item: any, index: number) => {
                              return (
                                <div
                                  className="flex flex-row items-center p-3 space-x-2"
                                  key={index}
                                >
                                  <input
                                    type="radio"
                                    value={item.value}
                                    name="marketSegment"
                                    checked={
                                      advancedMarketSegment === item.value
                                    }
                                    className="w-4 h-4 bg-transparent cursor-pointer text-primary border-primary focus:ring-primary"
                                    onChange={handleMarketSegment}
                                  />
                                  <label className="text-[16px] font-medium text-white">
                                    {item.name}
                                  </label>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col mt-5">
                      <h1 className="text-[#fff] text-[14px]">Rent Type</h1>
                      <div className="flex justify-between">
                        <div className="flex flex-row w-fit rounded-lg border-[1px] border-[#E7E7F2]">
                          {RENT_TYPES.map((item: any, index: number) => {
                            return (
                              <div
                                className="flex flex-row items-center p-3 space-x-2"
                                key={index}
                              >
                                <input
                                  type="radio"
                                  value={item.value}
                                  name="rentType"
                                  checked={advancedRentType === item.value}
                                  className="w-4 h-4 bg-transparent cursor-pointer text-primary border-primary focus:ring-primary"
                                  onChange={handleRentType}
                                />
                                <label className="text-[16px] font-medium text-white">
                                  {item.name}
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col mt-5">
                      <h1 className="text-[#fff] text-[14px]">
                        Opportunity zone
                      </h1>
                      <div className="flex justify-between">
                        <div className="flex flex-row w-fit rounded-lg border-[1px] border-[#E7E7F2]">
                          <div className="flex flex-row items-center p-3 space-x-2">
                            <input
                              type="checkbox"
                              checked={advancedIsOpportunityZone}
                              name="colored-radio"
                              className="w-4 h-4 bg-transparent cursor-pointer text-primary border-primary focus:ring-0"
                              onChange={(e) =>
                                setAdvancedIsOpportunityZone(
                                  !advancedIsOpportunityZone
                                )
                              }
                            />
                            <label className="text-[16px] font-medium text-white uppercase">
                              IN AN OPPORTUNITY ZONE&nbsp;
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="block mt-6 space-x-0 xs:flex xs:space-x-2">
                  <div className="flex justify-center w-full xs:w-auto">
                    <button
                      disabled={!searchPossible || isSearching || isSaving}
                      className="px-8 py-2 text-base font-semibold text-white transition border rounded-lg cursor-pointer hover:text-primary border-primary bg-primary hover:bg-white"
                      onClick={() => handleSearch()}
                    >
                      {searchResult.length > 0 && !isSaved && !isFirstLoading
                        ? isSaving
                          ? "Saving..."
                          : "Save Search"
                        : isSearching
                        ? "Searching..."
                        : "Search"}
                    </button>
                  </div>
                  <div className="flex justify-center w-full py-3 xs:w-auto xs:py-0">
                    <button
                      className="px-6 py-2 text-white transition-all rounded-lg cursor-pointer admin-box hover:bg-primary"
                      onClick={() => cancel()}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BaseContainer>
    </LayoutAdmin>
  );
};

export default Search;
