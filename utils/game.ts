import {loadEntry} from "./storage";
import {getIp} from "./getIp";
import {Request} from "express";

export const ROWS = 3;
export const COLS = 3;

export const DEFAULT_GAME = Object.freeze(
  Array.from({ length: ROWS }, () => {
    return Array.from({ length: COLS }, () => {
      return 0;
    });
  })
);

export const getInstanceID = (req: Request) => {
  return getIp(req) || 'no-ip';
}

export const getGame = async (instanceID: string) => {
  return await loadEntry(instanceID) || JSON.parse(JSON.stringify(DEFAULT_GAME));
}

export const getGameCell = (game: number[][], pos: [row: number, col: number]) => {
  const [row, col] = pos;
  return game[row][col];
}

export const updateGameCell = (game: number[][], pos: [row: number, col: number], setState: (state: number) => number) => {
  const [row, col] = pos;
  game[row][col] = setState(game[row][col]);
}
