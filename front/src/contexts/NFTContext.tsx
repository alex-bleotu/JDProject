import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { useAccount } from "wagmi";

interface NFTData {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
}

interface NFTContextProps {
    nfts: NFTData[] | null;
    loading: boolean;
    error: string | null;
    fetchNFTs: () => Promise<void>;
}

const NFTContext = createContext<NFTContextProps | undefined>(undefined);

export const NFTProvider = ({ children }: { children: ReactNode }) => {
    const { address, isConnected } = useAccount();
    const [nfts, setNFTs] = useState<NFTData[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchNFTs = async () => {
        if (!isConnected || !address) return;

        setLoading(true);
        setError(null);

        try {
            console.log("Dwdawawdwa");
            const response = await fetch(
                "http://95.179.246.157:3005/api/get/nfts",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ user: address }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch NFTs");
            }

            const data = await response.json();
            setNFTs(data.badges);
        } catch (err: any) {
            setError(err.message || "An unknown error occurred");
            setNFTs(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNFTs();
    }, [isConnected, address]);

    return (
        <NFTContext.Provider value={{ nfts, loading, error, fetchNFTs }}>
            {children}
        </NFTContext.Provider>
    );
};

export const useNFTs = () => {
    const context = useContext(NFTContext);
    if (!context) {
        throw new Error("useNFTs must be used within an NFTProvider");
    }
    return context;
};
