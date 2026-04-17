import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { orderApi, productApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

const FarmerDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ products: 0, orders: 0, earnings: 0 });

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [productRes, orderRes, earningRes] = await Promise.all([
          productApi.getProducts({ farmerId: user._id }),
          orderApi.getOrders({ farmerId: user._id }),
          orderApi.getFarmerEarnings(user._id),
        ]);

        setStats({
          products: productRes.data.length,
          orders: orderRes.data.length,
          earnings: earningRes.data.totalEarnings || 0,
        });
      } catch (error) {
        setStats({ products: 0, orders: 0, earnings: 0 });
      }
    };

    if (user?._id) {
      loadDashboard();
    }
  }, [user]);

  return (
    <div className="bg-gradient-to-b from-green-50 via-white to-green-50 min-h-screen py-10 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-green-950">Farmer Dashboard</h1>
          <p className="text-green-900/60">Manage your products, orders and earnings in one place.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <p className="text-sm text-green-900/60">Products Listed</p>
            <h3 className="text-3xl font-extrabold text-green-950 mt-1">{stats.products}</h3>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6">
            <p className="text-sm text-green-900/60">Orders Received</p>
            <h3 className="text-3xl font-extrabold text-green-950 mt-1">{stats.orders}</h3>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6">
            <p className="text-sm text-green-900/60">Total Earnings</p>
            <h3 className="text-3xl font-extrabold text-emerald-600 mt-1">₹{stats.earnings}</h3>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          <Link to="/farmer/products/new" className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all">
            <h4 className="text-xl font-bold text-green-950 mb-2">Add Product</h4>
            <p className="text-sm text-green-900/60">Upload image, set price and stock quickly.</p>
          </Link>
          <Link to="/farmer/products/manage" className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all">
            <h4 className="text-xl font-bold text-green-950 mb-2">Manage Products</h4>
            <p className="text-sm text-green-900/60">Edit details and remove products anytime.</p>
          </Link>
          <Link to="/farmer/orders" className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all">
            <h4 className="text-xl font-bold text-green-950 mb-2">Orders & Earnings</h4>
            <p className="text-sm text-green-900/60">Track incoming orders and update status.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
