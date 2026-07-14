import { useEffect, useState } from 'react';
import { getAllOrders, updateOrderStatus } from '../api/OrderApi';
import toast from 'react-hot-toast';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await getAllOrders();
      setOrders(data.orders || data.data);
    } catch (error) {
      toast.error('Failed to load orders');
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      toast.success('Status updated');
      fetchOrders();
    } catch (error) {
      toast.error('Update failed');
    }
  };

  return (
    <div>
      <h2>All Orders</h2>
      {orders.map((order) => (
        <div key={order._id}>
          <p>Order #{order._id}</p>
          <p>Customer: {order.user?.name}</p>
          <p>Total: ${order.totalAmount}</p>
          <p>Status: {order.status}</p>
          <select
            value={order.status}
            onChange={(e) => handleStatusChange(order._id, e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;