const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RecycleChain", function () {
  let RecycleChain: any, recycleChain: any;
  let owner: any, user1: any, user2: any;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();

    const RecycleChainFactory = await ethers.getContractFactory("RecycleChain");
    recycleChain = await RecycleChainFactory.deploy(owner.address);
  });

  describe("Badge Management", function () {
    it("should allow the owner to create a badge", async function () {
      const tx = await recycleChain.createBadge(
        "EcoWarrior",
        "Awarded for significant contribution to recycling.",
        "ipfs://badge-metadata-uri"
      );

      const receipt = await tx.wait();
      const badgeId = tx.value;
      console.log(badgeId);

      expect(badgeId).to.equal(0);

      const badge = await recycleChain.getBadgeInfo(badgeId);
      expect(badge.name).to.equal("EcoWarrior");
      expect(badge.description).to.equal("Awarded for significant contribution to recycling.");
      expect(badge.uri).to.equal("ipfs://badge-metadata-uri");
    });

    it("should return the total number of badges", async function () {
      await recycleChain.createBadge("Badge1", "Description1", "ipfs://uri1");
      await recycleChain.createBadge("Badge2", "Description2", "ipfs://uri2");

      const totalBadges = await recycleChain.getTotalBadgeTypes();
      expect(totalBadges).to.equal(2);
    });

    it("should revert if accessing non-existent badge info", async function () {
      await expect(recycleChain.getBadgeInfo(0)).to.be.revertedWith("Badge does not exist");
    });
  });

  describe("Deposit Methods & Rewards", function () {
    beforeEach(async function () {
      await owner.sendTransaction({
        to: recycleChain.address,
        value: ethers.utils.parseEther("1"),
      });
    });

    it("should record plastic deposits and reward user", async function () {
      await recycleChain.depositPlastic(user1.address, 10);
      const plasticDeposits = await recycleChain.plasticDeposits(user1.address);
      expect(plasticDeposits).to.equal(10);

      const userBalance = await recycleChain.userBalances(user1.address);
      expect(userBalance).to.equal(ethers.utils.parseUnits("0.0001657", "ether").mul(10));
    });

    it("should record glass deposits and reward user", async function () {
      await recycleChain.depositGlass(user1.address, 5);
      const glassDeposits = await recycleChain.glassDeposits(user1.address);
      expect(glassDeposits).to.equal(5);

      const userBalance = await recycleChain.userBalances(user1.address);
      expect(userBalance).to.equal(ethers.utils.parseUnits("0.0001657", "ether").mul(5));
    });

    it("should record metal deposits and reward user", async function () {
      await recycleChain.depositMetal(user1.address, 7);
      const metalDeposits = await recycleChain.metalDeposits(user1.address);
      expect(metalDeposits).to.equal(7);

      const userBalance = await recycleChain.userBalances(user1.address);
      expect(userBalance).to.equal(ethers.utils.parseUnits("0.0001657", "ether").mul(7));
    });

    it("should revert if contract balance is insufficient for rewards", async function () {
      await expect(recycleChain.depositPlastic(user1.address, 1e6)).to.be.revertedWith(
        "Not enough contract balance"
      );
    });
  });

  describe("Funds Management", function () {
    it("should allow the owner to deposit funds into the contract", async function () {
      await expect(
        owner.sendTransaction({
          to: recycleChain.address,
          value: ethers.utils.parseEther("1"),
        })
      ).to.changeEtherBalance(recycleChain, ethers.utils.parseEther("1"));
    });

    it("should allow the owner to manually reward a user", async function () {
      await owner.sendTransaction({
        to: recycleChain.address,
        value: ethers.utils.parseEther("1"),
      });

      await recycleChain.rewardUser(user1.address, ethers.utils.parseEther("0.1"));
      const userBalance = await recycleChain.userBalances(user1.address);
      expect(userBalance).to.equal(ethers.utils.parseEther("0.1"));
    });

    it("should allow users to withdraw their balance", async function () {
      await owner.sendTransaction({
        to: recycleChain.address,
        value: ethers.utils.parseEther("1"),
      });

      await recycleChain.depositPlastic(user1.address, 10);

      const userInitialBalance = await ethers.provider.getBalance(user1.address);

      await recycleChain.connect(user1).withdraw();

      const userFinalBalance = await ethers.provider.getBalance(user1.address);

      expect(userFinalBalance).to.be.gt(userInitialBalance);
    });

    it("should revert if user tries to withdraw with no balance", async function () {
      await expect(recycleChain.connect(user1).withdraw()).to.be.revertedWith(
        "No balance to withdraw"
      );
    });
  });

  describe("Reward Rate Management", function () {
    it("should allow the owner to update reward rates", async function () {
      await recycleChain.setRewardRates(1000, 2000, 3000);
      expect(await recycleChain.plasticRewardPerItem()).to.equal(1000);
      expect(await recycleChain.glassRewardPerItem()).to.equal(2000);
      expect(await recycleChain.metalRewardPerItem()).to.equal(3000);
    });

    it("should revert if non-owner tries to update reward rates", async function () {
      await expect(
        recycleChain.connect(user1).setRewardRates(1000, 2000, 3000)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });
});
