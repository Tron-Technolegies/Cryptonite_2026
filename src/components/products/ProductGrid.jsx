import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../../api/cart.api";
import { getImageUrl } from "../../utils/imageUtils";
import { getProducts } from "../../api/product.api";

const ITEMS_PER_PAGE = 9;

/* UI → DRF ordering map */
const SORT_MAP = {
  best: "-average_rating",
  priceLow: "price",
  priceHigh: "-price",
};

/* Build backend-compatible query */
const buildQuery = (filters, sortBy) => {
  const params = new URLSearchParams();

  // price range
  params.append("min_price", filters.price[0]);
  params.append("max_price", filters.price[1]);

  // brand (backend supports this)
  filters.brand.forEach((b) => {
    params.append("brand", b);
  });

  //  FRONTEND coin → BACKEND minable_coins
  filters.coin.forEach((c) => {
    params.append("minable_coins", c);
  });

  //  FRONTEND inStock → BACKEND is_available
  if (filters.inStock) {
    params.append("is_available", "true");
  }

  // sorting (backend supports this)
  params.append("ordering", SORT_MAP[sortBy] || "-id");

  return params.toString();
};

export default function ProductGrid({
  filters = { coin: [], brand: [], price: [0, 10000], inStock: false },
  sortBy = "best",
  onCountChange,
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isAdding, setIsAdding] = useState(null);

  const navigate = useNavigate();

  /* ---------------- FETCH PRODUCTS ---------------- */
  useEffect(() => {
    setLoading(true);

    const query = buildQuery(filters, sortBy);
    console.log("QUERY:", query); // ✅ safe here

    getProducts(query)
      .then((res) => {
        const data = res.data;
        const items = data.results || data;

        setProducts(items);
        onCountChange?.(items.length);
      })
      .catch((err) => {
        console.error("PRODUCT FETCH ERROR:", err);
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
            <Link to={`/products/${p.id}`}>
              {p.image && (
                <img
                  src={getImageUrl(p.image)}
                  alt={p.model_name}
                  className="h-40 mx-auto object-contain"
                />
              )}

              <h3 className="font-semibold mt-4">{p.model_name}</h3>

              <p className="text-sm text-gray-500">
                {p.hashrate} TH/s · {p.power} W
              </p>

              <p className="text-sm text-gray-500">Algorithm: {p.algorithm}</p>

              <p className="text-lg font-bold mt-3">${Number(p.price).toLocaleString()}</p>
            </Link>

            <div className="mt-4">
              <button
                onClick={() => handleBuyNow(p)}
                disabled={isAdding === p.id}
                className="bg-black text-white py-2 w-full rounded-xl text-sm font-medium disabled:opacity-50"
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
