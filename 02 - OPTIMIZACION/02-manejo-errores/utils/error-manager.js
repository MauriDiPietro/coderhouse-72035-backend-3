export class NotFoundError extends Error {
    constructor(message){
        super(message)
        this.name = 'NotFoundError';
    }
}
export class UnauthorizedError extends Error {
    constructor(message){
        super(message)
        this.name = 'UnauthorizedError';
    }
}

export class CustomError extends Error {
    constructor(message, status = 500){
        super(message)
        this.name = 'CustomError';
        this.status = status;
    }
}