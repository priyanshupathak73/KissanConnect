import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { orderApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

const FarmerOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [earnings, setEarnings] = useState(0);

  const loadOrders = useCallback(async () => {
    if (!user?._id) return;
    const [ordersResponse, earningsResponse] = await Promise.all([
      orderApi.getOrders({ farmerId: user._id }),
      orderApi.getFarmerEarnings(user._id),
    ]);

    setOrders(ordersResponse.data);
    setEarnings(earningsResponse.data.totalEarnings || 0);
  }, [user]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const totalItemsSold = useMemo(
    () => orders.reduce((sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0),
    [orders]
  );

  const updateStatus = async (orderId, status) => {
    await orderApi.updateOrderStatus(orderId, { status });
    await loadOrders();
  };

  return (
    <div className="bg-gradient-to-b from-green-50 via-white to-green-50 min-h-screen py-10 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-5">
            <p className="text-sm text-green-700/60">Orders</p>
            <h3 className="text-3xl font-extrabold text-green-950">{orders.length}</h3>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-5">
            <p className="text-sm text-green-700/60">Items Sold</p>
            <h3 className="text-3xl font-extrabold text-green-950">{totalItemsSold}</h3>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-5">
            <p className="text-sm text-green-700/60">Earnings</p>
            <h3 className="text-3xl font-extrabold text-emerald-600">₹{earnings}</h3>
          </div>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-2xl shadow-md p-5">
              <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
                <p className="font-bold text-green-950">Order #{order._id.slice(-6).toUpperCase()}</p>
                <select
                  className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm"
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="space-y-1 mb-3">
                {order.items.map((item) => (
                  <p key={`${order._id}-${item.productId}`} className="text-sm text-green-900/75">
                    {item.productName} x {item.quantity} = ₹{item.unitPrice * item.quantity}
                  </p>
                ))}
              </div>

              <p className="text-sm text-green-900/60">Buyer: {order.buyerName} ({order.buyerPhone})</p>
              <p className="font-bold text-green-950 mt-2">Your earning: ₹{order.farmerEarning || 0}</p>
            </div>
          ))}

          {!orders.length && (
            <div className="bg-white rounded-2xl shadow-md p-8 text-center text-green-900/60">
              No orders received yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmerOrders;
