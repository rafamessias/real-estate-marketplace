const SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
const proofJSON = require("../zokrates/code/square/proof.json");
contract("SolnSquareVerifier", (accounts) => {
  const account_one = accounts[0];
  var contract;

  const { proof, inputs } = proofJSON;

  before(async () => {
    contract = await SolnSquareVerifier.deployed({ from: account_one });
  });

  describe("ZK Verification", () => {
    it("Verify ZK - TRUE", async () => {
      // proof and input
      const result = await contract.zkVerify(proof, inputs);
      assert.equal(result, true, "ZK verifier should be true");
    });

    it("Verify ZK - FALSE", async () => {
      // proof and input
      const result = await contract.zkVerify(proof, ["0x0002", "0x0004"]);
      assert.equal(result, false, "ZK verifier should be FALSE");
    });
  });
});
