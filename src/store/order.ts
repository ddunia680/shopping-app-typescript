import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from "./store";

interface orderTypes {
    showOrder: boolean,
    orderId: string,
    customerName: string,
    items: {count: number, _id: string,  watch: { _id: string, description: string, imageURL: string, name: string, previousPrice: number, price: number }}[],
    totalAmount: number,

}

const initialState: orderTypes = {
    showOrder: false,
    orderId: '',
    customerName: '',
    items: [],
    totalAmount: 0,
}

const orderSlice = createSlice({
    name: 'order slice',
    initialState: initialState,
    reducers: {
        DISPLAY_ORDER: (state, action: PayloadAction<orderTypes>) => {
            state.showOrder = action.payload.showOrder;
            state.orderId = action.payload.orderId;
            state.customerName = action.payload.customerName;
            state.items = action.payload.items;
            state.totalAmount = action.payload.totalAmount;
        },

        CLOSE_ORDER: (state) => {
            state.showOrder = false;
            state.customerName = '';
            state.items = [];
            state.totalAmount = 0;
        }
    }
});

export const { DISPLAY_ORDER, CLOSE_ORDER } = orderSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.order;

export default orderSlice.reducer;