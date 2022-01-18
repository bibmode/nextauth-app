import { Button } from "@mui/material";
import React from "react";
import styles from "./ChangeInfo.module.scss";

const ChangeInfo = ({ user }) => {
  return (
    <div className={styles.wrapper}>
      <h1>Change Info</h1>
      <p>Changes will be reflected to every services</p>

      <div className={styles.picture}>
        <img
          src={user?.image ? user.image : "user.png"}
          alt="profile picture"
        />
        <button>change photo</button>
      </div>

      <form className={styles.form}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" placeholder="Enter your name..." />

        <label htmlFor="bio">Bio</label>
        <input type="text" id="bio" placeholder="Enter your bio..." />

        <label htmlFor="phone">Phone</label>
        <input type="number" id="phone" placeholder="Enter your phone..." />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Enter your email..." />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your new password..."
        />

        <Button
          variant="contained"
          disableElevation
          sx={{
            textTransform: "capitalize",
            width: "fit-content",
            px: "2.4rem",
            borderRadius: "8px",
          }}
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default ChangeInfo;
