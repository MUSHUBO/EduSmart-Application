import cloudinary from "@/library/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const filename = formData.get("filename");
    const filetype = formData.get("filetype");
    const filePurpose = formData.get("filePurpose");    

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let resourceType = "raw";
    let folder = "EduSmart-files";

    if (filetype && filetype.startsWith("image/")) {
      resourceType = "image";
      if (filePurpose === "profile") {
        folder = "EduSmart-profile-images";
      } else if (filePurpose === "assignment") {
        folder = "EduSmart-assignment-images";
      } else {
        folder = "EduSmart-other-images";
      }
    }

    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: resourceType, // use computed value
          folder: folder,              // use computed value
          public_id: filename ? filename.split(".")[0] : undefined,
          format: filename ? filename.split(".").pop() : undefined,
          type: "upload",
          content_type: filetype || "application/octet-stream",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    return NextResponse.json({ url: uploadResponse.secure_url });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}