import React from 'react';
import { Wallet, Recycle, Award, ArrowRight } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: Wallet,
      title: 'Connect Your Wallet',
      description:
        'Link your digital wallet to start tracking your recycling journey securely on the blockchain.',
    },
    {
      icon: Recycle,
      title: 'Recycle Materials',
      description:
        'Visit any of our recycling points to deposit your recyclable materials.',
    },
    {
      icon: Award,
      title: 'Earn Rewards',
      description:
        'Get rewarded with tokens and NFTs for your environmental contributions.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-secondary-800 dark:text-secondary-200 mb-4">
          How RecycleChain Works
        </h1>
        <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto">
          Join our community and start making a positive impact on the
          environment while earning rewards for your contributions.
        </p>
      </div>

      <div className="relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-primary-200 dark:bg-primary-800 -translate-y-1/2 hidden md:block"></div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-secondary-200 dark:border-secondary-700">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-800 dark:text-secondary-200 text-center mb-4">
                  {step.title}
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400 text-center">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 -translate-y-1/2 -translate-x-1/2">
                  <ArrowRight className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20">
        <h2 className="text-3xl font-bold text-secondary-800 dark:text-secondary-200 text-center mb-12">
          Benefits of Using RecycleChain
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-secondary-200 dark:border-secondary-700">
            <h3 className="text-xl font-semibold text-secondary-800 dark:text-secondary-200 mb-4">
              Transparent Tracking
            </h3>
            <p className="text-secondary-600 dark:text-secondary-400">
              Monitor your recycling impact with blockchain-verified
              transactions
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-secondary-200 dark:border-secondary-700">
            <h3 className="text-xl font-semibold text-secondary-800 dark:text-secondary-200 mb-4">
              Earn While You Recycle
            </h3>
            <p className="text-secondary-600 dark:text-secondary-400">
              Get rewarded with tokens for every recycling contribution
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-secondary-200 dark:border-secondary-700">
            <h3 className="text-xl font-semibold text-secondary-800 dark:text-secondary-200 mb-4">
              Community Impact
            </h3>
            <p className="text-secondary-600 dark:text-secondary-400">
              Join a network of environmentally conscious individuals
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
