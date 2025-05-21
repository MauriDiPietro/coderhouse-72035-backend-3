import { UserModel } from "../models/user-model.js";
import { generateUser } from "../utils/index.js";

export const createUsersMock = async (cant = 50) => {
  try {
    const users = [];
    for (let i = 0; i = cant; i++) {
      const user = generateUser();
      users.push(user);
    }
    return await UserModel.insertMany(users);
  } catch (error) {
    throw new Error(error);
  }
};

export const getAll = async () => {
  try {
    return await UserModel.find();
  } catch (error) {
    throw new Error(error);
  }
};
