import { createSlice } from "@reduxjs/toolkit";
import {
    CART,
    USER_LOGIN,
    TOKEN_AUTHOR,
    isTokenExpired,
    getDataTextStorage,
    getDataJsonStorage,
    removeDataTextStorage,
    delCookie,
    removeDataJsonStorage,
} from "../../util/utilMethod";

let cart = getDataJsonStorage(CART);
const email = getDataJsonStorage(USER_LOGIN)?.email;
const loginStatus =
    USER_LOGIN && !isTokenExpired(getDataTextStorage(TOKEN_AUTHOR));

const initialState = {
    isLogin: loginStatus,
    userEmail: email ? email : "",
    cartCount: cart ? cart.length : 0,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLogin = true;
            state.userEmail = action.payload;
        },
        logout: (state) => {
            state.isLogin = false;
            state.userEmail = "";
            removeDataJsonStorage(USER_LOGIN);
            removeDataTextStorage(TOKEN_AUTHOR);
            delCookie(TOKEN_AUTHOR);
        },
        setCartCount: (state) => {
            cart = getDataJsonStorage(CART);
            state.cartCount = cart ? cart.length : 0;
        },
    },
});

export const { login, logout, setCartCount } = authSlice.actions;
export default authSlice.reducer;
