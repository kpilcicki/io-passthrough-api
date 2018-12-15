import Web3 from 'web3';
import VoteManager from '../contracts/VoteManager.json';

import env from '../config';

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const address = env.CONTRACT_ADDRESS;

const options = {
  from: env.SELF_ADDRESS,
};

const contract = new web3.eth.Contract(VoteManager.abi, address, options);
console.log(contract.methods);

export const blockchain = contract.methods;
