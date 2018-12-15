import Router from 'koa-router';

const router = new Router();

router.get('/login', async ctx => {
  ctx.body = {
    user: 'authencicated',
    account: 'hacked',
  };
});

export const authRoutes = router;
