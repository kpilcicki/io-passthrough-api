import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-pino-logger';
import errorHandler from './middlewares/errorHandler';

import { authRoutes, votingRoutes } from './routes';

const app = new Koa();

app.use(errorHandler);
app.use(bodyParser());
app.use(logger())

app.use(votingRoutes.routes());
app.use(authRoutes.routes());

app.listen(3010);