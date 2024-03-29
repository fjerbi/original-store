import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';


const config={
    apiKey: "AIzaSyAwS-fS-vgDNIMWKYqNIigwEwtXbSN7dAU",
    authDomain: "andromeda-store.firebaseapp.com",
    databaseURL: "https://andromeda-store.firebaseio.com",
    projectId: "andromeda-store",
    storageBucket: "andromeda-store.appspot.com",
    messagingSenderId: "19535294008",
    appId: "1:19535294008:web:38db92e65da99cf6cf00cd",
    measurementId: "G-1PQLPYLB86"
  };



export const createUserProfileDocument = async(userAuth,additionalData ) =>{
  if(!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);

const snapShot = await userRef.get();

if(!snapShot.exists){
  const {displayName , email} = userAuth;
  const createdAt = new Date();
  try{
    await userRef.set({
      displayName,
      email,
      createdAt,
      ...additionalData
    });

  } catch(error){
console.log('error creating user', error.message);
  }

}

return userRef;


}

  firebase.initializeApp(config);

  export const auth = firebase.auth();

  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt :'select_account'});
  export const signInWithGoogle =() => auth.signInWithPopup(provider);

  export default firebase;