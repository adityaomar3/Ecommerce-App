import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL,
            { useNewUrlParser: true }
        )
        console.log(`connection succesful with mongodb ${conn.connection.host}`);
    } catch (e) {
        console.log(e)
    }
}

export default connectDB