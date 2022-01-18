import { signOut, useSession } from "next-auth/react";
import React from "react";

import { Button, ClickAwayListener, Container, Divider } from "@mui/material";
import { useContext, useEffect } from "react";
import Menu from "../menu/Menu";
import styles from "./UserDetails.module.scss";
import { AppContext } from "../layout/Layout";

const UserDetails = () => {
  const { menu, setMenu } = useContext(AppContext);

  const { data: session } = useSession();

  const user = session.user;

  return (
    <div className={styles.wrapper}>
      <Container sx={{ position: "relative" }}>
        <div className={styles.header}>
          <img
            className={styles.headerLogo}
            src="devchallenges.svg"
            alt="logo"
          />

          <button
            onClick={() => setMenu(!menu)}
            type="button"
            className={styles.headerProfile}
          >
            <img
              src={user.image ? user.image : "user.png"}
              alt="user profile"
            />
          </button>
          {menu && <Menu />}
        </div>

        <h1>Personal info</h1>
        <p>Basic info, like your name and photo</p>

        <div className={styles.main}>
          <div className={styles.mainWrapper}>
            <div className={styles.mainTopBar}>
              <h2>Profile</h2>
              <p>Some info may be visible to other people</p>
              <Button variant="outlined">Edit</Button>
            </div>
            <Divider />

            <div className={styles.mainItem}>
              <h3>photo</h3>
              <div className={styles.mainItemPicture}>
                <img
                  src={user.image ? user.image : "user.png"}
                  alt="user profile"
                />
              </div>
            </div>
            <Divider />

            <div className={styles.mainItem}>
              <h3>name</h3>
              <p>{user?.name}</p>
            </div>
            <Divider />

            <div className={styles.mainItem}>
              <h3>bio</h3>
              <p>{user?.bio}</p>
            </div>
            <Divider />

            <div className={styles.mainItem}>
              <h3>email</h3>
              <p>{user?.email}</p>
            </div>
            <Divider />

            <div className={styles.mainItem}>
              <h3>password</h3>
              <p>{user?.password}</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default UserDetails;
