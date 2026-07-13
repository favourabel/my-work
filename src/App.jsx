// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import Adminpage from './pages/Adminpage';
import AdminUploadProduct from './pages/AdminUploadProduct';
import AdminOrders from './pages/AdminOrders';

// Context & Route Guard
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './component/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* ==================== PUBLIC ROUTES ==================== */}
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ==================== USER PROTECTED ROUTES ==================== */}
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          {/* ==================== ADMIN PROTECTED ROUTES ==================== */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <Adminpage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/upload-product"
            element={
              <ProtectedRoute adminOnly>
                <AdminUploadProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute adminOnly>
                <AdminOrders />
              </ProtectedRoute>
            }
          />

          {/* ==================== 404 FALLBACK ==================== */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

// Simple 404 page
function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-center px-4">
      <div>
        <h1 className="text-6xl font-playfair font-bold text-amber-400 mb-4">404</h1>
        <p className="text-gray-400 mb-6">Page not found</p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-gradient-gold text-black font-semibold rounded-full hover:scale-105 transition"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}

export default App;