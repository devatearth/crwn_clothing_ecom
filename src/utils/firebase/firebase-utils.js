// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider , createUserWithEmailAndPassword ,signInWithEmailAndPassword} from 'firebase/auth'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDOZQC524DeRn_F_ziaVOqE6EjPHWQYBZ4",
    authDomain: "crwn-clothing-db-96d53.firebaseapp.com",
    projectId: "crwn-clothing-db-96d53",
    storageBucket: "crwn-clothing-db-96d53.appspot.com",
    messagingSenderId: "956571269167",
    appId: "1:956571269167:web:e829eb9ea7566590a0eeda"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();

export const signInWithGooglePopup = async () => {
    return (await signInWithPopup(auth, googleProvider));
};

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

  export const signInAuthUserWithEmailAndPassword =async(email,password)=>{
    await signInWithEmailAndPassword(auth,email,password);
  }

export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth,additionalInfo)=>{
    const userDocRef = doc(db,'users',userAuth.uid);
    console.log({userDocRef});
    const userSnapshot = await getDoc(userDocRef);
    console.log({userSnapshot});
    if(!userSnapshot.exists()){
        const {displayName,email} = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt,
                ...additionalInfo,
            })
        } catch (error) {
            console.log('error creating the user ', error.message);
        }
    }
}

export const createUserAuthFromEmailAndPassword = async(email,password)=>{
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth,email,password);
}