export class CustomError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "Not Found";
  }
}

export class UnhauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnhauthorizedError";
  }
}


