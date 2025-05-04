// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ProofOfGrowth is ERC721, Ownable {
    constructor() ERC721("ProofOfGrowth", "POG") Ownable(msg.sender) {}

    function mint(address to, uint256 tokenId) public onlyOwner {
        _mint(to, tokenId);
    }

    function burn(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "Not the owner");
        _burn(tokenId);
    }

    function getTokenId() public view returns (uint256) {
        return _tokenId;
    }

    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        return _tokenURI(tokenId);
    }
}
