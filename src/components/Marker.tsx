import { useRouter } from "next/router";
import Image from "next/image";

type Props = {
  lat: number;
  lng: number;
  id: string;
  onClick:(id:string) => void;
  onHover:(id:string, show:boolean)=>void;
};

const Marker = ({ lat, lng, id, onClick, onHover}: Props) => {
  const router = useRouter();
  return (
    <div
      className="relative z-0 flex cursor-auto"
      onClick={() => onClick(id) }  // router.push(`/admin/assetView?id=${id}`)
      onMouseEnter={() => onHover(id, true)}
      onMouseLeave={() => onHover(id, false)}
    >
      <Image
        src="/images/polygon.png"
        alt="p logo"
        width={103}
        height={117}
        className="max-w-fit w-[30px] z-50"
      />
      <div className="w-[25px] absolute top-1.5 left-[3px] opacity-100 bg-[#242f3e] z-10">
        <Image
          src="/images/animated-icon.gif"
          alt="animation"
          width={270}
          height={269}
          className="w-[25px] mix-blend-lighten"
        />
      </div>
    </div>
  );
};

export default Marker;
