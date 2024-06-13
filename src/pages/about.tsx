/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BaseContainer from "@/components/BaseContainer";
import Layout from "@/components/Layout";

const About = () => {
  const contentRef = useRef(null);

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
        const content = document.querySelector(".about");
        const content_length = content?.clientHeight || 0;
        if (screenHeight - 380 < content_length) {
          setIsScroll(true);
        }
      }, 500);
    }
  }, [isReadMore]);

  return (
    <Layout>
      <BaseContainer>
        <div className="absolute top-0 left-0 z-40 w-full h-screen pb-20">
          <div className="w-full text-3xl sm:text-[40px] td:text-[50px] kl:text-[100px] font-semibold tracking-[10px] sm:tracking-[15px] kl:tracking-[30px] text-white text-center mt-[130px] kl:mt-[260px]">
            ABOUT US
          </div>
          <div
            ref={contentRef}
            className="w-[90%] sm:w-[80%] lg:w-[60%] bg-black bg-opacity-60 rounded-[30px] kl:rounded-[60px] mx-auto px-[10px] sm:px-[25px] kl:px-[50px] py-6 kl:py-12 mt-6 kl:mt-12"
          >
            <div
              className={`about overflow-hidden ${
                isScroll && "h-about-content"
              }  text-white px-3 sm:px-6 kl:px-12`}
            >
              <div className="text-base font-semibold sm:text-xl td:text-2xl kl:text-5xl">
                The principle of necessity driving innovation holds true in the
                genesis of Paxiv. Our platform has emerged from a demand for a
                highly specialized, exclusive, and efficient network catering to
                commercial real estate executives.
              </div>
              <AnimatePresence>
                {isReadMore && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "fit-content" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="px-5 py-3 text-sm sm:text-base kl:text-3xl sm:px-10 sm:py-6">
                      Paxiv extends an exclusive invitation solely to the most
                      distinguished Private Equity and development groups.
                      Access to Paxiv is reserved for an exclusive and select
                      group of Private Equity funds and 12 Development groups
                      per state, affording them the unique opportunity to trade,
                      network, and access the most precise acquisition
                      opportunities, facilitating direct interactions with
                      fellow executives. As a Paxiv member, you gain exclusive
                      visibility into the most highly qualified buyers and
                      off-market opportunities. For the first time ever, a
                      platform has been crafted to enable all leading Private
                      Equity and development groups to engage in
                      business-to-business transactions, seamlessly buying,
                      selling, and developing assets. This is coupled with
                      access to the highest ROI development opportunities.
                      <br />
                      <br />
                      Paxiv is underpinned by a family office of commercial real
                      estate investors who grew frustrated with the outdated
                      methods of sourcing and negotiating high-quality CRE joint
                      ventures, investments, acquisitions, developments, and
                      sales. Channeling our frustrations and leveraging our
                      extensive CRE-tech background, we have embarked on a
                      mission to revolutionize the landscape of Commercial Real
                      Estate.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div
                className={`text-base sm:text-xl td:text-2xl kl:text-5xl font-semibold ${
                  !isReadMore && "mt-12"
                }  overflow-hidden`}
              >
                At Paxiv, we recognize that the Commercial Real Estate sector
                has experienced a notable deficiency in technological
                advancement
              </div>
              {isReadMore && (
                <div className="px-5 py-3 text-sm sm:text-base kl:text-3xl sm:px-10 sm:py-6">
                  Many groups find themselves compelled to rely on
                  intermediaries to secure a significant portion of their
                  transactions and facilitate relationships throughout the
                  process. Even when presented with &apos;off-market&apos;
                  opportunities, your group may remain dependent on agents and
                  their chosen collaborators to access these prospects. A wealth
                  of untapped opportunities awaits as you break free from the
                  constraints of individual agents&apos; limited networks,
                  client preferences, and the challenges of unsolicited cold
                  calls and unsubstantiated offers.
                </div>
              )}
              <div className="text-center text-primary font-semibold text-base sm:text-lg kl:text-[36px] mt-4 kl:mt-8">
                Welcome to the Paxiv Experience
              </div>
              <div className="flex justify-center w-full mt-6 overflow-hidden">
                {isReadMore ? (
                  <button
                    className="font-bold read-more-btn"
                    onClick={() => {
                      setIsReadMore(false);
                      setIsScroll(false);
                      if (contentRef.current) {
                        //@ts-ignore
                        contentRef.current.scrollTop = 0;
                      }
                    }}
                  >
                    Read Less
                  </button>
                ) : (
                  <button
                    className="font-bold read-more-btn"
                    onClick={() => setIsReadMore(true)}
                  >
                    Read More
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </BaseContainer>
    </Layout>
  );
};

export default About;
