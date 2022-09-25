// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

import "../zokrates/code/square/verifier.sol";
import "./ERC721Mintable.sol";

contract SolnSquareVerifier is ERC721Mintable, Verifier {
    struct Solution {
        uint256 tokenId;
        address account;
    }

    /**
        @dev solution will be hashed (keccak256(input)) and added into the mapping
     */
    mapping(bytes32 => Solution) solutions;

    event SolutionAdded(
        bytes32 indexed solution,
        address indexed account,
        uint256 tokenId
    );

    /**
        @dev function to add the solutions to the array
     */

    function addTheSolutions(bytes32 _solution, uint256 tokenId) internal {
        solutions[_solution].tokenId = tokenId;
        solutions[_solution].account = msg.sender;

        emit SolutionAdded(_solution, msg.sender, tokenId);
    }

    function mintAfterVerification(
        address to,
        uint256 tokenId,
        Proof memory proof,
        uint256[2] memory input
    ) public whenNotPaused {
        bool zkVerfiedOK = zkVerify(proof, input);
        require(zkVerfiedOK == true, "ZK verification is not satisfied.");

        // if ZK OK, go ahead and mint
        bool mintOK = mint(to, tokenId);
        require(mintOK == true, "Mint should be done successfully");

        // if mint OK, go ahead and save the ZK solution
        bytes32 solution = keccak256(abi.encodePacked(input));
        addTheSolutions(solution, tokenId);
    }

    function zkVerify(Proof memory proof, uint256[2] memory input)
        public
        view
        returns (bool)
    {
        return bool(Verifier.verifyTx(proof, input));
    }

    // TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
    // TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
    // TODO define a solutions struct that can hold an index & an address
    // TODO define an array of the above struct
    // TODO define a mapping to store unique solutions submitted
    // TODO Create an event to emit when a solution is added
    // TODO Create a function to add the solutions to the array and emit the event
    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
}
