import _ from "lodash";

import {
  // getAllSquares,
  getCellDistance,
  getNeighbor,
  cellToId,
  idToCell,
  getAllSquaresFromPoint
} from "./grid/math";

import {
  TILE_SIZE,
  CELL_WIDTH,
  CELL_HEIGHT,
  COLUMNS,
  ROWS
  // MAP_HEIGHT,
  // MAP_WIDTH
} from "../constants/game.constants";

export const observeBoundaries = id => {
  const loc = idToCell(id);
  if (loc.col < 0) return false;
  if (loc.col >= COLUMNS) return false;
  if (loc.row < 0) return false;
  if (loc.row >= ROWS) return false;

  return true;
};

export const getInitialCtx = canvasRef => {
  const ctx = canvasRef.current.getContext("2d");
  ctx.font = `${TILE_SIZE}px serif`;
  ctx.textBaseline = "top";
  return ctx;
};

export const drawPlayer = (ctx, player) => {
  ctx.fillStyle = `rgb(50,50,50,1)`;
  ctx.fillText(
    "@",
    player.loc.col * CELL_WIDTH,
    player.loc.row * CELL_HEIGHT,
    CELL_WIDTH
  );
};

export const drawPlayerHalo = (ctx, player, cellIds, cells) => {
  const localCellIds = Object.keys(getAllSquaresFromPoint(player.loc, 8));
  // from player location build halo of cell ids
  // get distance on all cells in halo
  // if they are open render light
  localCellIds.forEach(cellId => {
    const cell = cells[cellId];
    if (cell && cell.open) {
      const opacity =
        ((getCellDistance(cellToId(player.loc), cellId) - 8) * -1) / 7;
      ctx.fillStyle = `rgb(230,180,59,${opacity})`;
      ctx.fillRect(
        cell.col * CELL_WIDTH,
        cell.row * CELL_HEIGHT,
        CELL_WIDTH,
        CELL_HEIGHT
      );
    }
  });
};

// cellIds ['id', ...]
// cells { id: {col: 0, row: 0} }
// player { loc: {col: 0, row: 0} }
// debug boolean
export const drawMap = (ctx, cellIds, cells, player, debug) => {
  cellIds.forEach(cellId => {
    const cell = cells[cellId];

    ctx.fillStyle = cell.open ? `rgb(10,10,10)` : `rgb(100,100,100)`;
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

export const drunkardsWalk = (cellIds, cells, randomStart = false) => {
  const dig = cell => (cell.open = true);
  const directions = ["N", "E", "S", "W"];

  // Pick start location
  let current = randomStart
    ? _.sample(cellIds)
    : `${Math.ceil(COLUMNS / 2)},${Math.ceil(ROWS / 2)}`;

  dig(cells[current]);

  const digger = () => {
    // get the next cell Id
    const nextCellId = cellToId(
      getNeighbor(cells[current], _.sample(directions))
    );

    // test that it is in bounds
    if (observeBoundaries(nextCellId)) {
      if (!cells[nextCellId].open) {
        dig(cells[nextCellId]);
        current = nextCellId;
      }
    }
  };

  _.times(2500, digger);
};

export const drunkardsWalk2 = (cellIds, cells, randomStart = false) => {
  const dig = cell => (cell.open = true);
  const directions = ["N", "E", "S", "W"];

  // Pick start location
  let current = randomStart
    ? _.sample(cellIds)
    : `${Math.ceil(COLUMNS / 2)},${Math.ceil(ROWS / 2)}`;

  dig(cells[current]);

  const digger = () => {
    // get the next cell Id
    const nextCellId = cellToId(
      getNeighbor(cells[current], _.sample(directions))
    );

    // test that it is in bounds
    if (observeBoundaries(nextCellId)) {
      dig(cells[nextCellId]);
      current = nextCellId;
    }
  };

  _.times(1500, digger);
};
