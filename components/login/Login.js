import { Button, IconButton, Input, InputAdornment } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";

import React, { useEffect, useContext } from "react";
import styles from "./Login.module.scss";
import { signIn } from "next-auth/react";

import { useFormik } from "formik";
import * as yup from "yup";
import { AppContext } from "../layout/Layout";

//form validation
const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Login = () => {
  const { signUpEmail, toggleForm, setToggleForm } = useContext(AppContext);

  const clearValues = () => {
    formik.values.email = "";
    formik.values.password = "";
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      //register
      try {
        if (toggleForm) signUpEmail(values.email, values.password);

        // //login
        // if (!toggleForm) {
        //   const status = await signIn("credentials", {
        //     redirect: false,
        //     email: values.email,
        //     password: values.password,
        //   });

        //   if (status.url) redirectUser("profile");

        //   console.log(status);
        // }
      } catch (err) {
        console.log(err);
      }
    },
  });

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
        <form onSubmit={formik.handleSubmit}>
          <Input
            id="email"
            name="email"
            variant="outlined"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helpertext={formik.touched.email && formik.errors.email}
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
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helpertext={formik.touched.password && formik.errors.password}
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

        {/* social media signin */}
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
