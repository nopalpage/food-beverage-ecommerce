// pages/cart.js
import { useEffect, useState } from 'react';

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(saved);
  }, []);

  const removeItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Keranjang Belanja</h1>

      {cart.length === 0 ? (
        <p>Keranjang kosong.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b py-2">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600">Rp{item.price.toLocaleString()} x {item.qty}</p>
              </div>
              <button onClick={() => removeItem(item.id)} className="text-red-600">Hapus</button>
            </div>
          ))}

          <div className="mt-4 text-right">
            <p className="text-lg font-bold">Total: Rp{total.toLocaleString()}</p>
            <a href="/checkout" className="inline-block mt-2 bg-primary text-white px-4 py-2 rounded">
              Checkout
            </a>
          </div>
        </>
      )}
    </div>
  );
}
