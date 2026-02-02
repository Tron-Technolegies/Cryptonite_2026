import { useState } from "react";
import miningLocations from "../../utils/miningLocations";

export default function OptionCard({
  title,
  price,
  items,
  available = true,
  onSelect,
  isSelected,
  showLocationDropdown = false,
}) {
  const [selectedLocation, setSelectedLocation] = useState(miningLocations[0]);

  const handleClick = () => {
    if (available && onSelect) {
      onSelect(title);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`border-2 rounded-xl p-5 transition-all cursor-pointer
      flex flex-col h-full
      ${
        isSelected
          ? "border-green-600 bg-green-50"
          : available
            ? "border-gray-200 hover:border-green-400 hover:shadow-md"
            : "border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed"
      }`}
      style={isSelected ? { borderColor: "var(--primary-color)", backgroundColor: "#f0fdf4" } : {}}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold">{title}</h3>
        {available ? (
          <span
            className="text-xs px-3 py-1 rounded-full bg-green-100"
            style={{ color: "var(--primary-color)" }}
          >
            Available
          </span>
        ) : (
          <span className="text-xs px-3 py-1 rounded-full bg-gray-200 text-gray-600">
            from €0.056/kWh
          </span>
        )}
      </div>

      {/* Price + Location */}
      <div className="mb-4">
        <p className="text-2xl font-bold mb-2" style={{ color: "var(--primary-color)" }}>
          {price}
        </p>

        {showLocationDropdown && (
          <select
            value={selectedLocation.id}
            onChange={(e) => {
              e.stopPropagation();
              setSelectedLocation(miningLocations.find((loc) => loc.id === e.target.value));
            }}
            onClick={(e) => e.stopPropagation()}
            className="w-full p-2 border border-gray-300 rounded-lg text-xs"
          >
            {miningLocations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name} - {location.price}/kWh
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Features */}
      <ul className="space-y-2 text-sm text-gray-700 mb-6">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-green-600">•</span>
            {item}
          </li>
        ))}
      </ul>

      <button
        className={`mt-auto w-full py-3 rounded-lg font-medium transition-all cursor-pointer
        ${
          isSelected
            ? "bg-green-600 text-white"
            : available
              ? "bg-gray-100 hover:bg-gray-200"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
        }`}
        style={isSelected ? { backgroundColor: "var(--primary-color)" } : {}}
        disabled={!available}
      >
        {isSelected ? "Selected" : available ? "Select Option" : "Order Now"}
      </button>
    </div>
  );
}
