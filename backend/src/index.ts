import db from "./db";
import routes from "./routes";
import server from "./server";

// prepare database
db.init();

// start server with routes
server.init(routes);

// handle uncaught errors
process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});
