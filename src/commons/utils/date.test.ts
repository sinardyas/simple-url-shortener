import { getSecondsRemainingFromNow, parseTime } from "./date";

describe("date utils function", () => {
  test("parseTime", () => {
    const temp = parseTime("14:15:55");
    expect(temp).toBeDefined();
  });

  test("parseTime", () => {
    const temp = parseTime("15:55");
    expect(temp).toBeDefined();
  });

  test("parseTime", () => {
    const temp = parseTime("55");
    expect(temp).toBeDefined();
  });

  test("getSecondsRemainingFromNow", () => {
    expect(getSecondsRemainingFromNow()).toBeGreaterThan(0);
  });

  test("getSecondsRemainingFromNow", () => {
    expect(getSecondsRemainingFromNow()).not.toBeNull();
  });

  test("getSecondsRemainingFromNow", () => {
    expect(getSecondsRemainingFromNow()).not.toBeNaN();
  });

  test("getSecondsRemainingFromNow", () => {
    const res = getSecondsRemainingFromNow();
    expect(typeof res).toBe("number");
  });
});
