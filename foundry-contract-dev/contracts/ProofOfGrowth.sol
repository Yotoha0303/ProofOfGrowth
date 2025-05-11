// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ProofOfGrowth is ERC721Enumerable, Ownable {
    struct GrowthRecord {
        string title;
        string description;
        string category; // 学习/项目/社区/挑战等
        uint256 timestamp;
    }
    mapping(uint256 => GrowthRecord) public growthRecords;
    uint256 private _currentTokenId;

    mapping(uint256 => string) private _tokenURIs;

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

    function mintWithURI(
        address to,
        string memory _title,
        string memory _description,
        string memory _category,
        string memory _tokenURI
    ) public onlyOwner {
        uint256 tokenId = _currentTokenId;
        _safeMint(to, tokenId);

        growthRecords[tokenId] = GrowthRecord({
            title: _title,
            description: _description,
            category: _category,
            timestamp: block.timestamp
        });

        _setTokenURI(tokenId, _tokenURI);
        _currentTokenId++;
    }

    function burn(uint256 tokenId) public {
        require(_ownerOf(tokenId) == msg.sender, "Not the owner");
        _burn(tokenId);
        delete growthRecords[tokenId];
    }

    function getTokenId() public view returns (uint256) {
        return _currentTokenId;
    }

    function getRecord(
        uint256 tokenId
    ) external view returns (GrowthRecord memory) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        return growthRecords[tokenId];
    }

    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "Query for nonexistent token");
        return _tokenURIs[tokenId];
    }

    function _setTokenURI(uint256 tokenId, string memory uri) internal {
        require(_ownerOf(tokenId) != address(0), "URI set of nonexistent token");
        _tokenURIs[tokenId] = uri;
    }
}
