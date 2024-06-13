/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import Cookies from "js-cookie";
import LoginForm from "@/components/auth/LoginForm";
import AuthContainer from "@/components/auth/AuthContainer";
import { REMEMBER_ME_COOKIE } from "@/libs/constants";
import { toast } from "react-toastify";

const Login = () => {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  const [savedUsername, setSavedUsername] = useState<string>("");
  const [savedPassword, setSavedPassword] = useState<string>("");

  useEffect(() => {
    if (authContext.isLoggedIn) {
      router.push("/admin/dashboard");
    }
  }, [authContext.isLoggedIn]);

  useEffect(() => {
    if (authContext.isPasswordExpired) {
      toast.info("You must choose a new password for your account", {
        theme: "colored",
      });

      router.push(`/auth/newPassword?email=${authContext.lastLoginEmail}`);
    }
  }, [authContext.isPasswordExpired]);

  useEffect(() => {
    const savedLoginInfo = Cookies.get(REMEMBER_ME_COOKIE);
    if (!!savedLoginInfo) {
      const parsedLoginInfo = JSON.parse(savedLoginInfo);
      setSavedUsername(parsedLoginInfo.username);
      setSavedPassword(parsedLoginInfo.password);
    }
  }, []);

  return (
    <AuthContainer>
      <LoginForm
        loginData={{ username: savedUsername, password: savedPassword }}
      />
    </AuthContainer>
  );
};

export default Login;
