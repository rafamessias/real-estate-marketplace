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

    Solution[] totalToken;

    uint256 tokenSupply;

    event SolutionAdded(
        bytes32 indexed solution,
        address indexed account,
        uint256 tokenId
    );

    constructor(uint256 _tokenSupply) {
        tokenSupply = _tokenSupply;
    }

    /**
        @dev function to add the solutions to the array
     */

    function addTheSolutions(bytes32 _solution, uint256 tokenId) internal {
        solutions[_solution].tokenId = tokenId;
        solutions[_solution].account = msg.sender;

        totalToken.push(Solution({tokenId: tokenId, account: msg.sender}));

        emit SolutionAdded(_solution, msg.sender, tokenId);
    }

    function mintAfterVerification(
        address to,
        uint256 tokenId,
        Proof memory proof,
        uint256[2] memory input
    ) public whenNotPaused {
        //not mint over the total supply
        require(
            totalToken.length <= tokenSupply,
            "Total supply already achieved"
        );

        bool zkVerfiedOK = zkVerify(proof, input);
        require(zkVerfiedOK == true, "ZK verification is not satisfied.");

        bytes32 solution = keccak256(abi.encodePacked(input));

        //add only unique solution
        require(
            solutions[solution].account == address(0),
            "This solution was used before"
        );

        // if ZK OK, go ahead and mint
        bool mintOK = mint(to, tokenId);
        require(mintOK == true, "Mint should be done successfully");

        // if mint OK, go ahead and save the ZK solution
        addTheSolutions(solution, tokenId);
    }

    function zkVerify(Proof memory proof, uint256[2] memory input)
        public
        view
        returns (bool)
    {
        return bool(Verifier.verifyTx(proof, input));
    }
}
