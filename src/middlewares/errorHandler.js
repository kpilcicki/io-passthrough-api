import STATUS_CODES from '../utils/statusCode';

export default async (ctx) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR;
        ctx.body = err.message;
    }
}