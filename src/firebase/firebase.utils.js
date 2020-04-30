import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDaqwJ7O0S5jAtW78SqgjA5qBfyRJQSamM",
  authDomain: "practice-db-27523.firebaseapp.com",
  databaseURL: "https://practice-db-27523.firebaseio.com",
  projectId: "practice-db-27523",
  storageBucket: "practice-db-27523.appspot.com",
  messagingSenderId: "220337640671",
  appId: "1:220337640671:web:d6f92b64fdf491dddb856a",
  measurementId: "G-R4TNTWGFD6"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`user/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
