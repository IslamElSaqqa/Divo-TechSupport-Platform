import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const FlashSales = () => {
  const scrollContainer = React.useRef(null);
  const Stars_count = (rating) => Math.round(rating);

  const scrollLeft = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const products = [
    {
      id: 1,
      title: "AMD Ryzen 9 5900X Processor ",
      image: "https://m.media-amazon.com/images/I/51S-lEYQZJL._AC_UL320_.jpg",
      Price: "EGP 15,490",
      rating: 5,
      link: "https://www.amazon.eg/-/en/AMD-Ryzen-5900X-Processor-Cache/dp/B08164VTWH/ref=sr_1_5?dib=eyJ2IjoiMSJ9.Z7CJHT1KWZAIrEEdBbXZo51epC5akn7qnwHRsXadZD_NzDvwyBn6sJpTt3e8w1Qwse3SBjWUtV8oGEtBclKIt9vK6Fl16CTczyJjQMH0rJvf5v4dDjp8QaFywJc9HlFAUXvEBYeBcQvkcG2zNyT72pMrKciMX8YWPJN3bL_Lsnha67oCfrmuHXPNH5-ITGnRUr94XDnwi9OTzwm0i_5NMxIFov3rZG-JkND_CrUywJufi_sqWXMGNTOWhLUxZFo3t4JTqG9SKsKTmY3sR_a6Iyjir0xcNO4o8pv8299re7k.qCXdVIlHZqz9SOYKMs12LgKbKU3dabj1WylnPS8wXP4&dib_tag=se&keywords=CPU&qid=1746559218&sr=8-5",
    },
    {
      id: 2,
      title: "Intel Core i5 14400F 10Core 16Threads Processor",
      image: "https://m.media-amazon.com/images/I/61IgclF1FEL._AC_UL320_.jpg",
      Price: "EGP 8,949",
      rating: 5,
      link: "https://www.amazon.eg/-/en/Intel-Core-14400F-Threads-Processor/dp/B0CQ1Y7KHV/ref=sr_1_2?dib=eyJ2IjoiMSJ9.Z7CJHT1KWZAIrEEdBbXZo51epC5akn7qnwHRsXadZD_NzDvwyBn6sJpTt3e8w1Qwse3SBjWUtV8oGEtBclKIt9vK6Fl16CTczyJjQMH0rJvf5v4dDjp8QaFywJc9HlFAUXvEBYeBcQvkcG2zNyT72pMrKciMX8YWPJN3bL_Lsnha67oCfrmuHXPNH5-ITGnRUr94XDnwi9OTzwm0i_5NMxIFov3rZG-JkND_CrUywJufi_sqWXMGNTOWhLUxZFo3t4JTqG9SKsKTmY3sR_a6Iyjir0xcNO4o8pv8299re7k.qCXdVIlHZqz9SOYKMs12LgKbKU3dabj1WylnPS8wXP4&dib_tag=se&keywords=CPU&qid=1746559218&sr=8-2&th=1",
    },
    {
      id: 3,
      title: "Gigabyte GeForce RTX 4090",
      image: "https://m.media-amazon.com/images/I/711vU2IrEuL._AC_UL320_.jpg",
      Price: "EGP 175,779",
      rating: 5,
      link: "https://www.amazon.eg/-/en/Gigabyte-Graphics-WINDFORCE-GV-N4090GAMING-OC-24GD/dp/B0BGP8FGNZ/ref=sr_1_1?dib=eyJ2IjoiMSJ9.8Qqi9-LXshRmq08x0Ivq8D9N7kUJytG-6ixgzCzokcIj3sVZwMen5jEgTytAKXbBKWM7FlhI0Ds5xN4Dr--mw6xibqUzABxhHXm4yxbH84CYfugFtAoWnkJpNmBbXoDeZTJSV-utzhSzUMbvZDwyPqA_hGJDbk9HSG2UETh-fbes973tdX_yfv6UMFc1SKngPIVhET8_f_vASa_gyt5frWGhf_6lcGI0t8jzw3p7Fxv9iQ5s9_2lMqam7W4pihURiTKLo4VmPraM97F-FwJEAd4BJKFo0nH3JpzcFJuPlu8.O7pQNQp5kqpDogHC015ER0cgUzDq0gA0pbOqUzHw7zU&dib_tag=se&keywords=5090&qid=1746559123&sr=8-1",
    },
    {
      id: 4,
      title: "TUF Gaming GeForce RTX ™ 5070",
      image: "https://m.media-amazon.com/images/I/815-M4vy8JL._AC_UL320_.jpg",
      Price: "EGP 100,000",
      rating: 5,
      link: "https://www.amazon.eg/-/en/3-125-slot-Military-Grade-Components-Protective-axial-tech/dp/B0DS6S98ZF/ref=sr_1_2?dib=eyJ2IjoiMSJ9.8Qqi9-LXshRmq08x0Ivq8D9N7kUJytG-6ixgzCzokcIj3sVZwMen5jEgTytAKXbBKWM7FlhI0Ds5xN4Dr--mw6xibqUzABxhHXm4yxbH84CYfugFtAoWnkJpNmBbXoDeZTJSV-utzhSzUMbvZDwyPqA_hGJDbk9HSG2UETh-fbes973tdX_yfv6UMFc1SKngPIVhET8_f_vASa_gyt5frWGhf_6lcGI0t8jzw3p7Fxv9iQ5s9_2lMqam7W4pihURiTKLo4VmPraM97F-FwJEAd4BJKFo0nH3JpzcFJuPlu8.O7pQNQp5kqpDogHC015ER0cgUzDq0gA0pbOqUzHw7zU&dib_tag=se&keywords=5090&qid=1746559123&sr=8-2",
    },
    {
      id: 5,
      title: "Apple 2024 MacBook Pro Laptop with M4 Pro,",
      image: "https://m.media-amazon.com/images/I/61-oTP1X4rL._AC_UL320_.jpg",
      Price: "EGP 105,950",
      rating: 5,
      link: "https://www.amazon.eg/-/en/Apple-MacBook-Laptop-12-core-16-core/dp/B0DLHY2BJ6/ref=sr_1_1?dib=eyJ2IjoiMSJ9.lgezSId41yJFyT4rjTkmIjLCXjCy82TbYf_ARhUaj5Pu_Ry9HrvEfX36BwvJHH-UF-5b4Fy_6cKsF6bfQv5VWWFUTNxiTwB7V3h-jkdooLbclSvMlYsumKElfB1PsMHDF0XjVw3YZVT9Sq3rHy2G1eNNZ4k0qOq5NCsEACSCW6-DIe-cWDwLp-SaHBqiRFHmz5Ck3fLT_fViv2gi05sK00-xTBYtl0TGCkDVC4ig2ExAPxyLOGxflC3zZSQJMvnDPtNp4vzF6apGbW_l83QUw_xcHOTXOZXPdlh8VGN9GrI.0kd0PiQNQbd1dPZJl2uruzcYFoYgn7nr4kJSFRV96qY&dib_tag=se&keywords=mac+book&qid=1746558830&sr=8-1",
    },
    {
      id: 6,
      title: "Apple 2024 MacBook Pro Laptop with M4 Max",
      image: "https://m.media-amazon.com/images/I/61hw7aZWYSL._AC_UL320_.jpg",
      Price: "EGP 239,999",
      rating: 5,
      link: "https://www.amazon.eg/-/en/Apple-MacBook-Laptop-16%E2%80%91core-40%E2%80%91core/dp/B0DLHDW2D9/ref=sr_1_5?dib=eyJ2IjoiMSJ9.lgezSId41yJFyT4rjTkmIjLCXjCy82TbYf_ARhUaj5Pu_Ry9HrvEfX36BwvJHH-UF-5b4Fy_6cKsF6bfQv5VWWFUTNxiTwB7V3h-jkdooLbclSvMlYsumKElfB1PsMHDF0XjVw3YZVT9Sq3rHy2G1eNNZ4k0qOq5NCsEACSCW6-DIe-cWDwLp-SaHBqiRFHmz5Ck3fLT_fViv2gi05sK00-xTBYtl0TGCkDVC4ig2ExAPxyLOGxflC3zZSQJMvnDPtNp4vzF6apGbW_l83QUw_xcHOTXOZXPdlh8VGN9GrI.0kd0PiQNQbd1dPZJl2uruzcYFoYgn7nr4kJSFRV96qY&dib_tag=se&keywords=mac+book&qid=1746558830&sr=8-5",
    },
  ];
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll up smoothly
    navigate("/store");
  };

  return (
    <div className="flash-sales-container">
      <div className="header-section">
        <div className="cpu-indicator">
          <div className="cpu-bar"></div>
          <span>Store</span>
        </div>

        <div className="sales-header">
          <h1 className="sales-title"> </h1>

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

      <div className="products-scroll-container">
        <div className="products-container" ref={scrollContainer}>
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-image"
                />
                <button
                  onClick={() =>
                    window.open(product.link, "_blank", "noopener,noreferrer")
                  }
                  className="add-to-cart-btn"
                >
                  Navigate
                </button>
              </div>
              <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <div className="product-price">
                  <span className="current-price">{product.Price}</span>
                  {/* <div className="stars">
                    {[...Array(Stars_count(product.rating))].map((_, i) => (
                      <img
                        key={i}
                        src="https://dashboard.codeparrot.ai/api/image/Z9S4MJIdzXb5OlMf/star-sol-6.png"
                        alt="Star"
                        className="star-icon"
                      />
                    ))}
                  </div> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="view-all-container">
        <button onClick={handleSubmit} className="view-all-btn" >View All Products</button>
      </div>
    </div>
  );
};

export default FlashSales;
