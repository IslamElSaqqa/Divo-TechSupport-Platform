const axios = require('axios');
const cheerio = require('cheerio');
const scrapeMaxHardware = async (req, res) => {
    
    const { productName } = req.query
    if (!productName) {
        throw Error("Product name is required")
    }
    const url = `https://maximumhardware.store/index.php?route=product/search&search=${encodeURIComponent(productName)}`;
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
    };

    try {
        console.log("This is start")
        const response = await axios.get(url, { headers });
        const $ = cheerio.load(response.data);
        if (!response || !response.data) { 
            throw Error("Error fetching data")
        }
        const products = [];
    
        $('.main-products .product-thumb').each((index, element) => {
            const title = $(element).find('.name a').text().trim() || 'N/A';
            const newPrice = $(element).find('.price-normal').text().trim() || 'N/A';
            const oldPrice = $(element).find('.price-normal').text().trim() || 'N/A';
            const link = $(element).find('.name a').attr('href');
            const image_url = $(element).find('div img').attr('src') || 'N/A'

            products.push({
                title,
                price: newPrice || oldPrice,
                link: link,
                image_url
            });
        });
        console.log("This is End")
        return res.status(200).json({ products });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
module.exports = scrapeMaxHardware