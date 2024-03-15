import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from "./store";

interface wishListStates {
    wishListItems: {id: number, image: string, name: string, count: number, price: number}[],
    nbrOfItems: number,
}

const initialState: wishListStates = {
    wishListItems: [],
    nbrOfItems: 0
}

const wishList = createSlice({
    name: 'wishList Box',
    initialState: initialState,
    reducers: {
        ADDTOWISHLIST: (state, action: PayloadAction<{id: number, name: string, image: string, price: number}>) => {
            const theindex = state.wishListItems.findIndex(el => el.id === action.payload.id);
            if(theindex < 0) {
                const item = { 
                    id: action.payload.id, 
                    name: action.payload.name, 
                    image: action.payload.image,
                    count: 1,
                    price: action.payload.price
                };
                state.wishListItems.push(item);
                state.nbrOfItems += 1;
            }  
        },
        DELETEITEMFROMWISHLIST: (state, action: PayloadAction<number>) => {
            state.wishListItems.filter(el => el.id !== action.payload);
            state.nbrOfItems -= 1;
        },
        CLEANWISHLIST: (state) => {
            state.wishListItems = [];
            state.nbrOfItems = 0;
        }
    }
});

export const { ADDTOWISHLIST, DELETEITEMFROMWISHLIST, CLEANWISHLIST } = wishList.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.cartOps;

export default wishList.reducer;