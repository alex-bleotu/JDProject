require('dotenv').config();
const express = require('express');
const { ethers } = require('ethers');
const { provider } = require('./utils/provider');
const { wallet } = require('./utils/wallet')

const app = express();
app.use(express.json());

(async () => {
  try {
    const address = await wallet.getAddress();
    const network = await provider.getNetwork();
    console.log(`Connected wallet address: ${address}`);
    console.log(`Using network: ${network.name} (chainId: ${network.chainId})`);
  } catch (err) {
    console.error('Error connecting wallet:', err);
  }
})();

app.get('/wallet', async (req, res) => {
  try {
    const address = await wallet.getAddress();
    const balance = await provider.getBalance(address);

    return res.status(200).json({
      address,
      balance: ethers.utils.formatEther(balance),
    });
  } catch (error) {
    console.error('Error fetching wallet info:', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
