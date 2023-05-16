//Cindy Yang Section 86 05/15/2023
const SHA256 = require('crypto-js/sha256');

class Block{
    //Creates an object in the Block class. You will need the index (which block is it), timestamp (when the block is created), the data included in the block, and the hash of the previous block. The hash for this block is autogenerated with the creation of the block.
    constructor( index, timestamp, data, previousHash="" ){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    //This functions calculates the hash of the current Block.
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }

}

class Blockchain{
    //This creates a Blockchain with an array as an attribute
    constructor(){
        this.chain= [this.createGenesisBlock()];
    }

    //This creates the base block or the first block in the blockchain
    createGenesisBlock(){
        return new Block(0, "03/01/2009", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    //This adds a block into the blockchain using the data given. The index will be the # of the block created, date will be the date created, data will be a string inputed by user, and previous has will be the hash of the block before it.
    // addBlock( data ){
    //     try {
    //         let toAdd = new Block(this.chain.length, String(new Date().toLocaleString().split(",")[0]) , String(data), String(this.chain[this.chain.length-1].hash));
    //         this.chain.push(toAdd);
    //         return toAdd;
    //     }
    //     catch(err){
    //         return ("Unsuccessful");
    //     }
    // }
    isChainValid(){
        for(let i = 1; i<this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const prevBlock= this.chain[i-1]; 
            if(currentBlock.hash != currentBlock.calculateHash()){return false;}
            if(prevBlock.hash != currentBlock.previousHash){return false;}
        }
        return true;
    }

}

let btCoin = new Blockchain();
btCoin.addBlock(new Block(1, "1/2/2022",{name:"TM", amount: 4}));
btCoin.addBlock(new Block(2, "2/2/2022", {name:"TMI", amount: 4}));
btCoin.addBlock(new Block(3, "2/16/2022", {name:"TMI", amount: 16}));
btCoin.addBlock(new Block(4, "5/2/2022", {name:"TMI", amount: 20}));
console.log(JSON.stringify(btCoin, null, 4));
console.log("Is the chain valid? " + btCoin.isChainValid());
btCoin.chain[1].data = {amount: 100};
console.log("Is the chain valid? " + btCoin.isChainValid());
btCoin.chain[1].hash = btCoin.chain[1].calculateHash();
console.log("Is the chain valid? " + btCoin.isChainValid());


//This creates a new Blockchain object
// let chain = new Blockchain();
// //This adds a block in the blockchain with the data being "Hello"
// chain.addBlock("Hello");
// console.log(JSON.stringify(chain, null, 4));