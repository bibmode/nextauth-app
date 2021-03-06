import {
  Button,
  Container,
  IconButton,
  InputAdornment,
  styled,
  TextField,
} from "@mui/material";
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
import { toast } from "react-toastify";

//styling material ui
const SubmitButton = styled(Button)({
  fontSize: "16px",
  lineHeight: "22px",
  borderRadius: "8px !important",
  paddingBlock: "8px",
});

const Input = styled(TextField)({
  borderRadius: "8px !important",
});

const ProviderBtn = styled(IconButton)({
  borderRadius: "50% !important",
  border: "1px solid #828282",
});

//form validation
const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string("Enter your password").required("Password is required"),
});

const Login = () => {
  const { signUpEmail, toggleForm, setToggleForm, setLoading, loading } =
    useContext(AppContext);

  useEffect(() => {
    setLoading(false);

    const currentHref = window.location.href;
    if (currentHref.includes("No%20user%20found%20with%20the%20email")) {
      toast.error("User not found with the email");
    }
    if (currentHref.includes("Password%20does%20not%20match")) {
      toast.error("Password does not match");
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      //register
      try {
        if (toggleForm) {
          const result = await signUpEmail(values.email, values.password);

          !result && setLoading(false);
        }

        //login
        if (!toggleForm) {
          const status = await signIn("credentials", {
            callbackUrl: `${window.location.origin}/`,
            email: values.email,
            password: values.password,
          });

          // if (status.url) router.push("/");
        }
      } catch (err) {
        toast.error("error");
      }
    },
  });

  const handleClick = (provider) => {
    if (provider === "twitter") {
      toast.info("Please choose another method!");
      return;
    }

    setLoading(true);
    signIn(provider, {
      callbackUrl: `${window.location.origin}/`,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Container maxWidth="sm">
          <img src="devchallenges.svg" alt="logo" />

          {toggleForm ? (
            <h1>Join thousands of learners from around the world</h1>
          ) : (
            <h1 className={styles.login}>Login</h1>
          )}

          {toggleForm && (
            <p>
              Master web development by making real-life projects. There are
              multiple paths for you to choose
            </p>
          )}

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
              helperText={formik.touched.email && formik.errors.email}
              fullWidth
              InputProps={{
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
              helperText={formik.touched.password && formik.errors.password}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />
            <SubmitButton
              type="submit"
              id="submitBtn"
              variant="contained"
              disableElevation
              fullWidth
              sx={{ textTransform: "none", mb: "1.5rem" }}
              disabled={loading}
            >
              {toggleForm ? "Register" : "Login"}
            </SubmitButton>
          </form>

          {/* social media signin */}
          <h2>or continue with these social profile</h2>

          <div className={styles.icons}>
            <ProviderBtn
              aria-label="google"
              onClick={() => handleClick("google")}
              disabled={loading}
            >
              <GoogleIcon sx={{ fontSize: 22 }} />
            </ProviderBtn>

            <ProviderBtn
              aria-label="facebook"
              onClick={() => handleClick("facebook")}
              disabled={loading}
            >
              <FacebookIcon sx={{ fontSize: 22 }} />
            </ProviderBtn>

            <ProviderBtn
              aria-label="twitter"
              onClick={() => handleClick("twitter")}
              disabled={loading}
            >
              <TwitterIcon sx={{ fontSize: 22 }} />
            </ProviderBtn>

            <ProviderBtn
              aria-label="github"
              onClick={() => handleClick("github")}
              disabled={loading}
            >
              <GitHubIcon sx={{ fontSize: 22 }} />
            </ProviderBtn>
          </div>

          {toggleForm ? (
            <h2>
              Already a member?{" "}
              <a onClick={() => setToggleForm(false)}>Login</a>
            </h2>
          ) : (
            <h2>
              {`${"Don't have an account yet?"}`}{" "}
              <a onClick={() => setToggleForm(true)}>Register</a>
            </h2>
          )}
        </Container>
      </div>
    </div>
  );
};

export default Login;
