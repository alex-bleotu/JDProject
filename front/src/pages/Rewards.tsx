import React from 'react';
import { useAccount } from 'wagmi';
import { Medal, Award, Trophy, Star, Lock } from 'lucide-react';
import { useNFTs } from '../contexts/NFTContext';

const mockBadges = [
  {
    id: 1,
    name: 'Early Adopter',
    description: 'Joined RecycleChain in its early days',
    icon: Star,
  },
  {
    id: 2,
    name: 'Recycling Champion',
    description: 'Recycled over 100 items',
    icon: Trophy,
  },
  {
    id: 3,
    name: 'Community Leader',
    description: 'Inspired 10 others to join',
    icon: Medal,
  },
];

const rarityColors = {
  Common: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
  Rare: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  Epic: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  Legendary: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
};

export function Rewards() {
  const { isConnected } = useAccount();
  const { nfts, loading, error } = useNFTs();
  const [selectedNFT, setSelectedNFT] = React.useState<any>(null);

  if (!isConnected) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <Award className="mx-auto h-12 w-12 text-primary-600 dark:text-primary-400" />
          <h2 className="mt-2 text-3xl font-bold text-secondary-800 dark:text-secondary-200">
            Connect Your Wallet
          </h2>
          <p className="mt-2 text-secondary-600 dark:text-secondary-400">
            Connect your wallet to view your earned badges and NFTs
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-secondary-600 dark:text-secondary-400">Loading your NFTs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center text-red-600 dark:text-red-400">
          <p className="text-xl">Error loading NFTs</p>
          <p className="mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-secondary-800 dark:text-secondary-200">
          Your Achievements
        </h1>
        <p className="mt-2 text-secondary-600 dark:text-secondary-400">
          Showcase your environmental contributions and earned rewards
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold text-secondary-800 dark:text-secondary-200 mb-6">
          Badges
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockBadges.map((badge) => (
            <div
              key={badge.id}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-secondary-200 dark:border-secondary-700"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <badge.icon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-secondary-800 dark:text-secondary-200">
                    {badge.name}
                  </h3>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    {badge.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-secondary-800 dark:text-secondary-200 mb-6">
          NFT Collection
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {nfts?.map((nft) => (
            <div
              key={nft.id}
              onClick={() => setSelectedNFT(selectedNFT?.id === nft.id ? null : nft)}
              className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-secondary-200 dark:border-secondary-700 transition-all duration-300 cursor-pointer hover:shadow-lg ${
                selectedNFT?.id === nft.id ? 'ring-2 ring-primary-500' : ''
              }`}
            >
              <div className="relative">
                <img
                  src={nft.imageUrl}
                  alt={nft.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    rarityColors.Rare
                  }`}>
                    Rare
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-secondary-800 dark:text-secondary-200 mb-1">
                    {nft.name}
                  </h3>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    {nft.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}