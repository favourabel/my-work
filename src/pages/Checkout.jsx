import { useState } from 'react';
import { createOrder } from '../api/OrderApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ cartItems }) => {
  const [address, setAddress] = useState({
    street: '', city: '', state: '', zip: '', country: '',
  });
  const navigate = useNavigate();

  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        items: cartItems.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
        shippingAddress: address,
        totalAmount: cartItems.reduce((t, i) => t + i.price * i.quantity, 0),
      };
      await createOrder(orderData);
      toast.success('Order placed!');
      navigate('/my-orders');
    } catch (err) {
      toast.error('Checkout failed');
    }
  };

  return (
    <form onSubmit={handleCheckout}>
      <h2>Checkout</h2>
      <input placeholder="Street" onChange={(e) => setAddress({ ...address, street: e.target.value })} required />
      <input placeholder="City" onChange={(e) => setAddress({ ...address, city: e.target.value })} required />
      <input placeholder="State" onChange={(e) => setAddress({ ...address, state: e.target.value })} required />
      <input placeholder="ZIP" onChange={(e) => setAddress({ ...address, zip: e.target.value })} required />
      <input placeholder="Country" onChange={(e) => setAddress({ ...address, country: e.target.value })} required />
      <button type="submit">Place Order</button>
    </form>
  );
};

export default Checkout;