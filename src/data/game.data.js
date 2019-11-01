import { COLUMNS, ROWS } from "../constants/game.constants";
import { getAllSquares } from "../lib/grid/math";

const DATA = {
  currentMapId: 1,
  maps: {
    1: {
      cells: {},
      cellIds: []
    }
  },
  player: {
    mapId: "",
    loc: {}
  },
  monsters: {
    1: {
      mapId: "",
      loc: ""
    }
  }
};

export const getCurrentMapId = () => DATA.currentMapId;
export const setCurrentMapId = id => (DATA.currentMapId = id);

export const createMap = id => {
  DATA.maps[id].cells = getAllSquares(
    { col: 0, row: 0, open: false },
    { col: COLUMNS, row: ROWS }
  );
  DATA.maps[id].cellIds = Object.keys(DATA.maps[id].cells);
};
export const getMap = id => DATA.maps[id];
export const getCurrentMap = () => DATA.maps[DATA.currentMapId];

export default DATA;
