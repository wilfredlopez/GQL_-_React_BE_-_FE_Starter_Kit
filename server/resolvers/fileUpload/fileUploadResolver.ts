// TODO: I NEED TO ADD THE GOOGLE STORAGE SERVICE JSON (google-storage-service.json) TO THE ROOT OF THIS SERVER
// ALSO ADD GOOGLE CLOUD STORAGE PACKAGE

import {
  Resolver,
  Mutation,
  Query,
  Field,
  ObjectType,
  Arg
} from "type-graphql";
import { Readable } from "stream";
import { ReadStream } from "fs";
import {
  GraphQLUpload
  // FileUpload
} from "graphql-upload";
import googleGloud from "../../utils/googleCloud";

export interface Upload {
  stream: Readable;
  createReadStream(): ReadStream;
  filename: string;
  mimetype: string;
  encoding: string;
}

@ObjectType()
export class UploadType {
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

@ObjectType()
export class FilesType {
  @Field(() => [FileResponse])
  files!: FileResponse[];
}

@ObjectType()
class FileResponse {
  @Field()
  name: string;
  @Field()
  link: string;
}

const wilfredFiles = googleGloud.bucket("files-wilfred");

//THIS ONLY WORKS WITH THE GOOGLECLOUD BUCKET
@Resolver()
export default class FilesResolver {
  @Query(() => [FileResponse!])
  async files(): Promise<FileResponse[]> {
    const filesinfo: FileResponse[] = [];

    await wilfredFiles.getFiles().then(async f => {
      f.forEach(bucket => {
        bucket.forEach((file: any) => {
          return filesinfo.push({
            name: file.name,
            link: file.metadata.mediaLink
          });
        });
      });
    });
    return filesinfo;
  }

  @Mutation(() => String!)
  async fileUpload(
    @Arg("file", type => GraphQLUpload) file: UploadType
  ): Promise<string> {
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
  }
}
