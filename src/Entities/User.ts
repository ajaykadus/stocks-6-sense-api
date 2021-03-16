import stocks6SenseDb from "../Connectors/FireBase"
import User from "../Models/User"
import PgDb from "../Connectors/PostGreSql"
import PostGreSql from "../Connectors/PostGreSql"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Secrets from "../_private/_resources/secrets"

const usersList: Number[] = [1, 2, 3]

export const typeDef = `
  input UserInput {
    firstName: String
    lastName: String
    email: String
    password: String
  }
  type User {
    firstName: String
    lastName: String
    email: String
    password: String
  }
  type AuthPayload {
    token: String!
    user: User!
  }
  extend type Query {
    users: [User]
  }
  extend type Mutation {
    addUser(input: UserInput): User
    login(email: String!, password: String!): AuthPayload
  }
`

export const resolvers = {
  Query: {
    users: async () => {
      // Using postgresql

      const users = await PgDb.query('select firstname as "firstName", lastName as "lastName", email from users')
      return users

      //Using MongoDb

      // const users = await User.find({})
      // return users

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
        lastName: input.lastName,
        email: input.email,
        password: input.password
      }
      const password = await bcrypt.hash(userData.password, 10);

      // Using PostGreSql

      const newUser = await PgDb.query('Insert into users(firstName, lastName, email, password) values($1, $2, $3, $4)',
        [userData.firstName, userData.lastName, userData.email, password])

      return newUser


      // Using MongoDb

      // const newUser = await User.create(userData)
      // return newUser

      // Using firebase database

      // const usersRef = stocks6SenseDb.collection('users')
      // await usersRef.doc(id).set(userData)
    },
    login: async (parent: any, { email, password }: any) => {
      // Using PostGreSql
      const user = await PgDb.query(`select * from users where email='${email}'`)

      if (!user) {
        throw new Error("No such user found");
      }
      console.log(user, password, 'check this')
      const valid = await bcrypt.compare(password, user[0].password);
      if (!valid) {
        throw new Error("Invalid password");
      }

      const token = jwt.sign({ userId: user.id }, Secrets.APP_SECRET);

      return {
        token,
        user
      };
    }
  }
}