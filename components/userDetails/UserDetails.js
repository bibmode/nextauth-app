import { signOut, useSession } from "next-auth/react";
import React from "react";

import {
  Button,
  ClickAwayListener,
  Container,
  Divider,
  styled,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { useContext, useEffect } from "react";
import Menu from "../menu/Menu";
import styles from "./UserDetails.module.scss";
import { AppContext } from "../layout/Layout";
import ChangeInfo from "../changeInfo/ChangeInfo";

const BackButton = styled(Button)({
  fontSize: "1.8rem !important",
  textTransform: "capitalize !important",
  alignSelf: "flex-start !important",
  marginBottom: "2rem",
});

const UserDetails = () => {
  const { menu, setMenu, setToggleEdit, toggleEdit, loading, userDetails } =
    useContext(AppContext);

  const { data: session } = useSession();

  const user = userDetails ? userDetails : session.user;

  return (
    <div className={styles.wrapper}>
      <Container
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
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
              src={user.picture ? user.picture : "user.png"}
              alt="user profile"
            />
          </button>
          {menu && <Menu />}
        </div>

        <div className={styles.main}>
          {toggleEdit ? (
            <BackButton
              disabled={loading ? true : false}
              startIcon={<ArrowBackIosIcon />}
              variant="text"
              onClick={() => setToggleEdit(false)}
            >
              Back
            </BackButton>
          ) : (
            <>
              <h1>Personal info</h1>
              <p>Basic info, like your name and photo</p>
            </>
          )}

          <div className={styles.mainWrapper}>
            {toggleEdit ? (
              <ChangeInfo />
            ) : (
              <>
                <div className={styles.mainTopBar}>
                  <h2>Profile</h2>
                  <p>Some info may be visible to other people</p>
                  <Button
                    variant="outlined"
                    onClick={() => setToggleEdit(true)}
                  >
                    Edit
                  </Button>
                </div>
                <Divider />

                <div className={styles.mainItem}>
                  <h3>photo</h3>
                  <div className={styles.mainItemPicture}>
                    <img
                      src={user.picture ? user.picture : "user.png"}
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
                  <h3>phone</h3>
                  <p>{user?.phone}</p>
                </div>
                <Divider />

                <div className={styles.mainItem}>
                  <h3>email</h3>
                  <p>{user?.email}</p>
                </div>

                {user.password && (
                  <>
                    <Divider />
                    <div className={styles.mainItem}>
                      <h3>password</h3>
                      <p>{user.password}</p>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default UserDetails;
