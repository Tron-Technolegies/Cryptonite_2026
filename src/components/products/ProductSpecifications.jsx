export default function ProductSpecifications({ product }) {
  const specifications = [
    { label: "Brand", value: product.brand || "N/A" },
    { label: "Model", value: product.model_name || "N/A" },

    {
      label: "Hashrate",
      value: product.hashrate || "N/A",
    },

    {
      label: "Mineable Coin",
      value: product.minable_coins || "N/A",
    },

    {
      label: "Algorithm",
      value: product.algorithm || "N/A",
    },

    {
      label: "Power Consumption",
      value: product.power || "N/A",
    },

    {
      label: "Energy Efficiency",
      value: product.efficiency ? `${product.efficiency}` : "N/A",
    },

    {
      label: "Noise Level",
      value: product.noise || "N/A",
    },

    {
      label: "Dimensions",
      value: product.dimensions || "Not specified",
    },

    {
      label: "Voltage",
      value: product.voltage || "Not specified",
    },

    {
      label: "Network Interface",
      value: product.network_interface || "Ethernet",
    },

    {
      label: "Operating Temperature",
      value: product.operating_temperature || "0℃ ~ 40℃",
    },

    {
      label: "Plug / Socket Type",
      value: product.plug_socket_type || "C13",
    },

    {
      label: "Warranty",
      value: product.warranty || "12 Months",
    },
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
          <span className="font-semibold" style={{ color: "var(--primary-color)" }}>
            Note:
          </span>{" "}
          Power cord shipped according to the client's destination. All specifications are subject
          to manufacturer updates.
        </p>
      </div>
    </div>
  );
}
