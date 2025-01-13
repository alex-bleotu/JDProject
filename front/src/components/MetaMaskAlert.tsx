import React, { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';

export function MetaMaskAlert() {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(true);

  useEffect(() => {
    setIsMetaMaskInstalled(typeof window.ethereum !== 'undefined');
  }, []);

  if (isMetaMaskInstalled) return null;

  return (
    <div className="fixed bottom-4 right-4 max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-yellow-200 dark:border-yellow-900 p-4 animate-slide-up">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-yellow-500" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-secondary-800 dark:text-secondary-200">
            MetaMask Required
          </h3>
          <div className="mt-1">
            <p className="text-sm text-secondary-600 dark:text-secondary-400">
              To use RecycleChain, please install MetaMask.{' '}
              <a
                href="https://metamask.io/download/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
              >
                Install Now
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
