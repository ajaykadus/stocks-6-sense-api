import stocks6SenseDb from "../Connectors/FireBase";
import Stock from "../Models/Stock"

export const typeDef = `
  input StockInput {
    company: String
    tickerSymbol: String
  }
  type Stock {
    tickerSymbol: String
    company: String
    lastPrice: Int
    predictedPrice: Int
  }
  extend type Query {
    stocks: [Stock]
  }
  extend type Mutation {
    addStock(input:StockInput): Stock 
  }
`

export const resolvers = {
  Query: {
    stocks: async () => {
      const stocks = await Stock.find({})
      return stocks

      // Using firebase database

      // let stocksResults: FirebaseFirestore.DocumentData[] =[]
      // const stocksRef = stocks6SenseDb.collection('stocks')
      // const stocks = await stocksRef.get()
      // stocks.forEach(s => stocksResults.push(s.data()))
      // return stocksResults
    }
  },
  Mutation: {
    addStock: async (parent: any, { input }: any) => {
      const stockData = {
        tickerSymbol: input.tickerSymbol,
        company: input.company,
        lastPrice: 124,
        predictedPrice: 150
      }

      const newStock = Stock.create(stockData)
      return newStock

      // Using firebase database

      // const stocksRef = stocks6SenseDb.collection('stocks')
      // const data = await stocksRef.doc(id).set(stockData);
      // return data
    }
  }
}