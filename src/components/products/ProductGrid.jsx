import { useEffect, useState } from "react";
import productsData from "../../utils/products";
import { Link } from "react-router-dom";

export default function ProductGrid({ coin }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const filtered = coin ? productsData.filter((p) => p.coin === coin) : productsData;

    setProducts(filtered);
  }, [coin]);

  if (!products.length) {
    return <p className="text-gray-500 mt-6">No miners available for {coin}</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Miners for {coin}</h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="border border-gray-200 rounded-2xl p-4 bg-white hover:shadow-lg transition"
          >
            <img src={p.image} alt={p.name} className="h-40 mx-auto object-contain" />

            <h3 className="font-semibold mt-4">{p.name}</h3>

            <p className="text-sm text-gray-500 mt-1">
              {p.hashrate} {p.hashrateUnit} · {p.power} W
            </p>

            <p className="text-sm text-gray-500">Algorithm: {p.algorithm}</p>

            <p className="font-bold text-lg mt-3">{p.price.toLocaleString()}</p>

            <Link
              to={`/products/${p.id}`}
              className="mt-4 block text-center bg-black text-white py-2 rounded-xl hover:bg-green-600 transition"
            >
              View Miner
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
