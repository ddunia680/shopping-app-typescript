import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from "./store";

interface remoteWishList {
    for: string,
    wishItems: { description: string, imageURL: string, name: string, previousPrice: number, price: number, _id: string }[],
    _id: string
}

interface wishListStates {
    wishListItems: {id: string, image: string, name: string, count: number, price: number, previousPrice: number}[],
    nbrOfItems: number,
    showWishList: boolean,
}

const initialState: wishListStates = {
    wishListItems: [],
    nbrOfItems: 0,
    showWishList: false,
}

const wishList = createSlice({
    name: 'wishList Box',
    initialState: initialState,
    reducers: {
        SHOW_WISHLIST: (state) => {
            state.showWishList = true;
        },
        HIDE_WISHLIST: (state) => {
            state.showWishList = false;
        },
        SETWISHLIST: (state, action: PayloadAction<remoteWishList>) => {
            action.payload.wishItems.forEach(itm => {
                state.wishListItems.push({ id: itm._id, image: itm.imageURL, name: itm.name, count: 0, price: itm.price, 
                    previousPrice: itm.previousPrice });
            })
            state.nbrOfItems = action.payload.wishItems.length;
        },
        ADDTOWISHLIST: (state, action: PayloadAction<{id: string, name: string, image: string, price: number, previousPrice: number}>) => {
            const theindex = state.wishListItems.findIndex(el => el.id === action.payload.id);
            if(theindex < 0) {
                const item = { 
                    id: action.payload.id, 
                    name: action.payload.name, 
                    image: action.payload.image,
                    count: 1,
                    price: action.payload.price,
                    previousPrice: action.payload.previousPrice
                };
                state.wishListItems.push(item);
                state.nbrOfItems += 1;
            }  
        },
        DELETEITEMFROMWISHLIST: (state, action: PayloadAction<string>) => {
            const theIndex = state.wishListItems.findIndex(el => el.id === action.payload);
            if(theIndex >= 0) {
                state.wishListItems = state.wishListItems.filter(el => el.id !== action.payload);
                state.nbrOfItems -= 1;
            }
            
        },
        CLEANWISHLIST: (state) => {
            state.wishListItems = [];
            state.nbrOfItems = 0;
        }
    }
});

export const { SETWISHLIST, ADDTOWISHLIST, DELETEITEMFROMWISHLIST, CLEANWISHLIST, SHOW_WISHLIST, HIDE_WISHLIST } = wishList.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.wishList;

export default wishList.reducer;