require('dotenv').config();
// const API_URL = process.env.API_URL;
const { API_URL, PRIVATE_KEY, PUBLIC_KEY } = process.env;
// console.log(API_URL);

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

// parsing out the contract ABI data
const contract = require("../HelloWorld.json");

// printing contract ABI
// console.log(JSsON.stringify(contract.abi));

// [{"inputs":[{"internalType":"string","name":"initMessage","type":"string"}],"stateMutability":"nonpayable",
// "type":"constructor"},{"inputs":[],"name":"message","outputs":[{"internalType":"string","name":"","type":"string"}],
// "stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"newMessage","type":"string"}],
// "name":"update","outputs":[],"stateMutability":"nonpayable","type":"function"}]

// using the web3 contract method to create our contract using the ABI and address
const contractAddress = "0xb8AC676687Ed2dC20Bd13824bAF40a640bb2360a";
const helloWorldContract = new web3.eth.Contract(contract.abi, contractAddress);

async function updateMessage(newMessage) {
    // The account nonce with the number of transactions send from our address
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest');
    const gasEstimate = await helloWorldContract.methods.update(newMessage).estimateGas();

    // creating the tx
    const tx = {
        'from': PUBLIC_KEY,
        'to': contractAddress,
        'nonce': nonce,
        'gas': gasEstimate,
        'data': helloWorldContract.methods.update(newMessage).encodeABI()
    };

    //sign the tx
    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
    signPromise.then((signedTx) => {
        web3.eth.sendSignedTransaction(signedTx.rawTransaction, function (err, hash) {
            if (!err) {
                console.log("The hash of transaction is: ", hash)
            } else {
                console.log("Error with tx", err)
            }
        });
    }).catch((err) => {
        console.log("promise failed:", err);
    });
}


// reading smart contract data from ethereum blockchain
// calling the message function in our smart contract and reading the init message
async function main() {
    const message = await helloWorldContract.methods.message().call();
    console.log("The message is: " + message);
    // The message is: Hello World!
    await updateMessage('Hello newWorld!');
}
main();
