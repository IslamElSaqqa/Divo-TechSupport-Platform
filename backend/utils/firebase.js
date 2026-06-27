const admin = require("firebase-admin");
const serviceAccount = require("../config/firebaseServiceAccount.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
module.exports = db;
