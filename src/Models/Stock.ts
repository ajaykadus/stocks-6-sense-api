import mongoose from "mongoose"

const stockSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
        unique: true,
    },
    tickerSymbol: {
        type: String,
        required: true,
        unique: true,
    },
    lastPrice: {
        type: Number,
        required: true,
    },
    predictedPrice: {
        type: Number,
        required: true,
    }
})

const Stock = mongoose.model('Stocks', stockSchema)

export default Stock