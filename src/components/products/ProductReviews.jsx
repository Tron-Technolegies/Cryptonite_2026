import { useState, useEffect } from "react";
import { getProductReviews } from "../../api/reviews.api";
import { FaStar, FaStarHalfAlt, FaRegStar, FaCheckCircle } from "react-icons/fa";
import ReviewForm from "./ReviewForm";
import { toast } from "react-toastify";

export default function ProductReviews({ productId, productName }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (productId) {
      setLoading(true);
      getProductReviews(productId)
        .then(setReviews)
        .catch(() => toast.error("Failed to load reviews"))
        .finally(() => setLoading(false));
    }
  }, [productId]);

  const handleReviewSuccess = (newReview) => {
    setReviews([newReview, ...reviews]);
  };

  // Calculate average rating
  const avgRating = reviews.length > 0 
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length 
    : 0;
  const totalReviews = reviews.length;

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
    percentage: totalReviews > 0 ? (reviews.filter(r => r.rating === star).length / totalReviews) * 100 : 0
  }));

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
    }
    return stars;
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h3 className="text-2xl font-bold mb-6">Customer Reviews</h3>

        {/* Rating Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-200">
          {/* Overall Rating */}
          <div className="text-center md:text-left">
            <div className="text-5xl font-bold mb-2" style={{ color: 'var(--primary-color)' }}>
              {avgRating.toFixed(1)}
            </div>
            <div className="flex justify-center md:justify-start gap-1 mb-2">
              {renderStars(avgRating)}
            </div>
            <p className="text-gray-600">Based on {totalReviews} reviews</p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {ratingDistribution.map(({ star, count, percentage }) => (
              <div key={star} className="flex items-center gap-3">
                <span className="text-sm font-medium w-12">{star} star</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: 'var(--primary-color)'
                    }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-8">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Individual Reviews */}
        <div className="space-y-6">
          {reviews.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No reviews yet for this product. Be the first to review!</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{review.user_name || "User"}</h4>
                      {review.verified && (
                        <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-green-100" style={{ color: 'var(--primary-color)' }}>
                          <FaCheckCircle className="text-xs" />
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <div className="flex gap-1 mb-2">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.created_at).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                
                <p className="text-gray-700 leading-relaxed">{review.comment}</p>
              </div>
            ))
          )}
        </div>

        {/* Write Review Button */}
        <div className="mt-8 text-center">
          <button 
            onClick={() => setShowForm(true)}
            className="px-6 py-3 rounded-lg font-medium text-white transition-colors"
            style={{ backgroundColor: 'var(--primary-color)' }}
            onMouseEnter={(e) => e.target.style.opacity = '0.9'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
          >
            Write a Review
          </button>
        </div>
      </div>

      {showForm && (
        <ReviewForm 
          onClose={() => setShowForm(false)} 
          productName={productName} 
          productId={productId}
          onSuccess={handleReviewSuccess}
        />
      )}
    </>
  );
}
