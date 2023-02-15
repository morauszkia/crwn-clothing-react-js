import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAZvpGkzfaCqQplePztbhjMMqeS__UzQxo',
  authDomain: 'react-course-55399.firebaseapp.com',
  databaseURL:
    'https://react-course-55399-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'react-course-55399',
  storageBucket: 'react-course-55399.appspot.com',
  messagingSenderId: '924671421346',
  appId: '1:924671421346:web:3ea73e1b9b87f14c08a0fb',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signinWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log('error creating the user', error);
    }
  }

  return userDocRef;
};
