import React from "react";
import { useEffect  } from "react";
import { useParams, Link } from "react-router-dom";
import { blogPosts } from "../../utils/blogs";
import {
  FiUser,
  FiCalendar,
  FiShare2,
  FiTwitter,
  FiLinkedin,
} from "react-icons/fi";

const BlogDetails = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  const { id } = useParams();
  const blog = blogPosts.find((item) => item.id === parseInt(id));

  if (!blog)
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold text-red-500">Blog not found.</h2>
      </div>
    );

  const related = blogPosts.filter((post) => post.id !== blog.id);

  return (
    <section className="px-6 md:px-20 py-16 max-w-5xl mx-auto">
      {/* Category */}
      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-md text-xs font-semibold">
        {blog.category}
      </span>

      {/* Title */}
      <h1 className="mt-4 text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
        {blog.title}
      </h1>

      {/* Subtitle */}
      {blog.subtitle && (
        <p className="text-gray-600 mt-3 max-w-3xl">{blog.subtitle}</p>
      )}

      {/* Author + Date */}
      <div className="flex items-center gap-4 text-gray-600 text-sm mt-5">
        <div className="flex items-center gap-2">
          <FiUser />
          <span>{blog.author}</span>
        </div>

        <div className="flex items-center gap-2">
          <FiCalendar />
          <span>{blog.date}</span>
        </div>
      </div>

      {/* Share Icons */}
      <div className="flex items-center gap-5 mt-6 text-gray-600">
        <div className="flex items-center gap-2 cursor-pointer">
          <FiShare2 />
          <span>Share</span>
        </div>
        <FiTwitter className="cursor-pointer hover:text-black" />
        <FiLinkedin className="cursor-pointer hover:text-black" />
      </div>

      {/* Featured Image */}
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-[420px] object-cover rounded-xl mt-8 shadow-md"
      />

      {/* Content */}
      <div className="mt-10 text-gray-700 leading-relaxed space-y-5 text-[15px]">
        {Array.isArray(blog.content) ? (
          blog.content.map((para, index) => <p key={index}>{para}</p>)
        ) : (
          <p>No content available.</p>
        )}
      </div>

      {/* RELATED ARTICLES */}
      <h2 className="mt-20 text-2xl font-bold">RELATED ARTICLES</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-10 mt-8">
        {related.map((post) => (
          <div
            key={post.id}
            className="border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition bg-white"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-56 object-cover"
            />

            <div className="p-5">
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-700 font-medium">
                {post.category}
              </span>

              <h3 className="mt-3 text-lg font-semibold leading-snug text-gray-900">
                {post.title}
              </h3>

              <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
                <FiUser />
                <span>{post.author}</span>
                <span>•</span>
                <FiCalendar />
                <span>{post.date}</span>
              </div>

              <Link
                to={`/blogs/${post.id}`}
                className="mt-4 inline-block text-green-600 font-semibold text-sm hover:underline"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogDetails;
