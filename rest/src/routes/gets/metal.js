const { Router } = require("express");
const { contract } = require("../../utils/contract");

const router = Router();

router.post('/api/get/metal', async (req, res) => {
    try {
      const { user } = req.body;
  
      // Basic validation
      if (!user) {
        return res.status(400).json({ error: 'user address and quantity are required' });
      }
  
      // Interact with the contract
      const tx = await contract.metalDeposits(user);
      return res.status(200).json({
        count: Number.parseInt(tx.toString())
      });
    } catch (error) {
      console.error('Error getting metal:', error);
      return res.status(500).json({ error: error.message });
    }
  });
  
module.exports = { metalGetRouter: router };