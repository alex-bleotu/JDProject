const { ethers } = require('ethers');

const provider = new ethers.JsonRpcProvider(process.env.ETHEREUM_RPC_URL);

module.exports = { provider };