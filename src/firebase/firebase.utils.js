import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyB3BPCz6wUcazsJT_xd7jFt--vjFvs2KYW",
    authDomain: "crwn-db-8fdc2.firebaseapp.com",
    databaseURL: "https://crwn-db-8fdc2.firebaseio.com",
    projectId: "crwn-db-8fdc2",
    storageBucket: "crwn-db-8fdc2.appspot.com",
    messagingSenderId: "89744956463",
    appId: "1:89744956463:web:f75494a3452a203a80bada",
    measurementId: "G-6EBMXDDQCF"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData        
            })
        } catch(error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
} 

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;