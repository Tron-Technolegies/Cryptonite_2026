import React, { useState } from "react";

const Leaders = () => {
  const leaders = [
    {
      name: "DI Martin Hekel",
      role: "CEO & Founder",
      quote: "System stability is not an accident—it is the result of precise architecture.",
      story: [
        "15 years in railway infrastructure shaped his mission-critical mindset.",
        "He built highly reliable systems where failure was never an option.",
        "In 2018, he identified blockchain mining as critical infrastructure.",
      ],
      missionTitle: "The Mission: Professionalizing Mining",
      missionPoints: [
        { title: "Energy Commitment", text: "Clean energy wherever possible." },
        { title: "Predictability", text: "Results must be calculable." },
        { title: "Operational Excellence", text: "Every variable optimized." },
      ],
      closingQuote: "No hype. Only reliable digital infrastructure.",
      img: "./owners/kohler.jpeg",
    },
    {
      name: "Mag. Michael Köhler",
      role: "Managing Director & Partner",
      quote: "Innovation requires security. We make crypto bankable.",
      story: [
        "Ensures compliance in a fast-moving industry.",
        "Grant Thornton partner with deep tax expertise.",
        "Builds audit-ready legal foundations.",
      ],
      missionTitle: "The Mission: Transparency & Structure",
      missionPoints: [
        { title: "Tax & Compliance", text: "Clear crypto structures." },
        { title: "Strategic Growth", text: "Scaling through M&A." },
        { title: "Regulatory Anchor", text: "Highest reporting standards." },
      ],
      closingQuote: "We remove complexity so clients scale confidently.",
      img: "./owners/michael.jpeg",
    },
    {
      name: "DI Rene Haas",
      role: "CEO – Operations & Engineering",
      quote: "Efficiency means perfecting energy.",
      story: [
        "Leads operations and engineering.",
        "Decades of electrical experience.",
        "Integrates mining into energy systems.",
      ],
      missionTitle: "The Mission: Engineering Energy",
      missionPoints: [
        { title: "Electrical Precision", text: "Industrial-grade safety." },
        { title: "Thermal Synergy", text: "Heat reused intelligently." },
        { title: "Operational Safety", text: "Fail-safe by design." },
      ],
      closingQuote: "Electricity creates coins—and usable heat.",
      img: "./owners/rene.jpeg",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="container-x mx-auto py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold josefin-sans">Leadership Team</h2>
        <p className="mt-4 text-black">
          Experienced professionals dedicated to your mining success
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {leaders.map((leader, index) => {
          const isFlipped = activeIndex === index;

          return (
            <div
              key={index}
              className="perspective cursor-pointer"
              onClick={() => setActiveIndex(isFlipped ? null : index)}
            >
              <div
                className={`
                  relative h-[480px] w-full rounded-2xl transition-transform duration-700
                  transform-style-preserve-3d
                  ${isFlipped ? "rotate-y-180" : ""}
                  md:hover:rotate-y-180
                `}
              >
                {/* FRONT */}
                <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden">
                  <img src={leader.img} alt={leader.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <h3 className="text-white text-xl font-semibold">{leader.name}</h3>
                    <p className="text-green-400">{leader.role}</p>
                  </div>
                </div>

                {/* BACK */}
                <div className="absolute inset-0 rotate-y-180 backface-hidden rounded-2xl bg-white p-6 overflow-y-auto">
                  <h3 className="text-xl font-semibold">{leader.name}</h3>
                  <p className="text-green-600 mb-4">{leader.role}</p>

                  <p className="italic text-sm border-l-2 border-green-500 pl-4 mb-4">
                    “{leader.quote}”
                  </p>

                  <div className="space-y-3 text-sm">
                    {leader.story.map((s, i) => (
                      <p key={i}>{s}</p>
                    ))}
                  </div>

                  <div className="mt-5">
                    <h4 className="font-semibold text-sm uppercase">{leader.missionTitle}</h4>
                    <ul className="mt-3 space-y-2 text-sm">
                      {leader.missionPoints.map((p, i) => (
                        <li key={i}>
                          <span className="font-semibold">{p.title}:</span> {p.text}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="mt-6 italic text-sm border-t pt-4">“{leader.closingQuote}”</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CSS helpers */}
      <style jsx>{`
        .perspective {
          perspective: 1200px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
};

export default Leaders;
