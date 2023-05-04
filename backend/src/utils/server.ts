import Hapi, { Server } from "@hapi/hapi";

let server: Server;

const init = async (plugins: Function): Promise<Server> => {
  server = Hapi.server({
    host: process.env.HOST || "0.0.0.0",
    port: process.env.PORT || 4000,
    routes: {
      cors: {
        origin: ["*"], // an array of origins or 'ignore'
      },
    },
  });

  await plugins(server);

  console.log(`Listening on ${server.settings.host}:${server.settings.port}`);
  await server.start();

  return server;
};

export default { init };
