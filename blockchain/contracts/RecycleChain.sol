// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title RecycleChain
 * @notice This version removes all ERC721 minting/token logic, focusing on:
 *         - Badge definitions (stored in an array)
 *         - Deposit tracking for plastic, glass, metal
 *         - Reward logic and user balances
 *         - Owner-only management of reward rates and contract funding
 */
contract RecycleChain is Ownable, ReentrancyGuard {
    // --------------------------------------
    // Badge Data (no tokens)
    // --------------------------------------
    struct Badge {
        string name;
        string description; 
        string metadataURI;
    }

    // Stores all badge definitions created by the owner
    Badge[] public badges;

    // --------------------------------------
    // User Balances & Deposits
    // --------------------------------------
    mapping(address => uint256) public userBalances;

    // Track how many of each type of waste a user has deposited
    mapping(address => uint256) public plasticDeposits;
    mapping(address => uint256) public glassDeposits;
    mapping(address => uint256) public metalDeposits;

    // --------------------------------------
    // Reward Rates (in Wei)
    // --------------------------------------
    uint256 public plasticRewardPerItem; 
    uint256 public glassRewardPerItem;   
    uint256 public metalRewardPerItem;   

    // --------------------------------------
    // Constructor
    // --------------------------------------
    constructor(address _owner) Ownable(_owner) {
        /*
         * Set some default rates in Wei (optional).
         * 0.00001657 ETH = ~1.657e13 Wei (approx).
         */
        plasticRewardPerItem = 16570000000000;  
        glassRewardPerItem   = 16570000000000;  
        metalRewardPerItem   = 16570000000000;  
    }

    // --------------------------------------
    // Badge Management (No NFT Minting)
    // --------------------------------------

    /**
     * @notice Create a new badge type with a name, description, and metadata URI.
     * @param _name         The name of the badge (e.g. "EcoWarrior")
     * @param _description  A short description of the badge
     * @param _metadataURI  Link to JSON metadata (e.g. IPFS)
     * @return newBadgeId   The index of the newly created badge in `badges`
     */
    function createBadge(
        string memory _name,
        string memory _description,
        string memory _metadataURI
    ) external onlyOwner returns (uint256) {
        badges.push(Badge(_name, _description, _metadataURI));
        uint256 newBadgeId = badges.length - 1;
        return newBadgeId;
    }

    /**
     * @dev Returns the total number of badge types created.
     */
    function getTotalBadgeTypes() external view returns (uint256) {
        return badges.length;
    }

    /**
     * @dev Get detailed badge info by badge ID (index in `badges`)
     */
    function getBadgeInfo(uint256 _badgeId)
        external
        view
        returns (
            string memory name,
            string memory description,
            string memory uri
        )
    {
        require(_badgeId < badges.length, "Badge does not exist");
        Badge storage b = badges[_badgeId];
        return (b.name, b.description, b.metadataURI);
    }

    // --------------------------------------
    // Deposit Methods & Rewards
    // --------------------------------------

    /**
     * @notice The owner can record the deposit of plastic bottles for a user.
     * @param _user     The user who deposited the plastic
     * @param _quantity Number of plastic bottles deposited
     */
    function depositPlastic(address _user, uint256 _quantity) external onlyOwner {
        plasticDeposits[_user] += _quantity;

        // Calculate reward in Wei
        uint256 reward = plasticRewardPerItem * _quantity;
        require(reward <= address(this).balance, "Not enough contract balance");
        userBalances[_user] += reward;
    }

    /**
     * @notice The owner can record the deposit of glass bottles for a user.
     * @param _user     The user who deposited the glass
     * @param _quantity Number of glass bottles deposited
     */
    function depositGlass(address _user, uint256 _quantity) external onlyOwner {
        glassDeposits[_user] += _quantity;

        uint256 reward = glassRewardPerItem * _quantity;
        require(reward <= address(this).balance, "Not enough contract balance");
        userBalances[_user] += reward;
    }

    /**
     * @notice The owner can record the deposit of metal cans for a user.
     * @param _user     The user who deposited the metal
     * @param _quantity Number of metal cans deposited
     */
    function depositMetal(address _user, uint256 _quantity) external onlyOwner {
        metalDeposits[_user] += _quantity;

        uint256 reward = metalRewardPerItem * _quantity;
        require(reward <= address(this).balance, "Not enough contract balance");
        userBalances[_user] += reward;
    }

    /**
     * @notice Update the reward rates (in Wei) for plastic, glass, and metal.
     *         Only the owner can call this.
     * @param _plasticReward New reward per plastic item in Wei
     * @param _glassReward   New reward per glass item in Wei
     * @param _metalReward   New reward per metal item in Wei
     */
    function setRewardRates(
        uint256 _plasticReward,
        uint256 _glassReward,
        uint256 _metalReward
    ) external onlyOwner {
        plasticRewardPerItem = _plasticReward;
        glassRewardPerItem   = _glassReward;
        metalRewardPerItem   = _metalReward;
    }

    /**
     * @notice Returns how many plastic/glass/metal items a user has deposited.
     */
    function getUserDeposits(address _user)
        external
        view
        returns (
            uint256 plasticCount,
            uint256 glassCount,
            uint256 metalCount
        )
    {
        return (
            plasticDeposits[_user],
            glassDeposits[_user],
            metalDeposits[_user]
        );
    }

    // --------------------------------------
    // Funds Management
    // --------------------------------------

    /**
     * @notice Owner can deposit ETH into the contract to fund user rewards.
     */
    function depositContractBalance() external payable onlyOwner {
        // Ether is simply added to the contract balance
    }

    /**
     * @notice (Owner) Manually reward a user with a specified amount of Wei.
     */
    function rewardUser(address _user, uint256 _amount) external onlyOwner {
        require(_amount <= address(this).balance, "Not enough contract balance");
        userBalances[_user] += _amount;
    }

    /**
     * @notice (User) Withdraw the entire balance belonging to the caller.
     */
    function withdraw() external nonReentrant {
        uint256 amount = userBalances[msg.sender];
        require(amount > 0, "No balance to withdraw");

        userBalances[msg.sender] = 0; // reset before transferring

        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Withdraw transfer failed");
    }
}
