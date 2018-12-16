import Router from 'koa-router';
import User from '../db/models/user';
import jwt from 'jsonwebtoken';
import validateRequest from '../middlewares/requestValidation'
import {loginSchema} from "../requestSchemas";
import bcrypt from "bcryptjs";
import env from '../config';

const router = new Router();

router.post('/login', validateRequest(loginSchema), async ctx => {
    const {login, password} = ctx.request.body;
    const user = await User.findOne({where: {login}});

    if(user && await bcrypt.compare(password, user.hashPassword)) {
        ctx.status = 200;
        ctx.body = {
            token: jwt.sign(
                {userId: user.id},
                env.JWT_SECRET,
                { expiresIn: '30m'} )
        };
    } else {
        throw new Error('Authentication failed. Bad login or password');
    }
});

export const authRoutes = router;
