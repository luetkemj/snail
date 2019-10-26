import React, { useEffect, useRef, useState } from "react";
import { getAllSquares, getCellDistance } from "./lib/grid/math";
import { random } from "lodash";

import "./App.css";

const TILE_SIZE = 10;
const CELL_WIDTH = TILE_SIZE;
const CELL_HEIGHT = TILE_SIZE;
const COLUMNS = 60;
const ROWS = 40;
const MAP_HEIGHT = CELL_HEIGHT * ROWS;
const MAP_WIDTH = CELL_WIDTH * COLUMNS;
const CELLS = getAllSquares({ col: 0, row: 0 }, { col: COLUMNS, row: ROWS });
const CELL_IDS = Object.keys(CELLS);

export default function App() {
  useEffect(() => {
    draw();
  });
  const canvasRef = useRef(null);

  const draw = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, MAP_WIDTH, MAP_HEIGHT);

    CELL_IDS.forEach(cellId => {
      const cell = CELLS[cellId];
      ctx.fillStyle = `rgb(200,0,0,${cell.opacity})`;
      ctx.fillRect(
        cell.col * CELL_WIDTH,
        cell.row * CELL_HEIGHT,
        CELL_WIDTH,
        CELL_HEIGHT
      );
    });
  };

  const [darkness, setDarkness] = useState(5);

  const getOpacity = (cellId, darkness) => {
    const opacity = ((getCellDistance("1,1", cellId) - darkness) * -1) / 10;
    return opacity <= 0 ? 0 : opacity;
  };

  return (
    <div className="App">
      <input
        type="range"
        min="0"
        max="100"
        value={darkness}
        step="1"
        onChange={e => {
          const darkness = e.target.value;
          CELL_IDS.forEach(cellId => {
            CELLS[cellId].opacity = getOpacity(cellId, darkness);
          });
          draw();
          return setDarkness(darkness);
        }}
      />
      <canvas
        width={MAP_WIDTH}
        height={MAP_HEIGHT}
        className="canvas"
        ref={canvasRef}
        onClick={e => console.log(e.clientX)}
      />
    </div>
  );
}
