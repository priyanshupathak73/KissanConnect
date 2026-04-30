import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppFooter from './components/AppFooter';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import UserDashboard from './pages/UserDashboard';
import FarmerDashboard from './pages/FarmerDashboard';
import FarmerAddProduct from './pages/FarmerAddProduct';
import FarmerManageProducts from './pages/FarmerManageProducts';
import FarmerOrders from './pages/FarmerOrders';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="min-h-screen bg-primary flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/marketplace"
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              }
            />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/products/:id" element={<ProductDetails />} />

            <Route
              path="/cart"
              element={
                <ProtectedRoute allowedRoles={['user']}>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user-dashboard"
              element={
                <ProtectedRoute allowedRoles={['user']}>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={['user']}>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/farmer-dashboard"
              element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <FarmerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/farmer/dashboard"
              element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <FarmerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/farmer/products/new"
              element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <FarmerAddProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/farmer/products/manage"
              element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <FarmerManageProducts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/farmer/orders"
              element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <FarmerOrders />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <AppFooter />
      </div>
    </Router>
  );
}

export default App;
