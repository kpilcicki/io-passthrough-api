import Router from 'koa-router';
import { blockchain } from '../services/blockchain';
import {STATUS_CODES, to} from '../utils/index';
import env from '../config';

const router = new Router();

router.get('/serverInfo', async ctx => {

    const [err, response] = await to(blockchain.systemName().call());

    ctx.statusCode = STATUS_CODES.OK;
    ctx.body  = {
        environmentVariables: {
            contractAddress: env.CONTRACT_ADDRESS,
            contractName: response == null ? 'unknown' : response,
            selfAddress: env.SELF_ADDRESS,
            blockchainAddress: env.BLOCKCHAIN_ADDRESS
        }
    }
});

export const serverRoutes = router;
