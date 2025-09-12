
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { EnvelopeIcon, KeyIcon } from '@heroicons/react/24/outline';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Function to request OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: 'Sending OTP...' });

    try {
      // REMINDER: In Resend's free plan, this email MUST be the one you registered with.
      await axios.post('/api/auth/request-otp', { email });
      setOtpSent(true);
      setMessage({ type: 'success', text: `An OTP has been sent to ${email}.` });
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: 'Failed to send OTP. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to verify OTP and log in
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: 'Verifying OTP...' });

    try {
      await axios.post('/api/auth/verify-otp', { email, otp });
      setMessage({ type: 'success', text: 'Login successful! Redirecting...' });
      // Redirect to the homepage after successful login
      router.push('/');
    } catch (error) {
      console.error(error);
      const errorMsg = error.response?.data?.message || 'Invalid or expired OTP. Please try again.';
      setMessage({ type: 'error', text: errorMsg });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Login / Register</h1>
          <p className="text-gray-500 mt-2">Enter your email to receive a one-time password.</p>
        </div>

        {!otpSent ? (
          // STEP 1: Email Form
          <form onSubmit={handleRequestOtp} className="space-y-5">
            <div className="relative">
              <EnvelopeIcon className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email Address"
                required
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-gray-800"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all duration-300"
            >
              {isLoading ? 'Sending...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          // STEP 2: OTP Form
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <div className="relative">
              <KeyIcon className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500" />
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                required
                maxLength="6"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-gray-800"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 font-semibold text-white bg-gradient-to-r from-green-500 to-teal-600 rounded-lg shadow-md hover:from-green-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 transition-all duration-300"
            >
              {isLoading ? 'Verifying...' : 'Verify OTP & Login'}
            </button>
            <button
              type="button"
              onClick={() => { setOtpSent(false); setMessage({ type: '', text: '' }); }}
              className="text-center w-full text-sm text-gray-600 hover:underline"
            >
              Use a different email
            </button>
          </form>
        )}

        {/* Display success or error messages */}
        {message.text && (
          <div className={`mt-4 text-center p-3 rounded-lg text-sm font-medium ${
            message.type === 'success' ? 'bg-green-100 text-green-800' : ''
          } ${
            message.type === 'error' ? 'bg-red-100 text-red-800' : ''
          }`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}
