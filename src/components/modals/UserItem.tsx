import { getImageURL } from "@/libs/utils";
import Image from "next/image";

interface UserItemProps {
  user: any;
  current: any;
  setCurrent: Function;
}

const AssignModalUserItem = (props: UserItemProps) => {
  const { user, current, setCurrent } = props;

  const selected = user?._id === current?._id;
  return (
    <div
      className={`flex p-[15px] gap-2.5 items-center rounded-lg cursor-pointer hover:bg-[#252525] active:bg-[#121212] transition ${
        selected ? "bg-[#1C1C1C]" : ""
      }`}
      onClick={() => setCurrent(user)}
    >
      <div className="w-[46px] h-[46px]">
        <Image
          src={
            user?.avatar
              ? getImageURL(user?.avatar)
              : "/images/default_avatar.png"
          }
          className="rounded-full object-cover border border-1.5 border-primary object-top w-full h-full"
          alt="user avatar"
          width={46}
          height={46}
        />
      </div>
      <div className="flex flex-1 flex-col gap-1.5">
        <div className="text-white text-sm font-semibold tracking-[-0.28px]">
          {user.firstname + " " + user.lastname}
        </div>
        <div className="text-[#949494] text-xs tracking-[-0.24px]">
          {user.email}
        </div>
      </div>
      <div className="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <rect
            x="0.75"
            y="0.75"
            width="22.5"
            height="22.5"
            rx="11.25"
            stroke={selected ? "#A37E2C" : "#666666"}
            strokeWidth="1.5"
          />
          <rect
            x="5"
            y="5"
            width="14"
            height="14"
            rx="7"
            fill={selected ? "#A37E2C" : "#757575"}
          />
        </svg>
      </div>
    </div>
  );
};

export default AssignModalUserItem;
