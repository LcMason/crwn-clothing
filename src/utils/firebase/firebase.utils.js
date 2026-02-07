import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider 
} from 'firebase/auth';
import { 
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyCQJ8wCKlNrIvQSPKHY-rTM3julyXAYwLM",
  authDomain: "crwn-clothing-db-41b4e.firebaseapp.com",
  projectId: "crwn-clothing-db-41b4e",
  storageBucket: "crwn-clothing-db-41b4e.firebasestorage.app",
  messagingSenderId: "348291742928",
  appId: "1:348291742928:web:5bd88fe7ca5066754f72d5",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());


    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }
    return userDocRef;
};