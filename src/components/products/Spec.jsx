export default function Spec({ icon, label, value }) {
  return (
    <div className="flex items-center border border-gray-300 p-4 rounded-lg bg-[#F8FBF9] gap-2">
      {icon && <div className="text-green-600 text-xl">{icon}</div>}
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}
