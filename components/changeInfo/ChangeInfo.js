import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import styles from "./ChangeInfo.module.scss";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSession } from "next-auth/react";
import { AppContext } from "../layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";

//form validation
const validationSchema = yup.object({
  phone: yup.string().matches(/\d/g, "Enter a valid phone number"),
});

const ChangeInfo = () => {
  const { setLoading, loading, setUserDetails, userDetails } =
    useContext(AppContext);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(null);

  const { data: session } = useSession();

  const user = userDetails ? userDetails : session.user;

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

  const initialImage = (e) => {
    const initialUrl = window.URL.createObjectURL(e.target.files[0]);
    setUrl(initialUrl);
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "ih5pyoxb");
    data.append("clous_name", "genepulp");

    try {
      const dataUpload = await axios.post(
        "https://api.cloudinary.com/v1_1/genepulp/image/upload",
        data
      );
      setUrl(dataUpload.data.url);

      return dataUpload.data.url;
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

      const cloudinaryPic = url ? await handleUpload() : null;

      userData.name = values.name ? values.name : user.name;
      userData.bio = values.bio ? values.bio : user.bio;
      userData.phone = values.phone ? values.phone : user.phone;
      userData.email = user.email;
      userData.picture = cloudinaryPic
        ? cloudinaryPic
        : values.picture
        ? values.picture
        : user.picture;

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
          name="image-upload"
          id="image-upload"
          accept="image/*"
          onChange={initialImage}
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
          className={formik.errors.phone && styles.formPhone}
          type="text"
          id="phone"
          name="phone"
          placeholder="Enter your phone..."
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={`${formik.touched.phone && Boolean(formik.errors.phone)}`}
          helpertext={formik.touched.phone && formik.errors.phone}
        />
        {formik.errors.phone ? (
          <h3 className={styles.formError}>{formik.errors.phone}</h3>
        ) : null}

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
