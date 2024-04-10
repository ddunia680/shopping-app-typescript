import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from "./store";

interface remoteCart {
    cartItems: { 
        _id: string, 
        count: number, 
        watch: { _id: string, imageURL: string, name: string, price: number, previousPrice: number, description: string }
    }[],
    for: string,
    totalAmount: number,
    _id: string
}

interface cartStates {
    cartItems: {id: string, image: string, name: string, count: number, price: number, previousPrice: number}[],
    totalAmount: number,
    nbrOfItems: number,
    showCart: boolean,
}

const initialState: cartStates = {
    cartItems: [],
    totalAmount: 0,
    nbrOfItems: 0,
    showCart: false,
}

const cartOps = createSlice({
    name: 'Cart Operations',
    initialState: initialState,
    reducers: {
        SHOW_CART: (state) => {
            state.showCart = true;
        },
        HIDE_CART: (state) => {
            state.showCart = false;
        },
        SETCART: (state, action: PayloadAction<remoteCart>) => {
            action.payload.cartItems.forEach(itm => {
                state.cartItems.push({ id: itm.watch._id, image: itm.watch.imageURL, name: itm.watch.name, 
                    count: itm.count, price: itm.watch.price, previousPrice: itm.watch.previousPrice});
                state.nbrOfItems += itm.count; 
            })
            state.totalAmount = action.payload.totalAmount;
        },
        ADDITEMTOCART: (state, action: PayloadAction<{ id: string, name: string, image: string, price: number, previousPrice: number }>) => {
            const theIndex = state.cartItems.findIndex(el => el.id === action.payload.id);
            if(theIndex < 0) {
                const item = { 
                    id: action.payload.id, 
                    name: action.payload.name, 
                    image: action.payload.image,
                    count: 1,
                    price: action.payload.price,
                    previousPrice: action.payload.previousPrice
                };
                state.cartItems.push(item);
    
                state.totalAmount = state.totalAmount + action.payload.price;
                state.nbrOfItems = state.nbrOfItems += 1;
            }
        },
        INCREMENTITEM: (state, action: PayloadAction<string>) => {
            const index = state.cartItems.findIndex(el => el.id === action.payload);
            state.cartItems[index].count += 1;
            
            state.totalAmount += state.cartItems[index].price;
            state.nbrOfItems += 1; 
        },
        DECREMENTITEM: (state, action: PayloadAction<string>) => {
            const index = state.cartItems.findIndex(el => el.id === action.payload);
            if(state.cartItems[index].count > 0) {
                state.cartItems[index].count -= 1;

                state.totalAmount = state.totalAmount - state.cartItems[index].price;
                state.nbrOfItems -= 1;
            }
        },
        REMOVEFROMCART: (state, action: PayloadAction<string>) => {
            const index = state.cartItems.findIndex(el => el.id === action.payload);
            const itemPrice = state.cartItems[index].price;
            state.cartItems = state.cartItems.filter(itm => itm.id !== action.payload);
            state.totalAmount -= itemPrice;
            state.nbrOfItems -= 1;

        },
        CLEARCART: (state) => {
            state.cartItems = [];
            state.totalAmount = 0;
            state.nbrOfItems = 0;
        }
    }
});

export const { SETCART, ADDITEMTOCART, INCREMENTITEM, DECREMENTITEM, CLEARCART, SHOW_CART, HIDE_CART, REMOVEFROMCART } = cartOps.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.cartOps;

export default cartOps.reducer;