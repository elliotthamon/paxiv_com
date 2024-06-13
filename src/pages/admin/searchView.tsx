import { useRef, useState, useContext } from "react";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { AuthContext } from "@/contexts/AuthContext";

import BaseContainer from "@/components/BaseContainer";
import LayoutAdmin from "@/components/admin/LayoutAdmin";
import PreviousIC from "@/components/icons/PreviousIC";
import NextIC from "@/components/icons/NextIC";

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

const SearchView = () => {
  const ref = useRef(null);
  const authContext = useContext(AuthContext);
  authContext.handleLoading(false);

  const [isPlay, setIsPlay] = useState<boolean>(false);

  const goToPrevious = (e: any) => {
    e.preventDefault();
    // @ts-ignore
    ref.current?.previous();
  };

  const goToNext = (e: any) => {
    // @ts-ignore
    ref.current?.next();
  };

  return (
    <LayoutAdmin>
      <BaseContainer>
        <div className="flex flex-col">
          <div className="flex justify-center md:justify-start text-[#0B1E25] text-[30px] uppercase font-semibold tracking-widest">
            Search view
          </div>
          <div className="flex flex-col">
            <div className="bg-white rounded-[18px] p-5">
              <div className="flex flex-col md:flex-row mx-auto items-center space-x-5">
                <div className="min-w-[120px]">
                  <Image
                    src="/images/default_avatar.png"
                    width={168}
                    height={168}
                    className="rounded-full w-[120px]"
                    alt="user"
                  />
                </div>
                <div className="w-full px-2 md:px-10">
                  <h1 className="text-black text-[24px] font-semibold uppercase text-center md:text-left mt-2 md:mt-0">
                    HSI INCORPORADORA
                  </h1>
                  <div className="flex flex-col md:flex-row justify-between mt-6 md:mt-4 space-y-4 md:space-y-0">
                    <div className="flex flex-col">
                      <h1 className="text-[#8A8A8A] text-[14px] uppercase">
                        address
                      </h1>
                      <p className="mt-0 md:mt-2 text-black text-[18px] uppercase">
                        DENVER, CO 802923-02033 TAMARAC APARTAMENTS
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <h1 className="text-[#8A8A8A] text-[14px] uppercase">
                        phone
                      </h1>
                      <p className="mt-0 md:mt-2 text-black text-[18px] uppercase">
                        +1 90000-0000
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <h1 className="text-[#8A8A8A] text-[14px] uppercase">
                        email
                      </h1>
                      <p className="mt-0 md:mt-2 text-black text-[18px]">
                        contact@gmail.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col md:flex-row mt-8 space-x-4">
                <div className="md:w-1/2">
                  <div className="relative">
                    <Carousel
                      ref={ref}
                      swipeable={true}
                      draggable={true}
                      showDots={false}
                      arrows={false}
                      responsive={responsive}
                      ssr={true} // means to render carousel on server-side.
                      infinite={true}
                      keyBoardControl={true}
                      transitionDuration={500}
                      containerClass=""
                      removeArrowOnDeviceType={["tablet", "mobile"]}
                      dotListClass="custom-dot-list-style"
                      itemClass=""
                    >
                      {Array(5)
                        .fill(1)
                        .map((item: any, index: number) => (
                          <Image
                            key={index}
                            src="/images/asset4.png"
                            width={939}
                            height={614}
                            className="w-full"
                            alt="asset4"
                          />
                        ))}
                    </Carousel>

                    <button
                      className="absolute left-[30px] top-[0px] bottom-0 m-auto"
                      onClick={goToPrevious}
                    >
                      <PreviousIC
                        fill="currentColor"
                        className="primary bi bi-chevron-left"
                      />
                    </button>
                    <button
                      className="absolute right-[30px] top-0 bottom-0 m-auto"
                      onClick={goToNext}
                    >
                      <NextIC
                        fill="currentColor"
                        className="primary bi bi-chevron-right"
                      />
                    </button>

                    <button className="absolute left-[30px] top-[20px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="primary bi bi-zoom-in"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
                        />
                        <path d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1 6.538 6.538 0 0 1-1.398 1.4z" />
                        <path
                          fillRule="evenodd"
                          d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5z"
                        />
                      </svg>
                    </button>

                    <button className="absolute left-[30px] bottom-[20px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="primary bi bi-zoom-in"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
                        />
                        <path d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1 6.538 6.538 0 0 1-1.398 1.4z" />
                        <path
                          fillRule="evenodd"
                          d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5z"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="relative mt-8 md:mt-0">
                    <Image
                      src="/images/team.png"
                      width={934}
                      height={600}
                      className="hidden md:flex w-full mt-4"
                      alt="women"
                    />
                    <div className="absolute left-0 top-0 bottom-0 right-0 flex justify-center items-center mx-auto">
                      <div
                        className="bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full p-8 hover:cursor-pointer"
                        onClick={() => setIsPlay(!isPlay)}
                      >
                        {isPlay ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            fill="#fff"
                            className="bi bi-pause-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            fill="#fff"
                            className="bi bi-play-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 mt-8 md:mt-0">
                  <div
                    className="relative z-10 flex flex-row items-center mx-auto py-2 px-8"
                    style={{
                      background:
                        "linear-gradient(180deg, #F3B007 0%, #F6DB96 100%)",
                    }}
                  >
                    <Image
                      src="/images/p_logo_white.svg"
                      width={101}
                      height={153}
                      className="w-[35px]"
                      alt="asset4"
                    />
                    <h1 className="text-[20px] text-white uppercase ml-4">
                      Status:
                    </h1>
                    <h1 className="text-[20px] text-white uppercase ml-2 font-semibold">
                      Active
                    </h1>

                    <div className="absolute z-20 right-0 bottom-0 2-0 h-0 border-t-[35px] border-t-transparent border-r-[35px] border-r-white border-b-0 border-b-transparent"></div>
                  </div>
                  <div className="text-black text-[30px] font-semibold mt-4">
                    BUSINESS TOWER NY
                  </div>
                  <div className="relative mt-4 uppercase border-l-[5px] border-[#EFEFEF] pl-10">
                    <div
                      className="absolute top-0 -left-[5px] h-[30px] w-[5px]"
                      style={{
                        background:
                          "linear-gradient(266.89deg, #D2B25F 4.85%, #BCAC84 99.59%)",
                      }}
                    ></div>

                    <h1 className="text-[#8A8A8A] text-[16px]">ADDRESS</h1>
                    <p className="text-[24px] text-black">
                      DENVER, CO 802923-02033 TAMARAC APARTAMENTS
                    </p>
                    <div className="mt-5">
                      <span className="text-[#8A8A8A] text-[14px]">
                        PROPETY ADDRESS:
                      </span>
                      <span className="text-black text-[14px] font-semibold ml-2">
                        DENVER. CO 093 TAMARAC APARTAMENTS
                      </span>
                    </div>
                    <div className="mt-1">
                      <span className="text-[#8A8A8A] text-[14px]">
                        SQUARE FEET:
                      </span>
                      <span className="text-black text-[14px] font-semibold ml-2">
                        120
                      </span>
                    </div>
                    <div className="mt-1">
                      <span className="text-[#8A8A8A] text-[14px]">
                        classes:
                      </span>
                      <span className="text-black text-[14px] font-semibold ml-2">
                        120
                      </span>
                    </div>
                    <div className="mt-1">
                      <span className="text-[#8A8A8A] text-[14px]">
                        PROPETY ADDRESS:
                      </span>
                      <span className="text-black text-[14px] font-semibold ml-2">
                        1995
                      </span>
                    </div>
                    <div className="mt-1">
                      <span className="text-[#8A8A8A] text-[14px]">
                        construction start:
                      </span>
                      <span className="text-black text-[14px] font-semibold ml-2">
                        2000
                      </span>
                    </div>
                    <div className="mt-1">
                      <span className="text-[#8A8A8A] text-[14px]">
                        construction complet:
                      </span>
                      <span className="text-black text-[14px] font-semibold ml-2">
                        2001
                      </span>
                    </div>
                    <div className="mt-1">
                      <span className="text-[#8A8A8A] text-[14px]">
                        in an opportunity zone:
                      </span>
                      <span className="text-black text-[14px] font-semibold ml-2">
                        yes
                      </span>
                    </div>
                    <div className="mt-1">
                      <span className="text-[#8A8A8A] text-[14px]">
                        asset type:
                      </span>
                      <span className="text-black text-[14px] font-semibold ml-2">
                        hi-rise
                      </span>
                    </div>
                  </div>
                  <div className="relative border-[1px] rounded-[20px] border-gray p-10 mt-8">
                    <div className="absolute top-[20px] right-[20px] uppercase onft-semibold">
                      contact
                    </div>
                    <div
                      className="absolute left-[8px] right-[8px] bottom-[0px] w-[95%] h-1  rounded-b-[20px]"
                      style={{
                        background:
                          "linear-gradient(266.89deg, #D2B25F 4.85%, #BCAC84 99.59%)",
                      }}
                    ></div>
                    <Image
                      src="/images/women.png"
                      width={147}
                      height={151}
                      className="w-[100px]"
                      alt="women"
                    />
                    <div className="mt-5">
                      <h1 className="text-[20px] text-[#323232] font-semibold">
                        Carolina L Ferreira Souza
                      </h1>
                      <h1 className="text-[20px] text-[#323232]">
                        CEO & CO.FOUNDER
                      </h1>
                    </div>
                    <div className="flex flex-row justify-between mt-4">
                      <div>
                        <h1 className="text-[#8A8A8A] text-[16px]">ADDRESS</h1>
                        <p className="text-[18px] text-black">
                          DENVER, CO 802923-02033 TAMARAC APARTAMENTS
                        </p>
                      </div>
                      <Image
                        src="/images/p_logo_gold.svg"
                        width={101}
                        height={153}
                        className="w-[60px]"
                        alt="logp"
                      />
                    </div>
                  </div>
                </div>
                <div className="relative mt-8 md:mt-0">
                  <Image
                    src="/images/team.png"
                    width={934}
                    height={600}
                    className="flex md:hidden w-full mt-4"
                    alt="women"
                  />
                  <div className="absolute left-0 top-0 bottom-0 right-0 flex justify-center items-center mx-auto">
                    <div
                      className="bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full p-8 hover:cursor-pointer"
                      onClick={() => setIsPlay(!isPlay)}
                    >
                      {isPlay ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          fill="#fff"
                          className="bi bi-pause-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          fill="#fff"
                          className="bi bi-play-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                        </svg>
                      )}
                    </div>
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

export default SearchView;
