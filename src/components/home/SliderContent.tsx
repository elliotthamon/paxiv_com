import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { SLIDER_IMAGES } from "@/libs/constants";

function SliderContent(props: { activeIndex: number; GotoSlider: Function }) {
  const [isSelected, setIsSelected] = useState<number>(0);

  const [isReadMore, setIsReadMore] = useState<boolean>(false);

  const [screenHeight, setScreenHeight] = useState<number>(0);
  const [isScroll, setIsScroll] = useState<boolean>(false);

  useEffect(() => {
    function handleResize() {
      setScreenHeight(window.innerHeight);
    }

    setScreenHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isReadMore) {
      window.setTimeout(() => {
        const content = document.querySelector(".active_slide");
        const content_length = content?.clientHeight || 0;
        if (screenHeight - 300 < content_length) {
          setIsScroll(true);
        } else {
          setIsScroll(false);
        }
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReadMore]);

  return (
    <section className="relative h-screen w-ful">
      <div className="absolute top-0 left-0 w-full h-screen">
        {SLIDER_IMAGES.map((slide: any, index: number) => (
          <div
            className={`mt-[140px] lg:mt-[15%] w-full slide ${
              index === props.activeIndex ? "active_slide" : ""
            } text-center`}
            key={index}
          >
            {index === 0 ? (
              <div
                className="w-[90%] ssm:w-[80%] td:w-[60%] bg-black bg-opacity-60 text-white text-[40px] lg:text-[50px] leading-9 text-center flex justify-center items-center space-x-2 rounded-3xl sm:rounded-[60px] xl:rounded-full py-4 mx-auto"
                style={{ zIndex: "unset" }}
              >
                <div className="relative">
                  <video
                    width={200}
                    height={269}
                    className="w-[80px] sm:w-[100px] kl:w-[200px]"
                    autoPlay={true}
                    loop
                    muted
                    playsInline={true}
                  >
                    <source
                      src="/images/animation.mov"
                      type='video/mp4; codecs="hvc1"'
                    />
                    <source src="/images/animation.webm" type="video/webm" />
                  </video>
                </div>
                <Image
                  src="/images/white_logo.svg"
                  alt="p logo"
                  width={223}
                  height={17}
                  className="w-[200px] lg:w-[280px] kl:w-[560px]"
                />
              </div>
            ) : (
              <div
                className={`w-[90%] td:w-[60%] bg-black bg-opacity-60 text-white text-center rounded-3xl sm:rounded-[60px] xl:rounded-full py-4 kl:py-8 mx-auto px-2`}
              >
                <div
                  className={`w-full h-full overflow-hidden home ${
                    isScroll && isSelected == index && "h-home-content"
                  }`}
                >
                  <h2 className="w-full text-2xl sm:text-3xl md:text-4xl kl:text-7xl font-bold sm:font-semibold tracking-[5px]">
                    {slide.title}
                  </h2>
                  <h3 className="w-[90%] sm:w-[80%] text-base sm:text-2xl kl:text-5xl px-[20px] mx-auto mt-0 kl:mt-8 font-semibold sm:font-medium">
                    {slide.description}
                  </h3>
                  <AnimatePresence>
                    {isSelected == index && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "fit-content" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.8 }}
                      >
                        <div className="w-[95%] xl:w-[80%] text-sm sm:text-base kl:text-3xl pt-4 mx-auto text-center">
                          {slide.more}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className="flex justify-center w-full overflow-hidden">
                    {isSelected != index ? (
                      <button
                        className="font-bold read-more-btn"
                        onClick={() => {
                          setIsReadMore(true);
                          setIsSelected(index);
                        }}
                      >
                        Read More
                      </button>
                    ) : (
                      <button
                        className="font-bold read-more-btn"
                        onClick={() => {
                          setIsSelected(0);
                          setIsReadMore(false);
                        }}
                      >
                        Read Less
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="absolute bottom-[100px] kl:bottom-[200px] left-0 right-0 mx-auto flex justify-center items-center z-20 space-x-1 kl:space-x-2">
        {Array(6)
          .fill(0)
          .map((item: any, idx: number) => (
            <div key={idx}>
              {idx === props.activeIndex ? (
                <div
                  className={`bg-white border-[3px] kl:border-[6px] border-primary rounded-full p-2 kl:p-4 w-[14px] kl:w-[28px] h-[14px] kl:h-[28px] z-20`}
                ></div>
              ) : (
                <div
                  className={`bg-white rounded-full w-[12px] kl:w-[24px] h-[12px] kl:h-[24px] z-30 hover:cursor-pointer`}
                  onClick={() => {
                    props.GotoSlider(idx);
                    setIsReadMore(false);
                  }}
                ></div>
              )}
            </div>
          ))}
      </div>
    </section>
  );
}

export default SliderContent;
