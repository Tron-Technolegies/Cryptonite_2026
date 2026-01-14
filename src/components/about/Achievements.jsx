import React from "react";

const Achievements = () => {
  const stats = [
    { id: 1, number: "72h", label: "Setup Time" },
    { id: 2, number: "5+", label: "Global Locations" },
    { id: 3, number: "99.9%", label: "Uptime" },
    { id: 4, number: "24/7", label: "Support" },
  ];

  return (
    <section className=" text-extrabold josefin-sans py-16 px-6 md:px-20">
      <div className=" mx-auto">
        {/* Stats Grid */}
        <div
          className="
          grid grid-cols-2 md:grid-cols-4 
          text-center gap-10 md:gap-0
        "
        >
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center">
              {/* Number */}
              <h3
                className="text-4xl md:text-5xl font-semibold dm-sans"
                style={{ color: "var(--primary-color)" }}
              >
                {stat.number}
              </h3>

              {/* Label */}
              <p className="text-black text-sm md:text-base mt-2 opacity-80 dm-sans">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
