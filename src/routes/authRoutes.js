import Router from 'koa-router';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../db/models/user';
import validateRequest from '../middlewares/requestValidation';
import ApiError from '../errors/ApiError';
import env from '../config';
import { loginSchema } from '../requestSchemas';
import { STATUS_CODES } from '../utils/index';

const router = new Router();

router.post('/login', validateRequest(loginSchema), async ctx => {
    const {login, password} = ctx.request.body;
    const user = await User.findOne({where: {login}});

    if(user && await bcrypt.compare(password, user.hashPassword)) {
        ctx.status = STATUS_CODES.OK;
        ctx.body = {
            token: jwt.sign(
                { userId: user.id },
                env.JWT_SECRET,
                { expiresIn: '30m' } )
        };
    } else {
        throw new ApiError(STATUS_CODES.UNAUTHORIZED, 'Authentication failed. Bad login or password');
    }
});

export const authRoutes = router;
