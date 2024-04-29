import { onError } from "./error";

describe("error utils function", () => {
  test("onError", () => {
    expect(onError("asdas")).not.toBeNull();
  });

  test("onError", () => {
    expect(onError(new Error("error example"))).not.toBeNull();
  });
});
