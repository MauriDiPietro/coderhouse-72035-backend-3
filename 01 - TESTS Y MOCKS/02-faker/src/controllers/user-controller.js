import * as services from "../repositories/user-repository.js";

export const createUsersMock = async (req, res, next) => {
  const { cant } = req.query;
  try {
    const response = await services.createUsersMock(cant);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const response = await services.getAll();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
