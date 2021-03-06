import React, { useEffect, useRef, useState } from "react";
import useEventListener from "@use-it/event-listener";
import { cellToId, getNeighbor } from "./lib/grid/math";
import { observeBoundaries, drawPlayerHalo } from "./lib/canvas";
import _ from "lodash";

import { createMap, getMap } from "./data/game.data";

import "./App.css";

import { MAP_HEIGHT, MAP_WIDTH } from "./constants/game.constants";

import {
  drawMap,
  drawPlayer,
  drawMonsters,
  drawDijkstraMap,
  getInitialCtx,
  drunkardsWalk,
  drunkardsWalk2,
  categorizeCells
} from "./lib/canvas";

const MAP_ID = 1;
createMap(MAP_ID);

drunkardsWalk2();
categorizeCells();

const openCells = _.filter(getMap(MAP_ID).cells, cell => cell.open);

let PLAYER = {
  loc: openCells[0]
};

let MONSTERS = [
  { loc: _.sample(openCells) },
  { loc: _.sample(openCells) },
  { loc: _.sample(openCells) },
  { loc: _.sample(openCells) }
];

let ctx;

const renderGame = settings => {
  ctx.clearRect(0, 0, MAP_WIDTH, MAP_HEIGHT);
  drawMap(ctx, PLAYER);
  drawPlayerHalo(ctx, PLAYER);
  drawMonsters(ctx, MONSTERS);
  drawPlayer(ctx, PLAYER);

  if (settings.dijkstra === "on") {
    drawDijkstraMap(ctx, [PLAYER.loc, ...settings.bGoals], [0, 0, 0, 0, 0, 0]);
  }
};

export default function App() {
  const canvasRef = useRef(null);
  const [settings, setSettings] = useState({
    algorithm: "dw",
    iterations: 30,
    startingLocation: "30,20",
    randomStartingLocation: "on",
    dijkstra: "",
    goals: 1,
    bGoals: []
  });

  useEffect(() => {
    ctx = getInitialCtx(canvasRef);
    renderGame(settings);
  });

  const handleSettingChange = (path, value) => {
    const newSettings = { ...settings };
    newSettings[path] = value;
    setSettings(newSettings);
  };

  const nextTurn = () => {
    renderGame(settings);
  };

  const rebuild = () => {
    createMap(1);
    const { cells } = getMap(MAP_ID);

    const algorithms = {
      dw: drunkardsWalk,
      dw2: drunkardsWalk2
    };

    _.times(settings.iterations, () =>
      algorithms[settings.algorithm](settings.randomStartingLocation === "on")
    );

    categorizeCells();

    PLAYER = {
      loc: _.find(cells, cell => cell.open)
    };

    const floors = _.filter(cells, cell => cell.type === "floor");
    const bGoals = [];

    _.times(settings.goals, () => {
      bGoals.push(_.sample(floors));
    });

    setSettings({
      ...settings,
      bGoals
    });

    renderGame(settings);
  };

  const movePlayer = dir => {
    const { cells } = getMap(MAP_ID);
    const newLoc = getNeighbor(PLAYER.loc, dir);
    const newLocId = cellToId(newLoc);
    if (!observeBoundaries(newLocId)) return;
    if (!cells[newLocId].open) return;

    PLAYER.loc = newLoc;

    nextTurn();
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
      <div className="settings">
        SETTINGS:
        <label htmlFor="Algorithm">Algorithm:</label>
        <select
          name="Algorithm"
          value={settings.algorithm}
          onChange={e => {
            handleSettingChange("algorithm", e.target.value);
          }}
        >
          <option value="dw">Drunkards Walk</option>
          <option value="dw2">Drunkards Walk 2</option>
        </select>
        <label htmlFor="iterations">Iterations:</label>
        <input
          name="iterations"
          type="number"
          min="1"
          max="1000"
          value={settings.iterations}
          onChange={e => {
            handleSettingChange("iterations", e.target.value);
          }}
        />
        <label htmlFor="randomStart">Random Starting Location</label>
        <input
          type="checkbox"
          name="randomStart"
          checked={settings.randomStartingLocation}
          onChange={e => {
            handleSettingChange(
              "randomStartingLocation",
              settings.randomStartingLocation === "on" ? "" : "on"
            );
          }}
        />
        <label htmlFor="randomStart">Dijkstra Map</label>
        <input
          type="checkbox"
          name="dijkstra"
          checked={settings.dijkstra}
          onChange={e => {
            handleSettingChange(
              "dijkstra",
              settings.dijkstra === "on" ? "" : "on"
            );
          }}
        />
        <label htmlFor="goals">Dijkstra Goals:</label>
        <input
          name="goals"
          type="number"
          min="1"
          max="100"
          value={settings.goals}
          onChange={e => {
            handleSettingChange("goals", e.target.value);
          }}
        />
        <button onClick={rebuild}>Rebuild Map</button>
      </div>
      <canvas
        width={MAP_WIDTH}
        height={MAP_HEIGHT}
        className="canvas"
        ref={canvasRef}
      />
    </div>
  );
}
