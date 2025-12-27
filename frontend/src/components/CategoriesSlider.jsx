import React, { useState, useEffect } from 'react';
import './CategoriesSlider.css';

function CategoriesSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = [
    {
      id: 1,
      title: 'Vegetables',
      image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=600&h=400&fit=crop',
    },
    {
      id: 2,
      title: 'Fruits',
      image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&h=400&fit=crop',
    },
    {
      id: 3,
      title: 'Grains',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=400&fit=crop',
    },
    {
      id: 4,
      title: 'Seeds',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop',
    },
    {
      id: 5,
      title: 'Farm Equipment',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop',
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? categories.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === categories.length - 1 ? 0 : prev + 1));
  };

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [handleNext]);

  return (
    <section className="categories-slider-section">
      <div className="slider-container">
        <h2 className="slider-title">Popular Categories</h2>
        
        <div className="slider-wrapper">
          <button 
            className="slider-btn slider-btn-prev" 
            onClick={handlePrev}
            aria-label="Previous category"
          >
            &#8249;
          </button>

          <div className="slider-content">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className={`category-slide ${index === currentIndex ? 'active' : ''}`}
              >
                <div className="category-card-slider">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="category-img"
                  />
                  <div className="category-info">
                    <h3 className="category-name">{category.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button 
            className="slider-btn slider-btn-next" 
            onClick={handleNext}
            aria-label="Next category"
          >
            &#8250;
          </button>
        </div>

        <div className="slider-indicators">
          {categories.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to category ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoriesSlider;
