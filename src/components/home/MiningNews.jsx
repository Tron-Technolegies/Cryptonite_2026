import React from "react";
import { FiUser, FiCalendar } from "react-icons/fi";
import { Link } from "react-router-dom";

const MiningNews = () => {
  const articles = [
    {
      id: 1,
      category: "Events",
      title: "BTC Prague 2025: Cryptonite Mining at Europe’s Premier Bitcoin Conference",
      description:
        "Join us at BTC Prague as we showcase our enterprise mining solutions and discuss the future of Bitcoin mining infrastructure across Central Europe.",
      author: "Michael Chen",
      date: "June 10, 2025",
      button: "Read Article",
      image: "/event1.png",
      reversed: false,
    },
    {
      id: 2,
      category: "Cryptonite",
      title: "AI-Driven Crypto Mining",
      description:
        "Boost your crypto mining revenue by 6–115% using our AI Smart Mining automatic management utility.\n\nAI can make Bitcoin mining even more profitable.",
      author: null,
      date: null,
      button: "Start Mining",
      image: "/event2.png",
      reversed: true,
    },
  ];

  return (
    <section className="bg-white container-x py-20 px-6 md:px-16">
      {/* HEADER */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl josefin-sans font-extrabold text-black uppercase tracking-wide">
          Mining Insights & News
        </h2>
        <p className="text-gray-500 mt-3">
          Expert insights, industry news, and practical guides for cryptocurrency miners
        </p>
      </div>

      {/* ARTICLE CARDS */}
      <div className="space-y-12">
        {articles.map((article) => (
          <div
            key={article.id}
            className={`rounded-2xl border border-gray-200 bg-[#F8FBFF] p-6 md:p-10 flex flex-col lg:flex-row items-center gap-10 ${
              article.reversed ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* IMAGE */}
            <div className="w-full lg:w-1/2">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-64 md:h-72 object-cover rounded-xl"
              />
            </div>

            {/* CONTENT */}
            <div className="w-full lg:w-1/2">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                {article.category}
              </span>

              <h3 className="text-2xl md:text-3xl font-extrabold text-black mt-4 leading-snug">
                {article.title}
              </h3>

              <p className="text-gray-600 mt-3 whitespace-pre-line text-sm md:text-base leading-relaxed">
                {article.description}
              </p>

              {article.author && (
                <div className="flex items-center gap-6 text-gray-500 text-sm mt-5">
                  <span className="flex items-center gap-1">
                    <FiUser className="text-gray-400" /> {article.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiCalendar className="text-gray-400" /> {article.date}
                  </span>
                </div>
              )}

              {/* BUTTON → BLOG ROUTE */}
              <Link to={`/blogs/${article.id}`}>
                <button className="mt-6 bg-(--primary-color) text-white font-semibold px-6 py-3 rounded-lg hover:brightness-110 transition">
                  {article.button} →
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MiningNews;
