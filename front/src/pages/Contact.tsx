import React, { useState } from 'react';
import { Send, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-secondary-800 dark:text-secondary-200 mb-4">
          Contact Us
        </h1>
        <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto">
          Have questions about RecycleChain? We're here to help!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-secondary-200 dark:border-secondary-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-secondary-300 dark:border-secondary-700 bg-white dark:bg-gray-900 text-secondary-900 dark:text-secondary-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-secondary-300 dark:border-secondary-700 bg-white dark:bg-gray-900 text-secondary-900 dark:text-secondary-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-secondary-300 dark:border-secondary-700 bg-white dark:bg-gray-900 text-secondary-900 dark:text-secondary-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-secondary-300 dark:border-secondary-700 bg-white dark:bg-gray-900 text-secondary-900 dark:text-secondary-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </span>
              )}
            </button>
            {submitted && (
              <div className="flex items-center justify-center text-green-600 dark:text-green-400 mt-4">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>Message sent successfully!</span>
              </div>
            )}
          </form>
        </div>

        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-secondary-200 dark:border-secondary-700">
            <h2 className="text-2xl font-bold text-secondary-800 dark:text-secondary-200 mb-6">
              Get in Touch
            </h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-primary-600 dark:text-primary-400 mt-1" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-secondary-800 dark:text-secondary-200">
                    Email
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    alexbleotu@gmail.com
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="w-6 h-6 text-primary-600 dark:text-primary-400 mt-1" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-secondary-800 dark:text-secondary-200">
                    Phone
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    +40 756 775 906
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-primary-600 dark:text-primary-400 mt-1" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-secondary-800 dark:text-secondary-200">
                    Office
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400">
                    Steagu
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}