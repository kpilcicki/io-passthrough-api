import Router from 'koa-router';
import { blockchain, web3 } from '../services/blockchain';
import map from 'lodash/map';

import { to } from '../utils';
import jwt from '../middlewares/jwt';

const router = new Router();
router.use(jwt);

router.get('/test', async(ctx, next) => {
  console.log(ctx.state.jwtpayload.userId);
});

router.get('/', async (ctx, next) => {
  ctx.body = {
    whatis: 'love',
    babydont: 'hurtme'
  };
  await next();
});

router.get('/ballot/:id', async ctx => {
  const ballotId = ctx.params.id;

  const response = await blockchain.getCandidateNamesForBallot(ballotId).call();
  const candidates = map(response, web3.utils.hexToUtf8)

  ctx.body = candidates;
});

router.get('/ballots', async ctx => {
  const response = await blockchain.ballots().call();
  console.log(response);

  ctx.body = response;
});

router.post('/vote', async ctx => {
  const { ballotId, candidateId } =  ctx.request.body;
  const voterId = ctx.state.jwtpayload.userId;

  var [err, ballot] = await to(blockchain.ballots(ballotId).call());
  if(err) {
    console.log('eer');
    throw new Error('There is no corresponding ballot');
  }
  
  if (candidateId >= ballot.candidatesSize) throw new Error('There is no such candidate for this ballot');


  var [err, response] = await to(blockchain.vote(ballotId, voterId, candidateId).send());
  if(err) {
    const error = new Error('There is no such voter');
    error.rawError = err;
    throw error;
  }

  ctx.status = 201;    
});

export const indexRoutes = router;
