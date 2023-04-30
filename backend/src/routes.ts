import { Server } from "@hapi/hapi";

const routes = (server: Server) => {
  // POST /subscribe
  server.route({
    method: "POST",
    path: "/api/v1/user/subscribe",
    handler: (req, res) => "POST /subscribe",
  });

  // POST /login
  server.route({
    method: "POST",
    path: "/api/v1/user/login",
    handler: (req, res) => "POST /login",
  });

  // GET /funds
  server.route({
    method: "GET",
    path: "/api/v1/user/{id}/funds",
    handler: (req, res) => "GET /funds",
  });

  // PUT /funds
  server.route({
    method: "PUT",
    path: "/api/v1/user/{id}/funds",
    handler: (req, res) => "Hello World!",
  });

  // DELETE /funds
  server.route({
    method: "DELETE",
    path: "/api/v1/user/{id}/funds",
    handler: (req, res) => "Hello World!",
  });

  // 404
  server.route({
    method: "*",
    path: "/{any*}",
    handler: (req, res) => res.response("404 Error! Page Not Found!").code(404),
  });
};

export default routes;
