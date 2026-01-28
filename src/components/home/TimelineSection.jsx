import React from "react";
import { motion } from "framer-motion";
import { blogPosts } from "../../utils/blogs";

const itemAnim = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const TimelineSection = ({ limit }) => {
  const data = limit ? blogPosts.slice(0, limit) : blogPosts;

  return (
    <section className="py-20 bg-white">
      <div className="container-x mx-auto px-4">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl josefin-sans font-bold text-center mb-20">
          Cryptonite Evolution
        </h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 h-full w-[2px] bg-gray-200 -translate-x-1/2" />

          <div className="space-y-24">
            {data.map((blog, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={blog.id}
                  variants={itemAnim}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                  className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-10 items-center"
                >
                  {/* LEFT COLUMN */}
                  <div className={`px-6 ${isEven ? "text-right" : ""}`}>
                    {isEven ? (
                      <>
                        <h3 className="text-[var(--primary-color)] font-semibold text-lg">
                          {blog.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">{blog.date}</p>
                      </>
                    ) : (
                      <div className="bg-white rounded-xl shadow-lg p-6">
                        <img src={blog.image} alt={blog.title} className="rounded-lg mb-4" />
                        <p className="text-gray-700 text-sm line-clamp-3">{blog.subtitle}</p>
                      </div>
                    )}
                  </div>

                  {/* DOT */}
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 md:static md:top-auto md:translate-y-0 z-10 flex justify-center -translate-x-1/2 md:translate-x-0">
                    <span className="block w-4 h-4 bg-green-500 rounded-full border-4 border-white shadow" />
                  </div>

                  {/* RIGHT COLUMN */}
                  <div className="px-6">
                    {isEven ? (
                      <div className="bg-white rounded-xl shadow-lg p-6">
                        <img src={blog.image} alt={blog.title} className="rounded-lg mb-4" />
                        <p className="text-gray-700 text-sm line-clamp-3">{blog.subtitle}</p>
                      </div>
                    ) : (
                      <>
                        <h3 className="text-[var(--primary-color)] font-semibold text-lg">
                          {blog.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">{blog.date}</p>
                      </>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Homepage CTA */}
        {limit && (
          <div className="text-center mt-20">
            <a
              href="/about"
              className="inline-block bg-black text-white px-8 py-3 rounded-full hover:opacity-90 transition"
            >
              Learn More
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default TimelineSection;
