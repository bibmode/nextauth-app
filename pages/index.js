import { getSession, signOut } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useContext, useEffect } from "react";
import UserDetails from "../components/userDetails/UserDetails";
import styles from "../styles/Home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <UserDetails />
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  console.log(session);

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
