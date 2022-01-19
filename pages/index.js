import { LinearProgress } from "@mui/material";
import { getSession, signOut } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../components/layout/Layout";
import UserDetails from "../components/userDetails/UserDetails";
import styles from "../styles/Home.module.css";

const Home = () => {
  const { loading } = useContext(AppContext);

  return (
    <>
      {loading && <LinearProgress className={styles.loading} />}
      <div className={styles.container}>
        <UserDetails />
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  // console.log(session);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default Home;
