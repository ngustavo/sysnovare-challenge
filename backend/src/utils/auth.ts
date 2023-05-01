import { Server, Request, ResponseToolkit } from "@hapi/hapi";
import hapiAuthJWT from "hapi-auth-jwt2";
import JWT from "jsonwebtoken";
import UserModel, { User } from "../models/user.model";

const key = "NeverShareYourSecret";

const sign = (email: string) => {
  return JWT.sign({ user: email }, key);
};

const validate = async function (decoded: any) {
  const user = await UserModel.find(decoded.user);
  if (user) return { isValid: true };
  return { isValid: false };
};

const init = async (server: Server) => {
  await server.register(hapiAuthJWT);
  server.auth.strategy("jwt", "jwt", { key, validate });
  server.auth.default("jwt");
};

export default { init, sign };
