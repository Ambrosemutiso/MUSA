  // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8CMNnXt4Y6Q3kpp_LAq_RRaz6YpUUsU0",
  authDomain: "musavs-97db1.firebaseapp.com",
  databaseURL: "https://musavs-97db1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "musavs-97db1",
  storageBucket: "musavs-97db1.appspot.com",
  messagingSenderId: "355350424914",
  appId: "1:355350424914:web:9a6f5c62b536377aa39e8b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export {app};