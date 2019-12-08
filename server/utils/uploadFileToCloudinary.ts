import { v2 } from "cloudinary";
import { Readable } from "stream";
import fs, { ReadStream } from "fs";
import { ObjectType, Field } from "type-graphql";
import path from "path";
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET
} from "../env";

export interface CloudinaryUploadResult {
  public_id: string;
  version: number;
  signature: string;
  width?: number;
  height?: number;
  format: string;
  resource_type: string;
  url: string;
  secure_url: string;
}

export type CloudinaryResourceType = "image" | "raw" | "video" | "auto";

@ObjectType()
export class MyUploadType {
  @Field(() => Boolean)
  stream!: Readable;
  @Field(() => Boolean)
  createReadStream!: () => ReadStream;
  @Field(() => String)
  filename!: string;
  @Field(() => String)
  mimetype!: string;
  @Field(() => String)
  encoding!: string;
}

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY || CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET || CLOUDINARY_API_SECRET
});

const uploadFileToCloudinary = async (
  file: MyUploadType,
  type: CloudinaryResourceType
): Promise<CloudinaryUploadResult> => {
  try {
    const { createReadStream, filename } = file;
    const date = new Date(Date.now());
    const month = date.getMonth();
    const year = date.getFullYear();

    const uploadPath = `vapemusic2/${year}/${month}/`;

    const dir = path.join(__dirname, "..", "..", "tmp", filename);

    //The only problem is that i need to save the files in a temp folder before the upload
    //Works in Heroku but Not Working For Zeit Now. I need to find a way to get the tmp folder working there
    //ALSO to verify if i can store the temp file in memory and upload to Cloudinary in order to avoid this issue

    await new Promise(res =>
      createReadStream().pipe(fs.createWriteStream(dir).on("close", res))
    );

    return v2.uploader.upload(
      dir,
      {
        upload_preset: "nrwvfull",
        resource_type: type,
        folder: uploadPath,
        use_filename: true
      },
      function(error, result) {
        // console.log(result, error);
        if (result && result.url) {
          return result.url;
        } else {
          return result;
        }
      }
    );
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default uploadFileToCloudinary;
