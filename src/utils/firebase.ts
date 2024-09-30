import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDP79wwrYH4NIVyuiObuN1rqQEcIV7znG0",
  authDomain: "that-video-streaming-app.firebaseapp.com",
  projectId: "that-video-streaming-app",
  storageBucket: "that-video-streaming-app.appspot.com",
  messagingSenderId: "353060374025",
  appId: "1:353060374025:web:68c8e7a07d79a80f171ad8",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
