const axios = require('axios');
const cheerio = require('cheerio');
// Scraping Amazon products
const scrapeAmazon =  async (req, res) => {
    const { productName } =  req.query
    if (!productName) { 
        throw Error ("Product name is required!")
    }
    const url = `https://www.amazon.eg/s?k=${encodeURIComponent(productName)}&language=en`;
    const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Referer': 'https://www.amazon.eg/',
    'DNT': '1',
    'Connection': 'keep-alive'
    };

    try {
        console.log("This is the start of the API")
        const response = await axios.get(url, { headers });
        
        const $ = cheerio.load(response.data);
        const products = [];
        if (!response || !response.data)
            throw Error('Error fetching response from Amazon')

        // Acts like JQuery to use selectors to parse DOM
        $('.s-result-item').each((index, element) => {
            const image_url = $(element).find('.s-image').attr('src')?.trim() || 'N/A'
            const title = $(element).find('.a-size-base-plus').text().trim() || 'N/A';
            const symbol = $(element).find('span.a-price-symbol').text().trim() || '';
            const newPriceWhole = $(element).find('span.a-price-whole').text().trim();
            const newPriceFraction = $(element).find('span.a-price-fraction').text().trim();
            const newPrice = newPriceWhole ? symbol+" "+newPriceWhole + newPriceFraction : 'No offers';
            const oldPrice = $(element).find('span.a-text-price span.a-offscreen').text().trim() || '';
            const link = $(element).find('a.a-link-normal').attr('href');

            if (title && link && image_url && (newPrice || oldPrice)) {
                products.push({
                image_url,
                title,
                price: newPrice || oldPrice,
                link: `https://www.amazon.eg${link}`
                });
            }
        });
        console.log("This is the End")
        return res.status(200).json({ products });
    } catch (error) {
        return res.status(500).json({ error: error.message })        
    }
}
module.exports =  scrapeAmazon  
