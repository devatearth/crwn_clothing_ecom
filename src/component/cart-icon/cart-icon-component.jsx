import { useContext } from 'react';
import { CartContext } from '../../contexts/cart-context';
import { CartIconContainer , ItemCount , ShoppingIcon} from './cart-icon.styles';

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen ,cartCount} = useContext(CartContext);
    const toogleIsOpen = () => {
        setIsCartOpen(!isCartOpen);
    }

    return (
        <CartIconContainer onClick={toogleIsOpen}>
            <ShoppingIcon />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;