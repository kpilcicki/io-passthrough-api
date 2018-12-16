import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
require('dotenv').config();

import { authRoutes, indexRoutes } from './routes';
import { to } from './utils';
import { blockchain } from './services/blockchain';


const app = new Koa();

app.use(bodyParser());
app.use(async (ctx, next) => {
  await next();
});

const obj = { "method" : "guru.test", "params" : [ "Guru" ], "id" : 123 };

app.use(indexRoutes.routes());
app.use(authRoutes.routes());

// app.use(async ctx => {
//   // const res = await fetch('https://gurujsonrpc.appspot.com/guru', {"credentials":"omit","headers":{"accept":"/","accept-language":"pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7","content-type":"application/x-www-form-urlencoded"},"referrer":"https://gurujsonrpc.appspot.com/","referrerPolicy":"no-referrer-when-downgrade","body":"{ \"method\" : \"guru.test\", \"params\" : [ \"Guru\" ], \"id\" : 123 }","method":"POST","mode":"cors"});
//   // const json = await res.text();
//   console.log('where');
//   const [error, res] = await client.connect();
//   if(error) throw new Error('conn error');
//   console.log('whhe');
//   console.log(error);
//   // const [err, response] = to(await client.send('guru.test', ['Guru']));
//   // console.log(response);
//   // console.log(err);
// });`

app.listen(3010);