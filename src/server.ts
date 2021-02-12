import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import schema from "./Schema";
import { Express } from "apollo-server-express/node_modules/@types/express/node_modules/@types/express-serve-static-core";

const initializeServer = () => {
    const app = express()
    const server = new ApolloServer({
        schema,
        playground: true,
    });

    app.use("*", cors())
    server.applyMiddleware({ app, path: "/graphql" })

    return app
}

const startDevServer = (app: Express) => {
    app.listen({ port: 8000 }, () => {
        console.log("Apollo Server on http://localhost:8000/graphql")
    })
}

if (process.env.NODE_ENV === "dev") {
    const app = initializeServer()
    startDevServer(app)
}

export default initializeServer