import { useEffect, useState } from 'react';

export function useMetaMask() {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState<boolean>(false);

  useEffect(() => {
    const checkMetaMask = async () => {
      // @ts-ignore
      const ethereum = window.ethereum;
      setIsMetaMaskInstalled(!!ethereum && ethereum.isMetaMask);
    };

    checkMetaMask();
  }, []);

  return { isMetaMaskInstalled };
}