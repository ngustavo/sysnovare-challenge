import { Server } from "@hapi/hapi";

import routes from "../src/routes";
import server from "../src/server";

describe("Server", () => {
  let s: Server;

  beforeAll(async () => {
    s = await server.init(routes);
  });

  afterAll(async () => {
    await s.stop();
  });

  test("GET /", async () => {
    const res = await s.inject({
      method: "GET",
      url: "/",
    });
    expect(res.statusCode).toEqual(404);
  });

  test("GET /funds", async () => {
    const res = await s.inject({
      method: "GET",
      url: "/api/v1/user/10/funds",
    });
    expect(res.result).toEqual("GET /funds");
  });
});
