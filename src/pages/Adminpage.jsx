// src/pages/Admin.jsx
import { useState, useEffect } from 'react';
import api from '../../services/Api'; // Connects to your existing backend

// ==================== ICONS ====================
const IconDashboard = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
const IconProducts = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>;
const IconPlus = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>;
const IconLogout = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;
const IconMenu = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>;
const IconClose = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
const IconTrash = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;

// ==================== TOAST NOTIFICATION ====================
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-6 right-6 z-[100] p-4 rounded-xl border shadow-lg flex items-center gap-3 animate-fade-in-up ${
      type === 'success' ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-red-500/10 border-red-500/30 text-red-400'
    }`}>
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-70">✕</button>
    </div>
  );
};

// ==================== DASHBOARD PAGE ====================
const DashboardView = ({ productCount }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-playfair font-bold text-white">Dashboard Overview</h1>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { title: 'Total Products', value: productCount, color: 'bg-amber-500/10 text-amber-400' },
        { title: 'Total Orders', value: '0', color: 'bg-blue-500/10 text-blue-400' },
        { title: 'Total Users', value: '0', color: 'bg-green-500/10 text-green-400' },
        { title: 'Total Categories', value: '0', color: 'bg-purple-500/10 text-purple-400' },
      ].map((stat, i) => (
        <div key={i} className="bg-[#1a1a1a]/50 backdrop-blur-md border border-white/5 rounded-2xl p-6 hover:border-amber-500/30 transition-all duration-300">
          <h3 className="text-gray-400 text-sm font-medium mb-1">{stat.title}</h3>
          <p className="text-3xl font-playfair font-bold text-white">{stat.value}</p>
        </div>
      ))}
    </div>
  </div>
);

// ==================== PRODUCTS PAGE ====================
const ProductsView = ({ products, loading, onDelete, setToast }) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('newest');
  const [deleteId, setDeleteId] = useState(null);

  const filteredProducts = products
    .filter(p => {
      const matchesSearch = p.name?.toLowerCase().includes(search.toLowerCase()) || p.category?.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === 'all' || (filter === 'instock' && p.stockQuantity > 0) || (filter === 'outofstock' && p.stockQuantity <= 0);
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sort === 'price-low') return a.price - b.price;
      if (sort === 'price-high') return b.price - a.price;
      if (sort === 'az') return a.name?.localeCompare(b.name);
      if (sort === 'za') return b.name?.localeCompare(a.name);
      return new Date(b.createdAt || Date.now()) - new Date(a.createdAt || Date.now());
    });

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await onDelete(deleteId);
        setToast({ type: 'success', msg: 'Product deleted successfully!' });
      } catch (err) { setToast({ type: 'error', msg: 'Failed to delete product' }); }
      setDeleteId(null);
    }
  };

  if (loading) return <div className="text-center py-20 text-amber-400 animate-pulse">Loading products...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-playfair font-bold text-white">Products Management</h1>
      </div>

      <div className="bg-[#1a1a1a]/50 backdrop-blur-md border border-white/5 rounded-2xl p-4 flex flex-col md:flex-row gap-4">
        <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white placeholder-gray-500 focus:border-amber-500/50 outline-none" />
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white outline-none">
          <option value="all" className="bg-[#0a0a0a]">All Products</option>
          <option value="instock" className="bg-[#0a0a0a]">In Stock</option>
          <option value="outofstock" className="bg-[#0a0a0a]">Out of Stock</option>
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white outline-none">
          <option value="newest" className="bg-[#0a0a0a]">Newest</option>
          <option value="price-low" className="bg-[#0a0a0a]">Price: Low to High</option>
          <option value="price-high" className="bg-[#0a0a0a]">Price: High to Low</option>
          <option value="az" className="bg-[#0a0a0a]">A-Z</option>
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-[#1a1a1a]/50 backdrop-blur-md border border-white/5 rounded-2xl">
          <p className="text-gray-400 text-lg mb-4">No Products Found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product._id} className="bg-[#1a1a1a]/50 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden hover:border-amber-500/30 transition-all duration-300 group">
              <div className="h-48 overflow-hidden bg-white/5">
         <img src={product.images?.[0]?.url || product.image || 'https://via.placeholder.com/400'}  />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-white font-playfair font-bold text-lg truncate">{product.name}</h3>
                  <span className="text-amber-400 font-bold">${product.price}</span>
                </div>
                <p className="text-gray-500 text-sm mb-1">{product.category}</p>
                <p className={`text-xs mb-4 ${product.stockQuantity > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {product.stockQuantity > 0 ? `In Stock (${product.stockQuantity})` : 'Out of Stock'}
                </p>
                <button onClick={() => setDeleteId(product._id)} className="w-full py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 hover:bg-red-500/20 transition-all text-sm flex items-center justify-center gap-2">
                  <IconTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-xl font-playfair font-bold text-white mb-2">Confirm Deletion</h3>
            <p className="text-gray-400 mb-6">Are you sure you want to delete this product?</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all">Cancel</button>
              <button onClick={handleDelete} className="flex-1 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ==================== ADD PRODUCT PAGE ====================
const AddProductView = ({ onProductAdded, setToast }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', category: 'Main Course', price: '', stockQuantity: '' });
  const [image, setImage] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.stockQuantity) {
      setToast({ type: 'error', msg: 'Please fill in all required fields' });
      return;
    }
    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      if (image) data.append('images', image); // Backend expects 'images'
      
      await api.post('/products', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      
      setToast({ type: 'success', msg: 'Product added successfully!' });
      setFormData({ name: '', description: '', category: 'Main Course', price: '', stockQuantity: '' });
      setImage(null);
      onProductAdded(); // Refresh product list
    } catch (err) {
      setToast({ type: 'error', msg: err.response?.data?.message || 'Failed to add product' });
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-playfair font-bold text-white">Add New Product</h1>
      <form onSubmit={handleSubmit} className="bg-[#1a1a1a]/50 backdrop-blur-md border border-white/5 rounded-2xl p-6 space-y-5">
        <div>
          <label className="text-gray-400 text-sm mb-2 block">Product Name *</label>
          <input name="name" value={formData.name} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-500/50" />
        </div>
        <div>
          <label className="text-gray-400 text-sm mb-2 block">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-500/50 resize-none" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Category</label>
            <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-500/50">
              <option value="Starters" className="bg-[#0a0a0a]">Starters</option>
              <option value="Main Course" className="bg-[#0a0a0a]">Main Course</option>
              <option value="Grills" className="bg-[#0a0a0a]">Grills</option>
              <option value="Desserts" className="bg-[#0a0a0a]">Desserts</option>
              <option value="Beverages" className="bg-[#0a0a0a]">Beverages</option>
            </select>
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Price ($) *</label>
            <input name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-500/50" />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Stock Quantity *</label>
            <input name="stockQuantity" type="number" value={formData.stockQuantity} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-500/50" />
          </div>
        </div>
        <div>
          <label className="text-gray-400 text-sm mb-2 block">Product Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-amber-500/10 file:text-amber-400 hover:file:bg-amber-500/20" />
        </div>
        <div className="flex gap-4 pt-4">
          <button type="submit" disabled={loading} className="flex-1 py-4 bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold rounded-xl hover:shadow-lg hover:shadow-amber-500/20 transition-all disabled:opacity-50">
            {loading ? 'Adding...' : 'Add Product'}
          </button>
          <button type="button" onClick={() => setFormData({ name: '', description: '', category: 'Main Course', price: '', stockQuantity: '' })} className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all">Reset</button>
        </div>
      </form>
    </div>
  );
};

// ==================== MAIN ADMIN LAYOUT ====================
function Admin() {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/products');
      const productsArray = Array.isArray(data) ? data : (data.products || []);
      setProducts(productsArray);
    } catch (err) { console.error('Failed to fetch products:', err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id) => {
    await api.delete(`/products/${id}`);
    setProducts(prev => prev.filter(p => p._id !== id));
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <IconDashboard /> },
    { id: 'products', label: 'Products', icon: <IconProducts /> },
    { id: 'add-product', label: 'Add Product', icon: <IconPlus /> },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex font-inter">
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0f0f0f] border-r border-white/5 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-black font-bold text-lg font-playfair">É</span>
            </div>
            <div>
              <span className="text-xl font-playfair font-bold text-white">Élysée</span>
              <span className="block text-[10px] text-amber-400 tracking-[0.3em] uppercase -mt-1">Admin</span>
            </div>
          </a>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400"><IconClose /></button>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map(item => (
            <button key={item.id} onClick={() => { setActiveView(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                activeView === item.id ? 'bg-gradient-to-r from-amber-500/20 to-amber-600/10 text-amber-400 border border-amber-500/30' : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}>
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5">
          <a href="/" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-300">
            <IconLogout /> <span className="font-medium">Back to Site</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-[#0f0f0f]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-400 hover:text-white"><IconMenu /></button>
            <h2 className="text-lg font-playfair font-bold text-white capitalize">{activeView.replace('-', ' ')}</h2>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="text-sm text-gray-400 hover:text-amber-400 transition-colors hidden sm:block">View Site</a>
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 flex items-center justify-center text-black font-bold text-sm">A</div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {activeView === 'dashboard' && <DashboardView productCount={products.length} />}
          {activeView === 'products' && <ProductsView products={products} loading={loading} onDelete={handleDelete} setToast={setToast} />}
          {activeView === 'add-product' && <AddProductView onProductAdded={fetchProducts} setToast={setToast} />}
        </main>
      </div>
    </div>
  );
}

export default Admin;