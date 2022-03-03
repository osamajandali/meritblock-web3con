// SPDX-License-Identifier: MIT
pragma solidity >=0.8.10;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract MeritBlockNFT is ERC721Enumerable, Ownable {
    mapping(address => bool) public minters;
    mapping(uint256 => string) public tokenURIs;

    bool private _transferEnabledForMint = false;

    constructor() ERC721("MeritBlock", "MB") {}

    function mint(address to, string memory _tokenURI) public {
        require(minters[msg.sender], "Not authorized to mint");
        uint256 newTokenId = totalSupply();

        tokenURIs[newTokenId] = _tokenURI;

        _transferEnabledForMint = true;
        _mint(to, newTokenId);
        _transferEnabledForMint = false;
    }

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721URIStorage: URI query for nonexistent token"
        );

        return tokenURIs[tokenId];
    }

    ///////////////////////////////////////
    // Internal
    ///////////////////////////////////////

    function _beforeTokenTransfer(
        address,
        address,
        uint256
    ) internal view override {
        require(_transferEnabledForMint, "MeritBlockNFT is not transferable");
    }

    ///////////////////////////////////////
    // Maintanence Owner Functions
    ///////////////////////////////////////

    function changeMinter(address minter, bool allowed) public onlyOwner {
        minters[minter] = allowed;
    }
}
