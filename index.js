const express = require('express')
const app = express()
const mongoose = require('mongoose');
require('dotenv').config()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.PORT || 5000

console.log(process.env.DB_URL)

// middleware setting
app.use(express.json({ limit: '50mb' }));
app.use((express.urlencoded({ limit: '50mb' })));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: 'https://alibaba-e-com-frontend.vercel.app',
    credentials: true
}))

// image upload 
const uploadImage = require("./src/utils/uploadImage")

// all routes
const authRoutes = require('./src/users/user.route');
const productRoutes = require('./src/products/products.route');
const reviewRoutes = require('./src/reviews/reviews.router');
const orderRoutes = require('./src/orders/orders.route');
const statsRoutes = require('./src/stats/stats.route')


app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/stats', statsRoutes);

main().then((console.log('Connected to MongoDB'))).catch(err => console.log(err));

// Santhu@143
// admin


async function main() {
    await mongoose.connect(process.env.DB_URL);
    app.get('/', (req, res) => {
        res.send('Lebaba Server Running..!')
    })


}

app.post("/uploadImage", (req, res) => {
    uploadImage(req.body.image)
      .then((url) => res.send(url))
      .catch((err) => res.status(500).send(err));
  });


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})