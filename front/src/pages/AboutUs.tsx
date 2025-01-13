import React from 'react';
import { Leaf, Globe, Award, Users, Heart, Shield } from 'lucide-react';

export function AboutUs() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-secondary-800 dark:text-secondary-200 mb-4">
          About RecycleChain
        </h1>
        <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto">
          We're on a mission to revolutionize recycling through blockchain
          technology, making it more transparent, rewarding, and accessible for
          everyone.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold text-secondary-800 dark:text-secondary-200 mb-4">
            Our Mission
          </h2>
          <p className="text-secondary-600 dark:text-secondary-400 mb-6">
            At RecycleChain, we believe in creating a sustainable future through
            innovative technology and community engagement. Our platform
            combines blockchain transparency with environmental responsibility
            to make recycling more rewarding and efficient.
          </p>
          <div className="space-y-4">
            <div className="flex items-start">
              <Globe className="w-6 h-6 text-primary-600 dark:text-primary-400 mt-1" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-secondary-800 dark:text-secondary-200">
                  Global Impact
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400">
                  Making a positive environmental impact on a global scale
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Heart className="w-6 h-6 text-primary-600 dark:text-primary-400 mt-1" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-secondary-800 dark:text-secondary-200">
                  Community First
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400">
                  Building a community of environmentally conscious individuals
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Recycling Impact"
            className="rounded-lg shadow-xl"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg mb-20">
        <h2 className="text-3xl font-bold text-secondary-800 dark:text-secondary-200 text-center mb-12">
          Our Values
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-xl font-semibold text-secondary-800 dark:text-secondary-200 mb-2">
              Sustainability
            </h3>
            <p className="text-secondary-600 dark:text-secondary-400">
              Promoting sustainable practices and environmental consciousness
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-xl font-semibold text-secondary-800 dark:text-secondary-200 mb-2">
              Transparency
            </h3>
            <p className="text-secondary-600 dark:text-secondary-400">
              Ensuring clear and verifiable recycling processes through
              blockchain
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-xl font-semibold text-secondary-800 dark:text-secondary-200 mb-2">
              Community
            </h3>
            <p className="text-secondary-600 dark:text-secondary-400">
              Building a strong network of environmentally conscious individuals
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
