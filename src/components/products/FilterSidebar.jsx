import { useState } from "react";

const COINS = ["BTC", "LTC", "KAS", "DOGE", "ETC"];
const BRANDS = ["Bitmain", "MicroBT", "Canaan", "Goldshell", "Innosilicon", "Jasminer"];

export default function FilterSidebar({ filters, setFilters }) {
  const [open, setOpen] = useState(false);

  const toggleValue = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
  };

  return (
    <>
      {/* Mobile button */}
      <button 
        className="lg:hidden border px-4 py-2 rounded mb-4 hover:bg-gray-50"
        onClick={() => setOpen(true)}
      >
        Filters
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-0 bg-white z-40 p-6 lg:p-0 lg:block
        ${open ? "block" : "hidden"}`}
      >
        <div className="flex justify-between items-center mb-4 lg:hidden">
          <h3 className="font-semibold">Filters</h3>
          <button onClick={() => setOpen(false)}>✕</button>
        </div>

        {/* Coin */}
        <Section title="Mineable Coin">
          {COINS.map((c) => (
            <Checkbox
              key={c}
              label={c}
              checked={filters.coin.includes(c)}
              onChange={() => toggleValue("coin", c)}
            />
          ))}
        </Section>

        {/* Brand */}
        <Section title="Brand">
          {BRANDS.map((b) => (
            <Checkbox
              key={b}
              label={b}
              checked={filters.brand.includes(b)}
              onChange={() => toggleValue("brand", b)}
            />
          ))}
        </Section>

        {/* Stock */}
        <Section title="Availability">
          <Checkbox
            label="In Stock"
            checked={filters.inStock}
            onChange={() => setFilters((prev) => ({ ...prev, inStock: !prev.inStock }))}
          />
        </Section>

        {/* Price */}
        <Section title="Price Range">
          <input
            type="range"
            min="0"
            max="10000"
            value={filters.price[1]}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                price: [0, Number(e.target.value)],
              }))
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            style={{ accentColor: 'var(--primary-color)' }}
          />
          <p className="text-sm text-gray-500 mt-2">Up to ${filters.price[1].toLocaleString()}</p>
        </Section>

        {/* Clear Filters */}
        <button
          onClick={() => setFilters({
            coin: [],
            brand: [],
            inStock: false,
            price: [0, 10000],
          })}
          className="w-full mt-4 px-4 py-2 border rounded hover:bg-gray-50 text-sm"
        >
          Clear All Filters
        </button>
      </div>
    </>
  );
}

const Section = ({ title, children }) => (
  <div className="mb-6">
    <h4 className="font-semibold mb-3">{title}</h4>
    <div className="space-y-2">{children}</div>
  </div>
);

const Checkbox = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-gray-900">
    <input 
      type="checkbox" 
      checked={checked} 
      onChange={onChange}
      className="cursor-pointer"
      style={{ accentColor: 'var(--primary-color)' }}
    />
    {label}
  </label>
);
