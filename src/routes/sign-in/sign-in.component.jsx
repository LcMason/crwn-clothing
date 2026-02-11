import { 
    signInWithGooglePopup, 
    createUserDocumentFromAuth 
} from '../../utils/firebase/firebase.utils'

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {
    const logGoolgeUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user)
    }

    // const logGoolgeRedirectUser = async () => {
    //     // const { user } = await signInWithGoogleRedirect();
    //    await signInWithGoogleRedirect();
    //     // console.log({user})
    // }
    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoolgeUser}>Sign in with Google Popup</button>
            <SignUpForm />
        </div>
    )
}

export default SignIn;