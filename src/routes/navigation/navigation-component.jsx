import { Link, Outlet, } from "react-router-dom";
import './navigation.styles.scss'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase-utils";

const Navigation = () => {
    const { currentUser,setCurrentUser } = useContext(UserContext);
    const signOutHandler = async () => {
        await signOutUser();
        setCurrentUser(null);
      };
    console.log(currentUser);
    return (
        <>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <div>
                        <CrwnLogo className="logo" />
                    </div>
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>
                        SHOP
                    </Link>
                    {currentUser ? (
                        <span className='nav-link' onClick={signOutHandler}>
                            {' '}
                            SIGN OUT{' '}
                        </span>
                    ) : (
                        <Link className='nav-link' to='/auth'>
                            SIGN IN
                        </Link>
                    )}
                </div>
            </div>
            <Outlet />
        </>
    );
}
export default Navigation;