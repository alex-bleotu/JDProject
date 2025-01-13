import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react';
import { useAccount } from 'wagmi';

interface RecyclingData {
  plasticCount: number | null;
  glassCount: number | null;
  metalCount: number | null;
}

interface RecyclingContextProps {
  recyclingData: RecyclingData | null;
  loading: boolean;
  error: string | null;
  refetchRecyclingData: () => Promise<void>;
}

export const RecyclingContext = createContext<
  RecyclingContextProps | undefined
>(undefined);

export const RecyclingProvider = ({ children }: { children: ReactNode }) => {
  const { address, isConnected } = useAccount();
  const [recyclingData, setRecyclingData] = useState<RecyclingData | null>({
    plasticCount: null,
    glassCount: null,
    metalCount: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecyclingData = async (userAddress: string) => {
    try {
      setLoading(true);
      setError(null);

      const fetchPlastic = fetch('http://95.179.246.157:3005/api/get/plastic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: userAddress, quantity: 4 }),
      });

      const fetchGlass = fetch('http://95.179.246.157:3005/api/get/glass', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: userAddress, quantity: 4 }),
      });

      const fetchMetal = fetch('http://95.179.246.157:3005/api/get/metal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: userAddress, quantity: 4 }),
      });

      const [plasticResponse, glassResponse, metalResponse] = await Promise.all(
        [fetchPlastic, fetchGlass, fetchMetal]
      );

      if (!plasticResponse.ok || !glassResponse.ok || !metalResponse.ok) {
        throw new Error('Failed to fetch recycling data');
      }

      const plasticData = await plasticResponse.json();
      const glassData = await glassResponse.json();
      const metalData = await metalResponse.json();

      setRecyclingData({
        plasticCount: plasticData.count || null,
        glassCount: glassData.count || null,
        metalCount: metalData.count || null,
      });
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred');
      setRecyclingData({
        plasticCount: null,
        glassCount: null,
        metalCount: null,
      });
    } finally {
      setLoading(false);
    }
  };

  const refetchRecyclingData = async () => {
    if (isConnected && address) {
      await fetchRecyclingData(address);
    }
  };

  useEffect(() => {
    if (isConnected && address) {
      fetchRecyclingData(address);
    } else {
      setRecyclingData({
        plasticCount: null,
        glassCount: null,
        metalCount: null,
      });
    }
  }, [isConnected, address]);

  return (
    <RecyclingContext.Provider
      value={{
        recyclingData,
        loading,
        error,
        refetchRecyclingData,
      }}
    >
      {children}
    </RecyclingContext.Provider>
  );
};

export function useRecycling() {
  const context = useContext(RecyclingContext);
  if (!context) {
    throw new Error('useRecycling must be used within a RecyclingProvider');
  }
  return context;
}
