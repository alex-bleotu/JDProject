import React from 'react';
import {
  Recycle,
  Leaf,
  RotateCw,
  TreePine,
  Award,
  Users,
  TrendingUp,
  Globe,
  Smartphone,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const slides = [
  'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
];

const stats = [
  { icon: Users, label: 'Active Users', value: '10,000+' },
  { icon: TreePine, label: 'Trees Saved', value: '50,000+' },
  { icon: Recycle, label: 'Items Recycled', value: '1M+' },
  { icon: Award, label: 'Rewards Given', value: '100K+' },
];

const features = [
  {
    icon: Leaf,
    title: 'Eco-Friendly',
    description: 'Make a positive impact on the environment by tracking and verifying your recycling efforts.',
  },
  {
    icon: RotateCw,
    title: 'Blockchain Powered',
    description: 'Secure and transparent tracking of recycling activities using blockchain technology.',
  },
  {
    icon: TrendingUp,
    title: 'Earn Rewards',
    description: 'Get rewarded with tokens and NFTs for your environmental contributions.',
  },
];

const howItWorks = [
  {
    icon: Smartphone,
    title: 'Connect Wallet',
    description: 'Link your digital wallet to start your recycling journey',
  },
  {
    icon: Globe,
    title: 'Find Bins',
    description: 'Locate smart recycling bins near you',
  },
  {
    icon: Recycle,
    title: 'Recycle',
    description: 'Deposit items and scan your QR code',
  },
  {
    icon: Sparkles,
    title: 'Earn Rewards',
    description: 'Get tokens and NFTs for your contributions',
  },
];

const impactMetrics = [
  {
    label: 'CO2 Reduction',
    value: '500,000kg',
    description: 'Carbon dioxide emissions prevented',
  },
  {
    label: 'Water Saved',
    value: '2M Liters',
    description: 'Water preserved through recycling',
  },
  {
    label: 'Energy Saved',
    value: '1.5M kWh',
    description: 'Energy conserved via recycling',
  },
];

export function HomePage() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <div className="relative min-h-[600px] md:h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url('${slide}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
          </div>
        ))}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-2xl text-white py-12 md:py-0">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight">
              Transform Waste into Value with RecycleChain
            </h1>
            <p className="text-lg md:text-xl mb-6 md:mb-8 text-gray-200">
              Join the future of recycling. Track your environmental impact, earn rewards,
              and make a difference with blockchain technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/how-it-works')}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-center"
              >
                Learn More
              </button>
              {!session && (
                <button
                  onClick={() => navigate('/auth')}
                  className="px-6 py-3 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition-colors text-center"
                >
                  Join Now
                </button>
              )}
            </div>
          </div>
        </div>
        {/* Slide indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-white w-4'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 text-center shadow-sm border border-secondary-200 dark:border-secondary-700 hover:shadow-lg transition-shadow"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="text-xl md:text-3xl font-bold text-secondary-800 dark:text-secondary-200 mb-1 md:mb-2">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-secondary-600 dark:text-secondary-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-secondary-50 dark:bg-secondary-900/50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary-800 dark:text-secondary-200 mb-4">
              How RecycleChain Works
            </h2>
            <p className="text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
              Start your recycling journey in four simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-sm border border-secondary-200 dark:border-secondary-700 hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-secondary-800 dark:text-secondary-200 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    {step.description}
                  </p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary-800 dark:text-secondary-200 mb-4">
            Features & Benefits
          </h2>
          <p className="text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
            Discover how RecycleChain revolutionizes recycling
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 backdrop-blur-sm rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow border border-secondary-200 dark:border-secondary-700"
            >
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-800 dark:text-secondary-200 mb-2">
                {feature.title}
              </h3>
              <p className="text-secondary-600 dark:text-secondary-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Impact Section */}
      <div className="bg-primary-600 dark:bg-primary-700 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Our Environmental Impact
            </h2>
            <p className="text-primary-100 max-w-2xl mx-auto">
              Together, we're making a measurable difference
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {impactMetrics.map((metric, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
              >
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {metric.value}
                </div>
                <div className="text-lg font-semibold text-primary-100 mb-1">
                  {metric.label}
                </div>
                <p className="text-primary-200">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-secondary-50 dark:bg-secondary-900/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary-800 dark:text-secondary-200 mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-secondary-600 dark:text-secondary-400 mb-8 max-w-2xl mx-auto">
            Join thousands of environmentally conscious individuals who are
            already making a positive impact through RecycleChain.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {!session && (
              <button
                onClick={() => navigate('/auth')}
                className="px-8 py-3 bg-primary-600 dark:bg-primary-500 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors font-medium"
              >
                Join Now
              </button>
            )}
            <button
              onClick={() => navigate('/recycle-points')}
              className="px-8 py-3 bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-primary-50 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              Find Recycling Points
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}