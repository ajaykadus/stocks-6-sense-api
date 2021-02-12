import admin from "firebase-admin"
import serviceAccount from "../_private/_resources/stocks-6-sense-firebase-adminsdk-310s8-08fbd93901.json"

admin.initializeApp({
    credential: admin.credential.cert(JSON.stringify(serviceAccount)),
});

const stocks6SenseDb = admin.firestore();

export default stocks6SenseDb