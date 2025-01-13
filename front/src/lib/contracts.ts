import { parseEther } from 'viem';

export const contracts = {
  mainnet: {
    recycleToken: '0x1234567890123456789012345678901234567890',
    recycleRewards: '0x2345678901234567890123456789012345678901',
    recycleNFT: '0x3456789012345678901234567890123456789012',
    recycleTracker: '0x4567890123456789012345678901234567890123', // Add the tracker contract
  },
} as const;

export const RECYCLE_TRACKER_ABI = [
  {
    inputs: [{ name: 'user', type: 'address' }],
    name: 'getUserRecyclingData',
    outputs: [
      { name: 'plastic', type: 'uint256' },
      { name: 'metal', type: 'uint256' },
      { name: 'glass', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function',
  }
] as const;