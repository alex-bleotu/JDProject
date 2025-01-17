import { Wallet } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAccount, useConnect } from "wagmi";
import { useAuth } from "../hooks/useAuth";
import { WalletConnect } from "./WalletConnect";

export function Footer() {
    const navigate = useNavigate();
    const { session } = useAuth();
    const { isConnected } = useAccount();
    const { connect, connectors } = useConnect();

    return (
        <footer className="bg-white dark:bg-gray-900 border-t dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <img
                                src="/logo.svg"
                                alt="RecycleChain Logo"
                                className="w-10 h-10"
                            />
                            <span className="text-xl font-bold text-primary-700">
                                RecycleChain
                            </span>
                        </div>
                        <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                            Join the revolution in recycling. Track your impact,
                            earn rewards, and help save the planet.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-secondary-800 dark:text-secondary-200 uppercase mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    to="/about"
                                    className="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/how-it-works"
                                    className="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400">
                                    How It Works
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    className="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {!session ? (
                        <div>
                            <h3 className="text-sm font-semibold text-secondary-800 dark:text-secondary-200 uppercase mb-4">
                                Get Started
                            </h3>
                            <div className="space-y-4">
                                <button
                                    onClick={() => navigate("/auth")}
                                    className="w-full px-4 py-2 text-sm font-medium text-white bg-primary-600 dark:bg-primary-500 rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors">
                                    Join Now
                                </button>
                            </div>
                        </div>
                    ) : !isConnected ? (
                        <div>
                            <h3 className="text-sm font-semibold text-secondary-800 dark:text-secondary-200 uppercase mb-4">
                                Connect Wallet
                            </h3>
                            <div className="space-y-4">
                                <button
                                    onClick={() =>
                                        connect({ connector: connectors[0] })
                                    }
                                    className="w-full px-4 py-2 text-sm font-medium text-white bg-primary-600 dark:bg-primary-500 rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors">
                                    <Wallet className="w-4 h-4 inline-block mr-2" />
                                    Connect Wallet
                                </button>
                            </div>
                        </div>
                    ) : (
                        <WalletConnect />
                    )}
                </div>

                <div className="border-t dark:border-gray-800 mt-8 pt-8 text-center text-sm text-secondary-600 dark:text-secondary-400">
                    <p>
                        &copy; {new Date().getFullYear()} RecycleChain. All
                        rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
