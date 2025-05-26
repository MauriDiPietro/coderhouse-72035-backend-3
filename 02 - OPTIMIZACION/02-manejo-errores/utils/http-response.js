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

class HttpResponse {
  Ok(res, data) {
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      data,
    });
  }

  NotFound(res, error) {
    return res.status(HttpStatus.NOT_FOUND).json({
      status: HttpStatus.NOT_FOUND,
      error: error.message || "Not Found",
    });
  }

  Unauthorized(res, error) {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      status: HttpStatus.UNAUTHORIZED,
      error: error.message || "Unauthorized",
    });
  }

  Forbidden(res, error) {
    return res.status(HttpStatus.FORBIDDEN).json({
      status: HttpStatus.FORBIDDEN,
      error: error.message || "Forbidden",
    });
  }

  ServerError(res, error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      error: error.message || "Internal Server Error",
    });
  }
}

export const httpResponse = new HttpResponse();
