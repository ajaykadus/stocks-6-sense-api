import { makeExecutableSchema } from 'apollo-server'
import { merge } from 'lodash'
import {
    typeDef as Stock,
    resolvers as stockResolvers,
} from '../Entities/Stock'
import {
    typeDef as User,
    resolvers as userResolvers,
} from '../Entities/User'

const Query = `
  type Query {
     _empty: String
  }
`
const Mutation = `
  type Mutation {
     _empty: String
  }
` 

const resolvers = {}

export default makeExecutableSchema({
    typeDefs: [Query, Mutation, Stock, User],
    resolvers: merge([resolvers, stockResolvers, userResolvers]),
});