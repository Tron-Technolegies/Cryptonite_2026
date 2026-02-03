const miningLocations = [
  {
    id: "ng",
    code: "NG",
    name: "Nigeria",
    country: "Nigeria",
    capacity: "3 MW",
    hashRateCapacity: "4 EH/s",
    energySource: "Grid & Solar Hybrid",
    status: "Operational",
    price: "$0.052",

    image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0", // data center / power infra

    pageHeading: "Bitcoin Mining Facility in Nigeria",

    description:
      "Our Nigeria mining facility delivers cost-effective and reliable hosting using a hybrid grid and solar power setup, optimized for West African conditions.",

    detailSections: {
      overview:
        "Located in Nigeria, this mining center is strategically designed to provide affordable power, stable uptime, and scalable infrastructure for Bitcoin mining operations.",

      infrastructure:
        "The facility features modern mining racks, optimized airflow design, and redundant power systems to ensure consistent performance and minimal downtime.",

      energy:
        "Powered by a grid and solar hybrid model, this site reduces dependency on fossil fuels while maintaining stable energy availability throughout the year.",

      whyThisLocation:
        "Nigeria offers competitive electricity pricing, growing digital infrastructure, and strong potential for sustainable mining expansion in Africa.",
    },
  },

  {
    id: "et",
    code: "ET",
    name: "Ethiopia",
    country: "Ethiopia",
    capacity: "5 MW",
    hashRateCapacity: "6.5 EH/s",
    energySource: "Hydroelectric",
    status: "Operational",
    price: "$0.048",

    image: "https://images.unsplash.com/photo-1590487988256-9ed24133863e", // hydro power / energy

    pageHeading: "Hydropower-Driven Mining in Ethiopia",

    description:
      "This Ethiopian facility is powered entirely by renewable hydroelectric energy, enabling low-cost and eco-friendly Bitcoin mining.",

    detailSections: {
      overview:
        "Ethiopia’s abundant hydropower resources make it one of the most cost-efficient locations for large-scale Bitcoin mining operations.",

      infrastructure:
        "The site is built near hydroelectric sources, minimizing transmission losses and ensuring stable, uninterrupted power delivery.",

      energy:
        "100% renewable hydropower significantly reduces carbon emissions and operational costs.",

      whyThisLocation:
        "Extremely low electricity rates and renewable energy availability make Ethiopia ideal for sustainable mining growth.",
    },
  },

  {
    id: "ae",
    code: "AE",
    name: "United Arab Emirates",
    country: "UAE",
    capacity: "10 MW",
    hashRateCapacity: "8 EH/s",
    energySource: "Solar Energy",
    status: "Operational",
    price: "$0.060",

    image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231", // solar farm

    pageHeading: "Solar-Powered Mining in the UAE",

    description:
      "Our UAE mining center leverages large-scale solar farms combined with advanced cooling systems for desert environments.",

    detailSections: {
      overview:
        "Located in the UAE, this facility is built for high-performance mining in extreme climates using solar energy.",

      infrastructure:
        "Advanced immersion and air-cooling systems maintain optimal temperatures even in high ambient heat.",

      energy: "Solar farms provide clean, renewable power with predictable energy pricing.",

      whyThisLocation:
        "Strong infrastructure, regulatory clarity, and renewable energy investments make the UAE a strategic mining hub.",
    },
  },

  {
    id: "us",
    code: "US",
    name: "United States",
    country: "USA",
    capacity: "20 MW",
    hashRateCapacity: "12 EH/s",
    energySource: "Wind & Solar",
    status: "Operational",
    price: "$0.065",

    image:
      "https://miningcolocation.com/wp-content/uploads/2017/12/IMG_20180419_174309-min-1024x768.jpg", // large data center

    pageHeading: "Enterprise-Grade Mining in the USA",

    description:
      "Our US facilities provide enterprise-level infrastructure powered by wind and solar energy with high regulatory stability.",

    detailSections: {
      overview:
        "The US mining centers are designed for institutional-scale operations with industry-leading uptime and security.",

      infrastructure:
        "Features include redundant networking, high-capacity transformers, and advanced monitoring systems.",

      energy:
        "A mix of wind and solar ensures energy diversification and long-term cost predictability.",

      whyThisLocation:
        "Regulatory transparency, robust infrastructure, and scalability make the USA ideal for large mining operations.",
    },
  },

  {
    id: "fi",
    code: "FI",
    name: "Finland",
    country: "Finland",
    capacity: "7 MW",
    hashRateCapacity: "5 EH/s",
    energySource: "Hydropower",
    status: "Operational",
    price: "$0.055",

    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d", // cold climate / infra

    pageHeading: "Cold-Climate Mining in Finland",

    description:
      "Finland’s cold climate and renewable hydropower enable highly efficient Bitcoin mining with reduced cooling costs.",

    detailSections: {
      overview:
        "This facility benefits from naturally cold weather, improving hardware lifespan and energy efficiency.",

      infrastructure:
        "Optimized ventilation systems leverage outdoor air for cooling most of the year.",

      energy: "Hydropower provides clean, stable, and cost-effective electricity.",

      whyThisLocation:
        "Cold climate, renewable energy, and political stability make Finland a premium mining destination.",
    },
  },
];

export default miningLocations;
