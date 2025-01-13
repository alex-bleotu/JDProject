import { AlertCircle, Lock, Mail, Recycle } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export function AuthForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [message, setMessage] = useState<{
        type: "error" | "success";
        text: string;
    } | null>(null);
    const navigate = useNavigate();

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            if (isSignUp) {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                });

                if (error) throw error;

                setMessage({
                    type: "success",
                    text: "Account created successfully!",
                });

                setIsSignUp(false);
            } else {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });

                if (error) throw error;

                const { data: user } = await supabase.auth.getUser();
                if (!user?.user?.email_confirmed_at) {
                    throw new Error(
                        "Your email address is not verified. Please verify your email before logging in."
                    );
                }

                navigate("/");
            }
        } catch (error: any) {
            setMessage({ type: "error", text: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md p-8 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-xl shadow-2xl transform transition-all">
            <div className="flex flex-col items-center mb-8">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4">
                    <Recycle className="w-10 h-10 text-primary-600 dark:text-primary-400" />
                </div>
                <h2 className="text-3xl font-bold text-secondary-800 dark:text-secondary-200">
                    {isSignUp ? "Join RecycleChain" : "Welcome Back"}
                </h2>
                <p className="mt-2 text-secondary-600 dark:text-secondary-400 text-center">
                    {isSignUp
                        ? "Create an account to start your recycling journey"
                        : "Sign in to continue your eco-friendly impact"}
                </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                            Email
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 dark:text-secondary-500 w-5 h-5" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-10 w-full px-4 py-3 bg-white dark:bg-gray-800 border border-secondary-300 dark:border-secondary-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-secondary-900 dark:text-secondary-100"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 dark:text-secondary-500 w-5 h-5" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pl-10 w-full px-4 py-3 bg-white dark:bg-gray-800 border border-secondary-300 dark:border-secondary-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-secondary-900 dark:text-secondary-100"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                    </div>
                </div>

                {message && (
                    <div
                        className={`p-4 rounded-lg flex items-center space-x-2 ${
                            message.type === "error"
                                ? "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300"
                                : "bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300"
                        }`}>
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm">{message.text}</span>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-primary-600 dark:bg-primary-500 hover:bg-primary-700 dark:hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24">
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                        </span>
                    ) : isSignUp ? (
                        "Create Account"
                    ) : (
                        "Sign In"
                    )}
                </button>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-secondary-300 dark:border-secondary-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white dark:bg-gray-900 text-secondary-500 dark:text-secondary-400">
                            or
                        </span>
                    </div>
                </div>

                <p className="text-center text-sm text-secondary-600 dark:text-secondary-400">
                    {isSignUp
                        ? "Already have an account?"
                        : "Don't have an account?"}{" "}
                    <button
                        type="button"
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 transition-colors">
                        {isSignUp ? "Sign In" : "Sign Up"}
                    </button>
                </p>
            </form>
        </div>
    );
}
