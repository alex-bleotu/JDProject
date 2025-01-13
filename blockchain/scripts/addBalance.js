const { ethers } = require("hardhat");
const { contractAddress, contractAbi } = require("./contract");

async function main() {
    const amountToSend = ethers.parseEther("1.0");
    const contract = new ethers.Contract(contractAddress, contractAbi, ethers.provider);
    const [deployer] = await ethers.getSigners();
    const tx = await contract.connect(deployer).depositContractBalance({
        value: amountToSend,
    });

    await tx.wait();
    console.log(`Transaction successful! Hash: ${tx.hash}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });