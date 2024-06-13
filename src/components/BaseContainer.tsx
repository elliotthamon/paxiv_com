import { useRouter } from "next/router";

type BaseContainerProps = {
  children: React.ReactNode;
};

const BaseContainer = ({ children }: BaseContainerProps) => {
  const router = useRouter();
  return (
    <div
      className={`relative ${
        router.pathname.includes("admin") && "max-w-[1240px] mx-auto"
      } py-2 ${!router.pathname.includes("admin/search") && "mb-[66px]"}`}
    >
      {children}
    </div>
  );
};
export default BaseContainer;
