import stocks6SenseDb from "../Connectors/FireBase"
import User from "../Models/User"

const usersList: Number[] = [1, 2, 3]

export const typeDef = `
  input UserInput {
    firstName: String
    lastName: String
  }
  type User {
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
      const users = await User.find({})
      return users

      // Using firebase database

      // let usersList: FirebaseFirestore.DocumentData[] = []
      // const userRef = stocks6SenseDb.collection('users')
      // const users = await userRef.get()
      // users.forEach(u => usersList.push(u.data()))
      // return usersList
    }
  },
  Mutation: {
    addUser: async (parent: any, { input }: any) => {
      const userData = {
        firstName: input.firstName,
        lastName: input.lastName
      }
      const newUser = await User.create(userData)
      return newUser

      // Using firebase database

      // const usersRef = stocks6SenseDb.collection('users')
      // await usersRef.doc(id).set(userData)
    }
  }
}