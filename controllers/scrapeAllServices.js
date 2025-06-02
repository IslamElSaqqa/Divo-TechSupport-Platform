const axios = require('axios');

const scrapeAll = async (req, res) => { 
    const { productName } = req.query

    if (!productName) { 
        return res.status(400).json({error: "product not found"})
    }
        const [amazonRes, jumiaRes, cairoSalesRes, shikoStoreRes, maxHardwareRes] =
            await Promise.all([
                axios.get(`http://localhost:4000/api/scraping/amazon?productName=${productName}`).catch(() => { 
                    return []
                }),
                axios.get(`http://localhost:4000/api/scraping/jumia?productName=${productName}`).catch(() => { 
                    return []
                }),
                axios.get(`http://localhost:4000/api/scraping/cairoSales?productName=${productName}`).catch(() => { 
                    return []
                }),
                axios.get(`http://localhost:4000/api/scraping/shiko?productName=${productName}`).catch(() => { 
                    return []
                }),
                axios.get(`http://localhost:4000/api/scraping/maxHardware?productName=${productName}`).catch(() => { 
                    return []
                }),
                ])
        return res.status(200).json({
            amazon: amazonRes ? amazonRes.data : [],
            jumia: jumiaRes ? jumiaRes.data : [],
            cairoSales: cairoSalesRes ? cairoSalesRes.data : [],
            shikoStore: shikoStoreRes ? shikoStoreRes.data : [],
            maxHardware: maxHardwareRes ? maxHardwareRes.data : [], 
        })
}

module.exports = scrapeAll