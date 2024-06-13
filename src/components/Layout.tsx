import Head from "next/head";
import React, { useContext } from "react";
import { useRouter } from "next/router";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";

import { AuthContext } from "@/contexts/AuthContext";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Paxiv</title>
        <meta name="description" content="Paxiv" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" key="favicon" />
      </Head>

      {authContext.isLoading ? (
        <div className="flex items-center justify-center w-full min-h-screen">
          <LoadingSpinner />
        </div>
      ) : (
        <main className="relative w-full min-h-screen m-auto overflow-hidden">
          <Header />
          {children}
          <Footer />
        </main>
      )}
    </>
  );
};
export default Layout;
