import { v2 as cloudinary } from "cloudinary";

if (!process.env.CLOUDINARY_CLOUD_NAME) {
  throw new Error("CLOUDINARY_CLOUD_NAME is not set");
}

if (!process.env.CLOUDINARY_API_KEY) {
  throw new Error("CLOUDINARY_API_KEY is not set");
}

if (!process.env.CLOUDINARY_API_SECRET) {
  throw new Error("CLOUDINARY_API_SECRET is not set");
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(file: File) {
  const imageData = await file.arrayBuffer();
  const mime = file.type;
  const encoding = "base64";
  const base64Data = Buffer.from(imageData).toString("base64");
  const fileUri = `data:${mime};${encoding},${base64Data}`;

  const result = await cloudinary.uploader.upload(fileUri, {
    folder: "nextjs-foodapp",
  });

  return result.secure_url;
}
