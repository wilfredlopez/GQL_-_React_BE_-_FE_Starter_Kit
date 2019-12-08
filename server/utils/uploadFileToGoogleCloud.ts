import googleGloud from "./googleCloud";
import { Readable } from "stream";
import { ReadStream } from "fs";
import { ObjectType, Field } from "type-graphql";

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
const wilfredFiles = googleGloud.bucket("files-wilfred");

const uploadFileToGoogleCloud = async (file: MyUploadType): Promise<string> => {
  console.log(file);
  try {
    const { createReadStream, filename } = file;
    const date = new Date(Date.now());
    const month = date.getMonth();
    const year = date.getFullYear();

    const rootFilesUrl = "https://storage.cloud.google.com/files-wilfred";
    const uploadedFile = `${rootFilesUrl}/${year}/${month}/${filename}`;

    await new Promise(res =>
      createReadStream()
        .pipe(
          wilfredFiles
            .file(`/${year}/${month}/${filename}`)
            // .file(filename)
            .createWriteStream({
              resumable: false,
              gzip: true
            })
            .on("finish", res)
        )
        .on("close", res)
    );

    return uploadedFile;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default uploadFileToGoogleCloud;
