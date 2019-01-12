import Joi from 'joi';
import map from 'lodash/map';
import ApiError from '../errors/ApiError'
import { STATUS_CODES } from '../utils/index';

export default function validateRequest(schema) {
    return async (ctx, next) => {
        const result= Joi.validate(ctx.request.body, schema);

        if(result && result.error) {
            const errorsString = map( result.error.details, (error) => error.message).join(', ');
            throw new ApiError(STATUS_CODES.BAD_REQUEST,
                `Request body validation error: ${errorsString}`);
        }
        await next();
    }
}