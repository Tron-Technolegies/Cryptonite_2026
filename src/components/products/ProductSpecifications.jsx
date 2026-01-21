export default function ProductSpecifications({ product }) {
  const specifications = [
    { label: "Brand", value: product.brand || "N/A" },
    { label: "Model", value: product.name || "N/A" },
    { label: "Hashrate", value: `${product.hashrate || product.hashRate || "N/A"} ${product.hashrateUnit || ""}` },
    { label: "Currency", value: product.coin || "N/A" },
    { label: "Algorithm", value: product.algorithm || "N/A" },
    { label: "Power Consumption", value: `${product.power || product.powerConsumption || "N/A"} W` },
    { label: "Energy Efficiency", value: product.efficiency || "18.5 J/TH" },
    { label: "Dimensions", value: product.dimensions || "483 x 663 x 86 mm" },
    { label: "Voltage", value: product.voltage || "110-240V AC" },
    { label: "Network Interface", value: product.network || "Ethernet" },
    { label: "Noise Level", value: product.noiseLevel || "50 dB" },
    { label: "Operation Temperature", value: product.temperature || "0℃ ~ 40℃ (32°F ~ 104°F)" },
    { label: "Plug/Socket Type", value: product.plugType || "C13 (common PC connector)" },
    { label: "Warranty", value: "7 Years (Hosted) / 12 Months (Shipped)" }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
      <h3 className="text-2xl font-bold mb-6">Technical Specifications</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {specifications.map((spec, index) => (
          <div 
            key={index} 
            className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="text-gray-600 font-medium">{spec.label}</span>
            <span className="font-semibold text-gray-900">{spec.value}</span>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <p className="text-sm text-gray-700">
          <span className="font-semibold" style={{ color: 'var(--primary-color)' }}>Note:</span> Power cord shipped according to the client's destination. All specifications are subject to manufacturer updates.
        </p>
      </div>
    </div>
  );
}
