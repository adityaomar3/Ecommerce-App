import express from 'express';
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import morgan from 'morgan'
import bodyParser from 'body-parser';

//configure env
dotenv.config()

//rest object
const app = express()

//databse config
connectDB();

//middlewares
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use("/api/v1/auth", authRoutes)

// rest api
app.get('/', (req, res) => {
    res.send({
        message: "Welcome to ecom app"
    })
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on mode ${process.env.DEV_MODE} on port ${PORT}`)
})  