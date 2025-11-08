// pages/index.js
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';

const dummyProducts = [
  { id: 1, name: 'Jus Alpukat', price: 15000, image: '/images/jus.jpg' },
  { id: 2, name: 'Roti Gandum', price: 20000, image: '/images/roti.jpg' },
  { id: 3, name: 'Susu Segar', price: 18000, image: '/images/susu.jpg' },
];

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-display text-primary mb-4">
          FreshMart - Makanan & Minuman Segar
        </h1>
        <p className="text-gray-600 mb-6">
          Pesan langsung dari HP kamu, kami antar ke rumah.
        </p>
        <Link href="/products">
          <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-600">
            Lihat Produk
          </button>
        </Link>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Produk Unggulan</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {dummyProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
