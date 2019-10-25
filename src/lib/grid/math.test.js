import * as gridMath from "./math";

//   00, 10,  20
//   01, 11,  21
//   02, 12,  22
const SQUARES = {
  "0,0": { col: 0, row: 0 },
  "0,1": { col: 0, row: 1 },
  "0,2": { col: 0, row: 2 },
  "1,0": { col: 1, row: 0 },
  "1,1": { col: 1, row: 1 },
  "1,2": { col: 1, row: 2 },
  "2,0": { col: 2, row: 0 },
  "2,1": { col: 2, row: 1 },
  "2,2": { col: 2, row: 2 }
};

describe("squareGridMath", () => {
  it("should exist", () => {
    expect(gridMath).toBeDefined();
  });
});

describe("topLeft", () => {
  it("should work diagonally", () => {
    //  00,  10, [20]
    //  01,  11,  21
    // [02], 12,  22
    expect(gridMath.topLeft({ col: 2, row: 0 }, { col: 0, row: 2 })).toEqual({
      col: 0,
      row: 0
    });

    //  [00], 10,  20
    //   01,  11,  21
    //   02,  12, [22]
    expect(gridMath.topLeft({ col: 2, row: 2 }, { col: 0, row: 0 })).toEqual({
      col: 0,
      row: 0
    });
  });

  it("should work horizontally", () => {
    //   00,  10,  20
    //   01,  11,  21
    //  [02], 12, [22]
    expect(gridMath.topLeft({ col: 0, row: 2 }, { col: 2, row: 2 })).toEqual({
      col: 0,
      row: 2
    });
    expect(gridMath.topLeft({ col: 2, row: 2 }, { col: 0, row: 2 })).toEqual({
      col: 0,
      row: 2
    });
  });

  it("should work vertically", () => {
    //   [00], 10,  20
    //    01,  11,  21
    //   [02], 12,  22
    expect(gridMath.topLeft({ col: 0, row: 0 }, { col: 0, row: 2 })).toEqual({
      col: 0,
      row: 0
    });
    expect(gridMath.topLeft({ col: 0, row: 2 }, { col: 0, row: 0 })).toEqual({
      col: 0,
      row: 0
    });
  });
});

describe("bottomRight", () => {
  it("should work diagonally", () => {
    //  00,  10, [20]
    //  01,  11,  21
    // [02], 12,  22
    expect(
      gridMath.bottomRight({ col: 2, row: 0 }, { col: 0, row: 2 })
    ).toEqual({ col: 2, row: 2 });

    //  [00], 10,  20
    //   01,  11,  21
    //   02,  12, [22]
    expect(
      gridMath.bottomRight({ col: 2, row: 2 }, { col: 0, row: 0 })
    ).toEqual({ col: 2, row: 2 });
  });

  it("should work horizontally", () => {
    //   00,  10,  20
    //   01,  11,  21
    //  [02], 12, [22]
    expect(
      gridMath.bottomRight({ col: 0, row: 2 }, { col: 2, row: 2 })
    ).toEqual({ col: 2, row: 2 });
    expect(
      gridMath.bottomRight({ col: 2, row: 2 }, { col: 0, row: 2 })
    ).toEqual({ col: 2, row: 2 });
  });

  it("should work vertically", () => {
    //   [00], 10,  20
    //    01,  11,  21
    //   [02], 12,  22
    expect(
      gridMath.bottomRight({ col: 0, row: 0 }, { col: 0, row: 2 })
    ).toEqual({ col: 0, row: 2 });
    expect(
      gridMath.bottomRight({ col: 0, row: 2 }, { col: 0, row: 0 })
    ).toEqual({ col: 0, row: 2 });
  });
});

describe("squareToId", () => {
  it("should work", () => {
    expect(gridMath.squareToId({ col: 3, row: 2 })).toBe("3,2");
  });
});

describe("idToSquare", () => {
  it("should work", () => {
    expect(gridMath.idToSquare("3,2")).toEqual({ col: 3, row: 2 });
  });
});

describe("getRow", () => {
  it("should work", () => {
    expect(gridMath.getRow({ col: 0, row: 0 }, { col: 2, row: 2 })).toEqual({
      "0,0": { col: 0, row: 0 },
      "1,0": { col: 1, row: 0 },
      "2,0": { col: 2, row: 0 }
    });
  });
});

describe("getColumn", () => {
  it("should work", () => {
    expect(gridMath.getColumn({ col: 0, row: 0 }, { col: 2, row: 2 })).toEqual({
      "0,0": { col: 0, row: 0 },
      "0,1": { col: 0, row: 1 },
      "0,2": { col: 0, row: 2 }
    });
  });
});

describe("getAllSquares", () => {
  it("should work", () => {
    expect(
      gridMath.getAllSquares({ col: 2, row: 0 }, { col: 0, row: 2 })
    ).toEqual(SQUARES);
  });
});

describe("getMaxColumn", () => {
  it("should work", () => {
    expect(gridMath.getMaxColumn(SQUARES)).toEqual(2);
  });
});

describe("getMinColumn", () => {
  it("should work", () => {
    expect(gridMath.getMinColumn(SQUARES)).toEqual(0);
  });
});

describe("getMaxRow", () => {
  it("should work", () => {
    expect(gridMath.getMaxRow(SQUARES)).toEqual(2);
  });
});

describe("getMinRow", () => {
  it("should work", () => {
    expect(gridMath.getMinRow(SQUARES)).toEqual(0);
  });
});

describe("getRowsInCollection", () => {
  it("should work", () => {
    expect(
      gridMath.getRowsInCollection({
        "0,1": { col: 0, row: 1 },
        "0,0": { col: 0, row: 0 },
        "1,1": { col: 1, row: 1 },
        "2,1": { col: 2, row: 1 }
      })
    ).toEqual([0, 1]);
  });
});

describe("getColumnsInCollection", () => {
  it("should work", () => {
    expect(
      gridMath.getColumnsInCollection({
        "0,1": { col: 0, row: 1 },
        "0,0": { col: 0, row: 3 },
        "1,1": { col: 1, row: 3 },
        "2,1": { col: 2, row: 1 }
      })
    ).toEqual([0, 1, 2]);
  });
});

//   00, 10,  20
//   01, 11,  21
//   02, 12,  22
describe("getBoundingCorners", () => {
  it("should work", () => {
    expect(gridMath.getBoundingCorners(SQUARES)).toEqual({
      topLeft: "0,0",
      topRight: "2,0",
      bottomRight: "2,2",
      bottomLeft: "0,2"
    });
  });
});

describe("getUnselectedSquaresInBoundingBox", () => {
  it("should work", () => {
    expect(
      gridMath.getUnselectedSquaresInBoundingBox({
        "0,0": { col: 0, row: 0 },
        // '0,1': { col: 0, row: 1 }, // this one is unselected
        "0,2": { col: 0, row: 2 },
        "1,0": { col: 1, row: 0 },
        "1,1": { col: 1, row: 1 },
        "1,2": { col: 1, row: 2 },
        "2,0": { col: 2, row: 0 },
        "2,1": { col: 2, row: 1 },
        "2,2": { col: 2, row: 2 }
      })
    ).toEqual({
      all: ["0,1"],
      rows: {
        "0": [],
        "1": ["0,1"],
        "2": []
      }
    });
  });
});
