import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDl94jwPuKggqpnfZ2Fq5TducwV7gpSgCo",
    authDomain: "ninac-5c177.firebaseapp.com",
    databaseURL: "https://ninac-5c177.firebaseio.com",
    projectId: "ninac-5c177",
    storageBucket: "ninac-5c177.appspot.com",
    messagingSenderId: "847379304923",
    appId: "1:847379304923:web:6610f1cfa00f9c038917fe",
    measurementId: "G-V4BHQRKMBL"
  };
  const fire= firebase.initializeApp(firebaseConfig);
  export default fire;