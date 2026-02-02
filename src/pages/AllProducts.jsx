import { useEffect, useState } from "react";
import ProductGrid from "../components/products/ProductGrid";
import FilterSidebar from "../components/products/FilterSidebar";
import SortBar from "../components/products/SortBar";

export default function AllProducts() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [filters, setFilters] = useState({
    coin: [],
    brand: [],
    inStock: false,
    price: [0, 10000],
  });

  const [sortBy, setSortBy] = useState("best");
  const [productCount, setProductCount] = useState(0);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">ASIC Miners</h1>
          <p className="text-gray-500">
            Browse our selection of high-performance crypto mining hardware
            <span className="ml-1">({productCount} products)</span>
          </p>
        </div>

        <SortBar sortBy={sortBy} setSortBy={setSortBy} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        <FilterSidebar filters={filters} setFilters={setFilters} />
        <ProductGrid filters={filters} sortBy={sortBy} onCountChange={setProductCount} />
      </div>
    </div>
  );
}
