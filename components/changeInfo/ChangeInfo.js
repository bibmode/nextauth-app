import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import styles from "./ChangeInfo.module.scss";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSession } from "next-auth/react";
import { AppContext } from "../layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

//form validation
const validationSchema = yup.object({
  phone: yup
    .string("Enter your phone")
    .matches(phoneRegExp, "Enter a valid phone number"),
  // email: yup.string("Enter your email").email("Enter a valid email"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length"),
});

const ChangeInfo = () => {
  const { setLoading, loading, setUserDetails, userDetails } =
    useContext(AppContext);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(null);

  const { data: session } = useSession();

  const user = userDetails ? userDetails : session.user;
  // console.log(session);

  const clearValues = () => {
    formik.values.name = "";
    formik.values.bio = "";
    formik.values.phone = "";
  };

  useEffect(() => {
    clearValues();
  }, []);

  const openFile = () => {
    document.getElementById("image-upload").click();
  };

  // const handleUpload = (e) => {
  //   console.log(e.target.files[0]);
  //   uploadImage(e.target.files[0]);
  // };

  const handleUpload = async (e) => {
    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("upload_preset", "ih5pyoxb");
    data.append("clous_name", "genepulp");

    try {
      setLoading(true);
      const dataUpload = await axios.post(
        "https://api.cloudinary.com/v1_1/genepulp/image/upload",
        data
      );
      console.log(dataUpload);
      setUrl(dataUpload.data.url);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      bio: "",
      phone: "",
      photo: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      let userData = {};

      userData.name = values.name ? values.name : user.name;
      userData.bio = values.bio ? values.bio : user.bio;
      userData.phone = values.phone ? values.phone : user.phone;
      userData.email = user.email;
      userData.picture = url
        ? url
        : values.picture
        ? values.picture
        : user.picture;

      console.log(userData);

      const res = await fetch("/api/update-user", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 201) toast.success("Success!");

      userData && setUserDetails(userData);
      setLoading(false);
      clearValues();
      console.log(res);
    },
  });

  return (
    <div className={styles.wrapper}>
      <h1>Change Info</h1>
      <p>Changes will be reflected to every services</p>

      <div className={styles.picture}>
        <img
          src={url ? url : user?.picture ? user.picture : "user.png"}
          alt="profile picture"
        />
        <button onClick={openFile}>change photo</button>
      </div>

      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <input
          type="file"
          name="image-ipload"
          id="image-upload"
          accept="image/*"
          onChange={handleUpload}
          hidden
        />
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name..."
          value={formik.values.name}
          onChange={formik.handleChange}
        />

        <label htmlFor="bio">Bio</label>
        <input
          type="text"
          id="bio"
          name="bio"
          placeholder="Enter your bio..."
          value={formik.values.bio}
          onChange={formik.handleChange}
        />

        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          id="phone"
          name="phone"
          placeholder="Enter your phone..."
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helpertext={formik.touched.phone && formik.errors.phone}
        />

        {/* <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email..."
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helpertext={formik.touched.email && formik.errors.email}
        /> */}

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
          disabled={loading ? true : false}
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
