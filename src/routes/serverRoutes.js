import Router from 'koa-router';
import { STATUS_CODES } from '../utils/index';

import env from '../config';

const router = new Router();

router.get('/serverInfo', async ctx => {
    ctx.statusCode = STATUS_CODES.OK;
    ctx.body  = {
        serverStatus: 'on',
        environmentVariables: {
            contractAddress: env.CONTRACT_ADDRESS,
            selfAddress: env.SELF_ADDRESS
        }
    }
});

export const serverRoutes = router;
