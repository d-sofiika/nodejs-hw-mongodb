import createHttpError from "http-errors";
import { UsersCollection } from "../db/models/user"
import bcrypt from 'bcrypt';

export const registerUser = async (payload) => {
    const maybeUser = await UsersCollection.findOne({ email: payload.email });
 if (maybeUser !== null) {
    throw createHttpError(409, 'Email in use');
  }

  payload.password = await bcrypt.hash(payload.password, 10);

    return await UsersCollection.create(payload);
}