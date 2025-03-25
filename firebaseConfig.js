import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBxofBgyNrvkWEwGj4oa9h3WUxO9um9kOc",
  authDomain: "todoapp25-d203d.firebaseapp.com",
  projectId: "todoapp25-d203d",
  storageBucket: "todoapp25-d203d.firebasestorage.app",
  messagingSenderId: "1069279107123",
  appId: "1:1069279107123:web:e64f97bb75b0c44789eb46",
  measurementId: "G-04425JZNCW"
};

export const app = initializeApp(firebaseConfig);