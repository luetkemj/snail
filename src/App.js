import React, { useState } from "react";
import "./App.css";

import { getAllSquares, getCellDistance } from "./lib/grid/math";
const TILE_SIZE = 25;
const CELL_WIDTH = TILE_SIZE;
const CELL_HEIGHT = TILE_SIZE;
const CELLS = getAllSquares({ col: 0, row: 0 }, { col: 20, row: 20 });
const CELL_IDS = Object.keys(CELLS);

const handleClick = cell => {
  console.log(cell);
};

const getOpacity = (cellId, darkness) => {
  const opacity = ((getCellDistance("1,1", cellId) - darkness) * -1) / 10;
  return opacity <= 0 ? 0 : opacity;
};

const Cell = ({ cell }) => (
  <div
    className="cell"
    style={{
      width: CELL_WIDTH,
      height: CELL_HEIGHT,
      transform: `translate(${cell.col * CELL_WIDTH}px, ${cell.row *
        CELL_HEIGHT}px)`,
      opacity: cell.opacity
    }}
    onClick={e => handleClick(cell, e)}
  />
);

function App() {
  const [darkness, setDarkness] = useState(5);

  return (
    <div className="App">
      <input
        type="range"
        min="0"
        max="20"
        value={darkness}
        step="1"
        onChange={e => {
          const darkness = e.target.value;
          CELL_IDS.forEach(cellId => {
            CELLS[cellId].opacity = getOpacity(cellId, darkness);
          });

          return setDarkness(darkness);
        }}
      />
      <div className="world">
        {CELL_IDS.map(cellId => (
          <Cell key={cellId} cell={CELLS[cellId]} />
        ))}
      </div>
    </div>
  );
}

export default App;
