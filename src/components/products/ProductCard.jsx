export default function ProductCard({ p }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow hover:shadow-lg">
      <img src={p.image} className="h-44 mx-auto object-contain mb-4" />

      <h3 className="font-semibold">{p.name}</h3>
      <p className="text-sm text-gray-500">{p.hashRate}</p>

      <div className="mt-2 flex justify-between items-center">
        <p className="font-bold">{p.price}</p>
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
          ${p.daily}/day
        </span>
      </div>
    </div>
  );
}
