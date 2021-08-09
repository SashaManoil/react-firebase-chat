import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp({
    apiKey: "AIzaSyD4Wst-D7YGr0r1c-BpkP1o6q8lQvACNUE",
    authDomain: "webchat-77eb9.firebaseapp.com",
    databaseURL: "https://webchat-77eb9-default-rtdb.firebaseio.com",
    projectId: "webchat-77eb9",
    storageBucket: "webchat-77eb9.appspot.com",
    messagingSenderId: "854520550425",
    appId: "1:854520550425:web:0e54ccf0eb3b39509e0688",
});

export const auth = firebase.auth;
export const firestore = firebase.firestore;