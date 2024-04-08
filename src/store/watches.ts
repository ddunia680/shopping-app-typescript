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
}

const initialState: watchesStates = {
    watches: [],
    loading: false,
}

const watchesSlice = createSlice({
    name: 'Watches Operations',
    initialState: initialState,
    reducers: {
        ADDAWATCH: (state, action: PayloadAction<watchType>) => {
            state.watches.push(action.payload as watchType);
        },

        PULLWATCHES: (state, action: PayloadAction<watchType[]>) => {
            state.loading = false;
            state.watches = [...action.payload];
        },
        STARTPULLING: (state) => {
            state.loading = true;
        }
    }
});

export const { ADDAWATCH, PULLWATCHES, STARTPULLING } = watchesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.watches;

export default watchesSlice.reducer;