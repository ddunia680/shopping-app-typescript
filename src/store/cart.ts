import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from "./store";

interface cartStates {
    cartItems: {id: number, image: string, name: string, count: number, price: number}[],
    totalAmount: number,
    nbrOfItems: number
}

const initialState: cartStates = {
    cartItems: [],
    totalAmount: 0,
    nbrOfItems: 0
}

const cartOps = createSlice({
    name: 'Cart Operations',
    initialState: initialState,
    reducers: {
        ADDITEMTOCART: (state, action: PayloadAction<{ id: number, name: string, image: string, price: number }>) => {
            const theIndex = state.cartItems.findIndex(el => el.id === action.payload.id);
            if(theIndex < 0) {
                const item = { 
                    id: action.payload.id, 
                    name: action.payload.name, 
                    image: action.payload.image,
                    count: 1,
                    price: action.payload.price
                };
                state.cartItems.push(item);
    
                state.totalAmount = state.totalAmount + action.payload.price;
                state.nbrOfItems = state.nbrOfItems += 1;
            }
        },
        INCREMENTITEM: (state, action: PayloadAction<number>) => {
            const index = state.cartItems.findIndex(el => el.id === action.payload);
            state.cartItems[index].count += 1;
            
            state.totalAmount += state.cartItems[index].price;
            state.nbrOfItems += 1; 
        },
        DECREMENTITEM: (state, action: PayloadAction<number>) => {
            const index = state.cartItems.findIndex(el => el.id === action.payload);
            if(state.cartItems[index].count > 0) {
                state.cartItems[index].count -= 1;

                state.totalAmount = state.totalAmount - state.cartItems[index].price;
                state.nbrOfItems -= 1;
            }
        },
        CLEARCART: (state) => {
            state.cartItems = [];
            state.totalAmount = 0;
            state.nbrOfItems = 0;
        }
    }
});

export const { ADDITEMTOCART, INCREMENTITEM, DECREMENTITEM, CLEARCART } = cartOps.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.cartOps;

export default cartOps.reducer;