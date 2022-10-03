import {Request} from "express";

export const getIp = (req: Request) => {
  return req.header('x-forwarded-for') || req.socket.remoteAddress;
}
