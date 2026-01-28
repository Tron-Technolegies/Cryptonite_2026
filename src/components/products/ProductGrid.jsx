import { useEffect, useState } from "react";
import productsData from "../../utils/products";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../../api/cart.api";
import { toast } from "react-toastify";

export default function ProductGrid({ coin }) {
  const [products, setProducts] = useState([]);
  const [isAdding, setIsAdding] = useState(null); // ID of product being added
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = coin ? productsData.filter((p) => p.coin === coin) : productsData;

    setProducts(filtered);
  }, [coin]);

  const handleBuyNow = async (p) => {
    if (isAdding) return;
    setIsAdding(p.id);
    try {
      await addToCart(p.id, null, 1);
      navigate("/checkout");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to add to cart. Are you logged in?");
    } finally {
      setIsAdding(null);
    }
  };

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

            <p className="font-bold text-lg mt-3">${p.price.toLocaleString()}</p>

            <div className="grid grid-cols-2 gap-2 mt-4">
                <Link
                to={`/products/${p.id}`}
                className="block text-center bg-gray-100 text-black py-2 rounded-xl hover:bg-gray-200 transition text-sm font-medium"
                >
                View
                </Link>
                <button
                onClick={() => handleBuyNow(p)}
                disabled={isAdding === p.id}
                className="block text-center bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition text-sm font-medium disabled:opacity-50"
                >
                {isAdding === p.id ? '...' : 'Buy Now'}
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
