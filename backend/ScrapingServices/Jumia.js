const axios = require('axios');
const cheerio = require('cheerio');

const scrapeJumia = async (req, res) => {
    const { productName }  = req.query
    if (!productName) { 
        throw Error ("Product name is required!")
    }
    const url = `https://www.jumia.com.eg/en/catalog/?q=${encodeURIComponent(productName)}&language=en`;
    const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Referer': 'https://www.jumia.eg/',
    'DNT': '1',
    'Connection': 'keep-alive'
    };

    try {
        console.log("This is the start of the API")
        const response = await axios.get(url, { headers });
        const $ = cheerio.load(response.data);
        const products = [];
        if (!response || !response.data)
            throw Error('Error fetching response from Jumia!')

        // Acts like JQuery to use selectors to parse DOM
        $('.prd._fb.col.c-prd').each((index, element) => {
            const title = $(element).find('h3.name').text().trim();
            const price = $(element).find('.prc').text().trim();
            // a.core
            const link = $(element).find('a.core').attr('href') || 'N/A';
            
            const image_url = $(element).find('img.img').attr('data-src') || 'N/A' 

            if (title && price && link && image_url) {
                products.push({
                    title,
                    price,
                    link: `https://www.jumia.com.eg${link}`,
                    image_url
                });
            }
        });
        console.log("This is the end!")
        return res.status(200).json({ products });
    } catch (error) {
        return res.status(500).json({ error: error.message })        
    }
}
module.exports = scrapeJumia