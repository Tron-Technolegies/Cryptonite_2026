// Static content for product detail sections

export const warrantyInfo = {
  hosted: {
    title: "Hosted ASIC Miners – 7-Year Full Warranty",
    duration: "7 years",
    coverage: [
      "Free Repairs: Fast, on-site repairs conducted at our dedicated repair centers",
      "No-Cost Spare Parts: Includes replacement of fans, power supply units (PSUs), and cables at no charge",
      "No Labor or Diagnostic Fees: All repair-related services are covered, eliminating additional costs",
      "Minimized Downtime: Rapid on-site service ensures quick resolution and continuous mining operations"
    ]
  },
  shipped: {
    title: "Shipped ASIC Miners – 12-Month Warranty",
    duration: "12 months",
    coverage: [
      "Free Repairs: Covers repair services for manufacturing defects",
      "Unit Replacement: Replacement of defective units when necessary",
      "Usage Conditions: Warranty is valid only when miners are operated in accordance with official instructions"
    ],
    note: "⚠️ Note: The warranty may be voided due to damage from misuse, unauthorized modifications, or non-compliant operation."
  },
  postWarranty: {
    title: "Post-Warranty Support",
    description: "We provide affordable out-of-warranty repair services to extend the lifespan of your equipment. Repair costs typically range from $80 to $220 USD, depending on the issue and required parts."
  },
  complimentary: {
    title: "Complimentary Services for All Clients",
    services: [
      "Remote Diagnostics: Identify and troubleshoot issues without physical intervention",
      "Real-Time Monitoring: Access performance metrics via our Management Console",
      "Dedicated Technical Support: 24/7 assistance from our expert team",
      "Firmware Upgrades and Maintenance: Regular updates to optimize miner performance"
    ]
  }
};

export const hostingLocations = [
  { country: "USA", location: "South Carolina", rate: "$0.059 / kWh", flag: "🇺🇸" },
  { country: "Nigeria", location: "Nigeria", rate: "$0.048 / kWh", flag: "🇳🇬" },
  { country: "Ethiopia", location: "Ethiopia", rate: "$0.053 / kWh", flag: "🇪🇹" },
  { country: "Dubai", location: "UAE", rate: "$0.054 / kWh", flag: "🇦🇪" },
  { country: "Finland", location: "Finland", rate: "$0.061 / kWh", flag: "🇫🇮" },
  { country: "Norway", location: "Alta", rate: "$0.064 / kWh", flag: "🇳🇴" }
];

export const hostingBenefits = [
  {
    title: "7-Year Full Warranty",
    description: "Comprehensive coverage for all hosted miners, ensuring long-term reliability"
  },
  {
    title: "95%+ Uptime Guarantee",
    description: "Uninterrupted mining operations, with compensation provided if uptime falls below 95%"
  },
  {
    title: "Rapid Deployment",
    description: "Miners are operational within 1 to 7 days, minimizing downtime"
  },
  {
    title: "Integrated Exchange Services",
    description: "Seamlessly convert earnings between cryptocurrencies and FIAT (USD, EUR) within our platform"
  },
  {
    title: "Zero Mining Fees",
    description: "Retain 100% of your mined coins with no revenue-sharing deductions"
  }
];

export const shippingInfo = {
  global: {
    title: "Global Shipping Coverage",
    description: "Direct delivery from Shenzhen via DHL, UPS, FedEx, or TNT in 5-7 days. Secure packaging with tracking; costs vary by location."
  },
  packaging: {
    title: "Individual Packaging and Pricing",
    description: "Each miner is individually packaged with protective materials to ensure safe delivery. Bulk orders receive custom quotes."
  },
  pickup: {
    title: "Personal Pickups",
    description: "Customers can arrange personal pickup from our facilities. Contact us for coordination."
  },
  hostingToShipping: {
    title: "Hosting to Shipping Location",
    description: "Miners can be transferred from hosting facilities to shipping locations upon request."
  }
};

export const faqData = [
  {
    question: "What is the difference between hosting and shipping?",
    answer: "Hosting means your miner is deployed in our professional facilities with 24/7 maintenance, electricity, and monitoring included. Shipping means the miner is delivered directly to your location for self-management."
  },
  {
    question: "How long does deployment take for hosted miners?",
    answer: "Hosted miners are typically operational within 1 to 7 days after order confirmation, depending on the location and current capacity."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept cryptocurrency payments and wire transfers. For hosted miners, hosting costs are automatically deducted from your mining profits."
  },
  {
    question: "Can I switch from hosting to shipping later?",
    answer: "Yes, you can request to have your hosted miner shipped to you at any time. Shipping costs and arrangements will apply."
  },
  {
    question: "What happens if my miner breaks down?",
    answer: "Hosted miners have a 7-year full warranty with free repairs and parts. Shipped miners have a 12-month warranty. After warranty expiration, repair services are available at affordable rates ($80-$220)."
  },
  {
    question: "Do you charge mining fees?",
    answer: "No, we charge 0% mining fees. You keep 100% of all coins mined by your equipment."
  },
  {
    question: "What is the minimum electricity rate?",
    answer: "Our hosting facilities offer rates as low as $0.048/kWh in Nigeria, with other locations ranging from $0.053 to $0.064/kWh."
  },
  {
    question: "Can I monitor my miner's performance?",
    answer: "Yes, all clients have access to our Management Console for real-time monitoring of hashrate, power consumption, temperature, and earnings."
  }
];

export const sampleReviews = [
  {
    id: 1,
    name: "Michael Chen",
    rating: 5,
    date: "2026-01-15",
    title: "Excellent Performance",
    comment: "This miner has been running flawlessly for 3 months now. The hosting service is top-notch with great uptime. ROI is looking good!",
    verified: true
  },
  {
    id: 2,
    name: "Sarah Johnson",
    rating: 5,
    date: "2026-01-10",
    title: "Great Investment",
    comment: "Very happy with this purchase. The profitability calculator was accurate, and the customer support team helped me choose the right hosting location.",
    verified: true
  },
  {
    id: 3,
    name: "David Rodriguez",
    rating: 4,
    date: "2026-01-05",
    title: "Solid Miner",
    comment: "Good hashrate and efficiency. Shipping took a bit longer than expected but the packaging was excellent. Running smoothly now.",
    verified: true
  },
  {
    id: 4,
    name: "Emma Williams",
    rating: 5,
    date: "2025-12-28",
    title: "Best Decision Ever",
    comment: "I opted for hosting and it's been amazing. No noise, no heat, no maintenance worries. Just watching the profits roll in!",
    verified: true
  },
  {
    id: 5,
    name: "James Park",
    rating: 5,
    date: "2025-12-20",
    title: "Highly Recommend",
    comment: "The 7-year warranty for hosted miners gives great peace of mind. The dashboard is easy to use and shows all the important metrics.",
    verified: true
  }
];
