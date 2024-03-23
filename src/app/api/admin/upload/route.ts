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
  try{
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
  
    if (!file) {
      return NextResponse.json({ success: false });
    }

    const bytes = await file.arrayBuffer();
    let mime = file.type;
    const encoding = "base64";
    const base64Data = Buffer.from(bytes).toString("base64");
    let fileUri = "data:" + mime + ";" + encoding + ',' + base64Data;
  
    // With the file data in the buffer, you can do whatever you want with it.
    // For this, we'll just write it to the filesystem in a new location
    // const filePath = `/tmp/${file.name}`
    
    // works in development
    // const filePath = path.join(
    //   process.cwd(),
    //   "public/images/products",
    //   file.name
    // );
    // await writeFile(filePath, buffer);
    // console.log(`open ${filePath} to see the uploaded file`);
  
    // Upload to Cloudinary
    // const { secure_url } = await cloudinary.uploader.upload(filePath, {
    //   folder: "products",
    // });
    const { secure_url } = await cloudinary.uploader.upload(fileUri, {
      invalidate: true,
      folder: "products",
    });
    console.log(secure_url);
  
    // Delete the local file
    // const unlinkPromise = unlink(filePath);
    // if (!unlinkPromise) {
    //   console.log("Error deleting file");
    // }
  
    // const localFilePublicPath = `/images/products/${file.name}`;
  
    return NextResponse.json(
      { fileUri, secure_url },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Subir imagen a cloudinary" },
      { status: 500 }
    );
  }
}
