import _ from "lodash";

import {
  // getAllSquares,
  getCellDistance,
  getNeighbor,
  cellToId,
  idToCell
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
  ctx.fillStyle = `rgb(255,255,255,1)`;
  ctx.fillText(
    "@",
    player.loc.col * CELL_WIDTH,
    player.loc.row * CELL_HEIGHT,
    CELL_WIDTH
  );
};

export const drawPlayerHalo = (ctx, player) => {
  // lighting halo (do elsewhere)
  // from player location build halo of cell ids
  // get distance on all cells in halo
  // if they are open render light
  // const opacity =
  //   ((getCellDistance(cellToId(player.loc), cellId) - 5) * -1) / 10;
  // ctx.fillStyle = `rgb(200,0,0,${opacity})`;
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

export const drunkardsWalk = (cellIds, cells) => {
  const dig = cell => (cell.open = true);
  const directions = ["N", "E", "S", "W"];

  let backstop = 0;

  // Pick a random point on a filled grid and mark it empty.
  let current = _.sample(cellIds);
  dig(cells[current]);

  const digger = turns => {
    // no turns left. stop!
    if (!turns) return;
    if (backstop > 400) return;

    // get the next cell Id
    const nextCellId = cellToId(
      getNeighbor(cells[current], _.sample(directions))
    );

    // test that it is in bounds
    if (observeBoundaries(nextCellId)) {
      if (!cells[nextCellId].open) {
        dig(cells[nextCellId]);
        turns = turns - 1;
        current = nextCellId;
        backstop = 0;
        digger(turns);
      } else {
        backstop++;
        digger(turns);
      }
    } else {
      backstop++;
      digger(turns);
    }
  };

  digger(400);
  // Choose a random cardinal direction (N, E, S, W).

  // Move in that direction, and mark it empty unless it already was.
  // Repeat steps 2-3, until you have emptied as many grids as desired.

  return cells;
};

export const drunkardsWalk2 = (cellIds, cells) => {
  const dig = cell => (cell.open = true);
  const directions = ["N", "E", "S", "W"];

  // Pick a random point on a filled grid and mark it empty.
  let current = _.sample(cellIds);
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
