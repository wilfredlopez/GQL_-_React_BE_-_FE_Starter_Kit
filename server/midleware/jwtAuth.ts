import { SendCookies } from "../utils/sendCookies";
import { MyRequest } from "../interfaces/myContext";
import { NextFunction } from "connect";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "../env";
import { User } from "../entity/User";
import { createToken } from "../utils/createToken";
import { Response } from "express";

//WITH THIS METHOD THE USER NEEDS TO SEND THE HEADER "Authorization": "Bearer accesstokenhere refreshtokenhere"
export async function JWTAuth(req: MyRequest, _: Response, next: NextFunction) {
  const bearerBeader = req.headers["authorization"];
  if (typeof bearerBeader !== "undefined") {
    try {
      //split at the space
      const bearer = bearerBeader.split(" ");

      //get token from array
      const accessToken = bearer[1];
      const refreshToken = bearer[2];

      if (!refreshToken && !accessToken) {
        return next();
      }

      try {
        const data = verify(accessToken, JWT_SECRET!) as {
          userId?: string;
          email?: string;
        };

        req.userId = data.userId;

        req.email = data.email;

        next();
      } catch (error) {
        const data = (await verify(refreshToken, JWT_SECRET!)) as any;

        const user = await User.findOneOrFail(data.userId);

        if (!user || user.count !== data.count) {
          return next(); //user count is not valid or no user
        }

        const tokens = createToken(user);

        user.accessToken = tokens.accessToken;
        user.refreshToken = tokens.refreshToken;
        await user.save();

        req.userId = data.userId;

        req.email = data.email;

        next();
      }
    } catch (error) {
      next();
    }
  } else {
    next();
  }
}
