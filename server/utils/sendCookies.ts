import { Response } from "express";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";

const hour = 3600000;

export function SendCookies(
  res: Response,
  accessToken: string,
  refreshToken: string
) {
  res.cookie(REFRESH_TOKEN, refreshToken, {
    // expires: true,
    maxAge: 14 * 24 * hour, //2 weeks
    // httpOnly: true,
    // domain: ".herokuapp.com",
    httpOnly: true,
    // sameSite: "none",
    sameSite: false,
    // secure: process.env.NODE_ENV === "production"
    secure: true
  });

  res.cookie(ACCESS_TOKEN, accessToken, {
    // expires: true,
    maxAge: 24 * hour, //24 hours
    httpOnly: true,
    // domain: ".herokuapp.com",
    // sameSite: "none",
    sameSite: false,
    // secure: process.env.NODE_ENV === "production"
    secure: true
  });
}
