import { Link } from "react-router-dom";
import { AuthForm } from "../components/AuthForm";
import { ThemeToggle } from "../components/ThemeToggle";

export function AuthPage() {
    return (
        <div
            className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
            }}>
            <header className="p-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link to="/" className="flex items-center space-x-2">
                        <img
                            src="/logo.svg"
                            alt="RecycleChain Logo"
                            className="w-8 h-8"
                        />
                        <span className="text-xl font-bold text-white">
                            RecycleChain
                        </span>
                    </Link>
                    <ThemeToggle />
                </div>
            </header>

            <div className="flex-grow flex items-center justify-center p-4">
                <AuthForm />
            </div>
        </div>
    );
}
