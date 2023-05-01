import { Server, ServerInjectResponse } from "@hapi/hapi";

import db from "../src/utils/db";
import auth from "../src/utils/auth";
import routes from "../src/utils/routes";
import server from "../src/utils/server";

describe("Server", () => {
  let s: Server;
  let token: string;

  type TestResponse = {
    result?: {
      token?: string;
      funds?: number;
    };
  };

  beforeAll(async () => {
    await db.init("./test.db.json");
    s = await server.init(async (server: Server) => {
      await auth.init(server);
      routes(server);
    });
  });

  afterAll(async () => {
    await s.stop();
    await db.teardown();
  });

  test("GET /", async () => {
    const res = await s.inject({
      method: "GET",
      url: "/",
    });
    expect(res.statusCode).toEqual(404);
  });

  test("POST /subscribe", async () => {
    const res: TestResponse = await s.inject({
      method: "POST",
      url: "/api/v1/user/subscribe",
      payload: {
        email: "email@example.com",
        password: "password",
        funds: 100,
      },
    });
    expect(res.result).toHaveProperty("user");
  });

  test("POST /login", async () => {
    const res: TestResponse = await s.inject({
      method: "POST",
      url: "/api/v1/user/login",
      payload: {
        email: "email@example.com",
        password: "password",
      },
    });
    expect(res.result).toHaveProperty("token");
    expect(res.result).toHaveProperty("user");
    token = res.result?.token || "";
  });

  test("GET /funds", async () => {
    const res: TestResponse = await s.inject({
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
      url: "/api/v1/user/email@example.com/funds",
    });
    expect(res.result).toHaveProperty("funds");
    expect(res.result?.funds).toEqual(100);
  });

  test("PUT /funds", async () => {
    const res: TestResponse = await s.inject({
      method: "PUT",
      url: "/api/v1/user/email@example.com/funds",
      headers: {
        authorization: `Bearer ${token}`,
      },
      payload: {
        funds: 50,
      },
    });
    expect(res.result).toHaveProperty("funds");
    expect(res.result?.funds).toEqual(150);
  });

  test("DELETE /funds", async () => {
    const res: TestResponse = await s.inject({
      method: "DELETE",
      url: "/api/v1/user/email@example.com/funds",
      headers: {
        authorization: `Bearer ${token}`,
      },
      payload: {
        funds: 10,
      },
    });
    expect(res.result).toHaveProperty("funds");
    expect(res.result?.funds).toEqual(140);
  });
});
