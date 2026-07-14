import { useState } from 'react';
import { createProduct } from '../api/ProductApi';
import toast from 'react-hot-toast';

const AdminUploadProduct = () => {
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', category: '', stock: '',
  });
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      if (image) data.append('image', image);

      await createProduct(data);
      toast.success('Product uploaded!');
      setFormData({ name: '', description: '', price: '', category: '', stock: '' });
      setImage(null);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Upload failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Upload Product</h2>
      <input placeholder="Name" value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
      <textarea placeholder="Description" value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
      <input type="number" placeholder="Price" value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
      <input placeholder="Category" value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })} required />
      <input type="number" placeholder="Stock" value={formData.stock}
        onChange={(e) => setFormData({ ...formData, stock: e.target.value })} required />
      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required />
      <button type="submit">Upload</button>
    </form>
  );
};

export default AdminUploadProduct;