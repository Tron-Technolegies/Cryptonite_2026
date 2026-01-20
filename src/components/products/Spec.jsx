const Spec = ({ label, value }) => (
  <div className="border border-gray-300 rounded-lg p-4">
    <p className="text-xs text-gray-500">{label}</p>
    <p className="font-semibold">{value}</p>
  </div>
);

export default Spec;
