import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {getAuth, onAuthStateChanged} from 'firebase/auth'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-K7wfNK0KBXYMqXI9JrnXCAVaB4IesYU",
  authDomain: "capstoneproject-db43d.firebaseapp.com",
  projectId: "capstoneproject-db43d",
  storageBucket: "capstoneproject-db43d.appspot.com",
  messagingSenderId: "404094452466",
  appId: "1:404094452466:web:10dea6a47c9b92d67f866b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
window.auth = auth
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
