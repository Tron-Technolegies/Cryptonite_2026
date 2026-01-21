import { shippingInfo } from "../../utils/productDetails";
import { FaShippingFast, FaBox, FaHandHoldingUsd, FaMapMarkedAlt } from "react-icons/fa";

export default function ShippingSection() {
  const sections = [
    {
      icon: FaShippingFast,
      title: shippingInfo.global.title,
      content: shippingInfo.global.description
    },
    {
      icon: FaBox,
      title: shippingInfo.packaging.title,
      content: shippingInfo.packaging.description
    },
    {
      icon: FaHandHoldingUsd,
      title: shippingInfo.pickup.title,
      content: shippingInfo.pickup.description
    },
    {
      icon: FaMapMarkedAlt,
      title: shippingInfo.hostingToShipping.title,
      content: shippingInfo.hostingToShipping.description
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
      <h3 className="text-2xl font-bold mb-6">Shipping Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section, index) => {
          const Icon = section.icon;
          return (
            <div 
              key={index}
              className="border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-all hover:border-green-500"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 rounded-full bg-green-100">
                  <Icon className="text-xl" style={{ color: 'var(--primary-color)' }} />
                </div>
                <h4 className="font-bold text-lg">{section.title}</h4>
              </div>
              <p className="text-gray-700 leading-relaxed">{section.content}</p>
            </div>
          );
        })}
      </div>

      {/* Shipping Carriers */}
      <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-green-50 rounded-lg border border-gray-200">
        <h4 className="font-bold text-lg mb-4">Trusted Shipping Partners</h4>
        <div className="flex flex-wrap items-center justify-center gap-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-700">DHL</div>
            <p className="text-xs text-gray-600">Express Worldwide</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-700">UPS</div>
            <p className="text-xs text-gray-600">Global Shipping</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-700">FedEx</div>
            <p className="text-xs text-gray-600">International</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-700">TNT</div>
            <p className="text-xs text-gray-600">Express Delivery</p>
          </div>
        </div>
      </div>

      {/* Delivery Timeline */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start gap-3">
          <FaShippingFast className="text-2xl text-blue-600 mt-1 flex-shrink-0" />
          <div>
            <h5 className="font-semibold mb-1">Standard Delivery Timeline</h5>
            <p className="text-sm text-gray-700">
              Most orders are delivered within <span className="font-semibold">5-7 business days</span> from our Shenzhen facility. 
              All shipments include full tracking and insurance. Bulk orders may have custom delivery arrangements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
