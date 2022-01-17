import { Button, IconButton, Input, InputAdornment } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";

import React from "react";
import styles from "./Login.module.scss";
import { signIn } from "next-auth/react";

const Login = () => {
  const handleClick = (provider) => {
    if (provider === "twitter") {
      console.log("twitter don't work");
      return;
    }

    signIn(provider, {
      callbackUrl: `${window.location.origin}/`,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <img src="devchallenges.svg" alt="logo" />
        <h1>Join thousands of learners from around the world</h1>
        <p>
          Master web development by making real-life projects. There are
          multiple paths for you to choose
        </p>

        {/* form */}
        <form>
          <Input
            id="email"
            name="email"
            variant="outlined"
            placeholder="Email"
            fullWidth
            inputprops={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailIcon />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2, mt: 3.7 }}
          />
          <Input
            id="password"
            name="password"
            type="password"
            variant="outlined"
            placeholder="Password"
            fullWidth
            inputprops={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />
          <Button
            type="submit"
            id="submitBtn"
            variant="contained"
            disableElevation
            fullWidth
            sx={{ textTransform: "none" }}
          >
            Login
          </Button>
        </form>

        <div className={styles.socialWrapper}>
          <p>or continue with these social profile</p>

          <div className={styles.icons}>
            <IconButton
              aria-label="google"
              onClick={() => handleClick("google")}
            >
              <GoogleIcon sx={{ fontSize: 22 }} />
            </IconButton>

            <IconButton
              aria-label="facebook"
              onClick={() => handleClick("facebook")}
            >
              <FacebookIcon sx={{ fontSize: 22 }} />
            </IconButton>

            <IconButton
              aria-label="twitter"
              onClick={() => handleClick("twitter")}
            >
              <TwitterIcon sx={{ fontSize: 22 }} />
            </IconButton>

            <IconButton
              aria-label="github"
              onClick={() => handleClick("github")}
            >
              <GitHubIcon sx={{ fontSize: 22 }} />
            </IconButton>
          </div>

          <p>Already a member? Login</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
