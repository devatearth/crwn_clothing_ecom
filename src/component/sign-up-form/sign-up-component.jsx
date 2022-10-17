import { useState } from "react";
import { createUserAuthFromEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase-utils";
import FromInput from "../form-Input/form-input-component";
import Button from "../button/button-component";
import './sign-up-style.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};


const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    const handleChange = (event) => {
        const { name, value } = event.target;
        return (
            setFormFields({ ...formFields, [name]: value })
        );
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("password didn't match");
            return;
        }
        try {
            const { user } = await createUserAuthFromEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });
            setFormFields(defaultFormFields);
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                console.log('Account exists');
            }
            console.log('User creation error ', error);
        }
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have a account ? </h2>
            <span>Sign-Up with email and password</span>
            <form onSubmit={handleSubmit}>
                <FromInput
                    label={'Display Name'}
                    type="text"
                    name="displayName"
                    value={displayName}
                    onChange={handleChange}
                />
                <FromInput
                    label={'Email'}
                    type="text"
                    name="email"
                    value={email}
                    onChange={handleChange}
                />
                <FromInput
                    label={'Password'}
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                />
                <FromInput
                    label={'Confirm Password'}
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                />
                <Button type="submit" buttonType="inverted"> Sign-Up </Button>
            </form>
        </div>
    );
}
export default SignUpForm;