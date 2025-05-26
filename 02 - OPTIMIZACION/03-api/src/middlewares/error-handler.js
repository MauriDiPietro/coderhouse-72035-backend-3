import { NotFoundError, UnhauthorizedError, ValidationError } from "../utils/custom-error.js";

const HttpStatus = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  CONFLICT: 409,
};

export const errorHandler = (error, req, res, next) => {
  let status = error.status || 500;
  if (error instanceof NotFoundError) statusCode = HttpStatus.NOT_FOUND;
  if (error instanceof ValidationError) statusCode = HttpStatus.CONFLICT;
  if (error instanceof UnhauthorizedError) statusCode = HttpStatus.UNAUTHORIZED;
  res.status(status).json({ message: error.message });
};
