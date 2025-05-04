import {Test} from "forge-std/Test.sol";
import {ProofOfGrowth} from "../contracts/ProofOfGrowth.sol";

pragma solidity ^0.8.26;

contract ProofOfGrowthTest is Test {
    ProofOfGrowth public pog;
    address owner = address(this);
    address public user1 = makeAddr("user1");
    address public user2 = makeAddr("user2");

    function setUp() public {
        pog = new ProofOfGrowth();
    }

    function test_Mint() public {
        pog.mint(user1, "test", "test", "test");
        assertEq(pog.balanceOf(user1), 1);
    }

    function test_Burn() public {
        // pog.mint(user1, "test", "test", "test");
        // pog.burn(0);
        // assertEq(pog.balanceOf(user1), 0);
        address user = address(0x123);
        vm.prank(owner);
        pog.mint(user,"test1","test1","test1");
        vm.prank(user);
        pog.burn(0);
    }

    function test_GetTokenId() public {
        pog.mint(user1, "test", "test", "test");
        assertEq(pog.getTokenId(), 1);
    }

    function test_GetRecord() public {
        pog.mint(user1, "test", "test", "test");
        assertEq(pog.getRecord(0).title, "test");
    }

    function test_GetTokenURI() public {
        pog.mint(user1, "test", "test", "test");
        assertEq(pog.getTokenURI(0), "");
    }

    // function test_Transfer() public {
    //     proofOfGrowth.mint(user1, "test", "test", "test");
    //     proofOfGrowth.transferFrom(user1, user2, 0);
    //     assertEq(proofOfGrowth.ownerOf(0), user2);
    // }

    // function test_Approve() public {
    //     proofOfGrowth.mint(user1, "test", "test", "test");
    //     proofOfGrowth.approve(user2, 0);
    //     assertEq(proofOfGrowth.getApproved(0), user2);
    // }

    // function test_SetApprovalForAll() public {
    //     proofOfGrowth.mint(user1, "test", "test", "test");
    //     proofOfGrowth.setApprovalForAll(user2, true);
    //     assertEq(proofOfGrowth.isApprovedForAll(user1, user2), true);
    // }

    // function test_SafeTransferFrom() public {
    //     proofOfGrowth.mint(user1, "test", "test", "test");
    //     proofOfGrowth.safeTransferFrom(user1, user2, 0);
    //     assertEq(proofOfGrowth.ownerOf(0), user2);
    // }

    // function test_SafeTransferFromWithData() public {
    //     proofOfGrowth.mint(user1, "test", "test", "test");
    //     proofOfGrowth.safeTransferFrom(user1, user2, 0, "0x");
    //     assertEq(proofOfGrowth.ownerOf(0), user2);
    // }

    // function test_TransferFrom() public {
    //     proofOfGrowth.mint(user1, "test", "test", "test");
    //     proofOfGrowth.transferFrom(user1, user2, 0);
    //     assertEq(proofOfGrowth.ownerOf(0), user2);
    // }

    // function test_ApproveAll() public {
    //     proofOfGrowth.mint(user1, "test", "test", "test");
    //     proofOfGrowth.approveAll(user2, true);
    //     assertEq(proofOfGrowth.isApprovedAll(user1, user2), true);
    // }
}
