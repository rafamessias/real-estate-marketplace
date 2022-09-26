const ERC721Mintable = artifacts.require("ERC721Mintable");

contract("TestERC721Mintable", (accounts) => {
  const account_one = accounts[0];
  const account_two = accounts[1];
  const totalNFT = 10;
  before(async function () {
    this.contract = await ERC721Mintable.deployed({ from: account_one });

    for (let x = 0; x < totalNFT; x++) {
      await this.contract.mint(account_one, x);
    }
  });

  describe("match erc721 spec", function () {
    it("should return total supply", async function () {
      const total = await this.contract.totalSupply();

      assert.equal(
        total.toString(),
        totalNFT,
        `Should have the total of ${totalNFT} NFTs minted`
      );
    });

    it("should get token balance", async function () {
      const balance = await this.contract.balanceOf(account_one);

      assert.equal(
        balance.toString(),
        totalNFT,
        `Should have balance of ${totalNFT}`
      );
    });

    // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
    it("should return token uri", async function () {
      const uri =
        "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";
      let tokenURI = "";
      try {
        tokenURI = await this.contract.tokenURI(0);
      } catch (error) {
        console.log(error);
      }
      assert.equal(tokenURI, `${uri}0`, "Should get the right TokenURI");
    });

    it("should transfer token from one owner to another", async function () {
      const result = await this.contract.transferFrom(
        account_one,
        account_two,
        0
      );

      const ownerOf = await this.contract.ownerOf(0);

      assert.equal(
        ownerOf.toString(),
        account_two,
        "Owner should be account two"
      );
    });
  });

  describe("have ownership properties", function () {
    it("should fail when minting when address is not contract owner", async function () {
      let result = true;
      try {
        await this.contract.mint(account_two, x, {
          from: account_two,
        });
      } catch (error) {
        result = false;
      }

      assert.equal(result, false, "Should not be able to mint as not owner");
    });

    it("should return contract owner", async function () {
      const result = await this.contract.contractOwner();

      assert.equal(result, account_one, "Account should be one");
    });
  });
});
