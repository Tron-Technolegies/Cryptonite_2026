import products from "../utils/products";
import ProductGrid from "../components/products/ProductGrid";

export default function AllProducts() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">ASIC Miners</h1>
      <p className="text-gray-500 mb-8">
        Browse our selection of high-performance crypto mining hardware.
      </p>

      <ProductGrid products={products} />
    </div>
  );
}
