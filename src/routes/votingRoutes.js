import Router from 'koa-router';
import { blockchain, web3 } from '../services/blockchain';
import requestValidation from '../middlewares/requestValidation';
import {voteSchema} from '../requestSchemas';
import ApiError from '../errors/ApiError';
import STATUS_CODES from '../utils/statusCode';
import map from 'lodash/map';

import { to } from '../utils';
import jwt from '../middlewares/jwt';

const router = new Router();
router.use(jwt);

router.get('/ballot/:id', async ctx => {
  const ballotId = ctx.params.id;

  const [err, response] = await to(blockchain.getCandidateNamesForBallot(ballotId).call());
  if(err) {
    throw new ApiError(STATUS_CODES.BAD_REQUEST, 'There is no such ballot');
  }
  const candidates = map(response, web3.utils.hexToUtf8)

  ctx.body = candidates;
});

router.get('/ballots', async ctx => {
  const response = await blockchain.ballots().call();

  ctx.body = response;
});

router.post('/vote', requestValidation(voteSchema), async ctx => {
  const { ballotId, candidateId } =  ctx.request.body;
  const voterId = ctx.state.jwtpayload.userId;

  var [err, ballot] = await to(blockchain.ballots(ballotId).call());
  if(err) {
    throw new ApiError(STATUS_CODES.BAD_REQUEST, 'There is no corresponding ballot');
  }
  
  if (candidateId >= ballot.candidatesSize) throw new ApiError(STATUS_CODES.BAD_REQUEST, 'There is no such candidate for this ballot');


  var [err, response] = await to(blockchain.vote(ballotId, voterId, candidateId).send());
  if(err) {
    //TODO waiting for blockchain returned status codes
    const error = new ApiError(STATUS_CODES.BAD_REQUEST, 'Voter is invalid');
    error.rawError = err;
    throw error;
  }

  ctx.status = 201;    
});

export const votingRoutes = router;
