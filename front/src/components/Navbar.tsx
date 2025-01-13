import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Settings, 
  Award, 
  MapPin, 
  LineChart, 
  QrCode, 
  Menu, 
  X, 
  Wallet,
  Info,
  HelpCircle,
  Mail
} from 'lucide-react';
import { WalletConnect } from './WalletConnect';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../hooks/useAuth';
import { BalanceDisplay } from './BalanceDisplay';

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { session } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => {
      const newState = !prev;
      if (newState) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      return newState;
    });
  };

  const publicLinks = [
    { to: '/about', icon: Info, label: 'About Us' },
    { to: '/how-it-works', icon: HelpCircle, label: 'How It Works' },
    { to: '/contact', icon: Mail, label: 'Contact' },
    { to: '/recycle-points', icon: MapPin, label: 'Recycle Points' },
  ];

  const privateLinks = [
    { to: '/analytics', icon: LineChart, label: 'Analytics' },
    { to: '/rewards', icon: Award, label: 'Rewards' },
    { to: '/qr-code', icon: QrCode, label: 'QR Code' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      {/* Mobile Drawer */}
      <div className={`fixed inset-y-0 left-0 w-72 bg-white dark:bg-gray-800 transform ${
        isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-200 ease-in-out z-50 lg:hidden flex flex-col`}>
        {/* Drawer Header */}
        <div className="p-4 border-b border-secondary-200 dark:border-secondary-700">
          <div className="flex justify-between items-center mb-2">
            <Link to="/" className="flex items-center space-x-2" onClick={() => setIsDrawerOpen(false)}>
              <img src="/logo.svg" alt="RecycleChain Logo" className="w-8 h-8" />
              <span className="text-xl font-bold text-primary-600">RecycleChain</span>
            </Link>
            <button 
              onClick={toggleDrawer}
              className="p-2 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-700"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />
            </button>
          </div>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto">
          <nav className="p-4">
            <div className="space-y-2">
              {session ? (
                <>
                  {privateLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsDrawerOpen(false)}
                      className={`flex items-center space-x-3 p-3 rounded-lg ${
                        location.pathname === link.to
                          ? 'bg-primary-100 dark:bg-primary-800 text-primary-600 dark:text-primary-400'
                          : 'text-secondary-600 dark:text-secondary-400 hover:bg-secondary-100 dark:hover:bg-secondary-800'
                      }`}
                    >
                      <link.icon className="w-5 h-5" />
                      <span>{link.label}</span>
                    </Link>
                  ))}
                </>
              ) : (
                <div className="mb-6">
                  <button
                    onClick={() => {
                      navigate('/auth');
                      setIsDrawerOpen(false);
                    }}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-primary-600 dark:bg-primary-500 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors"
                  >
                    <Wallet className="w-5 h-5" />
                    <span>Join Now</span>
                  </button>
                </div>
              )}

              <div className="pt-4 border-t border-secondary-200 dark:border-secondary-700">
                {publicLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsDrawerOpen(false)}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${
                      location.pathname === link.to
                        ? 'bg-primary-100 dark:bg-primary-800 text-primary-600 dark:text-primary-400'
                        : 'text-secondary-600 dark:text-secondary-400 hover:bg-secondary-100 dark:hover:bg-secondary-800'
                    }`}
                  >
                    <link.icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-secondary-200 dark:border-secondary-700">
          <div className="flex justify-between items-center">
            <ThemeToggle />
            {session && <BalanceDisplay variant="sidebar" />}
          </div>
          <div className="mt-4">
            <WalletConnect />
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Desktop Navbar */}
      <nav className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm sticky top-0 z-40 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={toggleDrawer}
                className="p-2 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-700 lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />
              </button>
              <Link to="/" className="flex items-center space-x-2 ml-2 lg:ml-0">
                <img src="/logo.svg" alt="RecycleChain Logo" className="w-8 h-8" />
                <span className="text-xl font-bold text-primary-600">RecycleChain</span>
              </Link>
            </div>
            
            {/* Desktop Right Side */}
            <div className="hidden lg:flex items-center space-x-4">
              <ThemeToggle />
              <Link
                to="/recycle-points"
                className={`p-2 rounded-full hover:bg-primary-100 dark:hover:bg-primary-800 transition-colors ${
                  location.pathname === '/recycle-points' ? 'bg-primary-100 dark:bg-primary-800' : ''
                }`}
                title="Recycle Points"
              >
                <MapPin className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </Link>
              {session ? (
                <>
                  <BalanceDisplay />
                  <WalletConnect />
                  <Link
                    to="/analytics"
                    className={`p-2 rounded-full hover:bg-primary-100 dark:hover:bg-primary-800 transition-colors ${
                      location.pathname === '/analytics' ? 'bg-primary-100 dark:bg-primary-800' : ''
                    }`}
                    title="Analytics"
                  >
                    <LineChart className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </Link>
                  <Link
                    to="/rewards"
                    className={`p-2 rounded-full hover:bg-primary-100 dark:hover:bg-primary-800 transition-colors ${
                      location.pathname === '/rewards' ? 'bg-primary-100 dark:bg-primary-800' : ''
                    }`}
                    title="Rewards"
                  >
                    <Award className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </Link>
                  <Link
                    to="/qr-code"
                    className={`p-2 rounded-full hover:bg-primary-100 dark:hover:bg-primary-800 transition-colors ${
                      location.pathname === '/qr-code' ? 'bg-primary-100 dark:bg-primary-800' : ''
                    }`}
                    title="QR Code"
                  >
                    <QrCode className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </Link>
                  <Link
                    to="/settings"
                    className={`p-2 rounded-full hover:bg-primary-100 dark:hover:bg-primary-800 transition-colors ${
                      location.pathname === '/settings' ? 'bg-primary-100 dark:bg-primary-800' : ''
                    }`}
                    title="Settings"
                  >
                    <Settings className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => navigate('/auth')}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-600 dark:bg-primary-500 rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors"
                >
                  Join Now
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}