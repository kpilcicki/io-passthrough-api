import Web3 from 'web3';
import VoteManager from '../contracts/VoteManager.json';
import env from '../config';

export const web3 = new Web3(new Web3.providers.HttpProvider(env.BLOCKCHAIN_ADDRESS));
const address = env.CONTRACT_ADDRESS;

const options = {
  from: env.SELF_ADDRESS,
};

export const contract = new web3.eth.Contract(VoteManager.abi, address, options);
export const blockchain = contract.methods
