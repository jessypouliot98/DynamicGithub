import express from 'express';
import {getReferer} from "./utils/getReferer";
import {getRowCol} from "./utils/getRowCol";
import {initDB, saveEntry} from "./utils/storage";
import {
  COLS,
  getGame,
  getGameCell,
  getInstanceID,
  ROWS,
  updateGameCell
} from "./utils/game";

const port = process.env.APP_PORT || 8000;

const app = express();

app.use('/static', express.static('public'))

app.get('/images/:row/:col', async (req, res) => {
  const { row, col } = getRowCol(req);
  const instanceID = getInstanceID(req);

  if (
    (isNaN(row) || isNaN(col)) ||
    (0 < row && row > ROWS) ||
    (0 < col && col > COLS)
  ) {
    res.send('Nope');
    return;
  }

  const game = await getGame(instanceID);
  const cellState = getGameCell(game, [row, col]);

  if (cellState === 1) {
    res.redirect('/static/blue.png');
    return;
  }

  res.redirect('/static/red.png');
});

app.get('/select/:row/:col', async (req, res) => {
  const { row, col } = getRowCol(req);
  const referer = getReferer(req);
  const instanceID = getInstanceID(req);

  if (
    !referer ||
    (isNaN(row) || isNaN(col)) ||
    (0 < row && row > ROWS) ||
    (0 < col && col > COLS)
  ) {
    res.send('Nope');
    return;
  }

  const game = await getGame(instanceID);
  updateGameCell(game, [row, col], (prevState) => {
    return prevState === 0 ? 1 : 0;
  });
  await saveEntry(instanceID, game);

  res.redirect(`${referer}`);
});

app.listen(port, () => {
  console.log(`Server listening on port:${port}`);
  initDB();
})
