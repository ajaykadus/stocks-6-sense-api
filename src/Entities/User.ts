const usersList:Number[] = [1,2,3]

export const typeDef = `
  type User {
    id: Int!
    firstName: String
    lastName: String
  }
  extend type Query {
    users: [User]
  }
  extend type Mutation {
    addUser(userId: Int): User
  }
`

export const resolvers = {
  Query: {
    users: () => { return usersList}
  },
  Mutation: {
    addUser: (userId: Number) => {
      usersList.push(userId)
    }
  }
}