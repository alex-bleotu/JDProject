import { LogOut, Shield, User, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { supabase } from "../lib/supabase";

export function Settings() {
    const { address, isConnected } = useAccount();
    const { connect, connectors } = useConnect();
    const { disconnect } = useDisconnect();
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState<any>(null);
    const [userEmail, setUserEmail] = useState<string>("");

    useEffect(() => {
        loadProfile();
    }, []);

    useEffect(() => {
        if (address && profile?.id) {
            updateWalletAddress(address);
        }
    }, [address, profile]);

    async function loadProfile() {
        try {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            if (!user) return;

            setUserEmail(user.email || "");

            const { data: profile, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", user.id)
                .single();

            if (error) {
                if (error.code === "PGRST116") {
                    const { data: newProfile, error: insertError } =
                        await supabase
                            .from("profiles")
                            .upsert([{ id: user.id }])
                            .select()
                            .single();

                    if (insertError) throw insertError;
                    setProfile(newProfile);
                } else {
                    throw error;
                }
            } else {
                setProfile(profile);
            }
        } catch (error) {
            console.error("Error loading profile:", error);
        }
    }

    async function updateWalletAddress(address: string) {
        try {
            setLoading(true);
            const { error } = await supabase
                .from("profiles")
                .update({ wallet_address: address })
                .eq("id", profile.id);

            if (error) throw error;
            await loadProfile();
        } catch (error) {
            console.error("Error updating wallet:", error);
        } finally {
            setLoading(false);
        }
    }

    async function handleSignOut() {
        await supabase.auth.signOut();
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-secondary-800 dark:text-secondary-200 mb-2">
                    Account Settings
                </h1>
                <p className="text-secondary-600 dark:text-secondary-400">
                    Manage your account preferences and connected services
                </p>
            </div>

            <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-secondary-200 dark:border-secondary-700 overflow-hidden">
                    <div className="p-6 border-b border-secondary-200 dark:border-secondary-700">
                        <div className="flex items-center space-x-2">
                            <User className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                            <h2 className="text-xl font-semibold text-secondary-800 dark:text-secondary-200">
                                Profile Information
                            </h2>
                        </div>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                                Email Address
                            </label>
                            <p className="text-secondary-900 dark:text-secondary-100 bg-secondary-50 dark:bg-secondary-900 px-4 py-2.5 rounded-lg">
                                {userEmail}
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                                Member Since
                            </label>
                            <p className="text-secondary-900 dark:text-secondary-100 bg-secondary-50 dark:bg-secondary-900 px-4 py-2.5 rounded-lg">
                                {profile?.created_at
                                    ? new Date(
                                          profile.created_at
                                      ).toLocaleDateString()
                                    : "Loading..."}
                            </p>
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={handleSignOut}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/50 transition-colors">
                                <LogOut className="w-4 h-4 mr-2" />
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-secondary-200 dark:border-secondary-700 overflow-hidden">
                    <div className="p-6 border-b border-secondary-200 dark:border-secondary-700">
                        <div className="flex items-center space-x-2">
                            <Wallet className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                            <h2 className="text-xl font-semibold text-secondary-800 dark:text-secondary-200">
                                Wallet Connection
                            </h2>
                        </div>
                    </div>
                    <div className="p-6">
                        {isConnected ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                                        Connected Wallet
                                    </label>
                                    <div className="flex items-center justify-between bg-secondary-50 dark:bg-secondary-900 px-4 py-2.5 rounded-lg">
                                        <span className="text-secondary-900 dark:text-secondary-100 font-mono">
                                            {address}
                                        </span>
                                        <button
                                            onClick={() => disconnect()}
                                            className="ml-4 px-3 py-1 text-sm font-medium text-red-600 dark:text-red-400 rounded-md hover:bg-red-50 dark:hover:bg-red-900/50 transition-colors">
                                            Disconnect
                                        </button>
                                    </div>
                                </div>
                                <p className="text-sm text-secondary-600 dark:text-secondary-400">
                                    Your wallet is successfully connected and
                                    ready for transactions.
                                </p>
                            </div>
                        ) : (
                            <div className="text-center py-4">
                                <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                                    Connect your wallet to start tracking your
                                    recycling impact
                                </p>
                                <button
                                    onClick={() =>
                                        connect({ connector: connectors[0] })
                                    }
                                    disabled={loading}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 dark:bg-primary-500 rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors disabled:opacity-50">
                                    <Wallet className="w-4 h-4 mr-2" />
                                    {loading
                                        ? "Connecting..."
                                        : "Connect Wallet"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-secondary-200 dark:border-secondary-700 overflow-hidden">
                    <div className="p-6 border-b border-secondary-200 dark:border-secondary-700">
                        <div className="flex items-center space-x-2">
                            <Shield className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                            <h2 className="text-xl font-semibold text-secondary-800 dark:text-secondary-200">
                                Security
                            </h2>
                        </div>
                    </div>
                    <div className="p-6">
                        <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
                            Change Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
