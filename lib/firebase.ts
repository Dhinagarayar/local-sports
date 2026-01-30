import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUY-WIZyeN18mGFZbUOmaXGwnK3-6hVUY",
  authDomain: "local-sports-54a92.firebaseapp.com",
  projectId: "local-sports-54a92",
  storageBucket: "local-sports-54a92.firebasestorage.app",
  messagingSenderId: "636626974698",
  appId: "1:636626974698:web:e0d0f61aab4519bc2c6493"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
