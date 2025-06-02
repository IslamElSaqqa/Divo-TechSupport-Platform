const axios = require('axios');
const cheerio = require('cheerio');
const scrapeCairoSales = async (req, res) => {
    const { productName } = req.query
    const url = `https://cairosales.com/en/find?search_query=${encodeURIComponent(productName)}`;
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
    };

    try {
        console.log("This is the start of the API")
        const response = await axios.get(url, { headers });
        const $ = cheerio.load(response.data);
        const products = [];
        
        $('.product-container').each((index, element) => {
            const title = $(element).find('h5').text().trim() || 'N/A';
            const newPrice = $(element).find('.price').first().text().trim()|| 'No sales price';
            const oldPrice = ($(element).find('.old-price').first().text().trim());
            const link = $(element).find('.product-name').attr('href');
            const image_url = $(element).find('.replace-2x.img-responsive').attr('src') || 'N/A'
            products.push({
            title,
            price: newPrice || oldPrice,
            link: link ? link : 'Sorry undefined Link',
            image_url
            });
        });
        console.log("This is the End of the API")
        return res.status(200).json({products})
        } catch (error) {
        return res.status(500).json({error: error.message})
            
    }
}
module.exports = scrapeCairoSales