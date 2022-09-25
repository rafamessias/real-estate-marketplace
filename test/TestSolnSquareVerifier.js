const SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
const proofJSON = require("../zokrates/code/square/proof.json");
contract("SolnSquareVerifier", (accounts) => {
  const account_one = accounts[0];
  const tokenId = 1;
  var contract;

  const { proof, inputs } = proofJSON;
  const wrongInputs = ["0x0001", "0x0001"];

  before(async () => {
    contract = await SolnSquareVerifier.deployed({ from: account_one });
  });

  describe("Try to mint NFT", () => {
    it("Mint new NFT - should return TRUE", async () => {
      let result = "";
      try {
        result = await contract.mintAfterVerification(
          account_one,
          tokenId,
          proof,
          inputs
        );
        result = result.tx;
      } catch (error) {
        console.log(error);
      }

      assert(result !== "", "NFT should be minted!");
    });

    it("Mint new NFT with wrong inputs- should return FALSE", async () => {
      let result = "";
      try {
        result = await contract.mintAfterVerification(
          account_one,
          tokenId,
          proof,
          wrongInputs
        );
        result = result.tx;
      } catch (error) {
        //console.log(error);
      }

      assert(result === "", "NFT should be minted!");
    });
  });
});
