import Koa from 'koa';
import fetch from 'node-fetch';
import jsonRpc from 'json-rpc-client';

require('dotenv').config();

const app = new Koa();

const client = new jsonRpc({
  host: 'gurujsonrpc.appspot.com',
  path: '/guru',
  port: 443,
});

app.use(async (ctx, next) => {
  ctx.body = 'Hej clowieku';
  await next();
});

const obj = { "method" : "guru.test", "params" : [ "Guru" ], "id" : 123 };

app.use(async ctx => {
  // const res = await fetch('https://gurujsonrpc.appspot.com/guru', {"credentials":"omit","headers":{"accept":"/","accept-language":"pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7","content-type":"application/x-www-form-urlencoded"},"referrer":"https://gurujsonrpc.appspot.com/","referrerPolicy":"no-referrer-when-downgrade","body":"{ \"method\" : \"guru.test\", \"params\" : [ \"Guru\" ], \"id\" : 123 }","method":"POST","mode":"cors"});
  // const json = await res.text();
  console.log('here');
  await client.connect();
  console.log('there');
  const response = await client.send('guru.test', ['Guru']);
  console.log(response);
});

app.listen(3010);