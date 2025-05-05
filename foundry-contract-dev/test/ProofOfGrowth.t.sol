import {Test} from "forge-std/Test.sol";
import {ProofOfGrowth} from "../contracts/ProofOfGrowth.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

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
        address user = address(0x123);
        vm.prank(owner);
        pog.mint(user, "test1", "test1", "test1");
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

    function test_RevertWhen_NonOwnerMints() public {
        vm.prank(user1);
        vm.expectRevert("Ownable: caller is not the owner");
        vm.expectRevert(
            abi.encodeWithSelector(
                Ownable.OwnableUnauthorizedAccount.selector,
                user1
            )
        );
        pog.mint(user1, "test", "test", "test");
    }

    function test_RevertWhen_NonOwnerBurns() public {
        pog.mint(user1, "test", "test", "test");
        vm.prank(user2);
        vm.expectRevert("Not the owner");
        pog.burn(0);
    }

    function test_RevertWhen_GetRecordFails() public {
        vm.expectRevert("Token does not exist");
        pog.getRecord(999);
    }

    function test_RevertWhen_GetTokenURIFails() public {
        vm.expectRevert("Query for nonexistent token");
        pog.getTokenURI(999);
    }
}
