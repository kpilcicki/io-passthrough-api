import Router from 'koa-router';
import map from 'lodash/map';
import { blockchain, web3 } from '../services/blockchain';
import ApiError from '../errors/ApiError';
import { to, STATUS_CODES } from '../utils';

const router = new Router();

router.get('/ballotResult/:ballotId', async ctx => {
  const ballotId = ctx.params.ballotId;

  const [err, Bresponse] = await to(blockchain.ballots(ballotId).call());
  if (err) throw new ApiError(STATUS_CODES.BAD_REQUEST, 'There is no such ballot');

  if (Bresponse.isActive) throw new ApiError(STATUS_CODES.BAD_REQUEST, 'The ballot has not yet ended');

  const [cerr, response] = await to(blockchain.getCandidatsForBallot(ballotId).call());
  if(cerr) throw new ApiError(STATUS_CODES.INTERNAL_SERVER_ERROR, 'Something went wrong');
 
  const { names, voteCounts } = response;

  const allCandidates = map(names, (name, idx) => ({
    name: web3.utils.hexToUtf8(name),
    voteCount: voteCounts[idx],
    id: idx,
  }));

  ctx.body = allCandidates;
  ctx.status = STATUS_CODES.OK;
});

router.get('/ballot/:id', async ctx => {
  const ballotId = ctx.params.id;

  const [err, response] = await to(blockchain.getCandidatsForBallot(ballotId).call());
  if(err) throw new ApiError(STATUS_CODES.BAD_REQUEST, 'There is no such ballot');

  const { names } = response;

  const allCandidates = map(names, (name, idx) => ({
      id: idx,
      name: web3.utils.hexToUtf8(name),
  }));

  ctx.body = allCandidates;
});

router.get('/ballot', async ctx => {
  const [err, response] = await to(blockchain.getBallots().call());
  if(err) throw new ApiError(STATUS_CODES.INTERNAL_SERVER_ERROR, 'Error retrieving ballots from blockchain');

  const { states, candidatesSizes, names } = response;
  const allBallots = map(states, (state, idx) => ({
      id: idx,
      name:  web3.utils.hexToUtf8(names[idx]),
      candidatesSize: candidatesSizes[idx],
      state
  }));
  ctx.body = allBallots;
});

export const publicRoutes = router;
