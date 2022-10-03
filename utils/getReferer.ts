import {Request} from "express";

export const getReferer = (req: Request) => {
  return req.header('Referer');
}
