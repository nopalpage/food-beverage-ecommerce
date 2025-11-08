// components/ProductCard.js
import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={200}
          className="w-full h-40 object-cover rounded"
        />
        <h3 className="mt-2 font-semibold text-text">{product.name}</h3>
        <p className="text-primary font-bold">Rp{product.price.toLocaleString()}</p>
      </div>
    </Link>
  );
}
