import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from "./store";

export type watchType = {
    _id: string,
    imageURL: string,
    name: string,
    price: number,
    previousPrice: number,
    description: string,  
}
interface watchesStates {
    watches: watchType[],
    loading: boolean,
    NbrOfPages: number,
    pageNumber: number
}

const initialState: watchesStates = {
    watches: [],
    loading: false,
    NbrOfPages: 1,
    pageNumber: 1
}

const watchesSlice = createSlice({
    name: 'Watches Operations',
    initialState: initialState,
    reducers: {
        ADDAWATCH: (state, action: PayloadAction<watchType>) => {
            state.watches.push(action.payload as watchType);
        },

        PULLWATCHES: (state, action: PayloadAction<{ watches: watchType[], nbrOfPages: number}>) => {
            state.loading = false;
            state.watches = [...action.payload.watches];
            state.NbrOfPages = action.payload.nbrOfPages;
        },
        STARTPULLING: (state) => {
            state.watches = [];
            state.loading = true;
        },
        SETPAGENUMBER: (state, action: PayloadAction<number>) => {
            state.pageNumber = action.payload
        },
        SETNEWPAGE: (state, action: PayloadAction<{watches: watchType[], nbrOfPages: number}>) => {
            state.watches = [...action.payload.watches];
            state.NbrOfPages = action.payload.nbrOfPages;
        }
    }
});

export const { ADDAWATCH, PULLWATCHES, STARTPULLING, SETPAGENUMBER, SETNEWPAGE } = watchesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.watches;

export default watchesSlice.reducer;