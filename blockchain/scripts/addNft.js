
const { ethers } = require("hardhat");
const { contractAddress, contractAbi } = require("./contract");

async function main() {
    const contract = new ethers.Contract(contractAddress, contractAbi, ethers.provider);
    const [deployer] = await ethers.getSigners();
    const tx = await contract.connect(deployer).createBadge({
        "_name": "iosub",
        "_description": "iosub",
        "_metadataURI": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.izismile.com%2Fimg%2Fimg6%2F20130926%2F640%2Fthe_internet_is_a_weird_and_unusual_place_640_06.jpg&f=1&nofb=1&ipt=5a4ad551fce33b31eba3c38cd5e39786f7d561476c485945e7298a19a56fedc6&ipo=images"
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