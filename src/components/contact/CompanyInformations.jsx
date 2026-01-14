import React from "react";
import { companyBranches } from "../../utils/companyBranches";

export default function CompanyInformations() {
  return (
    <section className="py-20">
      <div className="container-x mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Our Global Presence</h2>

        <div className="space-y-20">
          {companyBranches.map((branch, index) => {
            const isEven = index % 2 === 0;

            return (
              <div key={branch.id} className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                {/* LEFT / RIGHT – DETAILS */}
                <div className={isEven ? "" : "md:order-2"}>
                  <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                    <h3 className="text-2xl font-semibold mb-4">{branch.name}</h3>

                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold">Address:</span> {branch.address}
                    </p>

                    <p className="text-gray-700 mb-2">
                      <span className="font-semibold">Phone:</span> {branch.phone}
                    </p>

                    <p className="text-gray-700">
                      <span className="font-semibold">Email:</span> {branch.email}
                    </p>
                  </div>
                </div>

                {/* LEFT / RIGHT – MAP */}
                <div className={isEven ? "" : "md:order-1"}>
                  <div className="w-full h-[320px] rounded-2xl overflow-hidden border border-gray-200">
                    <iframe
                      src={branch.mapEmbed}
                      className="w-full h-full"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                      title={branch.name}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
