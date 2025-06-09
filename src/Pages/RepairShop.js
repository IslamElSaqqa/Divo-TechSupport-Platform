import React, {useState} from "react";
import { useRepairShop } from '../Hooks/RepairShop/useRepairShopHook';

const storeData = [
    { name: "Kimo Store", area: "Sidi Beshr", gov: "Alexandria", rating: "5.0", link: "https://maps.app.goo.gl/V5yUZYmYaabXpc5x8" },
    { name: "Desktop Store", area: "Sidi Beshr", gov: "Alexandria", rating: "4.6", link: "https://maps.app.goo.gl/V5yUZYmYaabXpc5x8" },
    { name: "Switch Plus Store", area: "Sidi Beshr", gov: "Alexandria", rating: "5.0", link: "https://maps.app.goo.gl/V5yUZYmYaabXpc5x8" },
    { name: "Professional Store", area: "Sidi Beshr", gov: "Alexandria", rating: "5.0", link: "https://maps.app.goo.gl/V5yUZYmYaabXpc5x8" },
    { name: "Paragon Laptop Store", area: "Sidi Beshr", gov: "Alexandria", rating: "4.3", link: "https://maps.app.goo.gl/V5yUZYmYaabXpc5x8" },
    { name: "Al Batool Store", area: "Sidi Beshr", gov: "Alexandria", rating: "3.8", link: "https://maps.app.goo.gl/V5yUZYmYaabXpc5x8" },
];

const RepairShops = () => {
    const [inputValue, setInputValue] = useState("");
    const [displayedStores, setDisplayedStores] = useState(storeData);
    const { getRepairShops, error, isLoading } = useRepairShop();
    const [typingTimeout, setTypingTimeout] = useState(null);

    const Stars_count = (rating) => Math.round(rating);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);

        // Clear previous timeout
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        // Set new timeout
        const timeout = setTimeout(async () => {
            if (e.target.value.trim()) {
                const fetchedStores = await getRepairShops(e.target.value.trim());
                if (fetchedStores && Array.isArray(fetchedStores)) {
                    setDisplayedStores(fetchedStores);
                    localStorage.setItem("searchQuery", e.target.value.trim());
                }
            } else {
                setDisplayedStores(storeData);
            }
        }, 1000); // 1.2 seconds after typing stops

        setTypingTimeout(timeout);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const fetchedStores = await getRepairShops(inputValue.trim());
        if (fetchedStores && Array.isArray(fetchedStores)) {
            setDisplayedStores(fetchedStores);
            localStorage.setItem("searchQuery", inputValue.trim());
        }
    };

    return (
        <div className="content-container">
            <div className="repair-shops-container">
                {error && <div className="error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="search-section-repair-shops">
                        <div className="search-bar">
                            <input
                                type="text"
                                placeholder="Enter area name or Government"
                                className="search-input-shops"
                                value={inputValue}
                                onChange={handleInputChange}
                            />
                            <img
                                src="https://res.cloudinary.com/dr9yx1tod/image/upload/v1748903487/fgjefceq9ce7dtq9xfti.png"
                                alt="Search"
                                className="search-icon"
                            />
                        </div>
                        <button disabled={isLoading} className="search-button-repair-shops">
                            {isLoading ? "Loading..." : "Search"}
                        </button>
                    </div>
                </form>

                {isLoading && (
                    <div className="spinner-container">
                        <div className="spinner"></div>
                    </div>
                )}

                <h2 className="section-title-repair-shops">Best Maintenance Stores</h2>

                <div className="stores-list">
                    {displayedStores?.map((store, index) => (
                        <div key={index} className="store-item">
                            <div className="store-icon-wrapper">
                                <img
                                    src="https://res.cloudinary.com/dr9yx1tod/image/upload/v1748903400/kzpxrycefweqbfhontls.png"
                                    alt={store.name}
                                    className="store-icon"
                                />
                            </div>
                            <div className="store-details">
                                <h3 className="store-name">{store.name}</h3>
                                <div className="location-wrapper">
                                    <img
                                        src="https://res.cloudinary.com/dr9yx1tod/image/upload/v1748903430/ftqmxvmuwq97e9is8hpc.png"
                                        alt="Location"
                                        className="location-icon"
                                    />
                                    <p className="store-location">{store.area}, {store.gov}</p>
                                </div>
                                <div className="store-rating">
                                    <span className="rating-value">{store.rating}</span>
                                    <div className="rating-stars">
                                        {[...Array(Stars_count(store.rating))].map((_, i) => (
                                            <img
                                                key={i}
                                                src="https://res.cloudinary.com/dr9yx1tod/image/upload/v1748902264/rtjr3udbcu57sk3il6r4.png"
                                                alt="Star"
                                                className="star-icon"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="navigate-wrapper">
                                <a href={store.link} target="_blank" rel="noopener noreferrer">
                                    <img
                                        src="https://res.cloudinary.com/dr9yx1tod/image/upload/v1748903449/vlkx8k1snkbmaf4atrkf.png"
                                        alt="Navigate"
                                        className="navigate-icon"
                                    />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RepairShops;


