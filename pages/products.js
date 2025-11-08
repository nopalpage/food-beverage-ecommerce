// pages/products.js
import { useState } from 'react';
import ProductCard from '@/components/ProductCard';

const allProducts = [
  { id: 1, name: 'Jus Alpukat', price: 15000, image: '/images/jus.jpg', category: 'Minuman' },
  { id: 2, name: 'Roti Gandum', price: 20000, image: '/images/roti.jpg', category: 'Makanan' },
  { id: 3, name: 'Susu Segar', price: 18000, image: '/images/susu.jpg', category: 'Minuman' },
];

export default function Products() {
  const [filter, setFilter] = useState('');

  const filtered = allProducts.filter((p) =>
    filter ? p.category.toLowerCase() === filter.toLowerCase() : true
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Semua Produk</h1>

      <div className="mb-4 flex gap-2 flex-wrap">
        <button onClick={() => setFilter('')} className="px-4 py-2 border rounded">Semua</button>
        <button onClick={() => setFilter('Makanan')} className="px-4 py-2 border rounded">Makanan</button>
        <button onClick={() => setFilter('Minuman')} className="px-4 py-2 border rounded">Minuman</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
