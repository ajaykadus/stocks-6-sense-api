import admin from "firebase-admin"

const serviceAccount = require("../_private/_resources/stocks-6-sense-firebase-adminsdk-310s8-08fbd93901.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const stocks6SenseDb = admin.firestore();

export default stocks6SenseDb