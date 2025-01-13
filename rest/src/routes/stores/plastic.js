const { Router } = require("express");
const { contract } = require("../../utils/contract");

const router = Router();

router.post('/api/store/plastic', async (req, res) => {
    try {
      const { user, quantity } = req.body;
  
      // Basic validation
      if (!user || !quantity) {
        return res.status(400).json({ error: 'user address and quantity are required' });
      }
  
      // Interact with the contract
      const tx = await contract.depositPlastic(user, quantity);
      const receipt = await tx.wait();
  
      return res.status(200).json({
        message: 'Plastic deposited successfully',
        transactionHash: receipt.transactionHash,
        blockNumber: receipt.blockNumber,
      });
    } catch (error) {
      console.error('Error depositing plastic:', error);
      return res.status(500).json({ error: error.message });
    }
  });
  
module.exports = { plasticRouter: router };