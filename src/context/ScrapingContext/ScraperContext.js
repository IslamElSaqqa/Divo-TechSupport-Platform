// import { createContext, useContext, useState } from 'react';

// const ScraperContext = createContext();

// export const ScraperProvider = ({ children }) => {
//     const [scrapedData, setScrapedData] = useState(null);


//     return (
//         // passing initial state functions as props
//         <ScraperContext.Provider value={{ scrapedData, setScrapedData }}>
//         {children}
//         </ScraperContext.Provider>
//     );
// };

// // using that context to create the hook!
// export const useScraper = () => useContext(ScraperContext);

// ScraperContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const ScraperContext = createContext();

export const ScraperProvider = ({ children }) => {
    const [scrapedData, setScrapedData] = useState(() => {
        // Initialize from localStorage if exists
        const saved = localStorage.getItem('scrapedData');
        return saved ? JSON.parse(saved) : null;
    });

    // Save to localStorage on every change
    useEffect(() => {
        if (scrapedData) {
            localStorage.setItem('scrapedData', JSON.stringify(scrapedData));
        }
    }, [scrapedData]);

    return (
        <ScraperContext.Provider value={{ scrapedData, setScrapedData }}>
            {children}
        </ScraperContext.Provider>
    );
};

export const useScraper = () => useContext(ScraperContext);
