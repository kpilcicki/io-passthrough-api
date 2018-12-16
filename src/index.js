import Koa from 'koa';
import bodyParser from 'koa-bodyparser'

require('dotenv').config();

import { authRoutes, indexRoutes } from './routes';

const app = new Koa();
app.use(bodyParser());

app.use(indexRoutes.routes());
app.use(authRoutes.routes());

app.listen(3010);