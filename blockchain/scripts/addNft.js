
const { ethers } = require("hardhat");
const { contractAddress, contractAbi } = require("./contract");

async function main() {
    const contract = new ethers.Contract(contractAddress, contractAbi, ethers.provider);
    const [deployer] = await ethers.getSigners();
    const tx = await contract.connect(deployer).createBadge(
        "Level 3 - bec",
        "Ai aruncat 1000 de beci la colectare!",
        "https://xfckpxetjwqzqrpknjsq.supabase.co/storage/v1/object/public/NFTS/G2.svg"
    );

    await tx.wait();
    console.log(`Transaction successful! Hash: ${tx.hash}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });