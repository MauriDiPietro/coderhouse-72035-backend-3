import express from 'express';
import { errorHandler } from './middlewares/error-handler.js';
import { CustomError, NotFoundError, UnauthorizedError } from './utils/error-manager.js';
import { httpResponse } from './utils/http-response.js';

const app = express();

app.get('/', (req, res, next) => {
    try {
        // throw new CustomError('This is a custom error', 400);
        httpResponse.Ok(res, { message: 'Hello World' });
    } catch (error) {
        next(error)
    }
})

app.use(errorHandler)

app.listen(8080, ()=>console.log('Server running on port 8080'));