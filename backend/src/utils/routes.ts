import { Server } from "@hapi/hapi";
import UserController from "../controllers/user.controller";

const routes = (server: Server) => {
  // POST /subscribe
  server.route({
    method: "POST",
    path: "/api/v1/user/subscribe",
    options: { auth: false },
    handler: UserController.subscribe,
  });

  // POST /login
  server.route({
    method: "POST",
    path: "/api/v1/user/login",
    options: { auth: false },
    handler: UserController.login,
  });

  // GET /funds
  server.route({
    method: "GET",
    path: "/api/v1/user/{email}/funds",
    options: { auth: "jwt" },
    handler: UserController.getFunds,
  });

  // PUT /funds
  server.route({
    method: "PUT",
    path: "/api/v1/user/{email}/funds",
    options: { auth: "jwt" },
    handler: UserController.addFunds,
  });

  // DELETE /funds
  server.route({
    method: "DELETE",
    path: "/api/v1/user/{email}/funds",
    options: { auth: "jwt" },
    handler: UserController.removeFunds,
  });

  // 404
  server.route({
    method: "*",
    path: "/{any*}",
    options: { auth: false },
    handler: (req, h) => h.response("Not Found!").code(404),
  });
};

export default routes;
