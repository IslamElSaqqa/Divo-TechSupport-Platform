import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useScraper } from "../../context/ScrapingContext/ScraperContext";

const Store = () => {
  const navigate = useNavigate();
  const { setScrapedData } = useScraper();
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!inputValue.trim()) {
      setError("Please enter the product name!");
      setLoading(false);
      return;
    }

    localStorage.removeItem('scrapedData');
    setScrapedData(null);

    try {
      const response = await axios.get(`http://localhost:4000/api/scraping/scrapeAll?productName=${encodeURIComponent(inputValue.trim())}`);
      setScrapedData(response.data);
      navigate(`/store-categories?productName=${encodeURIComponent(inputValue.trim())}`);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch product data.");
    }
    setLoading(false);
  };

  // 🚀 New function to handle category click
  const handleCategoryClick = async (categoryName) => {
    setError(null);
    setInputValue(categoryName);
    setLoading(true);

    try {
      const response = await axios.get(`http://localhost:4000/api/scraping/scrapeAll?productName=${encodeURIComponent(categoryName.trim())}`);
      setScrapedData(response.data);
      navigate(`/store-categories?productName=${encodeURIComponent(categoryName.trim())}`);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch product data.");
    }
    setLoading(false);
  };

  const categories = [
    { icon: "https://res.cloudinary.com/dr9yx1tod/image/upload/v1748902662/g3a9iecy85qpkbi3pphi.png", name: "CPU" },
    { icon: "https://res.cloudinary.com/dr9yx1tod/image/upload/v1748902699/jvuxoeudvgzixfhunb73.png", name: "GPU" },
    { icon: "https://res.cloudinary.com/dr9yx1tod/image/upload/v1748902803/ucz5kotrtadauqojunyv.png", name: "PC Tower" },
    { icon: "https://res.cloudinary.com/dr9yx1tod/image/upload/v1748902825/c3vetqefgytqgeqhxqup.png", name: "Monitor" },
    { icon: "https://res.cloudinary.com/dr9yx1tod/image/upload/v1748902844/h3icic9q5bshjtt1it1x.png", name: "Cooler" },
    { icon: "https://res.cloudinary.com/dr9yx1tod/image/upload/v1748902872/wixjjyigvwuuvc8qkejd.png", name: "Mouse" },
    { icon: "https://res.cloudinary.com/dr9yx1tod/image/upload/v1748902907/hu2lkaotd1kchctvarf2.png", name: "ROM" },
    { icon: "https://res.cloudinary.com/dr9yx1tod/image/upload/v1748902937/r4qeot5o8p9tiejo4khs.png", name: "Laptop" },
    { icon: "https://res.cloudinary.com/dr9yx1tod/image/upload/v1748902982/z4h4uuuma7fss77lzrwq.png", name: "RAM" },
    { icon: "https://res.cloudinary.com/dr9yx1tod/image/upload/v1748903002/kp53fezudqvjfwhsy5kb.png", name: "PC" },
    { icon: "https://res.cloudinary.com/dr9yx1tod/image/upload/v1748903028/ydhua7fjwaqvlpb12p1t.png", name: "Cables" },
    { icon: "https://res.cloudinary.com/dr9yx1tod/image/upload/v1748903087/aqwbgwaws1cwnbu0pz6h.png", name: "Camera" },
    { icon: "https://res.cloudinary.com/dr9yx1tod/image/upload/v1748903113/mvvzkzs5igj4do9wa137.png", name: "Speaker" },
    { icon: "https://res.cloudinary.com/dr9yx1tod/image/upload/v1748903138/jdyvl6w6x07qmlfson28.png", name: "Network devices" }
  ];

  return (
    <div className="content-container">
      <div className="search-container-error">
        <h1 className="DIVO-logo-error">
          <span className="orange-text">D</span>IVO <span className="orange-text">STORE</span>
        </h1>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="search-box-container-error">
            <div className="search-input-error">
              <input
                type="text"
                placeholder="Search..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
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
                <div
                  key={index}
                  className="category-card"
                  onClick={() => handleCategoryClick(category.name)}
                  style={{ cursor: "pointer" }}
                >
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
