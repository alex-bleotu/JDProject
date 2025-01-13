const { ethers } = require('ethers');
const { provider } = require('./provider');

const wallet = new ethers.Wallet(process.env.ETHEREUM_PRIVATE_KEY, provider);

module.exports = { wallet };