import TP from "..";

describe("mes", () => {
  let result: {};
  beforeAll(() => {
    result = [
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
    ];
  });
  it("case_1 string array", () => {
    expect(new TP().mes(["AAAAAAAAAAA", "BBBBBBBBBB"])).toEqual(result);
  });
  it("case_2 string with NL", () => {
    expect(new TP().mes("AAAAAAAAAAA\nBBBBBBBBBB")).toEqual(result);
  });
  it("case_3 template literal", () => {
    expect(
      new TP().mes(`
    AAAAAAAAAAA
    BBBBBBBBBB`)
    ).toEqual(result);
  });
});
