const stocksList: any[] = [{
  id: '12@#ef',
  tickerSymbol: 'aapl',
  company: 'Apple',
  lastPrice: 109,
  predictedPrice: 200
}]

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
    stocks: () => { return stocksList }
  },
  Mutation: {
    addStock: (parent: any, { input }: any) => {
      const id = require('crypto').randomBytes(10).toString('hex');
      const stockData = {
        id,
        tickerSymbol: input.tickerSymbol,
        company: input.company,
        lastPrice: 124,
        predictedPrice: 150
      }
      stocksList.push(stockData)
      return stockData
    }
  }
}