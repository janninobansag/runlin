import { useState, useEffect } from 'react';
import api from '../api';
import './Admin.css';

export default function Admin() {
  const [secretKey, setSecretKey] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [orders, setOrders] = useState([]);
  const [sales, setSales] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await api.get('/orders/admin/all', {
        headers: { secret: secretKey }
      });
      if (res.data.success) {
        setOrders(res.data.data);
        setIsAuthorized(true);
        loadSales();
      }
    } catch {
      alert('Invalid secret key');
    }
    setLoading(false);
  };

  const loadSales = async () => {
    try {
      const res = await api.get('/orders/admin/sales', {
        headers: { secret: secretKey }
      });
      setSales(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      await api.patch(`/orders/${orderId}/status`, 
        { status: newStatus },
        { headers: { secret: secretKey } }
      );
      // Refresh orders after update
      const res = await api.get('/orders/admin/all', {
        headers: { secret: secretKey }
      });
      setOrders(res.data.data);
      loadSales();
    } catch (err) {
      alert('Failed to update order status');
    }
    setUpdatingId(null);
  };

  const getNextStatus = (currentStatus) => {
    const statusFlow = {
      'pending': 'confirmed',
      'confirmed': 'preparing',
      'preparing': 'ready',
      'ready': 'completed',
      'completed': 'completed'
    };
    return statusFlow[currentStatus];
  };

  const getStatusLabel = (status) => {
    const labels = {
      'pending': '⏳ Pending',
      'confirmed': '✅ Confirmed',
      'preparing': '🔧 Preparing',
      'ready': '📦 Ready',
      'completed': '🎉 Completed'
    };
    return labels[status];
  };

  if (!isAuthorized) {
    return (
      <div className="admin-login">
        <div className="admin-login__box">
          <h1>🔐 Admin Access</h1>
          <input 
            type="password" 
            placeholder="Enter secret key"
            value={secretKey}
            onChange={e => setSecretKey(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleLogin()}
          />
          <button onClick={handleLogin} disabled={loading}>
            {loading ? 'Checking...' : 'Access Dashboard'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>📊 Admin Dashboard</h1>
        <button onClick={() => setIsAuthorized(false)}>Logout</button>
      </header>

      {sales && (
        <div className="admin-stats">
          <div className="stat-card">
            <h3>Total Orders</h3>
            <p>{sales.totalOrders}</p>
          </div>
          <div className="stat-card">
            <h3>Total Sales</h3>
            <p>${sales.totalSales.toFixed(2)}</p>
          </div>
          <div className="stat-card">
            <h3>Completed</h3>
            <p>{sales.completedOrders}</p>
          </div>
          <div className="stat-card">
            <h3>Pending</h3>
            <p>{sales.pendingOrders}</p>
          </div>
        </div>
      )}

      <div className="admin-orders">
        <h2>Order History</h2>
        <div className="orders-table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th>Items</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => {
                const nextStatus = getNextStatus(order.status);
                const isCompleted = order.status === 'completed';
                
                return (
                  <tr key={order._id}>
                    <td className="order-number">{order.orderNumber}</td>
                    <td>${order.total.toFixed(2)}</td>
                    <td>
                      <span className={`status-badge status-${order.status}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                    <td>
                      <div className="order-items">
                        {order.items.map((item, idx) => (
                          <span key={idx}>
                            {item.name} ×{item.quantity}
                            {idx < order.items.length - 1 && ', '}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      {!isCompleted ? (
                        <button 
                          className="status-update-btn"
                          onClick={() => updateOrderStatus(order._id, nextStatus)}
                          disabled={updatingId === order._id}
                        >
                          {updatingId === order._id ? (
                            'Updating...'
                          ) : (
                            `→ ${getStatusLabel(nextStatus)}`
                          )}
                        </button>
                      ) : (
                        <span className="completed-badge">✓ Complete</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}