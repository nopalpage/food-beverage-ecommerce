// components/Layout.js
import Link from 'next/link';
import { useState } from 'react';
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-text">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-primary">
            FreshMart
          </Link>

          <nav className="hidden md:flex gap-6">
            <Link href="/products">Produk</Link>
            <Link href="/cart">Keranjang</Link>
            <Link href="/admin">Admin</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative">
              <FiShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>

            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="md:hidden bg-white border-t">
            <Link href="/products" className="block px-4 py-2">Produk</Link>
            <Link href="/cart" className="block px-4 py-2">Keranjang</Link>
            <Link href="/admin" className="block px-4 py-2">Admin</Link>
          </nav>
        )}
      </header>

      <main>{children}</main>

      <footer className="bg-gray-100 text-center py-6 text-sm text-gray-600">
        &copy; 2025 FreshMart. All rights reserved.
      </footer>
    </div>
  );
}
