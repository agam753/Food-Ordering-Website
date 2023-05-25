import { useReducer } from "react";

import CartContext from "./cart-context";

// provider => where the states are managed

const initialCart = {
    items: [],
    totalAmount: 0
}
const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updatedAmount = state.totalAmount + action.item.amount * action.item.price;

        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);

        const existingCartItem = state.items[existingCartItemIndex];

        // console.log(existingCartItem);

        let updatedItems;
        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }

            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        else {
            updatedItems = [...state.items, action.item];
        }

        return {
            items: updatedItems,
            totalAmount: updatedAmount
        }
    }
    if (action.type === 'REMOVE') {
        const cartItemIndex = state.items.findIndex(item => item.id === action.id);

        const cartItem = state.items[cartItemIndex];
        // console.log(cartItem);

        const updatedAmount = state.totalAmount - cartItem.price;

        let updatedItems;
        if (cartItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        }
        else {
            const updatedItem = {
                ...cartItem, 
                amount: cartItem.amount -1
            }
            updatedItems = [...state.items];
            updatedItems[cartItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedAmount
        }
    }

    if(action.type === 'CLEAR'){
        return initialCart;
    }

    return initialCart;
}
const CartContextProvider = props => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, initialCart);

    const addItemToCart = item => {
        dispatchCartAction({
            type: 'ADD',
            item: item
        })
    };

    const removeItemFromCart = id => {
        dispatchCartAction({
            type: 'REMOVE',
            id: id
        })
    };

    const clearCartHandler = () => {
        dispatchCartAction({type: 'CLEAR'});
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCart,
        removeItem: removeItemFromCart,
        clearCart: clearCartHandler
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};


export default CartContextProvider;