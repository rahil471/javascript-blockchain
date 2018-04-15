const Block = require('./Block');
class Blockchain {
    constructor(){
        this.chain = [this.createGenesisBlock()]; //initiaize with a genesis block
    }

    createGenesisBlock(){
        return new Block(0, Date.now(), 'Genesis Block', 0);
    }

    /** Add a new block */
    addBlock(newblock){
        newblock.prevHash = this.getLastBlock().hash;
        newblock.hash = newblock.calculateHash();
        this.chain.push(newblock);
    }

    getLastBlock(){
        return this.chain[this.chain.length - 1];
    }

    /** validates the chain */
    isChainValid(){
        for(let i=1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const prevBlock = this.chain[i-1];
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.prevHash !== prevBlock.hash){
                return false;
            }
            
        }
        return true;
    }
}

module.exports = Blockchain;