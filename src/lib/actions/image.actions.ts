import axios from "axios";
import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadFile = async (
  file: File | formidable.File
): Promise<string | undefined> => {
  console.log(file!, "file");
  const formData = new FormData();
  formData.append("file", file! as File);
  formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET!);
  console.log(formData);

  try {
    const response = await axios
      .post(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      )
      .then((res) => res.data)
      .catch((err) => console.log(err));

    const isStatus200 = response.status === 200;
    if (!isStatus200) return;
    console.log(response.data.url, "response.data.url");

    return response.data.url;
  } catch (error) {
    console.log(error);
    console.log("Hubo un error con la url de cloudinary");
  }
  try {
    let fileImg = file as formidable.File;
    console.log(fileImg.filepath, "fileImg");
    const { secure_url } = await cloudinary.uploader.upload(fileImg!.filepath);
    return secure_url;
  } catch (error) {
    console.log(error);
    console.log("Hubo un error con el metodo cloudinary");
  }
};
