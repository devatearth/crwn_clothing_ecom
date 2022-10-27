import React from 'react';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart-context';
import { useNavigate } from 'react-router-dom';
import CartItem from '../cart-item/cart-item.component';
import Button from '../button/button-component';


import {CartDropdownContainer , EmptyMessage,CartItems} from './cart-dropdown.styles.jsx';

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const goToCheckoutPage= ()=>{
    navigate('/checkout');
  }

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button buttonType='inverted' onClick={goToCheckoutPage}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;