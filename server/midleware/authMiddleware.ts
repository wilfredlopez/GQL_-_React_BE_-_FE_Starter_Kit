import { Response, NextFunction } from "express";
import { MyRequest } from "../interfaces/myContext";
import { JWTAuth } from "./jwtAuth";
// import { CookiesAutheticationMethod } from "./CookiesAuth";

export const authMiddleware = async function(
  req: MyRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  //If you want Auth via Heathers only. //WITH THIS METHOD THE USER NEEDS TO SEND THE HEATHER "Authorization": "Bearer accesstokenhere refreshtokenhere"
  JWTAuth(req, res, next);
  //If you want Auth via Cookies only
  // CookiesAutheticationMethod(req, res, next);
};
