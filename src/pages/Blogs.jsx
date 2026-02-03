import React from "react";
import { FiUser, FiCalendar, FiImage } from "react-icons/fi";
import { Link } from "react-router-dom";
import { blogPosts } from "../utils/blogs";

const Blogs = () => {
  return (
    <section className="bg-white container-x py-20 px-6 md:px-16">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl josefin-sans font-extrabold text-black uppercase tracking-wide">
          Latest Articles
        </h2>
        <p className="text-gray-600 mt-2 text-base">Stay updated with the latest mining insights</p>
      </div>

      <div className="grid gap-10 md:grid-cols-3">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="border border-gray-200 bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden"
          >
            <div className="relative">
              <img src={post.image} alt={post.title} className="w-full h-56 object-cover" />

              <span className="absolute top-3 left-3 bg-white/90 text-black text-xs font-semibold px-3 py-1 rounded-md shadow">
                {post.category}
              </span>

              <FiImage className="absolute top-3 right-3 text-white text-xl opacity-80" />
            </div>

            <div className="p-6">
              <h3 className="text-lg font-semibold text-black leading-snug">{post.title}</h3>

              <div className="flex items-center gap-2 text-gray-500 text-sm mt-3">
                <FiUser className="text-(--primary-color)" />
                <span>{post.author}</span>
                <span className="mx-1">—</span>
                <FiCalendar className="text-(--primary-color)" />
                <span>{post.date}</span>
              </div>

              <p className="text-gray-600 mt-3 text-sm leading-relaxed">{post.description}</p>

              {/* FIXED — LINK TO BLOG DETAILS */}
              <Link
                to={`/blogs/${post.id}`}
                className="mt-4 inline-block text-(--primary-color) font-semibold text-sm hover:underline"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <Link to="/blogs">
          <button className="bg-(--primary-color) text-white font-semibold px-8 py-3 rounded-lg hover:brightness-110 transition shadow-lg hover:shadow-xl cursor-pointer">
            View All Blogs
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Blogs;
