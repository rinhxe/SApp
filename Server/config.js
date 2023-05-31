//firebase
const firebase = require('firebase');

//cấu hình firebase
const firebaseConfig = {
    apiKey: "AIzaSyCAWFyChKUr35-PSmeVgGMlHNn4MJXWpQs",
    authDomain: "apinodejs-324e3.firebaseapp.com",
    projectId: "apinodejs-324e3",
    storageBucket: "apinodejs-324e3.appspot.com",
    messagingSenderId: "716279569694",
    appId: "1:716279569694:web:3087750955b3436d133d0f",
    measurementId: "G-D33Q15DKD8"
};

//kết nối firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()
const User = db.collection('Users')
module.exports = User;
