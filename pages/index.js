import { getSession, signOut } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";

export default function Home({ session }) {
  console.log(session);

  return (
    <div className={styles.container}>
      <h1>home</h1>
      <button onClick={signOut}>sign out</button>
    </div>
  );
}

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
