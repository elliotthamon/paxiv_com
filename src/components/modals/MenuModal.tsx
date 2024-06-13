import Link from "next/link";
import CloseIC from "@/components/icons/CloseIC";

type Props = {
  scrollPosition: number;
  setIsMenuModalOpened: Function;
};

const MenuModal = ({ scrollPosition, setIsMenuModalOpened }: Props) => {
  return (
    <div
      className={`fixed ${
        scrollPosition > 60 && "top-[-60px]"
      } w-[75%] h-[500px] bg-[#fff] justify-center items-center overflow-x-hidden overflow-y-scroll inset-0 z-60 outline-none focus:outline-none border-1 border-2-gray-400 shadow-md px-8 mt-[60px] mx-[25%] rounded-bl-3xl`}
    >
      <div className="flex justify-end py-4">
        <CloseIC
          fill="primary"
          className="primary"
          onClick={() => {
            setIsMenuModalOpened(false);
            document.body.style.overflowY = "scroll";
          }}
        />
      </div>
      <div>
        <Link
          className="text-xl font-bold text-primary cursor-pointer"
          href={`/`}
          onClick={() => setIsMenuModalOpened(false)}
        >
          HOME
        </Link>
        <hr className="bg-primary my-4" />
      </div>
      <div>
        <Link
          className="text-xl font-bold text-primary cursor-pointer"
          href={`/about`}
          onClick={() => setIsMenuModalOpened(false)}
        >
          ABOUT US
        </Link>
        <hr className="bg-primary my-4" />
      </div>
      <div>
        <Link
          className="text-xl font-bold text-primary cursor-pointer"
          href={`/contact`}
          onClick={() => setIsMenuModalOpened(false)}
        >
          CONTACT
        </Link>
        <hr className="bg-primary my-4" />
      </div>
      <div className="mb-16">
        <Link
          className="text-xl font-bold text-primary cursor-pointer"
          href={`/auth/login`}
          onClick={() => setIsMenuModalOpened(false)}
        >
          LOGIN
        </Link>
        <hr className="bg-primary my-4" />
      </div>
      <div className="flex items-center justify-center bg-transparent bg-opacity-100 hover:bg-opacity-90 hover:bg-primary text-primary hover:text-white text-xl font-semibold border-2 border-primary px-5 py-2 rounded-full">
        <Link
          href="/journey?w=apply"
          onClick={() => setIsMenuModalOpened(false)}
        >
          <button type="button">Apply Now</button>
        </Link>
      </div>
    </div>
  );
};

export default MenuModal;
