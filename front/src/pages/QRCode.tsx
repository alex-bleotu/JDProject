import React from 'react';
import { useAccount } from 'wagmi';
import { QRCodeSVG } from 'qrcode.react';
import { Award, Smartphone, RefreshCw } from 'lucide-react';

export function QRCode() {
  const { address, isConnected } = useAccount();
  const [refreshKey, setRefreshKey] = React.useState(0);

  if (!isConnected) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center">
          <Award className="mx-auto h-12 w-12 text-primary-600 dark:text-primary-400" />
          <h2 className="mt-2 text-2xl md:text-3xl font-bold text-secondary-800 dark:text-secondary-200">
            Connect Your Wallet
          </h2>
          <p className="mt-2 text-secondary-600 dark:text-secondary-400">
            Connect your wallet to generate your recycling QR code
          </p>
        </div>
      </div>
    );
  }

  const qrData = JSON.stringify({
    address,
    timestamp: Date.now(),
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-8 shadow-lg border border-secondary-200 dark:border-secondary-700">
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="p-3 md:p-4 bg-white rounded-xl">
              <QRCodeSVG
                value={qrData}
                size={Math.min(window.innerWidth - 64, 210)}
                level="H"
                includeMargin={true}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 md:p-4 bg-secondary-50 dark:bg-secondary-900 rounded-lg">
              <div className="flex items-center">
                <Smartphone className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-2 md:mr-3 flex-shrink-0" />
                <span className="text-sm font-medium text-secondary-800 dark:text-secondary-200">
                  Connected Wallet
                </span>
              </div>
              <span className="text-xs md:text-sm text-secondary-600 dark:text-secondary-400 font-mono truncate ml-2">
                {`${address?.slice(0, 6)}...${address?.slice(-4)}`}
              </span>
            </div>

            <button
              onClick={() => setRefreshKey(prev => prev + 1)}
              className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh QR Code
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs md:text-sm text-secondary-600 dark:text-secondary-400">
              This QR code refreshes automatically every few minutes for security
            </p>
          </div>
        </div>

        <div className="mt-6 md:mt-8 space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-sm border border-secondary-200 dark:border-secondary-700">
            <h3 className="text-lg font-semibold text-secondary-800 dark:text-secondary-200 mb-3">
              How to Use
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-secondary-600 dark:text-secondary-400">
              <li>Find a RecycleChain smart bin near you</li>
              <li>Place your recyclable items in the correct compartment</li>
              <li>Scan this QR code on the bin's scanner</li>
              <li>Wait for confirmation and earn your rewards</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}