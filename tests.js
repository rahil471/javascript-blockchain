const Blockchain = require('./Blockchain');
const Block = require('./Block');

var chain = new Blockchain();
chain.addBlock(new Block(1, Date.now(), {amount: 10}));
chain.addBlock(new Block(2, Date.now(), {amount: -15}));

//Attacker Trying to manipulate the chain to gain advantage
chain.chain[2].data = { amount: 20};

const valid = chain.isChainValid();
console.log('Is chain Valid?', valid);