const { Router } = require("express");
const { contract } = require("../../utils/contract");

const router = Router();

router.post('/api/get/plastic', async (req, res) => {
    try {
      const { user } = req.body;
  
      // Basic validation
      if (!user) {
        return res.status(400).json({ error: 'user address are required' });
      }
  
      // Interact with the contract
      const tx = await contract.plasticDeposits(user);
      return res.status(200).json({
        count: Number.parseInt(tx.toString())
      });
    } catch (error) {
      console.error('Error getting plastic:', error);
      return res.status(500).json({ error: error.message });
    }
  });
  
module.exports = { plasticGetRouter: router };