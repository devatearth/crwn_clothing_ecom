import { AnyAction } from "redux";
import { setCartItems, setIsCartopen } from "./cart.action";
import { CART_ACTION_TYPES } from "./cart.types";
import { CartItem } from "./cart.types";

export type CartState = {
    isCartOpen: boolean;
    cartItems: CartItem[];
};

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
};

export const cartReducer = (state = INITIAL_STATE, action = {} as AnyAction) => {
    if (setIsCartopen.match(action)) {
        return {
            ...state,
            isCartOpen: action.payload,
        };
    }

    if (setCartItems.match(action)) {
        return {
            ...state,
            cartItems: action.payload,
        };
    }

    return state;
};
