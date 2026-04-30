import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    role: 'user',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!form.name.trim() || !form.email.trim() || !form.password.trim() || !form.confirmPassword.trim()) {
      setError('Please fill all required fields.');
      return;
    }

    if (form.role === 'farmer' && !form.businessName.trim()) {
      setError('Please enter your farm or business name.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Password and confirm password must match.');
      return;
    }

    setSubmitting(true);

    try {
      const user = await register({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        role: form.role,
        businessName: form.role === 'farmer' ? form.businessName : undefined,
      });

      if (user.role === 'farmer') {
        navigate('/farmer-dashboard');
      } else {
        navigate('/marketplace');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to create account right now.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-green-50 via-white to-green-50 min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-white/80">
        <h1 className="text-3xl font-extrabold text-green-950 mb-1">Create your account</h1>
        <p className="text-green-900/60 text-sm mb-6">Join KissanConnect as a customer or farmer.</p>

        <div className="grid grid-cols-2 gap-2 bg-green-50/60 p-1.5 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => setForm((prev) => ({ ...prev, role: 'user' }))}
            className={`rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-200 ${
              form.role === 'user'
                ? 'bg-white text-green-950 border border-green-600/40 shadow-sm'
                : 'text-green-700/70 border border-transparent hover:bg-white/60'
            }`}
          >
            Customer
          </button>
          <button
            type="button"
            onClick={() => setForm((prev) => ({ ...prev, role: 'farmer' }))}
            className={`rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-200 ${
              form.role === 'farmer'
                ? 'bg-white text-green-950 border border-emerald-600/50 shadow-sm'
                : 'text-green-700/70 border border-transparent hover:bg-white/60'
            }`}
          >
            Farmer
          </button>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 text-red-500 text-sm font-medium px-4 py-2 rounded-lg">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-green-950 mb-1.5">
              Full Name
            </label>
            <input
              id="name"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-600/50 focus:border-green-600/40"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              autoComplete="name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-green-950 mb-1.5">
              Email
            </label>
            <input
              id="email"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-600/50 focus:border-green-600/40"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-green-950 mb-1.5">
              Password
            </label>
            <input
              id="password"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-600/50 focus:border-green-600/40"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
              minLength={6}
              autoComplete="new-password"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-green-950 mb-1.5">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-600/50 focus:border-green-600/40"
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              required
              minLength={6}
              autoComplete="new-password"
            />
          </div>

          {form.role === 'farmer' && (
            <div>
              <label htmlFor="businessName" className="block text-sm font-semibold text-green-950 mb-1.5">
                Farm Name or Business Name
              </label>
              <input
                id="businessName"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-600/50 focus:border-green-600/40"
                name="businessName"
                value={form.businessName}
                onChange={handleChange}
                placeholder="Enter your farm or business name"
                required
              />
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold transition-all duration-150 shadow-[0_8px_0_rgba(0,0,0,0.14)] hover:-translate-y-[1px] hover:shadow-[0_10px_0_rgba(0,0,0,0.14)] active:translate-y-[2px] active:shadow-[0_3px_0_rgba(0,0,0,0.16)] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-sm text-green-700/70 text-center mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-green-700 font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
