import Hapi, { Server } from "@hapi/hapi";

let server: Server;

const init = async (routes: Function): Promise<Server> => {
  server = Hapi.server({
    host: process.env.HOST || "0.0.0.0",
    port: process.env.PORT || 4000,
  });

  routes(server);

  console.log(`Listening on ${server.settings.host}:${server.settings.port}`);
  await server.start();

  return server;
};

export default { init };
