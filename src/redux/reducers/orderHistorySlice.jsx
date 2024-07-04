import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderHistory: [],
    currentPage: 1,
};

const orderHistorySlice = createSlice({
    name: "orderHistory",
    initialState,
    reducers: {
        setOrderHistory(state, action) {
            state.orderHistory = action.payload || [];
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
    },
});

export const { setOrderHistory, setCurrentPage } = orderHistorySlice.actions;
export default orderHistorySlice.reducer;
