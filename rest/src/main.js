require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { ethers } = require('ethers');
const { provider } = require('./utils/provider');
const { wallet } = require('./utils/wallet');

// importing external routes
const { plasticRouter } = require('./routes/stores/plastic');
const { glassRouter } = require('./routes/stores/glass');
const { metalRouter } = require('./routes/stores/metal');

const { plasticGetRouter } = require('./routes/gets/plastic');
const { metalGetRouter } = require('./routes/gets/metal');
const { glassGetRouter } = require('./routes/gets/glass');
const { balanceGetRouter } = require('./routes/gets/balance');
const { nftsGetRouter } = require('./routes/gets/nfts');

const app = express();
app.use(express.json());

// Configure CORS
const allowedOrigins = [
  'http://recyclechain.alexbleotu.com',
  'https://sb1byi6zt4a-bw4p--5173--1b4252dd.local-credentialless.webcontainer.io',
  'http://localhost:5173',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);

// Connect wallet and log details
(async () => {
  try {
    const address = await wallet.getAddress();
    const network = await provider.getNetwork();
    console.log(`Connected wallet address: ${address}`);
    console.log(`Using network: ${network.name} (chainId: ${network.chainId})`);
    console.log('Balance: ' + await provider.getBalance(address));
  } catch (err) {
    console.error('Error connecting wallet:', err);
  }
})();

// Define API routes
app.get('/api/wallet', async (req, res) => {
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

app.use(plasticRouter);
app.use(glassRouter);
app.use(metalRouter);
app.use(plasticGetRouter);
app.use(glassGetRouter);
app.use(metalGetRouter);
app.use(balanceGetRouter);
app.use(nftsGetRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  });
