process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require("cors");
const communityRoutes = require('./routes/communityRoutes')
const userRoute = require('./routes/userRoute')
const specialistRoute = require('./routes/specialistRoute')
const serviceShopRoutes = require('./routes/serviceShopRoutes')
const windowsErrorRoutes = require('./routes/windowsErrorRoutes')
const helpSessionRoutes = require('./routes/helpSessionRoutes')
const forgotPassRoutes = require('./routes/forgotResetPassRoutes')
const scrapingRoutes = require('./routes/scrapingRoutes')
const uploadVideoRoutes = require("./routes/uploadVideosRoutes")
const uploadImageRoute = require("./routes/uploadImageRoute")
const contactUsRoute = require("./routes/contactUsRoute")
const mongoose = require('mongoose')

// middleware
app.use(express.json({ limit: '50mb' }))    // Parse all data comming from api
app.use(cors());    // Enable CORS
app.use((req, res, next) => { 
    console.log(req.path, req.method)
    next()
})

// Routes
app.use('/api/community/posts', communityRoutes)
app.use('/api/users', userRoute)
app.use('/api/specialists', specialistRoute)
app.use('/api/serviceShops', serviceShopRoutes)
app.use('/api/WindowsError', windowsErrorRoutes)
app.use('/api/helpSession', helpSessionRoutes)
app.use('/api/auth', forgotPassRoutes)
app.use('/api/scraping', scrapingRoutes)
app.use('/api/upload/', uploadVideoRoutes)
app.use('/api/uploadImage/', uploadImageRoute)
app.use('/api/contactUs', contactUsRoute)


// MongoDb Connection using the URI and the listening Port
mongoose.connect(process.env.MONGO_URI)
    .then(() => {   // Connection Established
        // listen
        app.listen(process.env.PORT, () => {
            console.log("Connected to db & listening to port..... ", process.env.PORT);
        });
    }).catch(err => { // Connection failed
        console.log(err);
    });
