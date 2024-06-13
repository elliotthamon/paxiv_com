import Image from "next/image";
import Link from "next/link";
import ArrowRightIC from "@/components/icons/ArrorRightIC";

const Asset = (props: { img: string; description: string }) => {
  return (
    <div className="flex flex-row items-center mx-6">
      <Image
        src={props.img}
        width={76}
        height={75}
        alt="assets"
        className="w-[65px]"
      />
      <div className="flex flex-col ml-3">
        <p className="text-[#A0AEC0] text-[10px] max-w-[105px]">
          {props.description}
        </p>
        <Link href="/admin/savedAssets">
          <div className="flex flex-row space-x-1 hover:cursor-pointer">
            <h1 className="text-[#A0AEC0] text-[10px] hover:text-primary">
              Read More
            </h1>
            <ArrowRightIC
              fill="currentColor"
              className="primary bi bi-arrow-right-short"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Asset;
