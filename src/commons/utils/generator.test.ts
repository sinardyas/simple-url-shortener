import { generateRandomId } from "./generator";

describe("id generator function", () => {
  test("generate Id", () => {
    const id = generateRandomId();
    expect(id).toBeDefined();
  });

  test("generate Id", () => {
    const id = generateRandomId();
    expect(id).not.toBeNull();
  });

  test("generate Id", () => {
    const id = generateRandomId();
    expect(typeof id).toBe("string");
  });
});
