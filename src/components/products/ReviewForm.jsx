import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { createReview } from "../../api/reviews.api";
import { toast } from "react-toastify";

export default function ReviewForm({ onClose, productName, productId, onSuccess }) {
  const [formData, setFormData] = useState({
    rating: 5,
    comment: "",
  });

  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productId) return;

    setIsSubmitting(true);
    try {
      const response = await createReview(productId, formData);
      toast.success("Thank you for your review!");
      if (onSuccess) onSuccess(response);
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to submit review. Are you logged in?");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          ×
        </button>

        <h3 className="text-2xl font-bold mb-2">Write a Review</h3>
        <p className="text-gray-600 mb-6">Share your experience with {productName}</p>

         <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium mb-2">Rating *</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="text-3xl transition-colors"
                >
                  <FaStar
                    className={
                      star <= (hoveredRating || formData.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                </button>
              ))}
            </div>
          </div>


          <div>
            <label className="block text-sm font-medium mb-1">Your Review *</label>
            <textarea
              name="comment"
              required
              value={formData.comment}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Share your experience with this product..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 text-white rounded-lg transition-colors disabled:opacity-50"
              style={{ backgroundColor: "var(--primary-color)" }}
              onMouseEnter={(e) => (e.target.style.opacity = "0.9")}
              onMouseLeave={(e) => (e.target.style.opacity = "1")}
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
