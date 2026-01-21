export default function SortBar({ sortBy, setSortBy }) {
  return (
    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
      className="border rounded px-3 py-2 focus:outline-none focus:ring-2"
      style={{ focusRingColor: 'var(--primary-color)' }}
    >
      <option value="best">Best selling</option>
      <option value="priceLow">Price: Low to High</option>
      <option value="priceHigh">Price: High to Low</option>
      <option value="hashrate">Hashrate: High to Low</option>
    </select>
  );
}
