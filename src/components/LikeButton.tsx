import { useState } from 'react';

type LikeButtonProps = {
  initialLikes?: number;
  onLike?: (newCount: number) => void;
};

function LikeButton({ initialLikes = 0, onLike }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleClick = () => {
    const newLikes = isLiked ? likes - 1 : likes + 1;
    setLikes(newLikes);
    setIsLiked(!isLiked);
    
    // Notify parent component (if callback provided)
    onLike?.(newLikes);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        padding: '0.5rem 1rem',
        backgroundColor: isLiked ? '#ff6b6b' : '#e0e0e0',
        color: isLiked ? 'white' : '#333',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
      }}
    >
      {isLiked ? '❤️' : '🤍'} {likes}
    </button>
  );
}

export default LikeButton;