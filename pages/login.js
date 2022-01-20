import React from "react";
import Login from "../components/login/Login";
import { getSession } from "next-auth/react";
import { LinearProgress } from "@mui/material";

const LoginPage = ({ session }) => {
  return (
    <>
      {loading && <LinearProgress />}
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
