import Joi from 'joi';
import ApiError from '../errors/ApiError'
import { STATUS_CODES } from '../utils/index';

export default function validateRequest(schema) {
    return async (ctx, next) => {
        const result = Joi.validate(ctx.body, schema);

        if(result && result.error) {
            const error = new ApiError(STATUS_CODES.BAD_REQUEST, 'Request body validation error');
            //TODO concat string
            //error.rawError = result.error;
            throw error;
        }

        await next();
    }
}