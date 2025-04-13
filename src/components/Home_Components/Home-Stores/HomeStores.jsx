import React, { useState, useEffect } from 'react';
import './HomeStores.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FlashSales = () => {
  
  const [timeLeft,setTimeLeft] = useState({
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
  }, []);


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

  const stores = [
    {
      id: 1,
      title: "Cpu Intel Core I5-13400 (4.60Ghz/20Mb) (Lga1700)",
      image: "/api/placeholder/400/320",
      location: "Store 1",
      discount: 40,
      rating: 5,
      reviews: 88
    },
    {
      id: 2,
      title: "Cpu Intel Core I5-12400F (4.40Ghz/18Mb) (Lga1700)",
      image: "/api/placeholder/400/320",
      location: "Store 1",
      discount: 35,
      rating: 4.5,
      reviews: 75
    },
    {
      id: 3,
      title: "Cpu Intel Core I5-13400F (4.60Ghz/20Mb) (Lga1700)",
      image: "/api/placeholder/400/320",
      location: "Store 1",
      discount: 30,
      rating: 5,
      reviews: 99
    },
    {
      id: 4,
      title: "Cpu Intel Core I5-11400F (2.60Ghz/12Mb) (Lga1200)",
      image: "/api/placeholder/400/320",
      location: "Store 1",
      discount: 25,
      rating: 4.5,
      reviews: 99
    },
    {
      id: 5,
      title: "S-Series Cpu",
      image: "/api/placeholder/400/320",
      location: "Store 1",
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
      stars.push(<span key="half" className="star half">☆</span>);
    }

    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">☆</span>);
    }

    return stars;
  };


  const formatNumber = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  return (
    <div className="flash-sales-container-2 ">
         <div className="header-section">
              <div className="cpu-indicator">
                <div className="cpu-bar"></div>
                <span>Stores</span>

              </div>
              <div className="title-container">
          <h1 className="title">Best Maintenance Stores</h1>
        </div>
              
              <div className="sales-header">
                <h1 className="sales-title"></h1>
                
                <div className="countdown-container">
                  
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
          {stores.map(store => (
            <div key={store.id} className="product-card">
              <div className="product-image-container">
                <img src={store.image} alt={store.title} className="product-image" />
                <button className="add-to-cart-btn">Get Directions   <span className='blackspan'>     ➤  </span></button>
              </div>
              <div className="product-info">
                <h3 className="product-title">{store.title}</h3>
                <div className="store-location">
                <span className="location-icon">📍</span>
                <span>{store.location}</span>
              </div>
                <div className="product-rating">
                  <div className="stars">
                    {renderStars(store.rating)}
                  </div>
                  {store.reviews > 0 && <span className="review-count">({store.reviews})</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="view-all-container">
        <button className="view-all-btn">View All Stores</button>
      </div>
    </div>
  );
};

export default FlashSales;