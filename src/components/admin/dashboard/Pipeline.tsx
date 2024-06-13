import { useRef } from "react";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import Asset from "@/components/admin/dashboard/Asset";
import ArchiveIC from "@/components/icons/ArchiveIC";
import PreviousIC from "@/components/icons/PreviousIC";
import NextIC from "@/components/icons/NextIC";

const Assets = [
  {
    img: "/images/assets.png",
    description: "Lorem ipsum dolor sit amet consectetur",
  },
  {
    img: "/images/assets.png",
    description: "Email Marketing Automation Keeps Your Audience",
  },
  {
    img: "/images/assets.png",
    description: "Lorem ipsum dolor sit amet consectetur",
  },
  {
    img: "/images/assets.png",
    description: "Email Marketing Automation Keeps Your Audience",
  },
];

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

const Pipeline = () => {
  const ref = useRef(null);

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
    <div className="flex flex-col w-fit">
      <div className="flex flex-row justify-between items-center bg-primary rounded-t-[12px] p-[14px]">
        <h1 className="text-[18px] text-white">Pipeline</h1>
        <ArchiveIC />
      </div>
      <div className="w-full flex flex-col bg-white rounded-b-[12px] p-4 pb-[35px] h-full">
        <Link href="/admin/savedAssets">
          <h1 className="text-center text-primary text-[15px]">Saved Assets</h1>
        </Link>
        <div className="w-fit flex flex-row justify-between items-center mt-6">
          <div className="relative w-[245px]">
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
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              {Assets.map((item: any, index: number) => (
                <Asset
                  img={item.img}
                  description={item.description}
                  key={index}
                />
              ))}
            </Carousel>

            <button
              className="absolute left-0 top-[25px]"
              onClick={goToPrevious}
            >
              <PreviousIC
                fill="currentColor"
                className="primary bi bi-chevron-left"
              />
            </button>
            <button className="absolute right-0 top-[25px]" onClick={goToNext}>
              <NextIC
                fill="currentColor"
                className="primary bi bi-chevron-right"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pipeline;
