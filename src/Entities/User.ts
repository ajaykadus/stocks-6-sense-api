import stocks6SenseDb from "../Connectors/FireBase"

const usersList: Number[] = [1, 2, 3]

export const typeDef = `
  input UserInput {
    firstName: String
    lastName: String
  }
  type User {
    id: Int!
    firstName: String
    lastName: String
  }
  extend type Query {
    users: [User]
  }
  extend type Mutation {
    addUser(input: UserInput): User
  }
`

export const resolvers = {
  Query: {
    users: async () => {
      let usersList: FirebaseFirestore.DocumentData[] = []
      const userRef = stocks6SenseDb.collection('users')
      const users = await userRef.get()
      users.forEach(u => usersList.push(u.data()))
      return usersList
    }
  },
  Mutation: {
    addUser: async (parent: any, { input }: any) => {
      const id = require('crypto').randomBytes(10).toString('hex')
      const userData = {
        firstName: input.firstName,
        lastName: input.lastName
      }
      const usersRef = stocks6SenseDb.collection('users')
      await usersRef.doc(id).set(userData)
    }
  }
}