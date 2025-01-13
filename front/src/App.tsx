import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
    Navigate,
    Route,
    BrowserRouter as Router,
    Routes,
    useLocation,
} from "react-router-dom";
import { WagmiProvider } from "wagmi";
import { Footer } from "./components/Footer";
import { MetaMaskAlert } from "./components/MetaMaskAlert";
import { Navbar } from "./components/Navbar";
import { ScrollToTop } from "./components/ScrollToTop";
import { BalanceProvider } from "./contexts/BalanceContext";
import { NFTProvider } from "./contexts/NFTContext";
import { RecyclingProvider } from "./contexts/RecycleContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useAuth } from "./hooks/useAuth";
import { config } from "./lib/wagmi";
import { AboutUs } from "./pages/AboutUs";
import { Analytics } from "./pages/Analytics";
import { AuthPage } from "./pages/AuthPage";
import { Contact } from "./pages/Contact";
import { HomePage } from "./pages/HomePage";
import { HowItWorks } from "./pages/HowItWorks";
import { QRCode } from "./pages/QRCode";
import { RecyclePoints } from "./pages/RecyclePoints";
import { Rewards } from "./pages/Rewards";
import { Settings } from "./pages/Settings";

const queryClient = new QueryClient();

function AppContent() {
    const { session } = useAuth();
    const location = useLocation();

    const isAuthPage = location.pathname === "/auth";

    if (session === undefined && !isAuthPage) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-600 dark:border-primary-400"></div>
            </div>
        );
    }

    if (!session && !isAuthPage) {
        return <Navigate to="/auth" replace />;
    }

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors">
            {!isAuthPage && <Navbar />}
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/how-it-works" element={<HowItWorks />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route
                        path="/settings"
                        element={
                            session ? (
                                <Settings />
                            ) : (
                                <Navigate to="/auth" replace />
                            )
                        }
                    />
                    <Route
                        path="/rewards"
                        element={
                            session ? (
                                <Rewards />
                            ) : (
                                <Navigate to="/auth" replace />
                            )
                        }
                    />
                    <Route
                        path="/analytics"
                        element={
                            session ? (
                                <Analytics />
                            ) : (
                                <Navigate to="/auth" replace />
                            )
                        }
                    />
                    <Route
                        path="/qr-code"
                        element={
                            session ? (
                                <QRCode />
                            ) : (
                                <Navigate to="/auth" replace />
                            )
                        }
                    />
                    <Route path="/recycle-points" element={<RecyclePoints />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
            {!isAuthPage && <Footer />}
            <MetaMaskAlert />
            <ScrollToTop />
        </div>
    );
}

export default function App() {
    return (
        <ThemeProvider>
            <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}>
                    <RecyclingProvider>
                        <BalanceProvider>
                            <NFTProvider>
                                <Router>
                                    <AppContent />
                                </Router>
                            </NFTProvider>
                        </BalanceProvider>
                    </RecyclingProvider>
                </QueryClientProvider>
            </WagmiProvider>
        </ThemeProvider>
    );
}
