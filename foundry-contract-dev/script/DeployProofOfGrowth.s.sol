// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../contracts/ProofOfGrowth.sol";

contract DeployProofOfGrowth is Script {
    function setUp() public {}

    function run() public {
        // uint256 deployerKey = vm.envUint("DEPLOYER_PRIVATE_KEY");
        // vm.startBroadcast(deployerKey);
        string memory privateKeyHex = vm.envString("DEPLOYER_PRIVATE_KEY");
        uint256 privateKey = vm.parseUint(privateKeyHex);
        vm.startBroadcast(privateKey);

        ProofOfGrowth pog = new ProofOfGrowth();
        console.log("Deployed ProofOfGrowth at:", address(pog));

        vm.stopBroadcast();
    }
}
