import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }

    setSubmitting(true);

    try {
      const user = await login(normalizedEmail, password);

      if (user.role === 'farmer') {
        navigate('/farmer-dashboard');
      } else {
        navigate('/marketplace');
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Unable to login right now.';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-green-50 via-white to-green-50 min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-white/80">
        <h1 className="text-3xl font-extrabold text-green-950 mb-1">Welcome back</h1>
        <p className="text-green-900/60 text-sm mb-6">Sign in to continue with KissanConnect.</p>

        {error && (
          <div className="mb-4 bg-red-50 text-red-500 text-sm font-medium px-4 py-2 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-green-950 mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-600/50 focus:border-green-600/40"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-green-950 mb-1.5">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-600/50 focus:border-green-600/40"
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-all duration-150 shadow-[0_8px_0_rgba(0,0,0,0.14)] hover:-translate-y-[1px] hover:scale-[1.01] hover:shadow-[0_10px_0_rgba(0,0,0,0.14)] active:translate-y-[2px] active:scale-[0.99] active:shadow-[0_3px_0_rgba(0,0,0,0.16)] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-sm text-green-700/70 text-center mt-6">
          New to KissanConnect?{' '}
          <Link to="/register" className="text-green-700 font-semibold hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
