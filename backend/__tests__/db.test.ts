import db from "../src/utils/db";

describe("Database", () => {
  beforeAll(async () => {
    await db.init("./test.db.json");
  });

  afterAll(async () => {
    await db.teardown();
  });

  test("storage.set", async () => {
    const key = "gustavo";
    const value = { age: 26, city: "Porto" };
    expect(await db.setItem(key, value)).toEqual(true);
  });

  test("storage.get", async () => {
    const key = "gustavo";
    const value = { age: 26, city: "Porto" };
    expect(await db.getItem(key)).toEqual(value);
  });

  test("storage.remove", async () => {
    const key = "gustavo";
    expect(await db.removeItem(key)).toEqual(true);
  });
});
