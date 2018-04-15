const SHA256 = require("crypto-js/sha256");
class Block {
    constructor(index, timestamp, data, prevHash=''){
        this.index = index;
        this.data = data;
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.timestamp + JSON.stringify(this.data) + this.prevHash).toString();
    }
}

module.exports = Block;