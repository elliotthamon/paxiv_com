import Image from "next/image";

const Marker = () => {
  return (
    <div className="relative h-[50px]">
      <Image
        src="/images/p_bubble.png"
        width={35}
        height={40}
        className="relative h-full left-[55px] w-auto"
        alt="p icon"
      />
    </div>
  );
};

export default Marker;
