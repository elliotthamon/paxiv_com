import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ScrollUpIC from "@/components/icons/ScrollUpIC";
import ScrollDownIC from "@/components/icons/ScrollDownIC";

const TopDownButton = () => {
  const router = useRouter();

  const [isScrollEnd, setIsScrollEnd] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const ScrollHandle = () => {
    if (isScrollEnd) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  };

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + window.scrollY >
        document.body.offsetHeight - 30
      ) {
        // User has scrolled to the bottom of the page
        setIsScrollEnd(true);
      } else {
        setIsScrollEnd(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      className="fixed right-[20px] bottom-[20px] z-50 rounded-full scroll-animation bg-white hover:bg-primary"
      onClick={() => ScrollHandle()}
      style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isScrollEnd ? (
        <div className="w-[40px] h-[40px] flex items-center justify-center">
          <ScrollUpIC isHovered={isHovered} />
        </div>
      ) : router.pathname === "/" ? (
        <div className="scroll-icons">
          <div className="circle"></div>
          <div className="arrow">
            <ScrollDownIC isHovered={isHovered} />
          </div>
        </div>
      ) : null}
    </button>
  );
};

export default TopDownButton;
