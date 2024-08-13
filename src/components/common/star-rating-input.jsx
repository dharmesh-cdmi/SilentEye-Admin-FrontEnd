import { useState } from 'react';

const StarRatingInput = ({ rating, onRatingChange }) => {
  const [hover, setHover] = useState(null);

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-6 h-6 cursor-pointer ${
            star <= (hover || rating) ? "text-yellow-400" : "text-gray-400"
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => onRatingChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(null)}
        >
          <path d="M12 .587l3.668 7.568L24 9.75l-6 5.848 1.416 8.487L12 18.899 4.584 24 6 15.598 0 9.75l8.332-1.595L12 .587z" />
        </svg>
      ))}
    </div>
  );
};

export default StarRatingInput;
