import Router from 'koa-router';
import { blockchain } from '../services/blockchain';

const router = new Router();

router.get('/', async (ctx, next) => {
  ctx.body = {
    whatis: 'love',
    babydont: 'hurtme'
  };
  await next();
});

router.get('/name/:name', async (ctx, next) => {
  await blockchain.setSystemName(ctx.params.name).send();
});

router.get('/ballot', async (ctx, next) => {
  await next();
  const res = await blockchain.ballots(0).call();
  console.log(res);
  ctx.body = res;
})

export const indexRoutes = router;
