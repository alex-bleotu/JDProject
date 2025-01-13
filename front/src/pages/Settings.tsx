import React, { useState, useEffect } from 'react';
import { LogOut, Wallet, User, Shield, AlertCircle } from 'lucide-react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { supabase } from '../lib/supabase';

export function Settings() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [userEmail, setUserEmail] = useState<string>('');
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

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
      setLoading(true);
      setError(null);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;
      if (!user) {
        setError('User not found');
        return;
      }

      setUserEmail(user.email || '');

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        if (profileError.code === 'PGRST116') {
          // Profile doesn't exist, create it
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .upsert([{ id: user.id }])
            .select()
            .single();

          if (createError) throw createError;
          setProfile(newProfile);
        } else {
          throw profileError;
        }
      } else {
        setProfile(profile);
      }
    } catch (error: any) {
      console.error('Error loading profile:', error);
      setError(error.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  }

  async function updateWalletAddress(address: string) {
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase
        .from('profiles')
        .update({ wallet_address: address })
        .eq('id', profile.id);

      if (error) throw error;
      await loadProfile();
    } catch (error: any) {
      console.error('Error updating wallet:', error);
      setError(error.message || 'Failed to update wallet address');
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      console.error('Error signing out:', error);
      setError(error.message || 'Failed to sign out');
    } finally {
      setLoading(false);
    }
  }

  async function handlePasswordReset() {
    try {
      setLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(userEmail, {
        redirectTo: `${window.location.origin}/auth`,
      });

      if (error) throw error;

      setMessage({
        type: 'success',
        text: 'Password reset email has been sent to your inbox',
      });

      setTimeout(() => setMessage(null), 5000);
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.message || 'Failed to send reset email',
      });
    } finally {
      setLoading(false);
    }
  }

  function formatDate(dateString: string) {
    if (!dateString) return 'Loading...';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-secondary-600 dark:text-secondary-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-4 rounded-lg flex items-center">
          <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
      {/* Rest of the component remains the same */}
      {/* ... */}
    </div>
  );
}