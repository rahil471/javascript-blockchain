const express = require('express');
const app = express();
const Blockchain = require('./Blockchain');
const Block = require('./Block');
const uuid = require('uuid');
const bodyParser = require('body-parser');
var chains = {};

app.use(bodyParser());

app.get('/chain/init', (req, res)=>{
    const chainId = uuid();
    chains[chainId] = new Blockchain();
    res.send(chainId);
});

app.get('/chain/:chainid/isvalid', (req, res)=>{
    const chainId = req.params.chainid;
    const blockchain = chains[chainId];
    res.send(blockchain.isChainValid());
});

app.get('/chain/:chainid', (req, res)=>{
    const chainId = req.params.chainid;
    const blockchain = chains[chainId];
    res.json(blockchain.chain);
});

app.post('/chain/:chainid/block', (req, res)=>{
    const data = req.body;
    const chainId = req.params.chainid;
    const blockchain = chains[chainId];
    const timestamp = Date.now();
    const index = blockchain.chain.length;
    blockchain.addBlock(new Block(index, timestamp, data));
    return res.json(blockchain.chain);
});

app.listen(3000);