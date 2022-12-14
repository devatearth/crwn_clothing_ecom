// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
    NextOrObserver
}
    from 'firebase/auth'
import { getFirestore, doc, setDoc, getDoc, collection, writeBatch, query, getDocs, QueryDocumentSnapshot } from 'firebase/firestore'
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
export const firebaseApp = initializeApp(firebaseConfig);

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

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
}

export const db = getFirestore();

type ObjectToAdd = {
    title: string;
};

export const addColllectionAndDocument = async <T extends ObjectToAdd>(collectionKey: string, objectsToAdd: T[]) => {

    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);
    objectsToAdd.forEach((object) => {
        console.log({ collectionKey, object });
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });
    await batch.commit();
    console.log('done');
}
type CategoryItem = {
    id: number;
    imageUrl: string;
    name: string;
    price: number;
};

type CategoryData = {
    imageUrl: string;
    items: CategoryItem[];
    title: string;
};
export const getCategoriesAndDocuments = async (): Promise<CategoryData[]> => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    const querySnapShot = await getDocs(q);
    const categoryArray = querySnapShot.docs.map(
        (docSnapSot) => docSnapSot.data() as CategoryData);
    return categoryArray;
}
export type AdditionalInformation = {
    displayName?: string;
};
export type UserData = {
    createdAt: Date;
    displayName: string;
    email: string;
};
export const createUserDocumentFromAuth = async (
    userAuth: User,
    additionalInformation: AdditionalInformation = {} as AdditionalInformation
): Promise<QueryDocumentSnapshot<UserData> | void> => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log('error creating the user', error);
        }
    }

    return userSnapshot as QueryDocumentSnapshot<UserData>;
};


export const createUserAuthFromEmailAndPassword = async (email: string, password: string) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onUserAuthChangedLister = (callback: NextOrObserver<User>) => {
    return onAuthStateChanged(auth, callback)
};

export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            }, reject)
    })
}
