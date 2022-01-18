import React, { useEffect } from "react";
import Login from "../components/login/Login";
import { getProviders, getSession } from "next-auth/react";
import { useRouter } from "next/router";

const LoginPage = ({ session }) => {
  return (
    <>
      <Login />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      props: { session },
    };
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};

export default LoginPage;
