import React, { useEffect, useRef } from "react";
import useEventListener from "@use-it/event-listener";
import { cellToId, getAllSquares, getNeighbor } from "./lib/grid/math";
import { observeBoundaries } from "./lib/canvas";
import _ from "lodash";

import "./App.css";

import {
  COLUMNS,
  ROWS,
  MAP_HEIGHT,
  MAP_WIDTH
} from "./constants/game.constants";

import {
  drawMap,
  drawPlayer,
  getInitialCtx,
  drunkardsWalk,
  drunkardsWalk2
} from "./lib/canvas";

const CELLS = getAllSquares(
  { col: 0, row: 0, open: false },
  { col: COLUMNS, row: ROWS }
);
const CELL_IDS = Object.keys(CELLS);

_.times(30, () => drunkardsWalk(CELL_IDS, CELLS));
// drunkardsWalk2(CELL_IDS, CELLS);

const PLAYER = {
  loc: _.find(CELLS, cell => cell.open)
};

let ctx;

const renderGame = ctx => {
  ctx.clearRect(0, 0, MAP_WIDTH, MAP_HEIGHT);
  drawMap(ctx, CELL_IDS, CELLS, PLAYER);
  drawPlayer(ctx, PLAYER);
};

export default function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    ctx = getInitialCtx(canvasRef);
    renderGame(ctx);
  });

  const movePlayer = dir => {
    const newLoc = getNeighbor(PLAYER.loc, dir);
    const newLocId = cellToId(newLoc);
    if (!observeBoundaries(newLocId)) return;
    if (!CELLS[newLocId].open) return;

    PLAYER.loc = newLoc;

    renderGame(ctx);
  };

  const handleKeyDown = ({ key }) => {
    // key bindings
    const PLAYER_MOVE_N = ["ArrowUp", "8", "w"];
    const PLAYER_MOVE_E = ["ArrowRight", "6", "d"];
    const PLAYER_MOVE_S = ["ArrowDown", "2", "s"];
    const PLAYER_MOVE_W = ["ArrowLeft", "4", "a"];

    if (PLAYER_MOVE_N.includes(String(key))) {
      movePlayer("N");
    }

    if (PLAYER_MOVE_E.includes(String(key))) {
      movePlayer("E");
    }

    if (PLAYER_MOVE_S.includes(String(key))) {
      movePlayer("S");
    }

    if (PLAYER_MOVE_W.includes(String(key))) {
      movePlayer("W");
    }
  };

  useEventListener("keydown", handleKeyDown);

  return (
    <div className="App">
      <canvas
        width={MAP_WIDTH}
        height={MAP_HEIGHT}
        className="canvas"
        ref={canvasRef}
      />
    </div>
  );
}
