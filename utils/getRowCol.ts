import {Request} from "express";

export const getRowCol = (req: Request) => {
  const params = req.params as any;
  const row = parseInt(params.row) - 1;
  const col = parseInt(params.col) - 1;

  return { row, col };
}
