# Udacity Blockchain Capstone
Capstone to finish my Blockchain developer Udacity nanodegree

# Project
Real Estate NFTs with zk-snarks authentication - Using truffle suit to build and deploy

## Deployment info

- Contract address: 0xb1a964316e39Fb50D227F03ad8455148df657292
- [Goerli link](https://goerli.etherscan.io/address/0xb1a964316e39Fb50D227F03ad8455148df657292)
- [OpenSea Collection link](https://testnets.opensea.io/collection/real-estate-tf6idoyzos)


## Project details

- Contract ERC721Mintable.sol:  Where the NFT will be controled and minted
- Contract SolnSquareVerifier.sol: Where we put together ZK snarks and ERC721, the house owner should be able to proof ownership via ZK snarks
- Scripts/mintNFT.js: where the 10 NFTs will be minted after the deploy to Goerli network

## how to generate ZK proof, test and deploy

### Clone

- After clone, go ahead and run `npm i` to install the dependencies
- Configure the truffle-config file with development info for Ganache and for Goerli
- Create `.env.local` and add you infure key and wallet Private Key, just like `.env.example`  

### Zokrates
  - Install docker and run `docker run -v <path to your project folder>/zokrates/code:/home/zokrates/code -ti zokrates/zokrates /bin/bash`
  - Compute Whitness `/home/zokrates/code/square zokrates compute-witness -a a b`, where a and b are the paramenters (the answer). You can use a=2 b=4, for example
  - Generate the proof `/home/zokrates/code/square zokrates generate-proof`
  - Check if proof is created. If it is OK, you can exit from Docker container with `exit`

### Tests

- Make sure Ganache is up and running
- Let's compile and deploy the contracts into Ganache `truffle compile && truffle migrate`
- Run the tests `truffle test`, check if all tests have passed

### Deploy into testnet

- With network configured right at truffle-config file, go ahead and run `truffle migrate --reset --network goerli`
- Get the address from the transaction and go check at [https://goerli.etherscan.io/](https://goerli.etherscan.io/)
- After the migration, go ahead and mint some NFT running `truffle exec scripts/mintNFT.js --network goerli`
- Check if all the NFTs were minted correctly
- Check your NFTs at OpenSea, go to the following URI `https://testnets.opensea.io/assets/goerli/<YOUR CONTRACT ADDRESS>/<TOKENID>`