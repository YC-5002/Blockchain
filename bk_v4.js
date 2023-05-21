//Cindy Yang Section 86 05/20/2023
const SHA256 = require('crypto-js/sha256');
class Block{
    constructor(index,timestamp, data, previousHash ='')
    {
        this.index=index;
        this.timestamp=timestamp;
        this.data=data;
        this.previousHash = previousHash;
        this.hash = this.calcHash();
        this.nonce=0;   //this is the nonce
    }  // constructor closed but the class is not closed yet
    calcHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)+this.nonce).toString();
    }
    mineBlock(difficulty){
        while(this.hash.substring(0,difficulty)!== Array(difficulty+1).join("0")){
            //inside calculate the hash of this block
            this.hash=this.calcHash();
            this.nonce++; //increment the nonce as long as our hash doesn't start with enough zeros 
        }
        //print the hash of the block we just mined
        console.log("Block mined " + this.hash);
    } // close the function  
}  // close Block class

class Blockchain{
    constructor(){
        this.chain=[this.createGenesisBlock()];
        this.difficulty=4;  // set the difficulty level to 1 for now
        //How do we create the first block?
    }
    createGenesisBlock(){
        return new Block(0,"01/01/2022", "Genesis Block", "0");
    }
    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }
    addBlock(newBlock){
        newBlock.previousHash=this.getLatestBlock().hash;
        //now we need to do a hash update. 
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    } // end of the method
} // end of Blockchain class

chain = new Blockchain();
console.log("Mining Block #1");
chain.addBlock(new Block(1, "05/20/2022", {name:"Bitcoin", amount: 4}));
console.log("Mining Block #2");
chain.addBlock(new Block(2, "05/21/2022", {name:"Bitcoin", amount: 10}));
console.log("Mining Block #3");
chain.addBlock(new Block(3, "05/22/2022", {name:"Bitcoin", amount: 20}));



