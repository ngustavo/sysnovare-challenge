import z from "zod";
import db from "../utils/db";

// defines the schema for users
const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
  funds: z.number().int(),
});
const PartialUserSchema = UserSchema.partial();

export type User = z.infer<typeof UserSchema>;

// CRUD for users
const find = async (email: string) => {
  try {
    const user = await db.getItem(email);
    return user;
  } catch (err) {
    return false;
  }
};

const create = async (user: Partial<User>) => {
  try {
    PartialUserSchema.parse(user);
    const { email } = user;
    if (!email) return false;
    await db.setItem(email, user);
    return await db.getItem(email);
  } catch (err) {
    return false;
  }
};

const update = async (email: string, userProps: Partial<User>) => {
  try {
    let user = await db.getItem(email);
    user = { ...user, ...userProps };
    PartialUserSchema.parse(user);
    await db.setItem(email, user);
    return user;
  } catch (err) {
    return false;
  }
};

const remove = async (email: string) => {
  try {
    let user = await db.removeItem(email);
    return true;
  } catch (err) {
    return false;
  }
};

export default { find, create, update, remove };
