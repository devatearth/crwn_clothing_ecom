export enum CART_ACTION_TYPES {
    SET_IS_CART_OPEN = 'SET_IS_CART_OPEN',
    SET_CART_ITEMS = 'SET_CART_ITEMS',
    SET_CART_COUNT = 'SET_CART_COUNT',
    SET_CART_TOTAL = 'SET_CART_TOTAL',
};

export type CartItem = {
    id: number;
    imageUrl: string;
    name: string;
    price: number;
    quantity: number;
};