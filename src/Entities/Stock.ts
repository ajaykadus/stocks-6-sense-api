import stocks6SenseDb from "../Connectors/FireBase";
import Stock from "../Models/Stock"
import PgDb from "../Connectors/PostGreSql"

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
      // Using postgresql

      const stocks = await PgDb.query(`
      select company as "company", 
      tickersymbol as "tickerSymbol",
      lastPrice as "lastPrice",
      predictedPrice as "predictedPrice" from stocks
      `)
      return stocks

      //Using MongoDb

      // const stocks = await Stock.find({})
      // return stocks

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

      // Using PostGreSql

      const newStock = PgDb.query(`
      Insert into stocks(company, tickerSymbol, 
        lastPrice, predictedPrice) values($1, $2, $3, $4)`,
        [stockData.company, stockData.tickerSymbol,
        stockData.lastPrice, stockData.predictedPrice])

      return newStock

      //Using MongoDb

      // const newStock = Stock.create(stockData)
      // return newStock

      // Using firebase database

      // const stocksRef = stocks6SenseDb.collection('stocks')
      // const data = await stocksRef.doc(id).set(stockData);
      // return data
    }
  }
}