import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartSlice";
import orderHistoryReducer from "./reducers/orderHistorySlice";
import authReducer from "./reducers/authSlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        orderHistory: orderHistoryReducer,
        auth: authReducer,
    },
});
