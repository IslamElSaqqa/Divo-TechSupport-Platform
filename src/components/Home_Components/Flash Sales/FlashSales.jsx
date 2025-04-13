import React, { useState, useEffect } from 'react';
import './FlashSales.css';
import { Heart, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

const FlashSales = () => {
  
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56
  });

  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
  
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }
  
        return { days, hours, minutes, seconds };
      });
    }, 1000);
  
    return () => clearInterval(timer);
  },[]); 
  


  const scrollContainer = React.useRef(null);

  const scrollLeft = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };


  const products = [
    {
      id: 1,
      title: "Cpu Intel Core I5-13400 (4.60Ghz/20Mb) (Lga1700)",
      image: "/api/placeholder/400/320",
      currentPrice: 120,
      originalPrice: 160,
      discount: 40,
      rating: 5,
      reviews: 88
    },
    {
      id: 2,
      title: "Cpu Intel Core I5-12400F (4.40Ghz/18Mb) (Lga1700)",
      image: "/api/placeholder/400/320",
      currentPrice: 960,
      originalPrice: 1160,
      discount: 35,
      rating: 4.5,
      reviews: 75
    },
    {
      id: 3,
      title: "Cpu Intel Core I5-13400F (4.60Ghz/20Mb) (Lga1700)",
      image: "/api/placeholder/400/320",
      currentPrice: 370,
      originalPrice: 400,
      discount: 30,
      rating: 5,
      reviews: 99
    },
    {
      id: 4,
      title: "Cpu Intel Core I5-11400F (2.60Ghz/12Mb) (Lga1200)",
      image: "/api/placeholder/400/320",
      currentPrice: 375,
      originalPrice: 400,
      discount: 25,
      rating: 4.5,
      reviews: 99
    },
    {
      id: 5,
      title: "S-Series Cpu",
      image: "/api/placeholder/400/320",
      currentPrice: 375,
      originalPrice: 400,
      discount: 25,
      rating: 5,
      reviews: 0
    }
  ];


  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="star full">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }

    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
    }

    return stars;
  };


  const formatNumber = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  return (
    <div className="flash-sales-container">
      <div className="header-section">
        <div className="cpu-indicator">
          <div className="cpu-bar"></div>
          <span>Cpu</span>
        </div>
        
        <div className="sales-header">
          <h1 className="sales-title">Flash Sales</h1>
          
          <div className="countdown-container">
            <div className="countdown">
              <div className="time-section">
                <div className="time-label">Days</div>
                <div className="time-value">{formatNumber(timeLeft.days)}</div>
              </div>
              <div className="separator">:</div>
              <div className="time-section">
                <div className="time-label">Hours</div>
                <div className="time-value">{formatNumber(timeLeft.hours)}</div>
              </div>
              <div className="separator">:</div>
              <div className="time-section">
                <div className="time-label">Minutes</div>
                <div className="time-value">{formatNumber(timeLeft.minutes)}</div>
              </div>
              <div className="separator">:</div>
              <div className="time-section">
                <div className="time-label">Seconds</div>
                <div className="time-value">{formatNumber(timeLeft.seconds)}</div>
              </div>
            </div>
            
            <div className="navigation-controls">
              <button className="nav-button" onClick={scrollLeft}>
                <ChevronLeft size={24} />
              </button>
              <button className="nav-button" onClick={scrollRight}>
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="products-scroll-container">
        <div className="products-container" ref={scrollContainer}>
          {products.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <div className="discount-badge">{`-${product.discount}%`}</div>
                <img src={product.image} alt={product.title} className="product-image" />
                <div className="product-actions">
                  <button className="action-btn love-btn">
                    <Heart size={20} />
                  </button>
                  <button className="action-btn eye-btn">
                    <Eye size={20} />
                  </button>
                </div>
                <button className="add-to-cart-btn">Navigate</button>
              </div>
              <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <div className="product-price">
                  <span className="current-price">${product.currentPrice}</span>
                  <span className="original-price">${product.originalPrice}</span>
                </div>
                <div className="product-rating">
                  <div className="stars">
                    {renderStars(product.rating)}
                  </div>
                  {product.reviews > 0 && <span className="review-count">({product.reviews})</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="view-all-container">
        <button className="view-all-btn">View All Products</button>
      </div>
    </div>
  );
};

export default FlashSales;