import { createToken } from "../utils/createToken";
import { SendCookies } from "../utils/sendCookies";
import { User } from "../entity/User";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { MyRequest } from "../interfaces/myContext";
import { Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "../env";

export async function CookiesAutheticationMethod(
  req: MyRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const accessToken = req.cookies[ACCESS_TOKEN];
    const refreshToken = req.cookies[REFRESH_TOKEN];
    // console.log(accessToken)

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

      await user.save();
      SendCookies(res, tokens.accessToken, tokens.refreshToken);

      req.userId = data.userId;

      req.email = data.email;

      next();
    }
  } catch (error) {
    next();
  }
}
