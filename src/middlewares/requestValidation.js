import Joi from 'joi';

export default function validateRequest(schema) {
    return async (ctx, next) => {
        const result = Joi.validate(ctx.request.body, schema);

        if(result.error) {
            const error = new Error('Validation error');

            error.rawError = result.error;
            throw error;
        }

        await next();
    }
}