import Router from 'koa-router';
import map from 'lodash/map';
import { blockchain, web3 } from '../services/blockchain';
import requestValidation from '../middlewares/requestValidation';
import { voteSchema } from '../requestSchemas';
import ApiError from '../errors/ApiError';
import { to, STATUS_CODES } from '../utils';
import jwt from '../middlewares/jwt';
import User from '../db/models/user';

const router = new Router();
router.use(jwt);

router.post('/vote', requestValidation(voteSchema), async ctx => {
  const { ballotId, candidateId } =  ctx.request.body;
  const userId = ctx.state.jwtpayload.userId;

  var [err, { login: voterId }] = await to(User.findByPk(userId));
  if(err) throw new ApiError(STATUS_CODES.BAD_REQUEST, "There is no such user");

  var [err, ballot] = await to(blockchain.ballots(ballotId).call());
  if(err) throw new ApiError(STATUS_CODES.BAD_REQUEST, 'There is no corresponding ballot');
  
  if (candidateId >= ballot.candidatesSize) throw new ApiError(STATUS_CODES.BAD_REQUEST, 'There is no such candidate for this ballot');

  var [err, response] = await to(blockchain.vote(ballotId, voterId, candidateId).send());

  if(err) {
    const error = new ApiError(STATUS_CODES.BAD_REQUEST, 'There is no such voter or voter has already voted');
    error.rawError = err;
    throw error;
  }

  ctx.status = 201;    
});

export const votingRoutes = router;
