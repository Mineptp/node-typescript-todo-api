import admin from "firebase-admin";
import { createRequire } from "module"; 

const require = createRequire(import.meta.url);
const serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const db = admin.firestore();

export { db };
