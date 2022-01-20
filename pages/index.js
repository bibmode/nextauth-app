import { LinearProgress } from "@mui/material";
import { getSession } from "next-auth/react";
import { useContext } from "react";
import { AppContext } from "../components/layout/Layout";
import UserDetails from "../components/userDetails/UserDetails";
import styles from "../styles/Home.module.css";

const Home = () => {
  const { loading } = useContext(AppContext);

  return (
    <>
      {loading && <LinearProgress />}
      <div className={styles.container}>
        <UserDetails />
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

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
