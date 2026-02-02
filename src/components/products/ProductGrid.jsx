import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getProducts } from "../../api/product.api";
import { addToCart } from "../../api/cart.api";
import { getImageUrl } from "../../utils/imageUtils";

const ITEMS_PER_PAGE = 9;

/* UI → DRF ordering map */
const SORT_MAP = {
  best: "-average_rating",
  priceLow: "price",
  priceHigh: "-price",
  hashrate: "-hashrate",
};

export default function ProductGrid({ filters, sortBy, onCountChange }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isAdding, setIsAdding] = useState(null);

  const navigate = useNavigate();

  /* ---------------- FETCH PRODUCTS ---------------- */
  useEffect(() => {
    setLoading(true);

    const params = {
      ordering: SORT_MAP[sortBy] || "-id",
    };

    if (filters.coin.length) params.coin = filters.coin;
    if (filters.brand.length) params.brand = filters.brand;
    if (filters.inStock) params.in_stock = true;

    params.price_min = filters.price[0];
    params.price_max = filters.price[1];

    getProducts(params)
      .then((data) => {
        const items = data.results || data;
        setProducts(items);
        onCountChange?.(items.length);
      })
      .catch(() => {
        toast.error("Failed to load products");
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, [filters, sortBy, onCountChange]);

  /* Reset page on filter/sort change */
  useEffect(() => {
    setPage(1);
  }, [filters, sortBy]);

  /* ---------------- PAGINATION ---------------- */
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return products.slice(start, start + ITEMS_PER_PAGE);
  }, [products, page]);

  /* ---------------- ACTIONS ---------------- */
  const handleBuyNow = async (product) => {
    if (isAdding) return;
    setIsAdding(product.id);

    try {
      await addToCart(product.id, null, 1);
      navigate("/checkout");
    } catch {
      toast.error("Please login to continue");
    } finally {
      setIsAdding(null);
    }
  };

  /* ---------------- UI STATES ---------------- */
  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-green-600" />
      </div>
    );
  }

  if (!products.length) {
    return <p className="text-gray-500 mt-8">No miners available.</p>;
  }

  /* ---------------- RENDER ---------------- */
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {paginatedProducts.map((p) => (
          <div
            key={p.id}
            className="bg-white border border-gray-300 rounded-2xl p-4 hover:shadow-lg transition"
          >
            <img
              src={getImageUrl(p.image)}
              alt={p.model_name}
              className="h-40 mx-auto object-contain"
            />

            <h3 className="font-semibold mt-4">{p.model_name}</h3>

            <p className="text-sm text-gray-500">
              {p.hashrate} TH/s · {p.power} W
            </p>

            <p className="text-sm text-gray-500">Algorithm: {p.algorithm}</p>

            <p className="text-lg font-bold mt-3">${Number(p.price).toLocaleString()}</p>

            <div className="grid grid-cols-2 gap-2 mt-4">
              <Link
                to={`/products/${p.id}`}
                className="bg-gray-100 py-2 rounded-xl text-sm font-medium text-center"
              >
                View
              </Link>

              <button
                onClick={() => handleBuyNow(p)}
                disabled={isAdding === p.id}
                className="bg-green-600 text-white py-2 rounded-xl text-sm font-medium disabled:opacity-50"
              >
                {isAdding === p.id ? "..." : "Buy Now"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                page === i + 1 ? "bg-green-600 text-white" : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
