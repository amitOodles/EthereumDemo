
contract MyToken{
    /* This creates an array with all balances */
    mapping (address => uint256) public balanceOf;

    function MyToken(uint256 initialSupply) public {
    balanceOf[msg.sender] = initialSupply;
	}

	/*function myBalance() public returns (uint256) { return balanceOf[msg.sender]; }*/

	function myBalance(string alas) public returns (string) { return alas; }

}