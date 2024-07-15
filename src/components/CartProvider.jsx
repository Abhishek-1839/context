import React, { createContext, useReducer, useContext, useEffect } from 'react';
import data from "../data/product.json";


// Create contexts for cart and totals
const CartContext = createContext();
const TotalContext = createContext();

const initialProducts = data;

const cartReducer = (state, action) => {
    if (action.type === 'UPDATE_QUANTITY') {
        return state.map(product =>
            product.id === action.payload.id 
            ? { ...product, quantity: action.payload.quantity } 
            : product
        );
    }
    return state;
};

const totalReducer = (state, action) => {
    if (action.type === 'UPDATE_TOTALS') {
        const totalQuantity = action.payload.reduce((acc, product) => acc + (product.quantity || 0), 0);
        const totalAmount = action.payload.reduce((acc, product) => acc + (product.quantity || 0) * product.price, 0);
        return { totalQuantity, totalAmount };
    }
    return state;
};

const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, initialProducts.map(product => ({ ...product, quantity: 0 })));
    const [totals, totalDispatch] = useReducer(totalReducer, { totalQuantity: 0, totalAmount: 0 });

    useEffect(() => {
        totalDispatch({ type: 'UPDATE_TOTALS', payload: cart });
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            <TotalContext.Provider value={{ totals }}>
                {children}
            </TotalContext.Provider>
        </CartContext.Provider>
    );
};

export { CartContext, TotalContext, CartProvider };