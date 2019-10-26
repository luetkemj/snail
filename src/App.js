import React, { useEffect, useRef, useState } from "react";
import useEventListener from "@use-it/event-listener";
import {
  getAllSquares,
  getCellDistance,
  getNeighbor,
  cellToId
} from "./lib/grid/math";

import "./App.css";

const TILE_SIZE = 20;
const CELL_WIDTH = TILE_SIZE;
const CELL_HEIGHT = TILE_SIZE;
const COLUMNS = 60;
const ROWS = 40;
const MAP_HEIGHT = CELL_HEIGHT * ROWS;
const MAP_WIDTH = CELL_WIDTH * COLUMNS;
const CELLS = getAllSquares({ col: 0, row: 0 }, { col: COLUMNS, row: ROWS });
const CELL_IDS = Object.keys(CELLS);
const PLAYER = {
  loc: { col: 2, row: 2 }
};

export default function App() {
  useEffect(() => {
    draw();
  });
  const canvasRef = useRef(null);

  const draw = () => {
    const ctx = canvasRef.current.getContext("2d");

    ctx.clearRect(0, 0, MAP_WIDTH, MAP_HEIGHT);

    ctx.textBaseline = "top";

    CELL_IDS.forEach(cellId => {
      const cell = CELLS[cellId];

      const opacity =
        ((getCellDistance(cellToId(PLAYER.loc), cellId) - 5) * -1) / 10;

      ctx.fillStyle = `rgb(200,0,0,${opacity})`;
      ctx.fillRect(
        cell.col * CELL_WIDTH,
        cell.row * CELL_HEIGHT,
        CELL_WIDTH,
        CELL_HEIGHT
      );

      ctx.fillStyle = `rgb(255,255,255, .5)`;
      ctx.font = "8px serif";
      ctx.fillText(cellId, cell.col * CELL_WIDTH, cell.row * CELL_HEIGHT);
    });

    ctx.fillStyle = `rgb(255,255,255,1)`;
    ctx.font = `${TILE_SIZE}px serif`;
    ctx.fillText(
      "@",
      PLAYER.loc.col * CELL_WIDTH,
      PLAYER.loc.row * CELL_HEIGHT,
      CELL_WIDTH
    );
  };

  const movePlayer = dir => {
    const newLoc = getNeighbor(PLAYER.loc, dir);
    if (newLoc.col < 0) return;
    if (newLoc.col === COLUMNS) return;
    if (newLoc.row < 0) return;
    if (newLoc.row === ROWS) return;

    PLAYER.loc = newLoc;

    draw();
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
