import dotenv from "dotenv";

dotenv.config();
let path;
switch (process.env.NODE_ENV) {
  case "test":
    path = `${__dirname}/../.env.test`;
    break;
  case "production":
    path = `${__dirname}/../.env.production`;
    break;
  default:
    path = `${__dirname}/../.env.development`;
}
dotenv.config({ path: path });

//Add this env variables to the production server. eg. Heroku
export const DATABASE_NAME = process.env.DATABASE_NAME;
export const MONGO_URL = process.env.MONGO_URL;
export const JWT_SECRET = process.env.JWT_SECRET;
export const FRONTEND_URL = process.env.FRONTEND_URL;
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
