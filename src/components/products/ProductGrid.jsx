import { useEffect, useState } from "react";
import productsData from "../../utils/products";

export default function ProductGrid({ coin }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Filter products by selected coin
    const filtered = productsData.filter((p) => p.coin === coin);
    setProducts(filtered);
  }, [coin]);

  if (!products.length) {
    return <p className="text-gray-500">No miners available for {coin}</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Miners for {coin}</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="border border-gray-200 rounded-2xl p-4 bg-white">
            <img src={p.image} alt={p.name} className="h-40 mx-auto object-contain" />

            <h3 className="font-semibold mt-4">{p.name}</h3>

            <p className="text-sm text-gray-500">
              {p.hashRate} · {p.powerConsumption}
            </p>

            <p className="text-sm text-gray-500">Algorithm: {p.algorithm}</p>

            <p className="font-bold mt-2">{p.price}</p>

            <button className="mt-4 w-full bg-black text-white py-2 rounded-xl hover:bg-green-500">
              Buy Miner
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
