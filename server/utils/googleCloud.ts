import { Storage } from "@google-cloud/storage";
import path from "path";

const googleGloud = new Storage({
  keyFilename: path.join(__dirname, "..", "..", "google-storage-service.json"),
  projectId: "optimum-tensor-251513"
});

export default googleGloud;
