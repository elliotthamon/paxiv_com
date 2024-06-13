import { useState, createContext } from "react";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";

const defaultState: any = {
  isLoggedIn: false,
  user: null,
};

type Props = {
  children?: React.ReactNode;
};

// eslint-disable-next-line react-hooks/rules-of-hooks
const auth = useAuth();

export const AuthContext = createContext(defaultState);

const AuthProvider = ({ children }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPasswordExpired, setPasswordExpired] = useState(false);
  const [lastLoginEmail, setLastLoginEmail] = useState<string | undefined>(
    undefined
  );
  const [user, setUser] = useState<any>(null);
  const [isHomeFirstLoading, setIsHomeFirstLoading] = useState<boolean>(true);
  const [isGlobeFirstLoading, setIsGlobeFirstLoading] = useState<boolean>(true);

  const [users, setUsers] = useState<Array<any>>([]);
  const [chatSession, setChatSession] = useState<any>(null);
  const [unreadArr, setUnreadArr] = useState<Array<any>>([]);
  const [totalUnreadCnt, setTotalUnreadCnt] = useState<number>(0);
  const [receiveCnt, setReceiveCnt] = useState<number>(0);

  if (user == null) {
    auth.getUser().then((u) => {
      if (u && u._id) {
        setIsLoggedIn(true);
        setUser(u);
      }
      if (!router.pathname.includes("/admin")) {
        setIsLoading(false);
      }
    });
  }

  function getUser() {
    return isLoggedIn ? user : null;
  }

  function handleLoading(status: boolean) {
    setIsLoading(status);
  }

  const state = {
    isLoading,
    setIsLoading,
    isLoggedIn,
    setIsLoggedIn,
    isPasswordExpired,
    setPasswordExpired,
    lastLoginEmail,
    setLastLoginEmail,
    user,
    setUser,
    getUser,
    handleLoading,
    isHomeFirstLoading,
    setIsHomeFirstLoading,
    isGlobeFirstLoading,
    setIsGlobeFirstLoading,
    users,
    setUsers,
    chatSession,
    setChatSession,
    unreadArr,
    setUnreadArr,
    totalUnreadCnt,
    setTotalUnreadCnt,
    receiveCnt,
    setReceiveCnt,
  };

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
