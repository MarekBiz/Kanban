import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyDg4VtaTnIOwrp32dl7NzELWrjR8v4vjQ4",
  authDomain: "flowboard-aca54.firebaseapp.com",
  projectId: "flowboard-aca54",
  storageBucket: "flowboard-aca54.firebasestorage.app",
  messagingSenderId: "678618490373",
  appId: "1:678618490373:web:019632d3ce2e9832775e6c"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const fbFunctions = getFunctions(app);

if (process.env.NODE_ENV === "development") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
  connectFunctionsEmulator(fbFunctions, "localhost", 5001);
}