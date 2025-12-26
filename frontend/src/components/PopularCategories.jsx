import React, { useState, useEffect } from 'react';
import './PopularCategories.css';

function PopularCategories() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = [
    {
      id: 1,
      title: 'Vegetables',
      image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400&h=300&fit=crop',
      description: 'Fresh farm vegetables',
    },
    {
      id: 2,
      title: 'Fruits',
      image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=300&fit=crop',
      description: 'Seasonal fruits',
    },
    {
      id: 3,
      title: 'Grains',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop',
      description: 'Quality grains & cereals',
    },
    {
      id: 4,
      title: 'Seeds',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
      description: 'Certified quality seeds',
    },
    {
      id: 5,
      title: 'Farm Equipment',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      description: 'Modern farming tools',
    },
  ];

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % categories.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [categories.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % categories.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length);
  };

  return (
    <section className="popular-categories-section">
      <div className="container">
        <div className="section-header">
          <div className="eyebrow">Explore by Category</div>
          <h2>Popular Categories</h2>
          <p>Browse our most popular agricultural product categories</p>
        </div>

        <div className="carousel-wrapper">
          <button className="carousel-nav prev" onClick={prevSlide} aria-label="Previous">
            ‹
          </button>

          <div className="carousel-container">
            <div 
              className="carousel-track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {categories.map((category, index) => {
                const isActive = index === currentIndex;
                
                return (
                  <div 
                    key={category.id} 
                    className={`carousel-card ${isActive ? 'active' : 'hidden'}`}
                  >
                    <div className="category-image-wrapper">
                      <img 
                        src={category.image} 
                        alt={category.title}
                        className="category-image"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%230f5c3a" width="400" height="300"/%3E%3Ctext fill="%23fff" font-family="Arial" font-size="24" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3E' + category.title + '%3C/text%3E%3C/svg%3E';
                        }}
                      />
                      <div className="category-overlay">
                        <span className="category-overlay-text">View Products</span>
                      </div>
                    </div>
                    <div className="category-content">
                      <h3 className="category-title">{category.title}</h3>
                      <p className="category-description">{category.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button className="carousel-nav next" onClick={nextSlide} aria-label="Next">
            ›
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="carousel-dots">
          {categories.map((_, index) => (
            <button
              key={index}
              className={`dot ${currentIndex === index ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularCategories;
