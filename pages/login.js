import React, { useEffect } from "react";
import Login from "../components/login/Login";
import { getProviders, getSession } from "next-auth/react";
import { useRouter } from "next/router";

const LoginPage = () => {
  return (
    <>
      <Login />
    </>
  );
};

export default LoginPage;
