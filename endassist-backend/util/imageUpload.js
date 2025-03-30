import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export default function uploadToCloudinary(buffer, options = {}) {
  const uploadOptions = {
    folder: options.folder || "uploads",
    resource_type: options.resource_type || "auto",
    ...options,
  };

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return reject(error);
        }
        resolve(result);
      }
    );

    uploadStream.end(buffer);
  });
}
