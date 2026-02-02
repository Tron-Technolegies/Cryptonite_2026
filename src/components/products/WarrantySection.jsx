import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

const warrantyInfo = {
  hosted: {
    title: "Hosted Mining Warranty",
    duration: "180 Days",
    coverage: [
      "Full replacement of defective hardware components",
      "No downtime during warranty repairs",
      "Priority support with dedicated account managers",
      "Free firmware updates and optimization",
      "24/7 monitoring and instant issue detection"
    ]
  },
  shipped: {
    title: "Shipped Device Warranty",
    duration: "180 Days",
    coverage: [
      "Manufacturer defect coverage",
      "Technical support via email and phone",
      "Firmware update assistance",
      "Repair or replacement for covered issues"
    ],
    note: "Customer is responsible for shipping costs to our service center for warranty claims."
  },
  postWarranty: {
    title: "Post-Warranty Support",
    description: "Even after your warranty period ends, we continue to offer paid repair and maintenance services to keep your miners running at peak performance. Contact our support team for a custom service plan tailored to your needs."
  },
  complimentary: {
    title: "Complimentary Services",
    services: [
      "Performance diagnostics and health checks",
      "Remote troubleshooting assistance",
      "Optimization guidance for efficiency",
      "Access to our knowledge base and community forums"
    ]
  }
};

export default function WarrantySection() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
      <h3 className="text-2xl font-bold mb-6">Warranty Policy for ASIC Miners</h3>

      {/* Hosted Warranty */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div
            className="w-2 h-8 rounded"
            style={{ backgroundColor: "var(--primary-color)" }}
          ></div>
          <h4 className="text-xl font-bold">{warrantyInfo.hosted.title}</h4>
        </div>

        <div className="bg-green-50 rounded-lg p-4 mb-4 border border-green-200">
          <p className="font-semibold mb-2" style={{ color: "var(--primary-color)" }}>
            Industry-Leading {warrantyInfo.hosted.duration} Full Coverage
          </p>
          <p className="text-gray-700 text-sm">
            For miners hosted in our advanced facilities, we provide comprehensive warranty coverage
            ensuring long-term reliability and minimal operational disruptions.
          </p>
        </div>

        <div className="space-y-3">
          {warrantyInfo.hosted.coverage.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
              <p className="text-gray-700">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Shipped Warranty */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-8 rounded bg-blue-600"></div>
          <h4 className="text-xl font-bold">{warrantyInfo.shipped.title}</h4>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mb-4 border border-blue-200">
          <p className="font-semibold text-blue-900 mb-2">
            Standard {warrantyInfo.shipped.duration} Coverage
          </p>
          <p className="text-gray-700 text-sm">
            For ASIC miners shipped directly to customers, we offer a standard warranty ensuring
            reliable support for self-managed setups.
          </p>
        </div>

        <div className="space-y-3 mb-4">
          {warrantyInfo.shipped.coverage.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <FaCheckCircle className="text-blue-600 mt-1 flex-shrink-0" />
              <p className="text-gray-700">{item}</p>
            </div>
          ))}
        </div>

        <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <FaExclamationTriangle className="text-yellow-600 mt-1 flex-shrink-0" />
          <p className="text-gray-700 text-sm">{warrantyInfo.shipped.note}</p>
        </div>
      </div>

      {/* Post-Warranty Support */}
      <div className="mb-8">
        <h4 className="text-xl font-bold mb-3">{warrantyInfo.postWarranty.title}</h4>
        <p className="text-gray-700 leading-relaxed">{warrantyInfo.postWarranty.description}</p>
      </div>

      {/* Complimentary Services */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 border border-gray-200">
        <h4 className="text-xl font-bold mb-4">{warrantyInfo.complimentary.title}</h4>
        <p className="text-gray-700 mb-4">
          Whether your miner is hosted or shipped, we offer the following value-added services at no
          additional cost during the warranty period:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {warrantyInfo.complimentary.services.map((service, index) => (
            <div key={index} className="flex items-start gap-3 bg-white rounded-lg p-3">
              <FaCheckCircle
                className="mt-1 flex-shrink-0"
                style={{ color: "var(--primary-color)" }}
              />
              <p className="text-gray-700 text-sm">{service}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Commitment */}
      <div className="mt-6 text-center p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-700">
          We are dedicated to delivering exceptional support, ensuring your mining operations are
          efficient, reliable, and fully backed by our team.
        </p>
      </div>
    </div>
  );
}
