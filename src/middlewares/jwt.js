import koaJwt from 'koa-jwt';
import env from '../config';

export default koaJwt({secret: env.JWT_SECRET, key: 'jwtpayload'});