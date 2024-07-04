import { createSlice } from "@reduxjs/toolkit";
import {
    CART,
    getDataJsonStorage,
    setDataJsonStorage,
    removeDataJsonStorage,
} from "../../util/utilMethod";

const initCart = () => {
    const cart = getDataJsonStorage(CART);
    if (cart && cart.length != 0) return cart;
    else return [];
};

const initialState = {
    items: initCart(),
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newProd = { ...action.payload, quantity: 1, selected: false };
            const itemIndex = state.items.findIndex((item) => item.id === newProd.id);
            if (itemIndex !== -1) {
                state.items[itemIndex].quantity += 1;
            } else {
                state.items.push(newProd);
                setDataJsonStorage(CART, state.items);
            }
        },
        updateQuantity: (state, action) => {
            const { index, value } = action.payload;
            if (state.items[index]) {
                state.items[index].quantity += value;
                if (state.items[index].quantity < 1) {
                    state.items[index].quantity = 1;
                }
                setDataJsonStorage(CART, state.items);
            }
        },
        updateItem: (state, action) => {
            const { index, updatedItem } = action.payload;
            if (state.items[index]) {
                state.items[index] = { ...state.items[index], ...updatedItem };
                setDataJsonStorage(CART, state.items);
            }
        },
        deleteItem: (state, action) => {
            state.items.splice(action.payload, 1);
            if (state.items.length == 0) {
                removeDataJsonStorage(CART);
            } else {
                setDataJsonStorage(CART, state.items);
            }
        },
        updateSelectedAll: (state, action) => {
            const selected = action.payload;
            state.items.forEach((item) => {
                item.selected = selected;
            });
            setDataJsonStorage(CART, state.items);
        },
    },
});

export const {
    addToCart,
    updateQuantity,
    updateItem,
    deleteItem,
    updateSelectedAll,
} = cartSlice.actions;

export default cartSlice.reducer;
