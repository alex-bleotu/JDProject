const { Router } = require("express");
const { contract } = require("../../utils/contract");

const router = Router();

router.post('/api/store/metal', async (req, res) => {
    try {
      const { user, quantity } = req.body;
  
      if (!user || !quantity) {
        return res.status(400).json({ error: 'user address and quantity are required' });
      }
  
      const tx = await contract.depositMetal(user, quantity);
      const receipt = await tx.wait();
  
      return res.status(200).json({
        message: 'Metal deposited successfully',
        transactionHash: receipt.transactionHash,
        blockNumber: receipt.blockNumber,
      });
    } catch (error) {
      console.error('Error depositing metal:', error);
      return res.status(500).json({ error: error.message });
    }
  });
  
module.exports = { metalRouter: router };