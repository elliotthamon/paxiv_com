import Image from "next/image";
import { useState, useContext } from "react";
import GoogleMapReact from "google-map-react";
import { AuthContext } from "@/contexts/AuthContext";

import Asset from "@/components/admin/company/Asset";
import LayoutAdmin from "@/components/admin/LayoutAdmin";
import Marker from "@/components/admin/company/Marker";
import CloseIC from "@/components/icons/CloseIC";

const Maps = () => {
  const authContext = useContext(AuthContext);
  authContext.handleLoading(false);
  const [isRightBarShow, setIsRightBarShow] = useState<boolean>(false);
  const [isAdvancedSearch, setIsAdvancedSearch] = useState<boolean>(false);
  const [isFilter, setIsFilter] = useState<boolean>(false);

  const defaultProps = {
    center: {
      lat: 36.99835602,
      lng: -90.01502627,
    },
    zoom: 5,
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

  return (
    <LayoutAdmin>
      <div className="flex justify-center h-full">
        <div
          className={`absolute right-0 z-30 hover:cursor-pointer`}
          onClick={() => setIsRightBarShow(true)}
        >
          <Image
            src="/images/arrow-left.png"
            width={42}
            height={1056}
            className="w-auto h-screen"
            alt="arrow right"
          />
        </div>

        <div
          className={`absolute right-0 ${
            isRightBarShow ? "flex" : "hidden"
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
              className="h-screen"
              alt="arrow right"
            />
          </div>
          <div className="flex flex-col h-screen overflow-y-scroll py-1 px-3 bg-[#262626] bg-opacity-100 space-y-5">
            {Array(3)
              .fill(0)
              .map((item: any, index: number) => (
                <Asset
                  item={item}
                  key={index}
                  isListView={false}
                  isSidebar={true}
                />
              ))}
          </div>
        </div>

        <div className="absolute flex justify-center items-center bottom-[20px] pl-[15px] sm:pr-[42px] z-20 ">
          <div className="flex flex-col items-start justify-start bg-[#979797] rounded-[8px] p-3 max-h-[500px] overflow-auto">
            <p className="flex justify-start text-[16px] text-white">Search</p>
            <div className="flex flex-col lg:flex-row w-full mt-2 space-x-2 gap-2">
              <div className="flex flex-2 flex-col lg:flex-row border-[1px] border-[#E7E7F2] rounded-[6px]">
                <div className="flex items-center justify-start px-3">
                  <input
                    type="text"
                    className="border-0 focus:border-0 focus:ring-0 bg-[#979797] text-white placeholder-white"
                    placeholder="Address, Location"
                  />
                </div>
                <div className="border-r-[1px] border-[#E7E7F2]"></div>
                <div className="flex items-center px-3">
                  <select
                    id="countries"
                    className="border-0 text-white bg-[#979797] text-sm rounded-lg focus:ring-0 focus:border-0 block w-full p-2.5"
                  >
                    <option value="">Asset Type</option>
                    <option value="type1">type1</option>
                    <option value="type2">type2</option>
                    <option value="type3">type3</option>
                    <option value="type4">type4</option>
                  </select>
                </div>
                <div className="border-r-[1px] border-[#E7E7F2]"></div>
                <div className="flex items-center px-3">
                  <select
                    id="countries"
                    className="border-0 text-white bg-[#979797] text-sm rounded-lg focus:ring-0 focus:border-0 block w-full p-2.5"
                  >
                    <option value="">Asset Class</option>
                    <option value="class1">class1</option>
                    <option value="class2">class2</option>
                    <option value="class3">class3</option>
                    <option value="class4">class4</option>
                  </select>
                </div>
                <div className="border-r-[1px] border-[#E7E7F2]"></div>
                <div className="flex items-center px-3">
                  <select
                    id="countries"
                    className="border-0 text-white bg-[#979797] text-sm rounded-lg focus:ring-0 focus:border-0 block w-full p-2.5"
                  >
                    <option value="">Sale Status</option>
                    <option value="Status1">Status1</option>
                    <option value="Status2">Status2</option>
                    <option value="Status3">Status3</option>
                    <option value="Status4">Status4</option>
                  </select>
                </div>
              </div>

              <div className="relative  flex flex-1 flex-row justify-between space-x-2 mt-2 md:mt-0">
                <div className="absolute w-full border-t-[1px] border-[#E7E7F2] bottom-0"></div>
                <button
                  className={`${
                    isAdvancedSearch ? "hidden" : "flex"
                  } btn-gradient border-[#979797] border-[4px] px-3 py-2 text-white text-[16px] rounded-[30px] my-1`}
                  onClick={() => setIsAdvancedSearch(true)}
                >
                  Advanced Search
                </button>
                <div
                  className={`${
                    isAdvancedSearch ? "flex" : "hidden"
                  } items-center border-[1px] text-white border-[#E7E7F2] rounded-t-[8px] border-b-[1px] px-2 py-1 z-50 border-b-[#979797]`}
                >
                  Advanced Search
                </div>
                <button className="btn-gradient border-[#979797] border-[4px] px-5 py-2 text-white text-[16px] rounded-[30px] my-1">
                  Save Search
                </button>
              </div>
            </div>

            <div
              className={`${
                isAdvancedSearch && !isFilter ? "block" : "hidden"
              }`}
            >
              <div className="flex flex-col w-full mt-2">
                <h1 className="text-primary text-[16px]">Advanced Search</h1>
                <div className="flex flex-col gap-x-1 gap-y-3 lg:flex-row justify-between w-full mt-5">
                  <div className="flex flex-col">
                    <h1 className="text-white text-[14px]">Property Size</h1>
                    <div className="flex justify-between border-[1px] border-[#E7E7F2] rounded-[8px]">
                      <div className="flex flex-col p-3">
                        <h1 className="text-[#E7E7F2] text-[12px]">Min Sf</h1>
                        <input
                          type="text"
                          className="p-0 mt-1 text-white w-full ring-0 border-0 focus:ring-0 focus:border-0 bg-transparent"
                          placeholder="Min Sf"
                        />
                      </div>
                      <div className="flex flex-col p-3 border-l-[1px] border-[#E7E7F2]">
                        <h1 className="text-[#E7E7F2] text-[12px]">Max Sf</h1>
                        <input
                          type="text"
                          className="p-0 mt-1 text-white w-full ring-0 border-0 focus:ring-0 focus:border-0 bg-transparent"
                          placeholder="Max Sf"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-white text-[14px]">Unity Size</h1>
                    <div className="flex justify-between border-[1px] border-[#E7E7F2] rounded-[8px]">
                      <div className="flex flex-col p-3">
                        <h1 className="text-[#E7E7F2] text-[12px]">Min Sf</h1>
                        <input
                          type="text"
                          className="p-0 mt-1 text-white w-full ring-0 border-0 focus:ring-0 focus:border-0 bg-transparent"
                          placeholder="Min Sf"
                        />
                      </div>
                      <div className="flex flex-col p-3 border-l-[1px] border-[#E7E7F2]">
                        <h1 className="text-[#E7E7F2] text-[12px]">Max Sf</h1>
                        <input
                          type="text"
                          className="p-0 mt-1 text-white w-full ring-0 border-0 focus:ring-0 focus:border-0 bg-transparent"
                          placeholder="Max Sf"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-white text-[14px]">Your Purchased</h1>
                    <div className="flex justify-between border-[1px] border-[#E7E7F2] rounded-[8px]">
                      <div className="flex flex-col p-3">
                        <h1 className="text-[#E7E7F2] text-[12px]">Min</h1>
                        <input
                          type="text"
                          className="p-0 mt-1 text-white w-full ring-0 border-0 focus:ring-0 focus:border-0 bg-transparent"
                          placeholder="Min"
                        />
                      </div>
                      <div className="flex flex-col p-3 border-l-[1px] border-[#E7E7F2]">
                        <h1 className="text-[#E7E7F2] text-[12px]">Max</h1>
                        <input
                          type="text"
                          className="p-0 mt-1 text-white w-full ring-0 border-0 focus:ring-0 focus:border-0 bg-transparent"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-white text-[14px]">Price</h1>
                    <div className="flex justify-between border-[1px] border-[#E7E7F2] rounded-[8px]">
                      <div className="flex flex-col p-3">
                        <h1 className="text-[#E7E7F2] text-[12px]">Min</h1>
                        <input
                          type="text"
                          className="p-0 mt-1 text-white w-full ring-0 border-0 focus:ring-0 focus:border-0 bg-transparent"
                          placeholder="Min"
                        />
                      </div>

                      <div className="flex flex-col p-3 border-l-[1px] border-[#E7E7F2]">
                        <h1 className="text-[#E7E7F2] text-[12px]">Max</h1>
                        <input
                          type="text"
                          className="p-0 mt-1 text-white w-full ring-0 border-0 focus:ring-0 focus:border-0 bg-transparent"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col mt-5">
                  <h1 className="text-[#fff] text-[14px]">
                    Construction Status
                  </h1>
                  <div className="flex flex-wrap w-fit rounded-[8px] border-[1px] border-[#E7E7F2]">
                    <div className="flex flex-row items-center space-x-2  p-3">
                      <input
                        type="radio"
                        value=""
                        name="construction"
                        className="w-4 h-4 text-primary bg-white border-primary focus:ring-primary"
                      />
                      <label className="text-[16px] font-medium text-white">
                        Existing
                      </label>
                    </div>
                    <div className="flex flex-row items-center space-x-2 p-3">
                      <input
                        type="radio"
                        value=""
                        name="construction"
                        className="w-4 h-4 text-primary bg-white border-primary focus:ring-primary"
                      />
                      <label className="text-[16px] font-medium text-white">
                        Under Construction
                      </label>
                    </div>
                    <div className="flex flex-row items-center space-x-2 p-3">
                      <input
                        type="radio"
                        value=""
                        name="construction"
                        className="w-4 h-4 text-primary bg-white border-primary focus:ring-primary"
                      />
                      <label className="text-[16px] font-medium text-white">
                        Under Renovation
                      </label>
                    </div>
                    <div className="flex flex-row items-center space-x-2 p-3">
                      <input
                        type="radio"
                        value=""
                        name="construction"
                        className="w-4 h-4 text-primary bg-white border-primary focus:ring-primary"
                      />
                      <label className="text-[16px] font-medium text-white">
                        Convertd
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-x-4">
                  <div className="flex flex-col mt-5">
                    <h1 className="text-[#fff] text-[14px]">
                      Marketing segment
                    </h1>
                    <div className="flex justify-between">
                      <div className="flex flex-row w-fit rounded-[8px] border-[1px] border-[#E7E7F2]">
                        <div className="flex flex-row items-center space-x-2  p-3">
                          <input
                            type="radio"
                            value=""
                            name="marketing"
                            className="w-4 h-4 text-primary bg-white border-primary focus:ring-primary"
                          />
                          <label className="text-[16px] font-medium text-white">
                            Senior
                          </label>
                        </div>
                        <div className="flex flex-row items-center space-x-2 p-3">
                          <input
                            type="radio"
                            value=""
                            name="marketing"
                            className="w-4 h-4 text-primary bg-white border-primary focus:ring-primary"
                          />
                          <label className="text-[16px] font-medium text-white">
                            Student
                          </label>
                        </div>
                        <div className="flex flex-row items-center space-x-2 p-3">
                          <input
                            type="radio"
                            value=""
                            name="marketing"
                            className="w-4 h-4 text-primary bg-white border-primary focus:ring-primary"
                          />
                          <label className="text-[16px] font-medium text-white">
                            All
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mt-5">
                    <h1 className="text-[#fff] text-[14px]">Rent Type</h1>
                    <div className="flex justify-between">
                      <div className="flex flex-row w-fit rounded-[8px] border-[1px] border-[#E7E7F2]">
                        <div className="flex flex-row items-center space-x-2  p-3">
                          <input
                            type="radio"
                            value=""
                            name="colored-radio"
                            className="w-4 h-4 text-primary bg-white border-primary focus:ring-primary"
                          />
                          <label className="text-[16px] font-medium text-white">
                            Market
                          </label>
                        </div>
                        <div className="flex flex-row items-center space-x-2 p-3">
                          <input
                            type="radio"
                            value=""
                            name="colored-radio"
                            className="w-4 h-4 text-primary bg-white border-primary focus:ring-primary"
                          />
                          <label className="text-[16px] font-medium text-white">
                            Affordable
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mt-5">
                    <h1 className="text-[#fff] text-[14px]">
                      Opportunity zone
                    </h1>
                    <div className="flex justify-between">
                      <div className="flex flex-row w-fit rounded-[8px] border-[1px] border-[#E7E7F2]">
                        <div className="flex flex-row items-center space-x-2  p-3">
                          <input
                            type="checkbox"
                            value=""
                            name="colored-radio"
                            className="w-4 h-4 text-primary border-primary focus:ring-0"
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
              <div className="mt-6 space-x-2">
                <button
                  className="bg-primary text-white text-[18px] py-3 px-20 rounded-[30px] hover:bg-btnHover"
                  onClick={() => setIsFilter(true)}
                >
                  Filter
                </button>
                <button
                  className="bg-white border-1 border-primary text-primary hover:text-white text-[18px] py-3 px-20 rounded-[30px] hover:bg-primary"
                  onClick={() => setIsAdvancedSearch(false)}
                >
                  Cancel
                </button>
              </div>
            </div>

            {isFilter ? (
              <div className="flex flex-col w-full">
                <div className="border-2 border-primary mt-3"></div>
                <div className="flex flex-col  mt-1">
                  <div className="flex justify-end text-white uppercase text-[28px]">
                    groups
                  </div>
                  <h1 className="flex justify-end text-[13px] text-[#8A8A8A] uppercase">
                    <span className="text-white">128</span>&nbsp;Results
                  </h1>
                </div>
                <div className="relative flex justify-between items-start md:items-center w-full mt-2">
                  <div className="flex flex-col md:flex-row items-center space-x-2 w-full">
                    <Image
                      src="/images/company_avatar.png"
                      width={182}
                      height={182}
                      className="w-[110px] rounded-full"
                      alt="company avatar"
                    />
                    <div className="flex flex-col text-center mt-2 md:mt-0">
                      <div className="flex flex-col md:flex-row justify-center md:justify-start space-x-0 md:space-x-10">
                        <div className="flex flex-col max-w-[250px]">
                          <h1 className="text-[#8A8A8A] text-[14px] uppercase">
                            address
                          </h1>
                          <p className="text-white text-[14px] uppercase">
                            DENVER, CO 802923-02033 TAMARAC APARTAMENTS
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex flex-col md:flex-row text-[#8A8A8A] text-[14px] uppercase">
                            <span className="">Phone</span>
                            <span className="text-white ml-0 md:ml-2">
                              +1 90000-0000
                            </span>
                          </div>
                          <div className="flex flex-col md:flex-row  text-[#8A8A8A] text-[14px] uppercase">
                            <span className="">email</span>
                            <span className="text-white ml-0 md:ml-2 lowercase">
                              contact@gmail.com
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="absolute top-[5px] right-[10px] hover:cursor-pointer"
                    onClick={() => setIsFilter(false)}
                  >
                    <CloseIC fill="#fff" className="bi bi-x-lg" />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="relative top-0 right-0 left-0 bottom-0 w-full h-screen overflow-hidden bg-[#17263c] z-0">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
            }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            options={{ styles: defaultProps.styles }}
          >
            <Marker />
          </GoogleMapReact>
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default Maps;
