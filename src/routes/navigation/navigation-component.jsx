import { Link, Outlet, } from "react-router-dom";
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { signOutUser } from "../../utils/firebase/firebase-utils";
import CartIcon from "../../component/cart-icon/cart-icon-component";
import CartDropdown from "../../component/cart-dropdown/cart-dropdown.component";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user-selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

const Navigation = () => {

    const currentUser = useSelector(selectCurrentUser)

    const isCartOpen = useSelector(selectIsCartOpen);

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