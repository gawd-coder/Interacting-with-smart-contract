Web3.js is a library used to make requests to the Ethereum chain much easier. There are a handful of web3 providers you can choose from, however in this tutorial we’ll be using Alchemy Web3, which is an enhanced web3 library that offers automatic retries and robust WebSocket support.‌
In your project home directory run:

```npm install @alch/alchemy-web3```

## Grab your contract ABI

Inside the scripts/folder for your Hello World project, create a file named contract-interact.js

contract ABI (Application Binary Interface) is the interface to interact with our smart contract.

Contract Application Binary Interface (ABI) is the interface that specifies how to interact with a specific Ethereum contract. This includes the method names, parameters, constants, data structures, event types (logs), and everything else you need to know about the contract.

Hardhat automatically generates an ABI for us when we deploy our smart contract, and saves it in the HelloWorld.json file (./l
). In order to use this we’ll need to parse out the contents by adding the following lines of code to our contract-interact.js file:

Run ```npm install dotenv --save``` incase your .env variable exports are not working as posed to and also see where .env is located and run your terminal from that directory. 

<img width="619" alt="Screenshot 2021-12-31 at 10 22 40 AM" src="https://user-images.githubusercontent.com/57283161/147804062-07395f52-145b-480e-a8d5-4e249647e934.png">

## Create an instance of your contract

In order to interact with our contract, we need to create an instance of it in our code. To do so, we’ll need our contract address which we can get from the deployment or from Etherscan by looking up the address you used to deploy the contract.

## Read the init message

In JavaScript we use asynchronous functions to interact with networks (async-await / callbacks)

## Update the message

We’ll update the messaged saved in our smart contract using the update function. In order to do so we’ll need to create a transaction, sign it, and send it inside another async function that we’ll call updateMessage(newMessage) as follows:

## Update the .env file

Currently, our .env file contains our private key and our Alchemy API key. We’ll add our public Ethereum account address which we’ll use to get the account nonce (nonce is the transaction counter of the sending address.)

## Create the transaction

Define updateMessage(newMessage) and create our transaction.

The nonce specification is used to keep track of the number of transactions sent from your address. We need this for security purposes and to prevent replay attacks. To get the number of transactions sent from your address we use getTransactionCount.

Next, we’ll use eth_estimateGas to figure out the right amount of gas to include in order to complete our transaction. This avoids the risk of a failed transaction due to insufficient gas.

Finally we’ll create our transaction with the following info:
1. 'from': PUBLIC_KEY : The origin of our transaction is our public address
2. 'to': contractAddress : The contract we wish to interact with and send the transaction
3. 'nonce': nonce : The account nonce with the number of transactions send from our address
4. 'gas': estimatedGas : The estimated gas needed to complete the transaction
5. 'data': helloWorldContract.methods.update("<new message>").encodeABI() : The computation we wish to perform in this transaction (updating the contract message)
  
After we’ve created our transaction, we need to sign it in order to send it off. Here is where we’ll use our private key.
  
## Call updateMessage and run contract-interact.js
  
Finally, we can call updateMessage with our new message by making an await call in main for updateMessage with your newMessage.
  
Alchemy mempool to see the status of your transaction (whether it’s pending, mined, or got dropped by the network). If your transaction got dropped, it’s also helpful to check Ropsten Etherscan and search for your transaction hash.
  
<img width="607" alt="Screenshot 2021-12-31 at 10 23 35 AM" src="https://user-images.githubusercontent.com/57283161/147804081-e35b48f7-2ea3-4121-ac15-e7e0271065f2.png">
  
<img width="1440" alt="Screenshot 2021-12-31 at 10 42 08 AM" src="https://user-images.githubusercontent.com/57283161/147804625-9846cd68-5063-4bb8-81e2-3caf6fc96a7a.png">

