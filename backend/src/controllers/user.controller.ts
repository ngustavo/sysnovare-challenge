import UserModel, { User } from "../models/user.model";
import crypto from "crypto";
import auth from "../utils/auth";
import { Request, ResponseToolkit } from "@hapi/hapi";

type UserRequest = Request & {
  payload: Partial<User>;
};

const subscribe = async (req: UserRequest, h: ResponseToolkit) => {
  if (!req.payload?.email) {
    return h.response({ message: "Please provide an email" }).code(400);
  }
  if (await UserModel.find(req.payload.email)) {
    return h.response({ message: "Email already exists" }).code(400);
  }
  const newUser = await UserModel.create(req.payload);
  delete newUser.password;
  return h.response({ token: auth.sign(req.payload.email), user: newUser });
};

const login = async (req: UserRequest, h: ResponseToolkit) => {
  if (!req.payload?.email || !req.payload?.password) {
    return h.response({ message: "Please provide all credentials" }).code(400);
  }
  const user = await UserModel.find(req.payload.email);
  if (!user || user.password !== req.payload.password) {
    return h.response({ message: "Wrong credentials" }).code(400);
  }
  delete user.password;
  return h.response({ token: auth.sign(req.payload.email), user });
};

const getFunds = async (req: UserRequest, h: ResponseToolkit) => {
  if (!req.params?.email) {
    return h.response({ message: "Please provide an email" }).code(400);
  }
  const user = await UserModel.find(req.params.email);
  return h.response({ funds: user.funds });
};

const addFunds = async (req: UserRequest, h: ResponseToolkit) => {
  if (!req.params?.email || !req.payload?.funds) {
    return h
      .response({ message: "Please provide an email and funds to add" })
      .code(400);
  }
  const user = await UserModel.find(req.params.email);
  const newUser = await UserModel.update(req.params.email, {
    funds: user.funds + req.payload.funds,
  });
  return h.response({ funds: newUser.funds });
};

const removeFunds = async (req: UserRequest, h: ResponseToolkit) => {
  if (!req.params?.email || !req.payload?.funds) {
    return h
      .response({ message: "Please provide an email and funds to remove" })
      .code(400);
  }
  const user = await UserModel.find(req.params.email);
  const newUser = await UserModel.update(req.params.email, {
    funds: user.funds - req.payload.funds,
  });
  return h.response({ funds: newUser.funds });
};

export default {
  subscribe,
  login,
  getFunds,
  addFunds,
  removeFunds,
};
