import { each, keyBy, map, orderBy, uniq } from "lodash";

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
      return { ...s, row: s.row - 1 };
    case "NE":
      return { col: s.col + 1, row: s.row - 1 };
    case "E":
      return { ...s, col: s.col + 1 };
    case "SE":
      return { col: s.col + 1, row: s.row + 1 };
    case "S":
      return { ...s, row: s.row + 1 };
    case "SW":
      return { col: s.col - 1, row: s.row + 1 };
    case "W":
      return { ...s, col: s.col - 1 };
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

export const squareToId = s => `${s.col},${s.row}`;

export const idToSquare = id => {
  const coords = id.split(",");
  return { col: parseInt(coords[0], 10), row: parseInt(coords[1], 10) };
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

  return keyBy(row, squareToId);
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

  return keyBy(column, squareToId);
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

  return keyBy(squares, squareToId);
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

// given a collection of squares on a grid return the rows with at least one square
export const getRowsInCollection = squares => {
  return orderBy(uniq(map(squares, s => s.row)));
};

// given a collection of squares on a grid return the columns with at least one square
export const getColumnsInCollection = squares => {
  return orderBy(uniq(map(squares, s => s.col)));
};

// get boundingCorners from a collection
export const getBoundingCorners = squares => ({
  topLeft: `${getMinColumn(squares)},${getMinRow(squares)}`,
  topRight: `${getMaxColumn(squares)},${getMinRow(squares)}`,
  bottomRight: `${getMaxColumn(squares)},${getMaxRow(squares)}`,
  bottomLeft: `${getMinColumn(squares)},${getMaxRow(squares)}`
});

export const getUnselectedSquaresInBoundingBox = squares => {
  const corners = getBoundingCorners(squares);

  const allSquareIds = map(squares, squareToId);

  const allSquaresInBoundingBox = getAllSquares(
    idToSquare(corners.topLeft),
    idToSquare(corners.bottomRight)
  );

  const rows = getRowsInCollection(allSquaresInBoundingBox);

  const unselected = {
    all: [],
    rows: {}
  };

  each(rows, r => {
    const idsInRow = map(
      getRow(
        { col: idToSquare(corners.topLeft).col, row: r },
        idToSquare(corners.bottomRight)
      ),
      squareToId
    );

    unselected.rows[r] = [];

    each(idsInRow, sId => {
      if (!allSquareIds.includes(sId)) {
        unselected.all.push(sId);
        unselected.rows[r].push(sId);
      }
    });
  });

  return unselected;
};
