import {
  // getAllSquares,
  getCellDistance,
  // getNeighbor,
  cellToId
} from "./grid/math";

import {
  TILE_SIZE,
  CELL_WIDTH,
  CELL_HEIGHT,
  COLUMNS,
  ROWS,
  MAP_HEIGHT,
  MAP_WIDTH
} from "../constants/game.constants";

export const getInitialCtx = canvasRef => {
  const ctx = canvasRef.current.getContext("2d");
  ctx.textBaseline = "top";
  return ctx;
};

export const drawPlayer = (ctx, player) => {
  ctx.fillStyle = `rgb(255,255,255,1)`;
  ctx.font = `${TILE_SIZE}px serif`;
  ctx.fillText(
    "@",
    player.loc.col * CELL_WIDTH,
    player.loc.row * CELL_HEIGHT,
    CELL_WIDTH
  );
};

// cellIds ['id', ...]
// cells { id: {col: 0, row: 0} }
// player { loc: {col: 0, row: 0} }
// debug boolean
export const drawMap = (ctx, cellIds, cells, player, debug) => {
  cellIds.forEach(cellId => {
    const cell = cells[cellId];

    const opacity =
      ((getCellDistance(cellToId(player.loc), cellId) - 5) * -1) / 10;

    ctx.fillStyle = `rgb(200,0,0,${opacity})`;
    ctx.fillRect(
      cell.col * CELL_WIDTH,
      cell.row * CELL_HEIGHT,
      CELL_WIDTH,
      CELL_HEIGHT
    );

    if (debug) {
      ctx.fillStyle = `rgb(255,255,255, .5)`;
      ctx.font = "8px serif";
      ctx.fillText(cellId, cell.col * CELL_WIDTH, cell.row * CELL_HEIGHT);
    }
  });
};
