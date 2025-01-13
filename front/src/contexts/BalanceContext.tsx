import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

interface BalanceContextType {
  balance: string | null;
  loading: boolean;
  error: string | null;
  refetchBalance: () => Promise<void>;
}

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

export function BalanceProvider({ children }: { children: React.ReactNode }) {
  const { address, isConnected } = useAccount();
  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBalance = async (address: string) => {
    try {
      setLoading(true);
      setError(null);

      console.log('Dwadwaawd');

      const response = await fetch(
        'http://95.179.246.157:3005/api/get/balance',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: address,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch balance');
      }

      const data = await response.json();
      console.log('Dwdawdawaw', data);
      setBalance(data.count || null);
    } catch (err: any) {
      setError(err.message);
      console.log(err);
      setBalance(null);
    } finally {
      setLoading(false);
    }
  };

  const refetchBalance = async () => {
    if (isConnected && address) {
      await fetchBalance(address);
    }
  };

  useEffect(() => {
    if (isConnected && address) {
      fetchBalance(address);
    } else {
      setBalance(null);
    }
  }, [isConnected, address]);

  return (
    <BalanceContext.Provider
      value={{ balance, loading, error, refetchBalance }}
    >
      {children}
    </BalanceContext.Provider>
  );
}

export function useBalance() {
  const context = useContext(BalanceContext);
  if (context === undefined) {
    throw new Error('useBalance must be used within a BalanceProvider');
  }
  return context;
}
