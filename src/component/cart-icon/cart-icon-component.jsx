import { useContext } from 'react';
import { CartContext } from '../../contexts/cart-context';
import { CartIconContainer , ItemCount , ShoppingIcon} from './cart-icon.styles';

const CartIcon = () => {
    const { isCartOpen, setIsOpen ,cartCount} = useContext(CartContext);
    const toogleIsOpen = () => {
        setIsOpen(!isCartOpen);
    }

    return (
        <CartIconContainer onClick={toogleIsOpen}>
            <ShoppingIcon />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;