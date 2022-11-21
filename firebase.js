// Import the functions you need from the SDKs you need
import * as firebase from "firebase";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAv1shdc5nA5GFvEao5z-wqSFjkQVo9WmE",
  authDomain: "productspot-de321.firebaseapp.com",
  projectId: "productspot-de321",
  storageBucket: "productspot-de321.appspot.com",
  messagingSenderId: "493116623739",
  appId: "1:493116623739:web:b60482f8ed618bc3f14bde",
  measurementId: "G-WW11NXHHTR"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app()
}
const auth = firebase.auth()

export { auth, firebase};
