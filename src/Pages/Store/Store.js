import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"
import { useScraper } from "../../context/ScrapingContext/ScraperContext";
const Store = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(null)  
  const [loading, setLoading] = useState(null)
  const { setScrapedData } = useScraper()

  const handleSubmit = async (e) => {
    setLoading(true);    
    e.preventDefault();
    if (!inputValue.trim()) {
      setError("Please enter the product name!");
      setLoading(false)
      return;
    }
     //  Clear previous data before starting new search
      localStorage.removeItem('scrapedData');
      setScrapedData(null);
    try {
      const response = await axios.get(`http://localhost:4000/api/scraping/scrapeAll?productName=${encodeURIComponent(inputValue.trim())}`);
      setScrapedData(response.data); // save it to context
      navigate(`/store-categories?productName=${encodeURIComponent(inputValue.trim())}`); // navigate after fetching
    } catch (err) {
      console.error(err);
      setError("Failed to fetch product data.");
      setLoading(false)
    }
  };


  const categories = [
    {
      icon: "https://dashboard.codeparrot.ai/api/image/Z9ILnCppvFKitUBT/image.png",
      name: "CPU",
    },
    {
      icon: "https://dashboard.codeparrot.ai/api/image/Z9ILnCppvFKitUBT/ellipse.png",
      name: "GPU",
    },
    {
      icon: "https://dashboard.codeparrot.ai/api/image/Z9ILnCppvFKitUBT/ellipse-2.png",
      name: "Tower",
    },
    {
      icon: "https://dashboard.codeparrot.ai/api/image/Z9ILnCppvFKitUBT/monitor.png",
      name: "Monitor",
    },
    {
      icon: "https://dashboard.codeparrot.ai/api/image/Z9ILnCppvFKitUBT/cooler-1.png",
      name: "Cooler",
    },
    {
      icon: "https://dashboard.codeparrot.ai/api/image/Z9ILnCppvFKitUBT/mouse-1.png",
      name: "Mouse",
    },
    {
      icon: "https://dashboard.codeparrot.ai/api/image/Z9ILnCppvFKitUBT/ellipse-4.png",
      name: "ROM",
    },
    {
      icon: "https://dashboard.codeparrot.ai/api/image/Z9ILnCppvFKitUBT/laptop-r.png",
      name: "Laptop",
    },
    {
      icon: "https://dashboard.codeparrot.ai/api/image/Z9ILnCppvFKitUBT/ellipse-5.png",
      name: "RAM",
    },
    {
      icon: "https://dashboard.codeparrot.ai/api/image/Z9ILnCppvFKitUBT/computer.png",
      name: "PC",
    },
    {
      icon: "https://dashboard.codeparrot.ai/api/image/Z9ILnCppvFKitUBT/usb-2.png",
      name: "Accessories",
    },
    {
      icon: "https://dashboard.codeparrot.ai/api/image/Z9ILnCppvFKitUBT/security.png",
      name: "Camera",
    },
    {
      icon: "https://dashboard.codeparrot.ai/api/image/Z9ILnCppvFKitUBT/computer-2.png",
      name: "Speaker",
    },
    {
      icon: "https://dashboard.codeparrot.ai/api/image/Z9ILnCppvFKitUBT/usb-1.png",
      name: "Network",
    },
  ];

  return (
    <div className="content-container">
                    
      <div className="search-container-error">
        <h1 className="DIVO-logo-error">
          <span className="orange-text">D</span>IVO{" "}
          <span className="orange-text">STORE</span>
        </h1>
        {error && <div className="error"> { error }</div>}
        <form onSubmit={handleSubmit}>
          <div className="search-box-container-error">
            <div className="search-input-error">
              <input type="text" placeholder="Search..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            </div>
            <button disabled={loading} className="search-button">
                  {loading ? "Searching..." : "SEARCH"}
            </button>
          </div>
        </form>

        {loading && (
                        <div className="spinner-container">
                            <div className="spinner"></div>
                        </div>
                    )}

        <div className="reactivation-container">
          <div className="browse-category-container">
            <h2 className="category-title">Browse By Category</h2>
            <div className="categories-slider">
              {categories.map((category, index) => (
                <div key={index} className="category-card">
                  <div className="icon-container">
                    <img src={category.icon} alt={category.name} />
                  </div>
                  <p className="category-name">{category.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;
