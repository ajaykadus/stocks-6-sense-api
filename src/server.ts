import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import schema from "./Schema";

const initializeServer = () => {
    const app = express();

    const server = new ApolloServer({
        schema,
        playground: true,
    });

    app.use("*", cors());

    server.applyMiddleware({ app, path: "/graphql" });

    return app
}

if (process.env.NODE_ENV === "dev") {
    initializeServer()
}

export default initializeServer