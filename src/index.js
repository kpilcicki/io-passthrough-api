import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-pino-logger';
import errorHandler from './middlewares/errorHandler';

import { authRoutes, votingRoutes, publicRoutes } from './routes';

const app = new Koa();

app.use(bodyParser());
app.use(logger({ prettyPrint: true }));
app.use(errorHandler);

app.use(votingRoutes.routes());
app.use(authRoutes.routes());
app.use(publicRoutes.routes());

app.listen(3010);