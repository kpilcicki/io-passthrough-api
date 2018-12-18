import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-pino-logger';
import errorHandler from './middlewares/errorHandler';

import { AuthManager, VoteManager, PublicRoutesManager, serverRoutes } from './routes';

const app = new Koa();

app.use(bodyParser());
app.use(logger({ prettyPrint: true }));
app.use(errorHandler);
app.use(new VoteManager().routes());
app.use(new AuthManager().routes());
app.use(new PublicRoutesManager().routes());
app.use(serverRoutes.routes());

app.listen(3010);