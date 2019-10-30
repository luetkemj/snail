import { each, keyBy, map, orderBy, uniq } from "lodash";

export const getCellDistance = (cellId1, cellId2) => {
  const cell1 = idToCell(cellId1);
  const cell2 = idToCell(cellId2);
  const x = Math.pow(cell2.col - cell1.col, 2);
  const y = Math.pow(cell2.row - cell1.row, 2);
  return Math.floor(Math.sqrt(x + y));
};

// 00, 10, 20
// 01, 11, 21
// 02, 12, 22
// dir
// NW  N  NE
// W       E
// SW  S  SE
// 01 col, row
// { col: 0, row: 1 }
export const getNeighbor = (s, dir) => {
  switch (dir) {
    case "N":
      return { col: s.col, row: s.row - 1 };
    case "NE":
      return { col: s.col + 1, row: s.row - 1 };
    case "E":
      return { row: s.row, col: s.col + 1 };
    case "SE":
      return { col: s.col + 1, row: s.row + 1 };
    case "S":
      return { col: s.col, row: s.row + 1 };
    case "SW":
      return { col: s.col - 1, row: s.row + 1 };
    case "W":
      return { row: s.row, col: s.col - 1 };
    case "NW":
      return { col: s.col - 1, row: s.row - 1 };

    default:
      return s;
  }
};

// Given any 2 squares on a grid
// return the top left square of their rectangle
// ex: given 20 and 02 will return 00 from the square grid below
// 00, 10, 20
// 01, 11, 21
// 02, 12, 22
export const topLeft = (s1, s2) => {
  return {
    col: Math.min(s1.col, s2.col),
    row: Math.min(s1.row, s2.row)
  };
};

// Given any 2 squares on a grid
// return the bottom right square of their rectangle
// ex: given 20 and 02 will return 22 from the square grid below
// 00, 10, 20
// 01, 11, 21
// 02, 12, 22
export const bottomRight = (s1, s2) => {
  return {
    col: Math.max(s1.col, s2.col),
    row: Math.max(s1.row, s2.row)
  };
};

export const cellToId = cell => `${cell.col},${cell.row}`;
export const pointToId = point => `${point.x},${point.y}`;

export const idToCell = id => {
  const coords = id.split(",");
  return { col: parseInt(coords[0], 10), row: parseInt(coords[1], 10) };
};

export const idToPoint = id => {
  const coords = id.split(",");
  return { x: parseInt(coords[0], 10), y: parseInt(coords[1], 10) };
};

// Given two squares on a grid
// return a horizontal L->R row from the top left sq of their rectangle
export const getRow = (s1, s2) => {
  const tlsq = topLeft(s1, s2);
  const brsq = bottomRight(s1, s2);
  const row = [];

  let col = tlsq.col;

  while (col <= brsq.col) {
    row.push({ col: col, row: tlsq.row });
    col = col + 1;
  }

  return keyBy(row, cellToId);
};

// Given two squares on a grid
// return a vertical T->B column from the top left sq of their rectangle
export const getColumn = (s1, s2) => {
  const tlsq = topLeft(s1, s2);
  const brsq = bottomRight(s1, s2);
  const column = [];

  let row = tlsq.row;

  while (row <= brsq.row) {
    column.push({ col: tlsq.col, row });
    row = row + 1;
  }

  return keyBy(column, cellToId);
};

// given two squares on a grid, returns all squares within their rectangle
// ex: given 10 and 02 will return the bracketed sqaures below
//   [00], [10],  20
//   [01], [11],  21
//   [02], [12],  22
export const getAllSquares = (s1, s2) => {
  const tlsq = topLeft(s1, s2);
  const brsq = bottomRight(s1, s2);

  let squares = {};

  const column = getColumn(tlsq, brsq);

  each(column, s => (squares = { ...squares, ...getRow(s, brsq) }));

  return keyBy(squares, cellToId);
};

export const getAllSquaresFromPoint = (s1, radius) => {
  const topLeft = { col: s1.col - radius, row: s1.row - radius };
  const bottomRight = { col: s1.col + radius, row: s1.row + radius };
  return getAllSquares(topLeft, bottomRight);
};

export const getMaxColumn = squares => {
  return Math.max(...map(squares, s => s.col));
};

export const getMinColumn = squares => {
  return Math.min(...map(squares, s => s.col));
};

export const getMaxRow = squares => {
  return Math.max(...map(squares, s => s.row));
};

export const getMinRow = squares => {
  return Math.min(...map(squares, s => s.row));
};

export const getBoundingCorners = squares => ({
  topLeft: `${getMinColumn(squares)},${getMinRow(squares)}`,
  topRight: `${getMaxColumn(squares)},${getMinRow(squares)}`,
  bottomRight: `${getMaxColumn(squares)},${getMaxRow(squares)}`,
  bottomLeft: `${getMinColumn(squares)},${getMaxRow(squares)}`
});

export const getBoundary = ids => {
  const squares = ids.map(idToCell);
  const corners = getBoundingCorners(squares);
  const boundarySquares = [
    ...Object.keys(
      getRow(idToCell(corners.topLeft), idToCell(corners.topRight))
    ),
    ...Object.keys(
      getRow(idToCell(corners.bottomLeft), idToCell(corners.bottomRight))
    ),
    ...Object.keys(
      getColumn(idToCell(corners.bottomLeft), idToCell(corners.topLeft))
    ),
    ...Object.keys(
      getColumn(idToCell(corners.bottomRight), idToCell(corners.topRight))
    )
  ];
  return uniq(boundarySquares);
};

export const getPoint = (x, y) => ({ x, y });

export const diagonal_distance = (p0, p1) => {
  var dx = p1.x - p0.x,
    dy = p1.y - p0.y;
  return Math.max(Math.abs(dx), Math.abs(dy));
};

export const round_point = p => {
  return getPoint(Math.round(p.x), Math.round(p.y));
};

export const lerp_point = (p0, p1, t) => {
  return getPoint(lerp(p0.x, p1.x, t), lerp(p0.y, p1.y, t));
};

export const lerp = (start, end, t) => {
  return start + t * (end - start);
};

export const line = (p0, p1) => {
  var points = [];
  var N = diagonal_distance(p0, p1);
  for (var step = 0; step <= N; step++) {
    var t = N === 0 ? 0.0 : step / N;
    points.push(round_point(lerp_point(p0, p1, t)));
  }
  return points;
};

export const walkGrid = (p0, p1) => {
  var dx = p1.x - p0.x,
    dy = p1.y - p0.y;
  var nx = Math.abs(dx),
    ny = Math.abs(dy);
  var sign_x = dx > 0 ? 1 : -1,
    sign_y = dy > 0 ? 1 : -1;

  var p = getPoint(p0.x, p0.y);
  var points = [getPoint(p.x, p.y)];
  for (var ix = 0, iy = 0; ix < nx || iy < ny; ) {
    if ((0.5 + ix) / nx < (0.5 + iy) / ny) {
      // next step is horizontal
      p.x += sign_x;
      ix++;
    } else {
      // next step is vertical
      p.y += sign_y;
      iy++;
    }
    points.push(getPoint(p.x, p.y));
  }
  return points;
};
