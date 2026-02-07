import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'



const SignIn = () => {
    const logGoolgeUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user)
    }
    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoolgeUser}>Sign in with Google Popup</button>
        </div>
    )
}

export default SignIn;