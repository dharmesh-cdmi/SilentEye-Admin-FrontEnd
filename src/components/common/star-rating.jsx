const Star = ({ filled }) => (
  <svg
    className={`w-6 h-6 ${filled ? 'text-yellow-500' : 'text-gray-300'}`}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.049 2.927a1 1 0 011.902 0l1.357 4.18a1 1 0 00.95.69h4.385c.869 0 1.229 1.11.588 1.624l-3.538 2.57a1 1 0 00-.364 1.118l1.356 4.18c.263.81-.678 1.478-1.386.984l-3.539-2.571a1 1 0 00-1.176 0l-3.538 2.571c-.708.494-1.65-.175-1.386-.984l1.356-4.18a1 1 0 00-.364-1.118L2.07 9.421c-.64-.514-.28-1.624.588-1.624h4.385a1 1 0 00.95-.69l1.357-4.18z"
    />
  </svg>
);

const StarRating = ({ rating }) => {
  const displayRating = Math.min(rating, 5);

  return (
    <div className="flex">
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <Star key={index} filled={index < displayRating} />
        ))}
    </div>
  );
};

export default StarRating;
