import { useState, useMemo } from "react";
import products from "../utils/products";
import ProductGrid from "../components/products/ProductGrid";
import FilterSidebar from "../components/products/FilterSidebar";
import SortBar from "../components/products/SortBar";

export default function AllProducts() {
  const [filters, setFilters] = useState({
    coin: [],
    brand: [],
    inStock: false,
    price: [0, 10000],
  });

  const [sortBy, setSortBy] = useState("best");

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Coin filter
    if (filters.coin.length) {
      result = result.filter((p) => filters.coin.includes(p.coin));
    }

    // Brand filter
    if (filters.brand.length) {
      result = result.filter((p) => filters.brand.includes(p.brand));
    }

    // Stock filter
    if (filters.inStock) {
      result = result.filter((p) => p.inStock !== false);
    }

    // Price filter - handle both number and string prices
    result = result.filter((p) => {
      const price = typeof p.price === 'string' 
        ? parseFloat(p.price.replace(/[^0-9.-]+/g, "")) 
        : p.price;
      return price >= filters.price[0] && price <= filters.price[1];
    });

    // Sorting
    if (sortBy === "priceLow") {
      result.sort((a, b) => {
        const priceA = typeof a.price === 'string' ? parseFloat(a.price.replace(/[^0-9.-]+/g, "")) : a.price;
        const priceB = typeof b.price === 'string' ? parseFloat(b.price.replace(/[^0-9.-]+/g, "")) : b.price;
        return priceA - priceB;
      });
    }
    if (sortBy === "priceHigh") {
      result.sort((a, b) => {
        const priceA = typeof a.price === 'string' ? parseFloat(a.price.replace(/[^0-9.-]+/g, "")) : a.price;
        const priceB = typeof b.price === 'string' ? parseFloat(b.price.replace(/[^0-9.-]+/g, "")) : b.price;
        return priceB - priceA;
      });
    }
    if (sortBy === "hashrate") {
      result.sort((a, b) => {
        const hashA = a.hashrate || parseFloat(a.hashRate) || 0;
        const hashB = b.hashrate || parseFloat(b.hashRate) || 0;
        return hashB - hashA;
      });
    }

    return result;
  }, [filters, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">ASIC Miners</h1>
          <p className="text-gray-500">
            Browse our selection of high-performance crypto mining hardware. ({filteredProducts.length} products)
          </p>
        </div>

        <SortBar sortBy={sortBy} setSortBy={setSortBy} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        <FilterSidebar filters={filters} setFilters={setFilters} />
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
}
