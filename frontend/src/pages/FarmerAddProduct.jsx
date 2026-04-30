import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productService } from '../services/api';

const categories = ['Vegetables', 'Fruits', 'Grains', 'Spices', 'Dairy', 'Organic'];

const FarmerAddProduct = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: 'Vegetables',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('description', form.description);
      formData.append('price', String(Number(form.price)));
      formData.append('stock', String(Number(form.stock)));
      formData.append('category', form.category);
      if (imageFile) {
        formData.append('image', imageFile);
      }

      await productService.create(formData);
      setSuccess('Product added successfully.');
      setTimeout(() => navigate('/farmer/products/manage'), 700);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-green-50 via-white to-green-50 min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-green-950 mb-2">Add New Product</h1>
        <p className="text-green-900/60 mb-6">Fill details to publish your produce in marketplace.</p>

        {error && <div className="bg-red-50 text-red-500 rounded-lg px-4 py-2 text-sm mb-4">{error}</div>}
        {success && <div className="bg-green-50 text-green-600 rounded-lg px-4 py-2 text-sm mb-4">{success}</div>}

        <form className="grid md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <input className="border border-gray-200 rounded-xl px-4 py-2.5" name="name" value={form.name} onChange={handleChange} placeholder="Product name" required />
          <select className="border border-gray-200 rounded-xl px-4 py-2.5" name="category" value={form.category} onChange={handleChange}>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <input className="border border-gray-200 rounded-xl px-4 py-2.5" name="price" type="number" min="1" value={form.price} onChange={handleChange} placeholder="Price per kg" required />
          <input className="border border-gray-200 rounded-xl px-4 py-2.5" name="stock" type="number" min="0" value={form.stock} onChange={handleChange} placeholder="Stock (kg)" required />
          <textarea className="md:col-span-2 border border-gray-200 rounded-xl px-4 py-2.5" rows="4" name="description" value={form.description} onChange={handleChange} placeholder="Description" />

          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-green-950 block mb-1">Upload product image</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full border border-gray-200 rounded-xl px-4 py-2.5" />
          </div>

          {imagePreview && (
            <div className="md:col-span-2 bg-green-50 rounded-xl p-4">
              <img src={imagePreview} alt="Preview" className="h-40 object-contain mx-auto" />
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="md:col-span-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold shadow-md disabled:opacity-60"
          >
            {submitting ? 'Saving...' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FarmerAddProduct;
