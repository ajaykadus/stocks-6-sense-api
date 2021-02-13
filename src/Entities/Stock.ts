import stocks6SenseDb from "../Connectors/FireBase";

export const typeDef = `
  input StockInput {
    company: String
    tickerSymbol: String
  }
  type Stock {
    id: String!
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
      let stocksResults: FirebaseFirestore.DocumentData[] =[]
      const stocksRef = stocks6SenseDb.collection('stocks')
      const stocks = await stocksRef.get()
      stocks.forEach(s => stocksResults.push(s.data()))
      console.log(stocksResults,'sferff')
      return stocksResults
    }
  },
  Mutation: {
    addStock: async (parent: any, { input }: any) => {
      const id = require('crypto').randomBytes(10).toString('hex');
      const stockData = {
        tickerSymbol: input.tickerSymbol,
        company: input.company,
        lastPrice: 124,
        predictedPrice: 150
      }
      const stocksRef = stocks6SenseDb.collection('stocks')
      const data = await stocksRef.doc(id).set(stockData);
      return data
    }
  }
}