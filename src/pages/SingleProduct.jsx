import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import products from "../utils/products";
import { getCoinData } from "../api/price.api";
import Spec from "../components/products/Spec";
import OptionCard from "../components/products/OptionCard";

export default function SingleProduct() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  const [coinData, setCoinData] = useState([]);

  useEffect(() => {
    const coins = ["bitcoin", "litecoin", "kaspa"];

    Promise.all(coins.map((coin) => getCoinData(coin)))
      .then(setCoinData)
      .catch(console.error);
  }, []);

  if (!product) return <p className="text-center py-20">Product not found</p>;

  return (
    <div className="container-x mx-auto px-6 py-16 ">
      {/* TOP SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image */}
        <img src={product.image} alt={product.name} className="rounded-xl border border-gray-200" />

        {/* Info */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
              {product.brand}
            </span>
            <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
              In Stock
            </span>
          </div>

          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>

          <p className="text-green-600 text-3xl font-semibold mb-4">
            ${product.price.toLocaleString()}
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Spec label="Hashrate" value={`${product.hashrate} ${product.hashrateUnit}`} />
            <Spec label="Power" value={`${product.power} W`} />
            <Spec label="Algorithm" value={product.algorithm} />
            <Spec label="Coin" value={product.coin} />
          </div>

          {/* CTA */}
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium">
            Add to Cart
          </button>
        </div>
      </div>

      {/* BUY / RENT / HOST */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        <OptionCard
          title="Hosting"
          price="€1,399.00"
          items={["Including setup", "Including shipping", "Online in 5 days"]}
          button="Host Here"
        />

        <OptionCard
          title="Rent"
          price="€1,399.00"
          items={["Including setup", "Including shipping", "Online in 5 days"]}
          button="Order Now"
        />

        <OptionCard
          title="Shipment"
          price="€1,399.00"
          items={["Including shipping", "Including customs", "2 – 4 weeks delivery"]}
          button="Order Now"
        />
      </div>

      {/* MINEABLE COINS */}
      <div className="mt-20 text-center">
        <h2 className="text-2xl font-bold mb-8">Mineable Coins</h2>

        <div className="flex justify-center gap-8 flex-wrap">
          {coinData.map((coin, i) =>
            coin.image ? <img key={i} src={coin.image} alt="coin" className="w-12 h-12" /> : null
          )}
        </div>
      </div>
    </div>
  );
}
