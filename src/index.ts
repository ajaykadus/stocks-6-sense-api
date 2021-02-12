import * as functions from "firebase-functions";
import initializeServer from './server'

const apiServer = initializeServer()

const api = functions.https.onRequest(apiServer);

export default api
