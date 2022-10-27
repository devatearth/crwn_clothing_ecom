import { Link, Outlet, } from "react-router-dom";
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase-utils";
import CartIcon from "../../component/cart-icon/cart-icon-component";
import CartDropdown from "../../component/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart-context";

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);
    const signOutHandler = async () => {
        await signOutUser();
    };
    console.log(currentUser);
    return (
        <>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <div>
                        <CrwnLogo className="logo" />
                    </div>
                </LogoContainer>
                <NavLinks>
                    <Link className="nav-link" to='/shop'>
                        SHOP
                    </Link>
                    {currentUser ? (
                        <NavLink onClick={signOutHandler}>
                            {' '}
                            SIGN OUT{' '}
                        </NavLink>
                    ) : (
                        <NavLink to='/auth'>
                            SIGN IN
                        </NavLink>
                    )}
                    <CartIcon />
                </NavLinks>
                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </>
    );
}
export default Navigation;