import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const REACT_APP_FIREB_API_KEY = process.env.REACT_APP_FIREB_API_KEY;

const config = {
    apiKey: REACT_APP_FIREB_API_KEY,
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
    //const collectionRef = firestore.collection('users');

    const snapShot = await userRef.get();
    //const collectionSnapshot = await collectionRef.get();
    //console.log({ collection: collectionSnapshot.docs.map(doc => doc.data())});

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
};

// function to add collection documents on firebase
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        };
    });

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    } , {});
};

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject);
    })
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;