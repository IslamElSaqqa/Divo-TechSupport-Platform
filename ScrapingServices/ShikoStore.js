const axios = require('axios');
const cheerio = require('cheerio');
const scrapeSkikoStore = async (req, res) => {

    const { productName } = req.query
    if (!productName) { 
        throw Error("product name is required")
    }
    const baseUrl = 'https://shikostore.com/search?q=';
    const url = `${baseUrl}${encodeURIComponent(productName)}`;
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    };

    try {
        console.log("This is start")
        const response = await axios.get(url, { headers });
        const $ = cheerio.load(response.data);
        
        const products = [];

        // Adjust selectors based on the actual HTML structure of the Shiko store website
        $('.product-item').each((index, element) => {
            const title = $(element).find('a.product-item__title').text().trim() || 'N/A';
            const newPrice = $(element).find('.price').first().text().trim() || 'N/A';
            const oldPrice = $(element).find('.price--compare').text().trim() || 'N/A';
            const link = $(element).find('a.product-item__title').attr('href');
            const image_url= $(element).find('.product-item__image-wrapper img').attr('src').trim() || 'N/A'
            const newPriceSliced = newPrice.slice(10)
            // console.log({ image_url,title, newPriceSliced,link }); // Log product details
            if (title && link && (newPriceSliced || oldPrice) && image_url) {
                products.push({
                    title,
                    price: newPriceSliced || oldPrice,
                    link: link ? `https://shikostore.com${link}` : '',
                    image_url: `https:${image_url}`
                });
            }
        });

        if (products.length === 0) {
            return res.json("Product is not found")
        }
        console.log("This is the End!")
        return res.status(200).json({products})
    } catch (error) {
        return res.status(500).json({error: error.message})            
    }
}
module.exports = scrapeSkikoStore
