import { STATUS_CODES } from '../utils/index';

export default async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.log.error('Error occurred: ' + err.message);
        ctx.status = err.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR;
        ctx.body = { devMessage: err.message };
    }
}