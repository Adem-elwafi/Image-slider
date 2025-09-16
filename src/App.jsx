import { useState, useEffect } from 'react';
import './App.scss';

const flowerImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', alt: 'Pink Roses' },
  { id: 2, src: 'https://images.unsplash.com/photo-1490750967868-88aa4486ec95?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', alt: 'Sunflower Field' },
  { id: 3, src: 'https://images.unsplash.com/photo-1494972308805-463bc619d34e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', alt: 'Pink Cherry Blossoms' },
  { id: 4, src: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', alt: 'Purple Flowers' },
  { id: 5, src: 'https://images.unsplash.com/photo-1490750967868-88aa4486ec95?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', alt: 'White Daisies' }
];

function FlowerSlider() {
  const [currentIndex, setCurrentIndex] = useState(2); // Start with the third image centered
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    let interval;
    if (isAutoPlay) {
      interval = setInterval(() => {
        goToNext();
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlay]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? flowerImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === flowerImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Calculate which images to show based on currentIndex
  const getVisibleIndices = () => {
    const indices = [];
    for (let i = -2; i <= 2; i++) {
      let idx = currentIndex + i;
      if (idx < 0) idx += flowerImages.length;
      if (idx >= flowerImages.length) idx -= flowerImages.length;
      indices.push(idx);
    }
    return indices;
  };

  return (
    <div className="flower-gallery">
      <h1>Flower Gallery</h1>
      <div 
        className="slider-container" 
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => setIsAutoPlay(true)}
      >
        <button className="nav-arrow left-arrow" onClick={goToPrevious}>
          &larr;
        </button>
        
        <div className="slider-track">
          {getVisibleIndices().map((index, i) => {
            const flower = flowerImages[index];
            const position = i - 2; // -2, -1, 0, 1, 2
            const isCenter = position === 0;
            
            return (
              <div 
                key={flower.id}
                className={`slide ${isCenter ? 'center' : ''}`}
                style={{
                  transform: `translateX(${position * 30}%) scale(${isCenter ? 1.1 : 0.9})`,
                  zIndex: isCenter ? 3 : 2 - Math.abs(position),
                  opacity: isCenter ? 1 : 0.7,
                }}
                onClick={() => !isCenter && goToSlide(index)}
              >
                <img 
                  src={flower.src} 
                  alt={flower.alt} 
                  className="flower-image"
                />
                {isCenter && <div className="flower-caption">{flower.alt}</div>}
              </div>
            );
          })}
        </div>
        
        <button className="nav-arrow right-arrow" onClick={goToNext}>
          &rarr;
        </button>
      </div>

      <div className="dots-container">
        {flowerImages.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default FlowerSlider;