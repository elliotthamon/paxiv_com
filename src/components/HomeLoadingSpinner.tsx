import Image from "next/image";
import spinner from "../../public/images/spinner.png";


const HomeLoadingSpinner = () => {
  return (
    <div className="relative w-full min-h-screen z-50">
      <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full flex justify-center items-center">
        <div
          className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] text-warning motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
      <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full flex justify-center items-center">
        <Image
          src={spinner}
          width={64}
          height={97}
          className="w-[30px]"
          alt="loading spinner"
        />
      </div>
    </div>
  );
};

export default HomeLoadingSpinner;
