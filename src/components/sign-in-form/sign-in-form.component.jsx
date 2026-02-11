import { useState } from 'react';
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.components';

import { 
        createUserDocumentFromAuth,
        signInWithGooglePopup,
        signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils'

import './sign-in-form.styles.scss'


const defaultFormFields = {
    email: '',
    password: ''
}


const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {  email, password  } = formFields;

    // console.log(formFields);

    const resetFromFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user)
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
            resetFromFields();
        } catch(error) {
            console.log('AUTH ERROR', error.code, error.message)

            switch(error.code) {
                case 'auth/wrong-password':
                case 'auth/invalid-credential':
                    alert('Incorrect email or password.');
                    break;
                case 'auth/user-not-found':
                    alert('No user associated with email');
                    break;
                default:
                    console.log(error);
            }
            
        }
    };

    const handleChange = (e) => {
        // e.preventDefault();
        const {name, value} = e.target;

        setFormFields({...formFields, [name]: value})
    }
    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password.</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Email' 
                    type='email' 
                    required 
                    onChange={handleChange} 
                    name='email' 
                    value={email} 
                />
                <FormInput
                    label='Password' 
                    type='password' 
                    required 
                    onChange={handleChange} 
                    name='password' 
                    value={password} 
                />
                <div className='buttons-container'>
                <Button type='submit'>Sign In</Button>
                <Button type='button' buttonType='google' onClick={signInWithGoogle}>
                    Google Sign In
                </Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;