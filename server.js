import express from 'express';
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import morgan from 'morgan'
//configure env
dotenv.config()

//rest object
const app = express()

//databse config
connectDB();

app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.send({
        message: "Welcome to ecom app"
    })
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on mode ${process.env.DEV_MODE} on port ${PORT}`)
})  