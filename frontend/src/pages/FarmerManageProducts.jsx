import React, { useCallback, useEffect, useState } from 'react';
import { productApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

const FarmerManageProducts = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState('');
  const [form, setForm] = useState({ name: '', price: '', stock: '', category: '', description: '' });

  const fetchProducts = useCallback(async () => {
    if (!user?._id) return;
    const response = await productApi.getProducts({ farmerId: user._id });
    setProducts(response.data);
  }, [user]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const startEdit = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name,
      price: product.price,
      stock: product.stock,
      category: product.category,
      description: product.description,
    });
  };

  const saveEdit = async (id) => {
    await productApi.updateProduct(id, {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    });
    setEditingId('');
    await fetchProducts();
  };

  const deleteProduct = async (id) => {
    await productApi.deleteProduct(id);
    await fetchProducts();
  };

  return (
    <div className="bg-gradient-to-b from-green-50 via-white to-green-50 min-h-screen py-10 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-extrabold text-green-950 mb-6">Manage Products</h1>

        <div className="space-y-4">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-2xl shadow-md p-5 border border-gray-100">
              {editingId === product._id ? (
                <div className="grid md:grid-cols-2 gap-3">
                  <input className="border border-gray-200 rounded-xl px-3 py-2" value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} />
                  <input className="border border-gray-200 rounded-xl px-3 py-2" value={form.category} onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))} />
                  <input className="border border-gray-200 rounded-xl px-3 py-2" type="number" value={form.price} onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))} />
                  <input className="border border-gray-200 rounded-xl px-3 py-2" type="number" value={form.stock} onChange={(e) => setForm((prev) => ({ ...prev, stock: e.target.value }))} />
                  <textarea className="md:col-span-2 border border-gray-200 rounded-xl px-3 py-2" rows="3" value={form.description} onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))} />

                  <div className="md:col-span-2 flex gap-2">
                    <button className="bg-emerald-600 text-white px-4 py-2 rounded-xl font-semibold" onClick={() => saveEdit(product._id)}>Save</button>
                    <button className="bg-gray-100 text-green-900 px-4 py-2 rounded-xl font-semibold" onClick={() => setEditingId('')}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="font-bold text-green-950 text-lg">{product.name}</p>
                    <p className="text-sm text-green-900/60">{product.category} • ₹{product.price}/kg • Stock: {product.stock}kg</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-emerald-600 text-white px-4 py-2 rounded-xl font-semibold" onClick={() => startEdit(product)}>Edit</button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-xl font-semibold" onClick={() => deleteProduct(product._id)}>Delete</button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {!products.length && (
            <div className="bg-white rounded-2xl shadow-md p-8 text-center text-green-900/60">
              You have not added products yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmerManageProducts;
