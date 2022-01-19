import { Button } from "@mui/material";
import React from "react";
import styles from "./ChangeInfo.module.scss";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSession } from "next-auth/react";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

//form validation
const validationSchema = yup.object({
  phone: yup
    .string("Enter your phone")
    .matches(phoneRegExp, "Enter a valid phone number"),
  email: yup.string("Enter your email").email("Enter a valid email"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length"),
});

const ChangeInfo = () => {
  const { data: session } = useSession();

  const user = session.user;
  // console.log(session);

  const formik = useFormik({
    initialValues: {
      name: "",
      bio: "",
      phone: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let userData = {};

      userData.name = values.name ? values.name : user.name;
      userData.bio = values.bio ? values.bio : user.bio;
      userData.phone = values.phone ? values.phone : user.phone;
      userData.email = values.email ? values.email : user.email;
      // userData.userId = session.userId;

      console.log(userData);

      const res = await fetch("/api/update-user", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      }).catch((err) => console.log(err));
    },
  });

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

      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name..."
          value={formik.values.name}
          onChange={formik.handleChange}
          helpertext={formik.touched.name && formik.errors.name}
        />

        <label htmlFor="bio">Bio</label>
        <input
          type="text"
          id="bio"
          name="bio"
          placeholder="Enter your bio..."
          value={formik.values.bio}
          onChange={formik.handleChange}
          helpertext={formik.touched.bio && formik.errors.bio}
        />

        <label htmlFor="phone">Phone</label>
        <input
          type="number"
          id="phone"
          name="phone"
          placeholder="Enter your phone..."
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helpertext={formik.touched.phone && formik.errors.phone}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email..."
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helpertext={formik.touched.email && formik.errors.email}
        />

        {user?.password && (
          <>
            {" "}
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your new password..."
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helpertext={formik.touched.password && formik.errors.password}
            />
          </>
        )}

        <Button
          type="submit"
          id="submitBtn"
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
