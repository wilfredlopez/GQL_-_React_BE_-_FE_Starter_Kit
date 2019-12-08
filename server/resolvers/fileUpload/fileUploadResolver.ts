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
import uploadFileToCloudinary from "../../utils/uploadFileToCloudinary";

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

const fakeFiles: FileResponse[] = [
  {
    link: "https://file.jpg",
    name: "MY FAKE NAME"
  }
];

//THIS ONLY WORKS WITH THE GOOGLECLOUD BUCKET
@Resolver()
export default class FilesResolver {
  @Query(() => [FileResponse!])
  async files(): Promise<FileResponse[]> {
    return fakeFiles;
  }

  @Mutation(() => String!)
  async fileUpload(
    @Arg("file", type => GraphQLUpload) file: UploadType
  ): Promise<string> {
    try {
      const upload = await uploadFileToCloudinary(file, "video");

      return upload.url;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
