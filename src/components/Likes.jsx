import React, { useState } from 'react';
import { Heart } from 'phosphor-react';

const LikeButton = () => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <button onClick={toggleLike} className="flex items-center justify-center bg-transparent border-none">
      <Heart
        size={32} // Icon size
        color={liked ? '#E0245E' : '#9CA3AF'} // Red color when liked, gray when not
        weight={liked ? 'fill' : 'regular'} // Filled heart if liked, outlined otherwise
        className="transition-transform duration-200"
      />
    </button>
  );
};

export default LikeButton;
