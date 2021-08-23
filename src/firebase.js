import firebase from "firebase"
import "firebase/firestore"
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCu-8tl-G3HcwUBbwlH0vLxmv2VRNtvxFA",
  authDomain: "otenki-app.firebaseapp.com",
  projectId: "otenki-app",
  storageBucket: "otenki-app.appspot.com",
  messagingSenderId: "982741373754",
  appId: "1:982741373754:web:bd0238f136025c68eff603",
}

firebase.initializeApp(firebaseConfig)
