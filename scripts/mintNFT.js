const ERC721Mintable = artifacts.require("ERC721Mintable");

module.exports = async (callback) => {
  const contract = await ERC721Mintable.deployed();
  const account = await web3.eth.getAccounts()[0];
  const totalNFT = 10;

  let tx;

  console.log(`Minting NFTs on address ${account}`);

  for (let x = 0; x < totalNFT; x++) {
    tx = await contract.mint(account, x);
    console.log(`token id == ${x} is minted!`);
  }
  console.log("NFT mint is done!");

  callback(tx.tx);
};
