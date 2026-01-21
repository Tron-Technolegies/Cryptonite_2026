const miningProducts = [
  {
    id: 1,
    name: "Antminer S19 Pro",
    brand: "Bitmain",
    coin: "BTC",
    hashrate: 120, // TH/s (number)
    hashrateUnit: "TH/s",
    power: 2760, // W
    algorithm: "SHA-256",
    price: 3200,
    image: "/products/p1.png",
    description:
      "A powerful and efficient Bitcoin ASIC miner designed for maximum performance and reliability with a 110 TH/s hash rate. It features advanced thermal architecture and stable long-term mining capability, making it ideal for large-scale mining farms.",
  },
  {
    id: 2,
    name: "Whatsminer M30S++",
    brand: "MicroBT",
    hashRate: "112 TH/s",
    coin: "BTC",
    powerConsumption: "3472 W",
    algorithm: "SHA-256 (Bitcoin)",
    price: "$3,500",
    image: "/products/p2.png",
    description:
      "The M30S++ delivers high hash-rate and stability, making it a top choice for professional mining operations. Known for its durability and low failure rates, it ensures consistent output even under heavy workloads.",
  },
  {
    id: 3,
    name: "AvalonMiner 1246",
    brand: "Canaan",
    coin: "KAS",
    hashRate: "90 TH/s",
    powerConsumption: "3420 W",
    algorithm: "SHA-256 (Bitcoin)",
    price: "$2,700",
    image: "/products/p3.png",
    description:
      "Canaan's AvalonMiner 1246 provides efficient Bitcoin mining with high performance and a durable design. Its strong cooling system and robust build make it suitable for long-term mining environments.",
  },
  {
    id: 4,
    name: "Goldshell KD6",
    brand: "Goldshell",
    hashRate: "29.2 TH/s",
    powerConsumption: "2630 W",
    coin: "BTC",
    algorithm: "Kadena",
    price: "$4,000",
    image: "/products/p1.png",
    description:
      "A premium Kadena miner designed for exceptional energy efficiency and long-term profitability. Its optimized power usage and stable output make it a preferred choice for Kadena-focused mining setups.",
  },

  {
    id: 5,
    name: "Innosilicon A10 Pro+",
    brand: "Innosilicon",
    hashRate: "750 MH/s",
    powerConsumption: "1350 W",
    algorithm: "Ethash (Ethereum)",
    price: "$1,850",
    image: "/products/p2.png",
    description:
      "A reliable and profitable Ethereum miner built for consistent long-term performance and low power use. It offers strong mining efficiency, making it ideal for users looking to maximize ETH returns.",
  },
  {
    id: 6,
    name: "Jasminer X4-1U",
    brand: "Jasminer",
    hashRate: "520 MH/s",
    powerConsumption: "240 W",
    coin: "BTC",
    algorithm: "Ethash (ETC)",
    price: "$1,100",
    image: "/products/p3.png",
    description:
      "A silent, high-efficiency miner perfect for at-home or data centre use with incredible energy savings. Its ultra-low power draw makes it ideal for cost-efficient long-term operation.",
  },
  // {
  //   id: 7,
  //   name: "Antminer L7",
  //   brand: "Bitmain",
  //   hashRate: "9.5 GH/s",
  //   powerConsumption: "3425 W",
  //   algorithm: "Scrypt (Litecoin, Dogecoin)",
  //   price: "$6,200",
  //   image:
  //     "https://res.cloudinary.com/dfe8yna1k/image/upload/v1761645546/wzv85xogduggf8brwhcx.webp",
  //   description:
  //     "One of the fastest Litecoin/Dogecoin miners, offering high throughput for Scrypt algorithm coins. Its top-tier performance makes it the leading choice for serious Scrypt miners.",
  // },
  // {
  //   id: 8,
  //   name: "Goldshell HS5",
  //   brand: "Goldshell",
  //   hashRate: "1.88 TH/s",
  //   powerConsumption: "2450 W",
  //   algorithm: "Blake2b (HandsomeCoin)",
  //   price: "$3,300",
  //   image:
  //     "https://res.cloudinary.com/dfe8yna1k/image/upload/v1761562900/yw8szyrhheqd3k0tmpra.webp",
  //   description:
  //     "High-performance Blake2b miner suitable for niche alt-coins and high-end mining setups. Its dual-mode mining capability allows flexible switching between supported algorithms.",
  // },

  // {
  //   id: 9,
  //   name: "Innosilicon T3+ Pro",
  //   brand: "Innosilicon",
  //   hashRate: "67 TH/s",
  //   powerConsumption: "3300 W",
  //   algorithm: "SHA-256 (Bitcoin)",
  //   price: "$2,900",
  //   image:
  //     "https://res.cloudinary.com/dfe8yna1k/image/upload/v1761647590/f1p0vsb8ccr8ips340hz.webp",
  //   description:
  //     "Cost-effective Bitcoin miner with strong hash-rate vs power consumption ratio. Reliable hardware ensures smooth operation even under continuous usage.",
  // },
  // {
  //   id: 10,
  //   name: "iPollo V-Mini",
  //   brand: "iPollo",
  //   hashRate: "0.78 TH/s",
  //   powerConsumption: "930 W",
  //   algorithm: "SHA-256 (Bitcoin)",
  //   price: "$700",
  //   image:
  //     "https://res.cloudinary.com/dfe8yna1k/image/upload/v1761647590/f1p0vsb8ccr8ips340hz.webp",
  //   description:
  //     "Compact Bitcoin miner ideal for small farms or beginners. Its minimal heat output and small form factor make it suitable even for home mining environments.",
  // },
  // {
  //   id: 11,
  //   name: "Bitmain Antminer S19j Pro",
  //   brand: "Bitmain",
  //   hashRate: "100 TH/s",
  //   powerConsumption: "3050 W",
  //   algorithm: "SHA-256 (Bitcoin)",
  //   price: "$2,800",
  //   image:
  //     "https://res.cloudinary.com/dfe8yna1k/image/upload/v1761645546/wzv85xogduggf8brwhcx.webp",
  //   description:
  //     "Efficient ASIC miner delivering strong performance. Known for its reliability, it offers excellent balance between output and energy usage.",
  // },
  // {
  //   id: 12,
  //   name: "Goldshell KD5",
  //   brand: "Goldshell",
  //   hashRate: "18.3 TH/s",
  //   powerConsumption: "3150 W",
  //   algorithm: "Kadena",
  //   price: "$3,600",
  //   image:
  //     "https://res.cloudinary.com/dfe8yna1k/image/upload/v1761562900/yw8szyrhheqd3k0tmpra.webp",
  //   description:
  //     "High-throughput Kadena miner with strong profitability. Its advanced cooling design helps maintain stable performance during heavy load mining sessions.",
  // },
  // {
  //   id: 13,
  //   name: "Whatsminer M31S+ 68T",
  //   brand: "MicroBT",
  //   hashRate: "68 TH/s",
  //   powerConsumption: "3344 W",
  //   algorithm: "SHA-256 (Bitcoin)",
  //   price: "$1,900",
  //   image:
  //     "https://res.cloudinary.com/dfe8yna1k/image/upload/v1761647590/f1p0vsb8ccr8ips340hz.webp",
  //   description:
  //     "Reliable Bitcoin miner with solid performance. It remains a favorite among mid-level mining setups due to its operational stability and strong build quality.",
  // },
  // {
  //   id: 14,
  //   name: "Bitmain Antminer S17 Pro",
  //   brand: "Bitmain",
  //   hashRate: "56 TH/s",
  //   powerConsumption: "2720 W",
  //   algorithm: "SHA-256 (Bitcoin)",
  //   price: "$1,300",
  //   image:
  //     "https://res.cloudinary.com/dfe8yna1k/image/upload/v1761647590/f1p0vsb8ccr8ips340hz.webp",
  //   description:
  //     "Good performance for the price, but older generation. Still a dependable option for budget miners seeking steady and consistent output.",
  // },
  // {
  //   id: 15,
  //   name: "Innosilicon A11 Pro EthMaster",
  //   brand: "Innosilicon",
  //   hashRate: "2.15 GH/s",
  //   powerConsumption: "3420 W",
  //   algorithm: "Ethash (Ethereum)",
  //   price: "$2,400",
  //   image:
  //     "https://res.cloudinary.com/dfe8yna1k/image/upload/v1761645546/wzv85xogduggf8brwhcx.webp",
  //   description:
  //     "High-end Ethash miner designed for strong and stable mining. Its high memory capacity and optimized architecture make it one of the top choices for ETH mining.",
  // },
];

export default miningProducts;
