// src/pages/Homepage.jsx
import { useState, useEffect, useRef } from 'react';
import api from '../services/Api'

// ==================== ICONS ====================
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
)

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const StarIcon = ({ filled }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={filled ? "#D4AF37" : "none"} stroke="#D4AF37" strokeWidth={1.5} className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>
)

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
)

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
)

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
)

const ArrowUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
)

const QuoteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8 text-amber-500/30">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
)

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
  </svg>
)

const MinusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
  </svg>
)

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
)

const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-5.98.286h11.356a3 3 0 00-5.376-2.036M15 5.25a3 3 0 11-6 0 3 3 0 016 0zm4.5 9a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  </svg>
)

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
)

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
)

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

const FireIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-orange-500">
    <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clipRule="evenodd" />
  </svg>
)

const LeafIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-green-500">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  </svg>
)

const ChefHatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-12 h-12">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C9.5 2 7.5 3.5 7 5.5C5 5.5 3 7.5 3 10c0 2 1.5 4 3.5 4.5V19c0 1.1.9 2 2 2h7c1.1 0 2-.9 2-2v-4.5c2-.5 3.5-2.5 3.5-4.5 0-2.5-2-4.5-4-4.5C16.5 3.5 14.5 2 12 2z"/>
    <path strokeLinecap="round" d="M9 19h6M9 16h6"/>
  </svg>
)

const UtensilsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-12 h-12">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 3v6c0 1.1.9 2 2 2h.5L8 21M18 3v3c0 1.7-1.3 3-3 3h0c-1.7 0-3-1.3-3-3V3M15 9v12"/>
  </svg>
)

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-12 h-12">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
)

const TruckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-12 h-12">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
  </svg>
)

// ==================== DATA ====================
const menuCategories = ['All', 'Starters', 'Main Course', 'Grills', 'Desserts', 'Beverages']

const fallbackMenuItems = [
  { id: 1, name: 'Truffle Mushroom Risotto', description: 'Creamy arborio rice with wild mushrooms, truffle oil, and aged parmesan', price: 28.99, category: 'Main Course', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500&h=400&fit=crop', rating: 4.9, popular: true, spicy: false, vegetarian: true },
  { id: 2, name: 'Grilled Wagyu Steak', description: 'Premium wagyu beef grilled to perfection, served with roasted vegetables', price: 54.99, category: 'Grills', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&h=400&fit=crop', rating: 5.0, popular: true, spicy: false, vegetarian: false },
  { id: 3, name: 'Lobster Bisque', description: 'Rich and creamy lobster soup with a hint of brandy and fresh herbs', price: 18.99, category: 'Starters', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500&h=400&fit=crop', rating: 4.7, popular: false, spicy: false, vegetarian: false },
  { id: 4, name: 'Spicy Tuna Tartare', description: 'Fresh ahi tuna with avocado, sesame, and spicy sriracha aioli', price: 22.99, category: 'Starters', image: 'https://images.unsplash.com/photo-1534256958597-7fe685cbd745?w=500&h=400&fit=crop', rating: 4.8, popular: true, spicy: true, vegetarian: false },
  { id: 5, name: 'Pan-Seared Salmon', description: 'Atlantic salmon with lemon butter sauce, asparagus, and quinoa', price: 32.99, category: 'Main Course', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&h=400&fit=crop', rating: 4.8, popular: false, spicy: false, vegetarian: false },
  { id: 6, name: 'Chocolate Lava Cake', description: 'Warm chocolate fondant with vanilla bean ice cream and berry compote', price: 14.99, category: 'Desserts', image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500&h=400&fit=crop', rating: 4.9, popular: true, spicy: false, vegetarian: true },
  { id: 7, name: 'Mediterranean Lamb Chops', description: 'Herb-crusted lamb chops with roasted garlic mash and mint jus', price: 42.99, category: 'Grills', image: 'https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?w=500&h=400&fit=crop', rating: 4.7, popular: false, spicy: false, vegetarian: false },
  { id: 8, name: 'Craft Cocktail Selection', description: 'Artisan cocktails made with premium spirits and fresh ingredients', price: 16.99, category: 'Beverages', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500&h=400&fit=crop', rating: 4.6, popular: false, spicy: false, vegetarian: true },
  { id: 9, name: 'Crème Brûlée', description: 'Classic French custard with caramelized sugar top and fresh berries', price: 12.99, category: 'Desserts', image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=500&h=400&fit=crop', rating: 4.8, popular: false, spicy: false, vegetarian: true },
  { id: 10, name: 'Bruschetta Trio', description: 'Three artisan bruschettas with tomato basil, mushroom, and prosciutto', price: 15.99, category: 'Starters', image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=500&h=400&fit=crop', rating: 4.5, popular: false, spicy: false, vegetarian: false },
  { id: 11, name: 'BBQ Chicken Wings', description: 'Smoky barbecue glazed wings with ranch dip and celery sticks', price: 16.99, category: 'Grills', image: 'https://images.unsplash.com/photo-1527477396000-e27163b3b8e8?w=500&h=400&fit=crop', rating: 4.6, popular: true, spicy: true, vegetarian: false },
  { id: 12, name: 'Fresh Pressed Juice', description: 'Seasonal fruit and vegetable juices, cold-pressed daily', price: 8.99, category: 'Beverages', image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=500&h=400&fit=crop', rating: 4.4, popular: false, spicy: false, vegetarian: true }
]

const testimonials = [
  { id: 1, name: 'Sarah Mitchell', role: 'Food Critic', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face', text: 'An extraordinary dining experience. The flavors are sophisticated yet comforting, and the ambiance is absolutely divine. This is fine dining at its best.', rating: 5 },
  { id: 2, name: 'James Rodriguez', role: 'Regular Guest', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', text: 'Every visit feels like a celebration. The staff remembers your preferences, and the chef always surprises with seasonal creations. Truly a gem.', rating: 5 },
  { id: 3, name: 'Emily Chen', role: 'Lifestyle Blogger', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', text: 'From the moment you walk in, you know you are in for something special. The presentation is art, and the taste is even better. Highly recommended!', rating: 5 },
  { id: 4, name: 'Michael Thompson', role: 'Executive Chef', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', text: 'As a fellow chef, I appreciate the attention to detail and the respect for ingredients. The culinary team here is world-class without a doubt.', rating: 5 }
]

const galleryImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop', title: 'Main Dining Hall' },
  { id: 2, src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop', title: 'Signature Dish' },
  { id: 3, src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&h=400&fit=crop', title: 'Private Lounge' },
  { id: 4, src: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=400&fit=crop', title: 'Fresh Ingredients' },
  { id: 5, src: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&h=400&fit=crop', title: 'Chef at Work' },
  { id: 6, src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop', title: 'Bar Area' },
]

const chefs = [
  { id: 1, name: 'Chef Alessandro', role: 'Executive Chef', image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=500&fit=crop', specialty: 'Italian & Mediterranean' },
  { id: 2, name: 'Chef Yuki', role: 'Pastry Chef', image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=400&h=500&fit=crop', specialty: 'French Pastry & Desserts' },
  { id: 3, name: 'Chef Marcus', role: 'Sous Chef', image: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=400&h=500&fit=crop', specialty: 'Modern American Cuisine' }
]

// ==================== CUSTOM HOOK ====================
function useInView(threshold = 0.1) {
  const ref = useRef(null)
  // ✅ FIX: Default to TRUE so content shows immediately even before scroll
  const [isInView, setIsInView] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true)
      },
      { threshold }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, isInView]
}

// ==================== NAVBAR ====================
function Navbar({ cart, setShowCart }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Menu', href: '#menu' },
    { label: 'Chefs', href: '#chefs' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ]

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'glass py-3 shadow-2xl shadow-black/30' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-black font-bold text-lg font-playfair">É</span>
            </div>
            <div>
              <span className="text-xl font-playfair font-bold text-white">Élysée</span>
              <span className="block text-[10px] text-amber-400 tracking-[0.3em] uppercase -mt-1">Fine Dining</span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <a key={link.label} href={link.href} className="text-sm text-gray-300 hover:text-amber-400 transition-colors duration-300 tracking-wide uppercase font-medium">
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setShowCart(true)} className="relative text-white hover:text-amber-400 transition-colors">
              <CartIcon />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-amber-500 text-black text-xs font-bold rounded-full flex items-center justify-center animate-scale-in">
                  {totalItems}
                </span>
              )}
            </button>

            <a href="#reservation" className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-gold text-black font-semibold text-sm rounded-full hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 hover:scale-105">
              Reserve Table
            </a>

            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-white hover:text-amber-400 transition-colors">
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      <div className={`lg:hidden transition-all duration-500 overflow-hidden ${mobileOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="glass mt-3 mx-4 rounded-2xl p-6 space-y-4">
          {navLinks.map(link => (
            <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)} className="block text-gray-300 hover:text-amber-400 transition-colors uppercase text-sm tracking-wide font-medium">
              {link.label}
            </a>
          ))}
          <a href="#reservation" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-gold text-black font-semibold text-sm rounded-full mt-2">
            Reserve Table
          </a>
        </div>
      </div>
    </nav>
  )
}

// ==================== HERO ====================
function HeroSection() {
  const slides = [
    { image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&h=1080&fit=crop', subtitle: 'Culinary Artistry', title: 'Flavors That Tell\nA Story', description: 'Our master chefs blend tradition with innovation, creating dishes that celebrate the finest ingredients from around the world.' },
    { image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop', subtitle: 'Unforgettable Evenings', title: 'Dine in\nElegant Splendor', description: 'From intimate dinners to grand celebrations, our sophisticated setting provides the perfect backdrop for every occasion.' }
  ]

  const [currentSlide, setCurrentSlide] = useState(0)
  const slideCount = slides.length

  useEffect(() => {
    setCurrentSlide(0)
    const timer = setInterval(() => setCurrentSlide(prev => (prev + 1) % slideCount), 6000)
    return () => clearInterval(timer)
  }, [slideCount])

  return (
    <section id="home" className="relative h-screen overflow-hidden pb-[90px]">
      {slides.map((slide, index) => (
        <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
          <img src={slide.image} alt="" className="w-full h-full object-cover scale-110 transition-transform duration-[6000ms]" style={{ transform: index === currentSlide ? 'scale(1)' : 'scale(1.1)' }} />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 z-10" />
      <div className="absolute top-20 left-10 w-72 h-72 border border-amber-500/10 rounded-full animate-rotate z-10" />
      <div className="absolute bottom-20 right-10 w-96 h-96 border border-amber-500/5 rounded-full animate-rotate z-10" style={{ animationDirection: 'reverse' }} />

      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {slides.map((slide, index) => (
              <div key={index} className={`transition-all duration-700 ${index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 absolute'}`}>
                {index === currentSlide && (
                  <>
                    <div className="flex items-center gap-3 mb-6 animate-fade-in-up">
                      <div className="w-12 h-[1px] bg-gradient-gold" />
                      <span className="text-amber-400 font-dancing text-2xl">{slide.subtitle}</span>
                    </div>
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-playfair font-bold text-white leading-[1.1] mb-6 animate-fade-in-up delay-200 whitespace-pre-line">
                      {slide.title}
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-xl leading-relaxed animate-fade-in-up delay-400">
                      {slide.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 animate-fade-in-up delay-600">
                      <a href="#menu" className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-gold text-black font-semibold rounded-full hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 hover:scale-105">
                        Explore Menu
                        <ArrowRightIcon />
                      </a>
                      <a href="/admin" className="group inline-flex items-center gap-3 px-8 py-4 border border-amber-500/40 text-white font-semibold rounded-full hover:bg-amber-500/10 transition-all duration-300">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                          <PlayIcon />
                        </div>
                        Seller
                      </a>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="absolute bottom-12 left-4 sm:left-8 right-4 sm:right-8 mb-[60px]">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-8 sm:gap-12"></div>
              <div className="flex items-center gap-3">
                {slides.map((_, i) => (
                  <button key={i} onClick={() => setCurrentSlide(i)} className={`transition-all duration-300 rounded-full ${i === currentSlide ? 'w-10 h-3 bg-gradient-gold' : 'w-3 h-3 bg-white/30 hover:bg-white/50'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ==================== ABOUT ====================
function AboutSection() {
  const [ref, isInView] = useInView(0.2)

  return (
    <section id="about" ref={ref} className="relative py-24 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-700/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={`relative ${isInView ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&h=700&fit=crop" alt="Restaurant interior" className="rounded-2xl w-full h-[500px] object-cover shadow-2xl" />
              <div className="absolute -bottom-8 -right-8 w-64 h-64 rounded-2xl overflow-hidden border-4 border-[#0a0a0a] shadow-xl hidden sm:block">
                <img src="https://images.unsplash.com/photo-1551218808-94e220e084d2?w=300&h=300&fit=crop" alt="Chef" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -top-6 -left-6 glass rounded-2xl p-6 animate-float hidden sm:block">
                <div className="text-4xl font-playfair font-bold text-gradient">15+</div>
                <div className="text-sm text-gray-400 mt-1">Years of<br/>Excellence</div>
              </div>
            </div>
          </div>

          <div className={`${isInView ? 'animate-fade-in-right' : 'opacity-0'}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-[1px] bg-gradient-gold" />
              <span className="text-amber-400 font-dancing text-2xl">Our Story</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-white mb-6 leading-tight">
              A Legacy of<br/><span className="text-gradient">Culinary Excellence</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6 text-lg">
              Founded in 2009, Élysée has been a beacon of fine dining in the heart of the city. Our philosophy is simple: source the finest ingredients, prepare them with passion, and serve them in an atmosphere of warmth and elegance.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Every dish that leaves our kitchen tells a story — of traditions passed down through generations, of creative innovation, and of our unwavering commitment to making every dining experience truly unforgettable.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {[
                { icon: <ChefHatIcon />, title: 'Master Chefs', desc: 'World-renowned culinary experts' },
                { icon: <UtensilsIcon />, title: 'Fresh Ingredients', desc: 'Locally sourced, organic produce' },
                { icon: <HeartIcon />, title: 'Made with Love', desc: 'Every dish crafted with passion' },
                { icon: <TruckIcon />, title: 'Fast Delivery', desc: 'Hot food delivered to your door' },
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="w-14 h-14 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 transition-colors">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">{feature.title}</h4>
                    <p className="text-gray-500 text-sm">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <a href="#menu" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-gold text-black font-semibold rounded-full hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 hover:scale-105">
              Discover Our Menu
              <ArrowRightIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ==================== MENU SECTION (COMPLETELY FIXED) ====================
function MenuSection({ addToCart }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        console.log('📦 Backend products:', data.products);

        const formattedBackendProducts = (data.products || []).map(p => {
          let imageUrl = 'https://placehold.co/500x400/1a1a1a/D4AF37?text=No+Image';

          if (p.images && p.images.length > 0) {
            const firstImage = p.images[0];
            let imgPath = '';

            if (typeof firstImage === 'string') {
              imgPath = firstImage;
            } else if (typeof firstImage === 'object') {
              imgPath = firstImage.url || firstImage.path || firstImage.secure_url || firstImage.filename || '';
            }

            if (imgPath) {
              if (imgPath.startsWith('http')) {
                imageUrl = imgPath;
              } else {
                const cleanPath = imgPath.replace(/\\/g, '/').replace(/^\/+/, '');
                imageUrl = `${BACKEND_URL}/${cleanPath}`;
              }
            }
          }

          return {
            id: p._id,
            name: p.name,
            description: p.description,
            price: p.price,
            category: p.category,
            image: imageUrl,
            rating: p.rating || 4.5,
            popular: p.isPopular || false,
            spicy: p.isSpicy || false,
            vegetarian: p.isVegetarian || false,
            isFromBackend: true
          };
        });

        if (formattedBackendProducts.length > 0) {
          const combined = [...formattedBackendProducts, ...fallbackMenuItems];
          console.log('✨ Combined menu items:', combined);
          setMenuItems(combined);
        } else {
          setMenuItems(fallbackMenuItems);
        }

      } catch (error) {
        console.error("Error fetching products:", error);
        setMenuItems(fallbackMenuItems);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredItems = activeCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory)

  if (loading) {
    return (
      <section id="menu" className="relative py-24 bg-[#0f0f0f] min-h-[60vh] flex items-center justify-center">
        <p className="text-amber-400 text-xl font-playfair animate-pulse">Loading delicious meals...</p>
      </section>
    )
  }

  return (
    <section id="menu" className="relative py-24 bg-[#0f0f0f] overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 border border-amber-500 rounded-full" />
        <div className="absolute bottom-40 right-20 w-60 h-60 border border-amber-500 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ✅ Header - NO animation classes, always visible */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-[1px] bg-gradient-gold" />
            <span className="text-amber-400 font-dancing text-2xl">Our Menu</span>
            <div className="w-12 h-[1px] bg-gradient-gold" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-white mb-4">
            Culinary <span className="text-gradient">Masterpieces</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Each dish is a work of art, carefully crafted by our team of expert chefs using only the freshest, finest ingredients.
          </p>
        </div>

        {/* ✅ Category filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {menuCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-gradient-gold text-black shadow-lg shadow-amber-500/20'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No items in this category yet.</p>
          </div>
        ) : (
          // ✅ FIXED: Removed all animation classes - cards ALWAYS show
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-amber-500/10"
              >
                <div className="relative h-52 overflow-hidden">
                  {item.isFromBackend && (
                    <div className="absolute top-2 left-2 z-20">
                      <span className="px-2 py-0.5 bg-amber-500 text-black text-[10px] font-bold rounded-full">
                        ✨ Chef's Special
                      </span>
                    </div>
                  )}
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://placehold.co/500x400/1a1a1a/D4AF37?text=No+Image';
                    }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 left-3 flex gap-2 mt-6">
                    {item.popular && (
                      <span className="px-3 py-1 bg-amber-500 text-black text-xs font-bold rounded-full flex items-center gap-1">
                        <FireIcon /> Popular
                      </span>
                    )}
                    {item.vegetarian && (
                      <span className="px-3 py-1 bg-green-500/80 text-white text-xs font-bold rounded-full flex items-center gap-1">
                        <LeafIcon /> Veg
                      </span>
                    )}
                  </div>
                  <div className="absolute top-3 right-3 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full">
                    <span className="text-amber-400 font-bold text-sm">${item.price}</span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} filled={i < Math.floor(item.rating)} />
                    ))}
                    <span className="text-gray-500 text-xs ml-1">({item.rating})</span>
                  </div>
                  <h3 className="text-white font-playfair font-bold text-lg mb-2 group-hover:text-amber-400 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{item.description}</p>
                  <button
                    onClick={() => addToCart(item)}
                    className="w-full py-3 bg-white/5 border border-amber-500/20 text-amber-400 rounded-xl font-medium text-sm hover:bg-amber-500 hover:text-black hover:border-transparent transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <PlusIcon /> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

// ==================== SPECIAL OFFER ====================
function SpecialOffer() {
  const [ref, isInView] = useInView(0.2)

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&h=600&fit=crop" alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/80" />

      <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <span className="text-amber-400 font-dancing text-3xl mb-4 block">Special Offer</span>
        <h2 className="text-4xl sm:text-6xl font-playfair font-bold text-white mb-6">Weekend Tasting Menu</h2>
        <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">5-course chef's tasting menu with wine pairing</p>
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="text-3xl text-gray-500 line-through font-playfair">$189</span>
          <span className="text-5xl font-playfair font-bold text-gradient">$129</span>
          <span className="text-sm text-gray-400">per person</span>
        </div>
        <a href="#reservation" className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-gold text-black font-bold rounded-full text-lg hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 hover:scale-105 animate-pulse-glow">
          Book Now — Limited Seats
          <ArrowRightIcon />
        </a>
      </div>
    </section>
  )
}

// ==================== CHEFS ====================
function ChefsSection() {
  const [ref, isInView] = useInView(0.2)

  return (
    <section id="chefs" ref={ref} className="relative py-24 bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-[1px] bg-gradient-gold" />
            <span className="text-amber-400 font-dancing text-2xl">Master Chefs</span>
            <div className="w-12 h-[1px] bg-gradient-gold" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-white mb-4">
            Meet Our <span className="text-gradient">Culinary Artists</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Behind every great dish is a passionate chef with years of expertise and a love for creating extraordinary flavors.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {chefs.map((chef, index) => (
            <div key={chef.id} className={`group relative glass rounded-3xl overflow-hidden hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-3 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="relative h-80 overflow-hidden">
                <img src={chef.image} alt={chef.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    {[FacebookIcon, InstagramIcon, TwitterIcon].map((Icon, i) => (
                      <button key={i} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-amber-500 hover:text-black flex items-center justify-center transition-all duration-300">
                        <Icon />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-playfair font-bold text-white group-hover:text-amber-400 transition-colors">{chef.name}</h3>
                <p className="text-amber-400/80 text-sm font-medium mb-2">{chef.role}</p>
                <p className="text-gray-500 text-sm">{chef.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ==================== GALLERY ====================
function GallerySection() {
  const [ref, isInView] = useInView(0.1)
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <section id="gallery" ref={ref} className="relative py-24 bg-[#0f0f0f] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-[1px] bg-gradient-gold" />
            <span className="text-amber-400 font-dancing text-2xl">Gallery</span>
            <div className="w-12 h-[1px] bg-gradient-gold" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-white mb-4">
            A Feast for <span className="text-gradient">The Eyes</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((img, index) => (
            <div key={img.id} onClick={() => setSelectedImage(img)} className={`group relative overflow-hidden rounded-2xl cursor-pointer ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''} ${isInView ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: `${index * 0.1}s` }}>
              <img src={img.src} alt={img.title} className={`w-full object-cover group-hover:scale-110 transition-transform duration-700 ${index === 0 ? 'h-full min-h-[300px] md:min-h-[500px]' : 'h-60 md:h-64'}`} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white font-playfair text-xl opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  {img.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-4xl max-h-[80vh] animate-scale-in">
            <img src={selectedImage.src} alt={selectedImage.title} className="max-w-full max-h-[80vh] object-contain rounded-lg" />
            <button onClick={() => setSelectedImage(null)} className="absolute -top-4 -right-4 w-10 h-10 bg-amber-500 text-black rounded-full flex items-center justify-center hover:bg-amber-400 transition-colors">
              <CloseIcon />
            </button>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
              <h3 className="text-white font-playfair text-2xl">{selectedImage.title}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

// ==================== TESTIMONIALS ====================
function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [ref, isInView] = useInView(0.2)

  useEffect(() => {
    const timer = setInterval(() => setCurrentIndex(prev => (prev + 1) % testimonials.length), 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="reviews" ref={ref} className="relative py-24 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-amber-500 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-16 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-[1px] bg-gradient-gold" />
            <span className="text-amber-400 font-dancing text-2xl">Testimonials</span>
            <div className="w-12 h-[1px] bg-gradient-gold" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-white mb-4">
            What Our Guests <span className="text-gradient">Say</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className={`glass rounded-2xl p-8 hover:border-amber-500/30 transition-all duration-500 ${isInView ? 'animate-fade-in-up' : 'opacity-0'} ${index === currentIndex ? 'ring-2 ring-amber-500/30' : ''}`} style={{ animationDelay: `${index * 0.15}s` }}>
              <QuoteIcon />
              <p className="text-gray-300 leading-relaxed mt-4 mb-6 italic text-lg">"{testimonial.text}"</p>
              <div className="flex items-center gap-4">
                <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover border-2 border-amber-500/30" />
                <div>
                  <h4 className="text-white font-semibold">{testimonial.name}</h4>
                  <p className="text-amber-400/70 text-sm">{testimonial.role}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[...Array(testimonial.rating)].map((_, i) => <StarIcon key={i} filled />)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-3 mt-10">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setCurrentIndex(i)} className={`transition-all duration-300 rounded-full ${i === currentIndex ? 'w-10 h-3 bg-gradient-gold' : 'w-3 h-3 bg-white/20'}`} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ==================== RESERVATION ====================
function ReservationSection() {
  const [ref, isInView] = useInView(0.2)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', date: '', time: '', guests: '2', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setFormData({ name: '', email: '', phone: '', date: '', time: '', guests: '2', message: '' })
  }

  return (
    <section id="reservation" ref={ref} className="relative py-24 bg-[#0f0f0f] overflow-hidden">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=1920&h=1080&fit=crop" alt="" className="w-full h-full object-cover opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className={`${isInView ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-[1px] bg-gradient-gold" />
              <span className="text-amber-400 font-dancing text-2xl">Reservation</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-white mb-6 leading-tight">
              Book Your <span className="text-gradient">Table</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              Reserve your spot for an unforgettable dining experience. We look forward to welcoming you to Élysée.
            </p>

            <div className="space-y-6">
              {[
                { icon: <LocationIcon />, label: 'Location', value: '42 Luxury Avenue, Manhattan, NY 10001' },
                { icon: <PhoneIcon />, label: 'Phone', value: '+1 (212) 555-0189' },
                { icon: <MailIcon />, label: 'Email', value: 'reservations@elysee.com' },
                { icon: <ClockIcon />, label: 'Hours', value: 'Mon-Thu: 5PM-11PM | Fri-Sun: 12PM-12AM' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">{item.label}</p>
                    <p className="text-white font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`glass rounded-3xl p-8 sm:p-10 ${isInView ? 'animate-fade-in-right' : 'opacity-0'}`}>
            {submitted ? (
              <div className="text-center py-12 animate-scale-in">
                <div className="w-20 h-20 mx-auto rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-playfair font-bold text-white mb-3">Reservation Confirmed!</h3>
                <p className="text-gray-400">We've sent a confirmation to your email. See you soon!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Full Name</label>
                    <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Email</label>
                    <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 outline-none transition-all" placeholder="john@email.com" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Phone</label>
                    <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 outline-none transition-all" placeholder="+1 (555) 000-0000" />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Guests</label>
                    <select value={formData.guests} onChange={e => setFormData({...formData, guests: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 outline-none transition-all">
                      {[1,2,3,4,5,6,7,8,9,10].map(n => (
                        <option key={n} value={n} className="bg-[#1a1a1a]">{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                      <option value="10+" className="bg-[#1a1a1a]">10+ Guests</option>
                    </select>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Date</label>
                    <input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm mb-2 block">Time</label>
                    <input type="time" required value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Special Requests</label>
                  <textarea rows={3} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 outline-none transition-all resize-none" placeholder="Any dietary requirements or special occasions?" />
                </div>
                <button type="submit" className="w-full py-4 bg-gradient-gold text-black font-bold rounded-xl text-lg hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                  Confirm Reservation
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// ==================== CONTACT ====================
function ContactSection() {
  const [ref, isInView] = useInView(0.2)

  return (
    <section id="contact" ref={ref} className="relative py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-[1px] bg-gradient-gold" />
            <span className="text-amber-400 font-dancing text-2xl">Find Us</span>
            <div className="w-12 h-[1px] bg-gradient-gold" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-white">
            Visit <span className="text-gradient">Élysée</span>
          </h2>
        </div>

        <div className={`glass rounded-3xl overflow-hidden ${isInView ? 'animate-scale-in' : 'opacity-0'}`}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878428698!3d40.74076797932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sGoogle!5e0!3m2!1sen!2sus!4v1637186996766!5m2!1sen!2sus" width="100%" height="400" style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)' }} allowFullScreen="" loading="lazy" title="map" />
        </div>
      </div>
    </section>
  )
}

// ==================== NEWSLETTER ====================
function Newsletter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 3000)
  }

  return (
    <section className="relative py-20 bg-[#0f0f0f]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-amber-400 font-dancing text-2xl mb-4 block">Stay Connected</span>
        <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-white mb-4">
          Join Our <span className="text-gradient">Newsletter</span>
        </h2>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
          Be the first to know about new menu items, special events, and exclusive offers.
        </p>
        {subscribed ? (
          <div className="animate-scale-in text-green-400 text-lg font-medium">✓ Thank you for subscribing!</div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email address" className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white placeholder-gray-500 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 outline-none transition-all" />
            <button type="submit" className="px-8 py-4 bg-gradient-gold text-black font-bold rounded-full hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 hover:scale-105 whitespace-nowrap">
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

// ==================== FOOTER ====================
function Footer() {
  return (
    <footer className="relative bg-[#050505] pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
                <span className="text-black font-bold text-lg font-playfair">É</span>
              </div>
              <div>
                <span className="text-xl font-playfair font-bold text-white">Élysée</span>
                <span className="block text-[10px] text-amber-400 tracking-[0.3em] uppercase -mt-1">Fine Dining</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Where culinary artistry meets warm hospitality. Experience fine dining at its most elegant.
            </p>
            <div className="flex items-center gap-3">
              {[FacebookIcon, InstagramIcon, TwitterIcon, WhatsAppIcon].map((Icon, i) => (
                <button key={i} className="w-10 h-10 rounded-full bg-white/5 text-gray-400 hover:bg-amber-500 hover:text-black flex items-center justify-center transition-all duration-300">
                  <Icon />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-playfair font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'About', 'Menu', 'Gallery', 'Reservations', 'Contact'].map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-gray-500 hover:text-amber-400 transition-colors text-sm">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-playfair font-bold text-lg mb-6">Opening Hours</h4>
            <ul className="space-y-3 text-sm">
              {[
                { day: 'Monday - Thursday', time: '5:00 PM - 11:00 PM' },
                { day: 'Friday - Saturday', time: '12:00 PM - 12:00 AM' },
                { day: 'Sunday', time: '12:00 PM - 10:00 PM' },
              ].map((item, i) => (
                <li key={i} className="flex justify-between">
                  <span className="text-gray-500">{item.day}</span>
                  <span className="text-amber-400/80">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-playfair font-bold text-lg mb-6">Contact</h4>
            <ul className="space-y-4">
              {[
                { icon: <LocationIcon />, text: '42 Luxury Avenue, Manhattan, NY 10001' },
                { icon: <PhoneIcon />, text: '+1 (212) 555-0189' },
                { icon: <MailIcon />, text: 'info@elysee.com' },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-amber-400 mt-0.5 flex-shrink-0">{item.icon}</span>
                  <span className="text-gray-500 text-sm">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">© {new Date().getFullYear()} Élysée Fine Dining. All rights reserved.</p>
            <div className="flex items-center gap-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(link => (
                <a key={link} href="#" className="text-gray-600 hover:text-amber-400 transition-colors text-sm">{link}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ==================== CHECKOUT SECTION ====================
function CheckoutSection({ cart, checkoutRef, onOrderSuccess }) {
  const [step, setStep] = useState(1)
  const [deliveryInfo, setDeliveryInfo] = useState(() => {
    const saved = localStorage.getItem('elysee_delivery_info')
    return saved ? JSON.parse(saved) : { name: '', phone: '', email: '', state: '', city: '', address: '' }
  })
  const [errors, setErrors] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const validate = () => {
    const newErrors = {}
    if (!deliveryInfo.name.trim()) newErrors.name = 'Full name is required'
    if (!deliveryInfo.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!deliveryInfo.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(deliveryInfo.email)) newErrors.email = 'Enter a valid email'
    if (!deliveryInfo.state.trim()) newErrors.state = 'State is required'
    if (!deliveryInfo.city.trim()) newErrors.city = 'City is required'
    if (!deliveryInfo.address.trim()) newErrors.address = 'Delivery address is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleDeliverySubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      localStorage.setItem('elysee_delivery_info', JSON.stringify(deliveryInfo))
      setStep(2)
      if (checkoutRef.current) checkoutRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handlePaystackPayment = () => {
    setIsProcessing(true)
    const handler = window.PaystackPop && window.PaystackPop.setup({
      key: 'pk_test_your_paystack_public_key_here',
      email: deliveryInfo.email,
      amount: Math.round(total * 100),
      currency: 'NGN',
      ref: `ELYSEE_${Date.now()}`,
      callback: (response) => {
        setIsProcessing(false)
        setOrderPlaced(true)
        setTimeout(() => onOrderSuccess(), 3000)
      },
      onClose: () => setIsProcessing(false)
    })

    if (handler) {
      handler.openIframe()
    } else {
      setIsProcessing(false)
      setOrderPlaced(true)
      setTimeout(() => onOrderSuccess(), 3000)
    }
  }

  if (orderPlaced) {
    return (
      <section ref={checkoutRef} id="checkout" className="relative py-24 bg-[#0a0a0a] min-h-screen flex items-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center animate-scale-in">
          <div className="glass rounded-3xl p-12">
            <div className="w-24 h-24 mx-auto rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-8">
              <svg className="w-12 h-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-white mb-4">
              Order <span className="text-gradient">Confirmed!</span>
            </h2>
            <p className="text-gray-400 text-lg mb-2">
              Thank you, <span className="text-amber-400 font-semibold">{deliveryInfo.name}</span>!
            </p>
            <p className="text-gray-500 mb-8">Redirecting you back to the menu...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={checkoutRef} id="checkout" className="relative py-24 bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-white mb-4">
            Complete Your <span className="text-gradient">Order</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="glass rounded-3xl p-8 sm:p-10">
                <h3 className="text-2xl font-playfair font-bold text-white mb-6">Delivery Information</h3>
                <form onSubmit={handleDeliverySubmit} className="space-y-5">
                  <input type="text" value={deliveryInfo.name} onChange={e => setDeliveryInfo({ ...deliveryInfo, name: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none" placeholder="Full Name" />
                  <input type="tel" value={deliveryInfo.phone} onChange={e => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none" placeholder="Phone" />
                  <input type="email" value={deliveryInfo.email} onChange={e => setDeliveryInfo({ ...deliveryInfo, email: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none" placeholder="Email" />
                  <input type="text" value={deliveryInfo.state} onChange={e => setDeliveryInfo({ ...deliveryInfo, state: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none" placeholder="State" />
                  <input type="text" value={deliveryInfo.city} onChange={e => setDeliveryInfo({ ...deliveryInfo, city: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none" placeholder="City" />
                  <textarea rows={3} value={deliveryInfo.address} onChange={e => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none" placeholder="Address" />
                  <button type="submit" className="w-full py-4 bg-gradient-gold text-black font-bold rounded-xl">Continue to Payment</button>
                </form>
              </div>
            )}
            {step === 2 && (
              <div className="glass rounded-3xl p-8">
                <button onClick={() => setStep(1)} className="text-gray-400 mb-4">← Back</button>
                <h3 className="text-2xl font-playfair font-bold text-white mb-4">Payment</h3>
                <button onClick={handlePaystackPayment} disabled={isProcessing} className="w-full py-4 bg-gradient-gold text-black font-bold rounded-xl">
                  {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                </button>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="glass rounded-3xl p-6 sticky top-24">
              <h3 className="text-xl font-playfair font-bold text-white mb-6">Order Summary</h3>
              {cart.map(item => (
                <div key={item.id} className="flex gap-3 mb-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/500x400/1a1a1a/D4AF37?text=No+Image'; }}
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-white text-sm">{item.name}</p>
                    <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-amber-400 font-semibold text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t border-white/10 pt-4 mt-4">
                <div className="flex justify-between text-white font-bold">
                  <span>Total</span>
                  <span className="text-gradient">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ==================== CART DRAWER ====================
function CartDrawer({ cart, setCart, showCart, setShowCart, onPlaceOrder }) {
  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item).filter(item => item.quantity > 0))
  }
  const removeItem = (id) => setCart(prev => prev.filter(item => item.id !== id))
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      <div className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 ${showCart ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setShowCart(false)} />
      <div className={`fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#0f0f0f] z-50 transition-transform duration-500 flex flex-col ${showCart ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-playfair font-bold text-white">Your Order</h3>
            <p className="text-gray-500 text-sm">{totalItems} items</p>
          </div>
          <button onClick={() => setShowCart(false)} className="w-10 h-10 rounded-full bg-white/5 text-white hover:bg-white/10 flex items-center justify-center transition-colors">
            <CloseIcon />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🍽️</div>
              <h4 className="text-white font-playfair text-xl mb-2">Your cart is empty</h4>
              <p className="text-gray-500">Add some delicious items from our menu!</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-4 glass rounded-xl p-4">
                <img
                  src={item.image}
                  alt={item.name}
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/500x400/1a1a1a/D4AF37?text=No+Image'; }}
                  className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-semibold text-sm truncate">{item.name}</h4>
                  <p className="text-amber-400 font-bold mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => updateQuantity(item.id, -1)} className="w-7 h-7 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors"><MinusIcon /></button>
                    <span className="text-white font-medium text-sm w-6 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="w-7 h-7 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors"><PlusIcon /></button>
                    <button onClick={() => removeItem(item.id)} className="ml-auto text-red-400 hover:text-red-300 transition-colors"><TrashIcon /></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-white/10 space-y-4">
            <div className="flex justify-between text-white font-bold text-lg">
              <span>Total</span>
              <span className="text-gradient">${total.toFixed(2)}</span>
            </div>
            <button onClick={() => { setShowCart(false); onPlaceOrder(); }} className="w-full py-4 bg-gradient-gold text-black font-bold rounded-xl">
              Place Order
            </button>
          </div>
        )}
      </div>
    </>
  )
}

// ==================== SCROLL TO TOP ====================
function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-gradient-gold text-black flex items-center justify-center shadow-lg shadow-amber-500/30 hover:scale-110 transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
      <ArrowUpIcon />
    </button>
  )
}

// ==================== MAIN APP ====================
function Home() {
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const checkoutRef = useRef(null)

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
      return [...prev, { ...item, quantity: 1 }]
    })
    setShowCart(true)
    setTimeout(() => setShowCart(false), 1500)
  }

  const handlePlaceOrder = () => {
    setShowCheckout(true)
    setTimeout(() => {
      if (checkoutRef.current) checkoutRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const handleOrderSuccess = () => {
    setCart([])
    setShowCheckout(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen font-inter">
      <Navbar cart={cart} setShowCart={setShowCart} />
      <HeroSection />
      <AboutSection />
      <MenuSection addToCart={addToCart} />
      <SpecialOffer />
      <ChefsSection />
      <GallerySection />
      <TestimonialsSection />
      <ReservationSection />
      <ContactSection />
      <Newsletter />

      {showCheckout && (
        <CheckoutSection cart={cart} checkoutRef={checkoutRef} onOrderSuccess={handleOrderSuccess} />
      )}

      <Footer />

      <CartDrawer cart={cart} setCart={setCart} showCart={showCart} setShowCart={setShowCart} onPlaceOrder={handlePlaceOrder} />
      <ScrollToTop />
    </div>
  )
}

export default Home;