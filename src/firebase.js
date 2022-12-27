import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyA-EAQF1b0g8ZgRJbDHc5jVo8OWQ8iX_ho",
    authDomain: "mychat-e55c3.firebaseapp.com",
    projectId: "mychat-e55c3",
    storageBucket: "mychat-e55c3.appspot.com",
    messagingSenderId: "448117921226",
    appId: "1:448117921226:web:a9937d461c942c71c0ab33",
  })
  .auth();

export { auth };
