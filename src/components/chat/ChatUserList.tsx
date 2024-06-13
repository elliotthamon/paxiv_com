import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import SmallSpinner from "@/components/SmallSpinner";

import { AuthContext } from "@/contexts/AuthContext";
import { getImageURL } from "@/libs/utils";
type Props = {
  user: any;
  onUserSelect: Function;
  searchKey: string;
};

const ChatUserList = ({ user, onUserSelect, searchKey }: Props) => {
  const authContext = useContext(AuthContext);
  const [users, setUsers] = useState<Array<any>>([]);
  const [loginUser, setLoginUser] = useState<any>(null);
  const [initUsers, setInitUsers] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const unreadArr = authContext.unreadArr;

  useEffect(() => {
    try {
      const fetchUsers = async () => {
        try {
          setLoginUser(user);

          const data = authContext.users;
          setInitUsers(data);

          setUsers(data);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };

      fetchUsers();
    } catch (e: any) {
      console.log(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      let filteredUsers: any[] = [];
      if (Array.isArray(initUsers)) {
        for (let item of initUsers) {
          if (
            (item.firstname + " " + item.lastname)
              .toLowerCase()
              .includes(searchKey.toLowerCase())
          ) {
            filteredUsers.push(item);
          }
        }
      }
      setUsers(filteredUsers);
    } catch (e: any) {
      console.log(e);
    }
  }, [searchKey, initUsers]);

  try {
    return (
      <div className={`w-full h-full whitespace-nowrap`}>
        {isLoading ? (
          <div className="flex items-center w-full h-[440px]">
            <SmallSpinner />
          </div>
        ) : (
          users.map((user: any) => (
            <div key={user._id}>
              {loginUser?._id != user._id ? (
                <div
                  className="flex items-center justify-between hover:bg-[#2e2d2d] cursor-pointer px-3"
                  onClick={() => {
                    onUserSelect(user);
                  }}
                >
                  <div className="flex items-center py-2 space-x-4">
                    <div className="relative w-[38px] h-[38px]">
                      <Image
                        src={
                          user.avatar
                            ? getImageURL(user.avatar)
                            : "/images/default_avatar.png"
                        }
                        className="object-cover bg-white border rounded-full border-primary"
                        alt="user avatar"
                        fill
                      />
                    </div>
                    <div className="text-white">
                      {user.firstname} {user.lastname}
                    </div>
                  </div>
                  {unreadArr.map((item: any, index: number) => {
                    if (item.email == user.email && item.count != 0) {
                      return (
                        <div
                          key={index}
                          className="w-[20px] h-[20px] bg-[#0e72cf] flex items-center justify-center text-white rounded-full mx-3"
                        >
                          <p>{item.count}</p>
                        </div>
                      );
                    }
                  })}
                </div>
              ) : (
                ""
              )}
            </div>
          ))
        )}
      </div>
    );
  } catch (e: any) {
    console.log("ChatUserList", e);
  }
};

export default ChatUserList;
