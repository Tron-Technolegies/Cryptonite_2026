const OptionCard = ({ title, price, items, button }) => {
  return (
    <div className="border border-gray-300 rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>

      <ul className="text-sm text-gray-600 space-y-2 mb-6">
        {items.map((item, i) => (
          <li key={i}>• {item}</li>
        ))}
      </ul>

      <p className="text-green-600 text-xl font-bold mb-4">{price}</p>

      <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg">
        {button}
      </button>
    </div>
  );
};

export default OptionCard;
