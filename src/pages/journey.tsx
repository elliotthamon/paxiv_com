import { Dispatch, SetStateAction, useEffect, useState } from "react";

import RequestDemo from "@/components/journey/RequestDemo";
import Utility from "@/components/journey/Utility";
import Company from "@/components/journey/Company";
import PlatinumDescription from "@/components/journey/PlatinumDescription";
import Bill from "@/components/journey/Bill";

import {
  FIRST_STEP,
  SECOND_STEP,
  THIRD_STEP,
  FOURTH_STEP,
  FIFTH_STEP,
  PENDING,
  ROLE_USER,
} from "@/libs/constants";
import BaseContainer from "@/components/BaseContainer";
import Layout from "@/components/Layout";

export type UserInfoCompany = {
  companyName: string;
  companyWebsite: string;
  assetType: Array<string>;
  totalAsset: string;
};

export type UserInfoType = {
  _id: string | null;
  journeyStep: number;
  approval: string;
  role: string;
  personal: {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    acceptTermsandConditions: boolean;
  };
  purpose: {
    acquisition: boolean;
    disposition: boolean;
    jointventure: boolean;
    network: boolean;
  };
  company: UserInfoCompany;
  paymentStatus: boolean;
  stripeId: string | null;
  stripe: boolean;
  isCompleted: boolean;
};

export const defaultUserInfo = {
  _id: null,
  journeyStep: FIRST_STEP,
  approval: PENDING,
  role: ROLE_USER,
  personal: {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    acceptTermsandConditions: false,
  },
  purpose: {
    acquisition: false,
    disposition: false,
    jointventure: false,
    network: false,
  },
  company: {
    companyName: "",
    companyWebsite: "",
    assetType: [],
    totalAsset: "",
  },
  paymentStatus: false,
  stripeId: null,
  stripe: false,
  isCompleted: false,
};

export type StepProps = {
  setCurrentStepID: Dispatch<SetStateAction<number>>;
  userInfo: UserInfoType;
  setUserInfo: Dispatch<SetStateAction<UserInfoType>>;
};

const Journey = () => {
  const [currentStepID, setCurrentStepID] = useState<number>(0);
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    ...defaultUserInfo,
  });

  useEffect(() => {
    if (
      new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
      )
    ) {
      setCurrentStepID(FIFTH_STEP);
    }
  }, []);

  return (
    <Layout>
      <BaseContainer>
        <div className="absolute left-0 top-0 w-full h-screen flex justify-center items-center">
          {currentStepID === FIRST_STEP ? (
            <RequestDemo
              setCurrentStepID={setCurrentStepID}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
            />
          ) : currentStepID === SECOND_STEP ? (
            <Utility
              setCurrentStepID={setCurrentStepID}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
            />
          ) : currentStepID === THIRD_STEP ? (
            <Company
              setCurrentStepID={setCurrentStepID}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
            />
          ) : currentStepID === FOURTH_STEP ? (
            <PlatinumDescription
              setCurrentStepID={setCurrentStepID}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
            />
          ) : currentStepID === FIFTH_STEP ? (
            <Bill
              setCurrentStepID={setCurrentStepID}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
            />
          ) : (
            ""
          )}
        </div>
      </BaseContainer>
    </Layout>
  );
};

export default Journey;
