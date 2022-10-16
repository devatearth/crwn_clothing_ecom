import { signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect, auth } from "../../utils/firebase/firebase-utils";
import SignUpForm from "../../component/sign-up-form/sign-up-component";
import SignInForm from "../../component/sign-in-form/sign-in-component";
import './authentication-style.scss';

const logGoogleUserOnPopUp = async () => {
    const { user } = await signInWithGooglePopup();
    createUserDocumentFromAuth(user);
}

const Authentication = () => {

    // useEffect(() => {
    //     getRedirectResult(auth).then((res) => {
    //         createUserDocumentFromAuth(res?.user);
    //     }
    //     )
    // }, []);

    return (
        <div className="authentication-container">
            {/* <button onClick={logGoogleUserOnPopUp}>Sign In with Google PopUp </button> */}
            {/* <button onClick={signInWithGoogleRedirect}>Sign In with Google Re-Direct</button> */}
            <SignInForm/>
            <SignUpForm/>
        </div>
    );

}
export default Authentication;