const ERC721Mintable = artifacts.require("ERC721Mintable");

module.exports = async (callback) => {
  const contract = await ERC721Mintable.deployed();
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  const totalNFT = 10;
  let tx;

  console.log(
    `Minting NFTs on address ${contract.address} for account ${account}`
  );

  for (let x = 0; x < totalNFT; x++) {
    tx = await contract.mint(account, x);
    console.log(`token id == ${x} was minted!`);
  }
  console.log("NFT mint is done!");

  callback(tx.tx);
};
