import { Amplify, Auth, Hub } from "aws-amplify";
import API from "@/libs/api";
import { LOGIN_STATUS } from "@/libs/constants";
import { generateHash } from "lambdas/shared/utils";

const BASE_URL_BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_ENDPOIONT;
const CONFIG = {
  aws_cognito_region: process.env.NEXT_PUBLIC_REGION || "us-east-2",
  aws_user_pools_id: process.env.NEXT_PUBLIC_USERPOOL_ID,
  aws_user_pools_web_client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
  aws_mandatory_sign_in: "enable",
};

if (CONFIG.aws_user_pools_id) {
  try {
    Amplify.configure(CONFIG);
  } catch (e: any) {
    console.log(`Could not init amplify Cognito - ${e.message}`, CONFIG);
  }
}

const api = new API();

const useAuth = () => {
  const getUser = async (email?: string) => {
    const user = await getCurrentUser();

    if (user) {
      const fEmail = email !== undefined ? email : user.email;
      try {
        const response = await fetch(
          `${BASE_URL_BACKEND_API}/member/getUserByEmail?email=${fEmail}`,
          {
            method: "get",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          return data;
        }
      } catch (e) {
        console.log(e);
        return null;
      }
    }
    return null;
  };

  function registerAuthListener(
    listener: (data: any) => void,
    name: string = "auth-listener"
  ): () => void {
    return Hub.listen("auth", listener, name);
  }

  async function getCurrentUser() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      return user.attributes;
    } catch (e: any) {
      return null;
    }
  }

  async function signUp(email: string, password: string) {
    try {
      const response = await Auth.signUp({
        username: generateHash(email.toLocaleLowerCase()),
        password,
        attributes: {
          email: email.toLocaleLowerCase(), // optional
        },
      });
    } catch (error) {
      console.log("error signing up:", error);
    }
  }

  async function signUpWithEmail(email: string, password: string) {
    return signUp(email.toLocaleLowerCase(), password);
  }

  async function verifyCode(email: string, code: string) {
    const username = generateHash(email.toLocaleLowerCase()); // possibly need a lookup here?
    return await Auth.confirmSignUp(username, code);
  }

  async function signInWithEmail(
    email: string,
    password: string,
    code?: string
  ): Promise<any> {
    try {
      const user = await Auth.signIn(email, password);
      if (
        user.challengeName === "SMS_MFA" ||
        user.challengeName === "SOFTWARE_TOKEN_MFA"
      ) {
        const mfaType = user.challengeName;
        if (code) {
          await Auth.confirmSignIn(user, code, mfaType);
        } else {
          return mfaType === "SMS_MFA"
            ? LOGIN_STATUS.SMS_MFA
            : LOGIN_STATUS.SOFTWARE_TOKEN_MFA;
        }
      } else if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
        if (code) {
          await Auth.completeNewPassword(user, code);
        } else {
          return LOGIN_STATUS.NEW_PASSWORD_REQUIRED;
        }
      }
      return LOGIN_STATUS.OK;
    } catch (e: any) {
      const user = await Auth.signIn(generateHash(email), password);
    }
  }

  async function signOut() {
    return Auth.signOut();
  }

  async function getAttributes() {
    try {
      const userInfo = await Auth.currentUserInfo();
      return userInfo.getAttributes();
    } catch (e: any) {
      console.log("error is occured:", e.message);
      return {};
    }
  }

  async function sendCode(email: string) {
    return Auth.forgotPassword(email);
  }

  async function forgotPassword(email: string, code: string, password: string) {
    return Auth.forgotPasswordSubmit(email, code, password);
  }

  async function setInitialPassword(
    email: string,
    oldPassword: string,
    newPassword: string
  ): Promise<any> {
    try {
      const user = await Auth.signIn(email, oldPassword);
      return Auth.changePassword(user, oldPassword, newPassword);
      // return Auth.completeNewPassword(user, newPassword);
    } catch (e: any) {
      console.log(`setInitialPassword: `, e);
      return Promise.reject();
    }
  }

  async function changePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<"SUCCESS"> {
    try {
      const user = await Auth.currentAuthenticatedUser();
      return Auth.changePassword(user, oldPassword, newPassword);
    } catch (e: any) {
      console.log(`changePassword: `, e);
      return Promise.reject();
    }
  }

  /*
  async function removeEmail(email: string) {
   return fetch("/api/userDelete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
  }
  */

  /*
  async function removeCognitoUser() {
    try {
      await Auth.deleteUser();
      console.log("User removed successfully");
    } catch (error) {
      console.error("Error removing user", error);
    }
  }
  */

  return {
    getUser,
    registerAuthListener,
    getCurrentUser,
    signUp,
    signUpWithEmail,
    verifyCode,
    signInWithEmail,
    signOut,
    getAttributes,
    sendCode,
    forgotPassword,
    setInitialPassword,
    changePassword,
    // removeEmail,
    // removeCognitoUser,
  };
};

export default useAuth;
