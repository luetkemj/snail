import _ from "lodash";

import { getCurrentMap } from "../data/game.data";

import {
  getBoundary,
  getCellDistance,
  getNeighbor,
  cellToId,
  idToCell,
  idToPoint,
  pointToId,
  getAllSquaresFromPoint,
  walkGrid
} from "./grid/math";

import {
  TILE_SIZE,
  CELL_WIDTH,
  CELL_HEIGHT,
  COLUMNS,
  ROWS
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
  ctx.font = `${TILE_SIZE}px serif`;
  ctx.fillText(
    "@",
    player.loc.col * CELL_WIDTH,
    player.loc.row * CELL_HEIGHT,
    CELL_WIDTH
  );
};

export const drawMonsters = (ctx, monsters) => {
  console.log(monsters);
  monsters.forEach(monster => {
    ctx.fillStyle = `rgb(0,0,0,1)`;
    ctx.font = `${TILE_SIZE}px serif`;
    ctx.fillText(
      "g",
      monster.loc.col * CELL_WIDTH,
      monster.loc.row * CELL_HEIGHT,
      CELL_WIDTH
    );
  });
};

export const drawPlayerHalo = (ctx, player) => {
  const { cells } = getCurrentMap();
  const localCells = getAllSquaresFromPoint(player.loc, 8);
  const localCellIds = Object.keys(localCells);
  const localBoundaryCellIds = getBoundary(localCellIds);
  const litCellIds = [];

  localBoundaryCellIds.forEach(id => {
    const start = { x: player.loc.col, y: player.loc.row };
    const end = idToPoint(id);
    const theLine = walkGrid(start, end);

    // iterate over theLine!!
    _.each(theLine, point => {
      const cellId = pointToId(point);
      const cell = cells[cellId];

      if (cell && cell.type && cell.type === "floor") {
        litCellIds.push(cellId);
      } else if (cell && cell.type && cell.type === "wall") {
        litCellIds.push(cellId);
        return false;
      } else {
        return false;
      }
    });
  });

  // from player location build halo of cell ids
  // get distance on all cells in halo
  // if they are open render light
  _.uniq(litCellIds).forEach(cellId => {
    const cell = cells[cellId];
    if (cell) {
      const opacity =
        ((getCellDistance(cellToId(player.loc), cellId) - 8) * -1) / 7;
      ctx.fillStyle = `rgb(255,255,255,${opacity})`;
      ctx.fillRect(
        cell.col * CELL_WIDTH,
        cell.row * CELL_HEIGHT,
        CELL_WIDTH,
        CELL_HEIGHT
      );

      if (cell.type === "wall") {
        ctx.fillStyle = `rgb(67, 82, 68, ${opacity})`;
        ctx.fillRect(
          cell.col * CELL_WIDTH,
          cell.row * CELL_HEIGHT,
          CELL_WIDTH,
          CELL_HEIGHT
        );
      }
    }
  });
};

// cellIds ['id', ...]
// cells { id: {col: 0, row: 0} }
// player { loc: {col: 0, row: 0} }
// debug boolean
export const drawMap = (ctx, player, debug = false) => {
  const { cellIds, cells } = getCurrentMap();

  cellIds.forEach(cellId => {
    const cell = cells[cellId];

    if (cell.type === "floor") ctx.fillStyle = `rgb(10,10,10)`;
    else if (cell.type === "wall") ctx.fillStyle = `rgb(15,15,15)`;
    else ctx.fillStyle = `rgb(12,12,12)`;
    ctx.fillRect(
      cell.col * CELL_WIDTH,
      cell.row * CELL_HEIGHT,
      CELL_WIDTH,
      CELL_HEIGHT
    );

    // testing
    // if (cell.type === "floor") {
    //   ctx.fillStyle = `rgb(255,255,255, 1)`;
    //   ctx.font = `${TILE_SIZE}px serif`;
    //   ctx.fillText("☐", cell.col * CELL_WIDTH, cell.row * CELL_HEIGHT);
    // }

    // if (cell.type === "wall") {
    //   ctx.fillStyle = `rgb(255,255,255, 1)`;
    //   ctx.font = `${TILE_SIZE}px serif`;
    //   ctx.fillText("#", cell.col * CELL_WIDTH, cell.row * CELL_HEIGHT);
    // }

    if (debug) {
      ctx.fillStyle = `rgb(200,0,0, 1)`;
      ctx.font = "8px serif";
      ctx.fillText(cellId, cell.col * CELL_WIDTH, cell.row * CELL_HEIGHT);
    }
  });
};

export const drawDijkstraMap = (ctx, goals, weights) => {
  const { cells } = getCurrentMap();
  const dMap = dijkstra(goals, cells, weights);
  Object.keys(dMap).forEach(id => {
    const c = idToCell(id);
    ctx.fillStyle = `rgb(200,0,0, 1)`;
    ctx.font = "12px serif";
    ctx.fillText(dMap[id], c.col * CELL_WIDTH, c.row * CELL_HEIGHT);
  });
};

export const drunkardsWalk = (randomStart = false) => {
  const { cells, cellIds } = getCurrentMap();
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

export const drunkardsWalk2 = (randomStart = false) => {
  const { cells, cellIds } = getCurrentMap();

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

export const isWall = (CELLS, cellId) => {
  const point = idToPoint(cellId);
  const neighbors = [
    `${point.x},${point.y - 1}`, // N
    `${point.x + 1},${point.y}`, // E
    `${point.x},${point.y + 1}`, // S
    `${point.x - 1},${point.y}` // W
  ];

  const floors = [];
  neighbors.forEach(id => {
    const cell = CELLS[id];
    if (cell && cell.type === "floor") {
      floors.push(id);
    }
  });

  if (floors.length > 0) {
    return true;
  }

  return false;
};

export const categorizeCells = () => {
  const { cells, cellIds } = getCurrentMap();

  const FLOOR_CELL_IDS = [];
  const WALL_CELL_IDS = [];
  const ROCK_CELL_IDS = [];

  // mark floors
  cellIds.forEach(id => {
    const cell = cells[id];
    if (cell.open) {
      cell.type = "floor";
      FLOOR_CELL_IDS.push(id);
      return;
    }
  });

  cellIds.forEach(id => {
    const cell = cells[id];
    if (!cell.type && isWall(cells, id)) {
      cell.type = "wall";
      WALL_CELL_IDS.push(id);
      return;
    }
  });
};

const dijkstra = (goals, cells, weights = []) => {
  const frontier = goals.map(cellToId);
  const distance = frontier.reduce((acc, val, idx) => {
    acc[val] = weights[idx] || 0;
    return acc;
  }, {});

  while (frontier.length) {
    const current = frontier.shift();
    const neighbors = [
      cellToId(getNeighbor(idToCell(current), "N")),
      cellToId(getNeighbor(idToCell(current), "E")),
      cellToId(getNeighbor(idToCell(current), "S")),
      cellToId(getNeighbor(idToCell(current), "W"))
    ];
    neighbors.forEach(neighborId => {
      if (!distance[neighborId]) {
        if (cells[neighborId] && cells[neighborId].type === "floor") {
          distance[neighborId] = distance[current] + 1;
          frontier.push(neighborId);
        }
      }
    });
  }

  // normalize goals to their weights or 0
  goals.forEach((goal, idx) => {
    const id = cellToId(goal);
    distance[id] = weights[idx] || 0;
  });

  return distance;
};
