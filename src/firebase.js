import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBqDMT9T26hJ9BuTY1pEZpu4xQxzyDYQLw",
  authDomain: "ninac-47063.firebaseapp.com",
  databaseURL: "https://ninac-47063.firebaseio.com",
  projectId: "ninac-47063",
  storageBucket: "ninac-47063.appspot.com",
  messagingSenderId: "910059756940",
  appId: "1:910059756940:web:4c6cd249c42df266440aa9",
  
};
const fire = firebase.initializeApp(firebaseConfig);
export default fire;
