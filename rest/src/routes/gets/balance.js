const { Router } = require("express");
const { contract } = require("../../utils/contract");

const router = Router();

router.post('/api/get/balance', async (req, res) => {
    try {
      const { user } = req.body;
  
      // Basic validation
      if (!user) {
        return res.status(400).json({ error: 'user address is required' });
      }
  
      // Interact with the contract
      const tx = await contract.userBalances(user);
      return res.status(200).json({
        count: tx.toString()
      });
    } catch (error) {
      console.error('Error getting balance:', error);
      return res.status(500).json({ error: error.message });
    }
  });
  
module.exports = { balanceGetRouter: router };