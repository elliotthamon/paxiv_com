import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { AuthContext } from "@/contexts/AuthContext";
import useAuth from "@/hooks/useAuth";
import MenuModal from "@/components/modals/MenuModal";
import DetailIC from "@/components/icons/DetailIC";

import spinner from "../../public/images/spinner.png";
import paxiv_text_logo from "../../public/images/paxiv_text_logo.png";

const Header = () => {
  const router = useRouter();

  const authContext = useContext(AuthContext);
  const auth = useAuth();

  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [IsMenuModalOpened, setIsMenuModalOpened] = useState<boolean>(false);

  const signOut = async () => {
    await auth.signOut();
    authContext.setIsLoggedIn(false);
  };

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`absolute top-0 w-full h-[60px] kl:h-[120px]  ${
          router.pathname == "/" || router.pathname == "/about"
            ? "bg-black bg-opacity-60"
            : "bg-black bg-opacity-60"
        } z-50`}
      >
        <div className="absolute left-0 top-0 w-full h-full flex justify-between items-center px-6 sm:px-4 md:px-10">
          <Link href="/">
            <Image
              src={spinner}
              width={64}
              height={97}
              className="w-[30px] kl:w-[60px]"
              alt="p logo"
            />
          </Link>
          <div className="absolute left-[20%] top-0 w-[60%] h-full flex sm:hidden justify-center items-center">
            <Link href="/">
              <Image
                src={paxiv_text_logo}
                width={223}
                height={36}
                className="w-[140px] kl:w-[280px]"
                alt="paxiv text logo"
              />
            </Link>
          </div>
          <div className="absolute left-[15%] top-0 w-[70%] h-full hidden sm:flex justify-center items-center">
            <div>
              <div className="flex justify-center">
                <Link href="/">
                  <Image
                    src={paxiv_text_logo}
                    width={223}
                    height={36}
                    className="w-[140px] kl:w-[280px]"
                    alt="paxiv text logo"
                  />
                </Link>
              </div>
              <div className="flex items-center py-0 transition-all duration-500 rounded-[8px] cursor-pointer pt-2">
                <div className="flex space-x-[16px] h-full items-center text-sm kl:text-3xl">
                  <div className="flex flex-row items-center space-x-6 md:space-x-10 uppercase bg-transparent tracking-[3px] md:tracking-[5px]">
                    <Link href="/">
                      <h1
                        className={`${
                          router.pathname === "/" ? "font-bold active" : ""
                        } text-white hover:text-primary`}
                      >
                        home
                      </h1>
                    </Link>
                    <Link href="/about">
                      <h1
                        className={`${
                          router.pathname === "/about"
                            ? "font-semibold active"
                            : ""
                        } text-white hover:text-primary`}
                      >
                        about us
                      </h1>
                    </Link>
                    <Link href="/contact">
                      <h1
                        className={`${
                          router.pathname === "/contact"
                            ? "font-bold active"
                            : ""
                        } text-white hover:text-primary`}
                      >
                        contact
                      </h1>
                    </Link>
                    {authContext.isLoggedIn ? (
                      <Link
                        href="/admin/dashboard"
                        className="flex items-center rounded-[10px] md:px-[15px] font-bold text-white hover:text-primary"
                      >
                        <h1 className="uppercase">Dashboard</h1>
                      </Link>
                    ) : (
                      <Link
                        href="/auth/login"
                        className="flex items-center rounded-[10px] md:px-[15px] font-bold text-white hover:text-primary"
                      >
                        <h1 className="uppercase">Login</h1>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link href="/journey?w=apply" className="hidden sm:block">
            <div className="flex items-center justify-center bg-transparent bg-opacity-100 hover:bg-opacity-90 hover:bg-primary text-primary hover:text-white text-base kl:text-[30px] border-2 border-primary px-5 kl:px-10 py-1 kl:py-4 rounded-full">
              <button type="button">Apply Now</button>
            </div>
          </Link>
          <DetailIC
            width={30}
            height={30}
            fill="currentColor"
            className="primary hover-primary bi bi-list-ul block sm:hidden"
            onClick={() => setIsMenuModalOpened(!IsMenuModalOpened)}
          />
        </div>
        {IsMenuModalOpened && (
          <MenuModal
            scrollPosition={scrollPosition}
            setIsMenuModalOpened={setIsMenuModalOpened}
          />
        )}
      </div>
    </>
  );
};
export default Header;
