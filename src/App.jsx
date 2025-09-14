import React, { useState } from 'react';
import './App.scss';

// Import images
import image1 from './assets/images/image1.png';
import image2 from './assets/images/image2.png';
import image3 from './assets/images/image3.png';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    image1,
    image2,
    image3
  ];

  const next = () => {
    setCurrentIndex((Index) => 
      Index === slides.length - 1 ? 0 : Index + 1
    );
  };

  const prev = () => {
    setCurrentIndex((Index) =>
      Index === 0 ? slides.length - 1 : Index - 1
    );
  };

  return (
    <div className="slider-container">
      <div className="slide">
        <img 
          src={slides[currentIndex]} 
          alt={`Slide ${currentIndex + 1}`}
          className="slide-image"
        />
      </div>
      <div className="controls">
        <button onClick={prev} className="nav-button">
          Prev
        </button>
        <button onClick={next} className="nav-button">
          Next
        </button>
      </div>
    </div>
  );
}

export default App;