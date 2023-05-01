import db from "./utils/db";
import auth from "./utils/auth";
import routes from "./utils/routes";
import server from "./utils/server";
import { Server } from "@hapi/hapi";

// prepare database
db.init();

// start server with routes
server.init(async (server: Server) => {
  await auth.init(server);
  routes(server);
});

// handle uncaught errors
process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});
