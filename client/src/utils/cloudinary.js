/* eslint-disable no-undef */
import axios from "axios";

export const uploadImage = async (image) => {
  console.log(
    "Cloudinary cloud name: ",
    process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
  );

  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "ml_default");
  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );
    return res.data.url;
  } catch (err) {
    console.error(err);
  }
};
