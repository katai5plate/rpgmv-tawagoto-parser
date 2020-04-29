import TP from "..";

describe("choice", () => {
  it("case_1", () => {
    const t = new TP();
    t.choice("case_1", [
      {
        label: "わん",
        code: (x: any) => [x.mes(["AAAAAAAAAAA", "BBBBBBBBBB"])],
      },
      {
        label: "つー",
        code: (x: any) => [
          x.mes(`
            CCCCCCCCCCC
            DDDDDDDDDDDDD`),
        ],
      },
      {
        label: "すりー",
        code: (x: any) => [x.mes("EEEEEE\nFFFFFFF")],
      },
    ]);
    // console.log(t.getList());
    expect(t.getList()).toEqual([
      {
        code: 102,
        parameters: [["わん", "つー", "すりー"], -1, -1, 2, 0],
        indent: 0,
      },
      {
        code: 402,
        parameters: [0, "わん"],
        indent: 0,
      },
      {
        code: 119,
        parameters: ["case_1_0"],
        indent: 1,
      },
      {
        code: 0,
        parameters: [],
        indent: 1,
      },
      {
        code: 402,
        parameters: [1, "つー"],
        indent: 0,
      },
      {
        code: 119,
        parameters: ["case_1_1"],
        indent: 1,
      },
      {
        code: 0,
        parameters: [],
        indent: 1,
      },
      {
        code: 402,
        parameters: [2, "すりー"],
        indent: 0,
      },
      {
        code: 119,
        parameters: ["case_1_2"],
        indent: 1,
      },
      {
        code: 0,
        parameters: [],
        indent: 1,
      },
      {
        code: 404,
        parameters: [],
        indent: 0,
      },
      // -------------
      {
        code: 118,
        parameters: ["case_1_0"],
        indent: 0,
      },
      {
        code: 101,
        parameters: ["", 0, 0, 2],
        indent: 0,
      },
      {
        code: 401,
        parameters: ["AAAAAAAAAAA"],
        indent: 0,
      },
      {
        code: 401,
        parameters: ["BBBBBBBBBB"],
        indent: 0,
      },
      {
        code: 119,
        parameters: ["case_1_END"],
        indent: 0,
      },
      {
        code: 118,
        parameters: ["case_1_1"],
        indent: 0,
      },
      {
        code: 101,
        parameters: ["", 0, 0, 2],
        indent: 0,
      },
      {
        code: 401,
        parameters: ["CCCCCCCCCCC"],
        indent: 0,
      },
      {
        code: 401,
        parameters: ["DDDDDDDDDDDDD"],
        indent: 0,
      },
      {
        code: 119,
        parameters: ["case_1_END"],
        indent: 0,
      },
      {
        code: 118,
        parameters: ["case_1_2"],
        indent: 0,
      },
      {
        code: 101,
        parameters: ["", 0, 0, 2],
        indent: 0,
      },
      {
        code: 401,
        parameters: ["EEEEEE"],
        indent: 0,
      },
      {
        code: 401,
        parameters: ["FFFFFFF"],
        indent: 0,
      },
      {
        code: 119,
        parameters: ["case_1_END"],
        indent: 0,
      },
      {
        code: 118,
        parameters: ["case_1_END"],
        indent: 0,
      },
      {
        code: 0,
        parameters: [],
        indent: 0,
      },
    ]);
  });
});
