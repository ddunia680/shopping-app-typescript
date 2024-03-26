import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface authTypes {
    _id: string,
    username: string,
    email: string,
}

const initialState: authTypes = {
    _id: '',
    username: '',
    email: '',
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState: initialState,
    reducers: {

    }
});

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.auth;

export default authSlice.reducer;