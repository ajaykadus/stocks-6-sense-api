import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import schema from "./Schema";
import initMondoDb from "./Connectors/MongoDb";

const app = express()
const server = new ApolloServer({
    schema,
    playground: true,
});

// initialize mongo database
if (process.env.MONGO_DB_ENALBED)  {
    initMondoDb()
}

app.use("*", cors())
server.applyMiddleware({ app, path: "/graphql" })

app.listen({ port: 8000 }, () => {
    console.log("Apollo Server on http://localhost:8000/graphql")
})