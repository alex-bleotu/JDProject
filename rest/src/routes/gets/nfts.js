const { Router } = require("express");
const { contract } = require("../../utils/contract");

const router = Router();

router.post('/api/get/nfts', async (req, res) => {
    try {
      const { user } = req.body;
  
      // Basic validation
      if (!user) {
        return res.status(400).json({ error: 'user address are required' });
      }
  
      // Interact with the contract
      const badgesCount = Number.parseInt((await contract.getTotalBadgeTypes()).toString());
      let badges = [];
      for (let i = 0; i < badgesCount; i++) {
        badges.push(await contract.getBadgeInfo(i));
      }

      return res.status(200).json({
        badges
      });
    } catch (error) {
      console.error('Error getting plastic:', error);
      return res.status(500).json({ error: error.message });
    }
  });
  
module.exports = { nftsGetRouter: router };