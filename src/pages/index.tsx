import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import SliderContent from "@/components/home/SliderContent";
import { SLIDER_IMAGES } from "@/libs/constants";

const Main = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const GotoSlider = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(
        activeIndex === SLIDER_IMAGES.length - 1 ? 0 : activeIndex + 1
      );
    }, 15000);

    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [activeIndex]);

  return (
    <Layout>
      <div className="relative z-0 w-full">
        <SliderContent activeIndex={activeIndex} GotoSlider={GotoSlider} />
      </div>
    </Layout>
  );
};

export default Main;
