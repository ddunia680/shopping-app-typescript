import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from "./store";

type NotificationType = {
    message: string,
    isError?: boolean,
}

interface notificationStates {
    notify: boolean,
    notificationText: string,
    isError: boolean,
}

const initialState: notificationStates = {
    notify: false,
    notificationText: '',
    isError: false,
}

const errorUISlice = createSlice({
    name: 'error UI control',
    initialState: initialState,
    reducers: {
        NOTIFY: (state, action: PayloadAction<NotificationType>) => {
            state.notify = true;
            state.notificationText = action.payload.message;
            if(action.payload.isError) {
                state.isError = true;
            }
        },

        END_NOTIFICATION: (state) => {
            state.notify = false;
            state.notificationText = '';
            if(state.isError) state.isError = false;
        }
    }
});

export const { NOTIFY, END_NOTIFICATION } = errorUISlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.errorUI;

export default errorUISlice.reducer;