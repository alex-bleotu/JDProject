import { Coins } from "lucide-react";
import { useBalance } from "../contexts/BalanceContext";

interface BalanceDisplayProps {
    variant?: "navbar" | "sidebar";
}

export function BalanceDisplay({ variant = "navbar" }: BalanceDisplayProps) {
    const { balance, loading } = useBalance();

    if (loading) {
        return (
            <div
                className={`flex items-center ${
                    variant === "sidebar" ? "px-4 py-2" : ""
                }`}>
                <div className="animate-pulse flex items-center space-x-2">
                    <Coins className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    <div className="h-4 w-16 bg-secondary-200 dark:bg-secondary-700 rounded"></div>
                </div>
            </div>
        );
    }

    if (!balance) return null;

    if (variant === "sidebar") {
        return (
            <div className="flex items-center space-x-2 px-4 py-2 text-secondary-600 dark:text-secondary-400">
                <Coins className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                <span>{balance} RCT</span>
            </div>
        );
    }

    return (
        <div className="flex items-center space-x-2 px-3 py-2 bg-primary-50 dark:bg-primary-900/50 rounded-lg">
            <Coins className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <span className="font-medium text-primary-700 dark:text-primary-300">
                {balance} RCT
            </span>
        </div>
    );
}
