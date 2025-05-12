import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:"AIzaSyAy0p11-VlZaEHIrOkC0zLzGgMh1E701iM",
  authDomain: "test-a68a9.firebaseapp.com",
  projectId: "test-a68a9",
  storageBucket: "test-a68a9.firebasestorage.app",
  messagingSenderId: "214723226933",
  appId: "1:214723226933:web:5d952d2fb9dd5535f8707c",
  measurementId: "G-14S6JQ1CK4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
export default app;
