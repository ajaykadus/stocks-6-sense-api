require('dotenv').config()
import mongoose from "mongoose"


const initMondoDb = () => {
    console.log(process.env.MONGODB_HOST)
    const url = process.env.MONGODB_HOST as string
    mongoose.connect(url, { useNewUrlParser: true })
    const db = mongoose.connection
    db.once('open', _ => {
        console.log('Database connected:', url)
    })

    db.on('error', err => {
        console.error('connection error:', err)
    })
}

export default initMondoDb
