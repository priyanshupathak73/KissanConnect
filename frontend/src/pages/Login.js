import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate simple login
    navigate('/products');
  };

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-green-100">
        <h2 className="text-3xl font-bold text-secondary mb-6 text-center">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <div>
              <label className="block text-gray-700 mb-1">Name</label>
              <input type="text" required className="w-full px-4 py-2 border rounded focus:outline-none focus:border-secondary" placeholder="John Doe" />
            </div>
          )}
          
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input type="email" required className="w-full px-4 py-2 border rounded focus:outline-none focus:border-secondary" placeholder="john@example.com" />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input type="password" required className="w-full px-4 py-2 border rounded focus:outline-none focus:border-secondary" placeholder="••••••••" />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-gray-700 mb-1">Role</label>
              <select className="w-full px-4 py-2 border rounded focus:outline-none focus:border-secondary">
                <option value="buyer">Buyer</option>
                <option value="farmer">Farmer</option>
              </select>
            </div>
          )}

          <button type="submit" className="bg-accent hover:bg-orange-600 text-white font-bold py-2 rounded mt-2 transition-colors">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-secondary font-semibold hover:underline"
            >
              {isLogin ? 'Register' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
