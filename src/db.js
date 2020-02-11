import firebase from 'firebase/app'
import 'firebase/firestore'
import apikey from './keys'

const firebaseConfig = {
    apiKey: apikey,
    authDomain: "vue-firebase-b930b.firebaseapp.com",
    databaseURL: "https://vue-firebase-b930b.firebaseio.com",
    projectId: "vue-firebase-b930b",
    storageBucket: "vue-firebase-b930b.appspot.com",
    messagingSenderId: "800627710575",
    appId: "1:800627710575:web:07c8ff0ae58fcae40a4b9a"
  };

// Get a Firestore instance
export const db = firebase
  .initializeApp(firebaseConfig)
  .firestore()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }

// if using Firebase JS SDK < 5.8.0
db.settings({ timestampsInSnapshots: true })