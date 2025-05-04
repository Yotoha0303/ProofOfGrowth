// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ProofOfGrowth is ERC721, Ownable {
    struct GrowthRecord {
        string title;
        string description;
        string category; // 学习/项目/社区/挑战等
        uint256 timestamp;
    }
    mapping(uint256 => GrowthRecord) public growthRecords;
    uint256 private _currentTokenId;

    constructor() ERC721("ProofOfGrowth", "POG") Ownable(msg.sender) {}

    function mint(
        address to,
        string memory _title,
        string memory _description,
        string memory _category
    ) public onlyOwner {
        uint256 tokenId = _currentTokenId;
        _safeMint(to, tokenId);
        growthRecords[tokenId] = GrowthRecord({
            title: _title,
            description: _description,
            category: _category,
            timestamp: block.timestamp
        });
        _currentTokenId++;
    }

    function burn(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "Not the owner");
        _burn(tokenId);
        delete growthRecords[tokenId];
    }

    function getTokenId() public view returns (uint256) {
        return _currentTokenId;
    }

    function getRecord(uint256 tokenId)
        external
        view
        returns (GrowthRecord memory)
    {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        return growthRecords[tokenId];
    }

    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "Query for nonexistent token");
        return ""; // 后续你可以接入动态服务或自建 API
    }
}
