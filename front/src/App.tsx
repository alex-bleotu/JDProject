import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { RecyclingProvider } from './contexts/RecycleContext';
import { BalanceProvider } from './contexts/BalanceContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { NFTProvider } from './contexts/NFTContext';
import { config } from './lib/wagmi';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { Settings } from './pages/Settings';
import { Rewards } from './pages/Rewards';
import { Analytics } from './pages/Analytics';
import { RecyclePoints } from './pages/RecyclePoints';
import { QRCode } from './pages/QRCode';
import { AuthPage } from './pages/AuthPage';
import { AboutUs } from './pages/AboutUs';
import { HowItWorks } from './pages/HowItWorks';
import { Contact } from './pages/Contact';
import { Footer } from './components/Footer';
import { MetaMaskAlert } from './components/MetaMaskAlert';
import { ScrollToTop } from './components/ScrollToTop';
import { useAuth } from './hooks/useAuth';

const queryClient = new QueryClient();

function AppContent() {
  const { session } = useAuth();
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';

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
            element={session ? <Settings /> : <Navigate to="/auth" />}
          />
          <Route
            path="/rewards"
            element={session ? <Rewards /> : <Navigate to="/auth" />}
          />
          <Route
            path="/analytics"
            element={session ? <Analytics /> : <Navigate to="/auth" />}
          />
          <Route
            path="/qr-code"
            element={session ? <QRCode /> : <Navigate to="/auth" />}
          />
          <Route path="/recycle-points" element={<RecyclePoints />} />
          <Route path="/auth" element={<AuthPage />} />
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