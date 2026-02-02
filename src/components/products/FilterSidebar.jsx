import { useState, useEffect } from "react";

const COINS = ["BTC", "LTC", "KAS", "DOGE", "ETC"];
const BRANDS = ["Bitmain", "MicroBT", "Canaan", "Goldshell", "Innosilicon", "Jasminer"];

export default function FilterSidebar({ filters, setFilters }) {
  const [open, setOpen] = useState(false);

  // 🔒 Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

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
      {/* Mobile Filter Button */}
      <button
        className="lg:hidden border px-4 py-2 rounded mb-4 hover:bg-gray-50"
        onClick={() => setOpen(true)}
      >
        Filters
      </button>

      {/* MOBILE OVERLAY */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setOpen(false)} />
      )}

      {/* SIDEBAR / DRAWER */}
      <div
        className={`
          fixed lg:static top-0 right-0 h-full w-full max-w-sm bg-white z-50
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
          lg:translate-x-0 lg:h-auto lg:max-w-none lg:z-auto
        `}
      >
        {/* HEADER (mobile only) */}
        <div className="flex justify-between items-center p-4 border-b lg:hidden sticky top-0 bg-white z-10">
          <h3 className="font-semibold">Filters</h3>
          <button onClick={() => setOpen(false)} className="text-xl font-bold px-2">
            ✕
          </button>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="p-6 lg:p-0 overflow-y-auto h-[calc(100vh-64px)] lg:h-auto">
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
              className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
              style={{ accentColor: "var(--primary-color)" }}
            />
            <p className="text-sm text-gray-500 mt-2">Up to ${filters.price[1].toLocaleString()}</p>
          </Section>

          {/* Clear Filters */}
          <button
            onClick={() =>
              setFilters({
                coin: [],
                brand: [],
                inStock: false,
                price: [0, 10000],
              })
            }
            className="w-full mt-6 px-4 py-2 border rounded hover:bg-gray-50 text-sm"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </>
  );
}

/* ---------- SMALL COMPONENTS ---------- */

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
      style={{ accentColor: "var(--primary-color)" }}
    />
    {label}
  </label>
);
