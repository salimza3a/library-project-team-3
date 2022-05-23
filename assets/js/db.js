const db = {
    apiKey: "AIzaSyA6VFU2bQeae5J8z-VDj6Yi2zKGa9T5hwc",
    authDomain: "team4-bookstore.firebaseapp.com",
    databaseURL: "https://team4-bookstore-default-rtdb.firebaseio.com",
    projectId: "team4-bookstore",
    storageBucket: "team4-bookstore.appspot.com",
    messagingSenderId: "856410807514",
    appId: "1:856410807514:web:eb80b1d21b926175b9d9e3"
};

firebase.initializeApp(db)

 let database = firebase.database();

//console.log(result);


// adminBranch.on('value', function(snapshot){let data = snapshot.val();console.log(data)})