import Koa from 'koa';
// const Koa = require('koa');
console.log('d');
const app = new Koa();
app.use(async ctx => {
  ctx.body = 'Hej hujuasd';
  console.log('asdxasd');
});

app.listen(3010);