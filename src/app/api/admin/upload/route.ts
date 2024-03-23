import { writeFile, unlink } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest, response: NextResponse) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  //   const filePath = `/tmp/${file.name}`
  
  // works in development
  const filePath = path.join(
    process.cwd(),
    "public/images/products",
    file.name
  );
  await writeFile(filePath, buffer);
  console.log(`open ${filePath} to see the uploaded file`);

  // Upload to Cloudinary
  const { secure_url } = await cloudinary.uploader.upload(filePath, {
    folder: "products",
  });

  // Delete the local file
  // const unlinkPromise = unlink(filePath);
  // if (!unlinkPromise) {
  //   console.log("Error deleting file");
  // }

  // const localFilePublicPath = `/images/products/${file.name}`;

  return NextResponse.json(
    { filePath, secure_url },
    { status: 200 }
  );
}