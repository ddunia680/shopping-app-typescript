import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface authTypes {
    token: string,
    _id: string,
    username: string,
    email: string,
    showAuth: boolean,
    authThroughCart: boolean,
}

type loginTypes = {
    token: string,
    _id: string,
    username: string,
    email: string,
}

const initialState: authTypes = {
    token: '',
    _id: '',
    username: '',
    email: '',
    showAuth: false,
    authThroughCart: false,
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState: initialState,
    reducers: {
        OPEN_AUTH_MODAL: (state) => {
            state.showAuth = true;
        },
        CLOSE_AUTH_MODAL: (state) => {
            state.showAuth = false;
        },
        OPEN_AUTH_THROUGH_CART: (state) => {
            state.authThroughCart = true;
        },
        LOGIN: (state, action: PayloadAction<loginTypes>) => {
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('id', action.payload._id);
            localStorage.setItem('username', action.payload.username);
            localStorage.setItem('email', action.payload.email);

            const remainingMilliseconds = 60 * 60 * 24000;
            const expiryDate = new Date(
                new Date().getTime() + remainingMilliseconds
            );
            localStorage.setItem('expiryDate', expiryDate.toISOString());

            state.token = action.payload.token;
            state._id = action.payload._id;
            state.username = action.payload.username;
            state.email = action.payload.email;
        },

        RELOGIN_ON_RELOAD: (state) => {
            state.token = localStorage.getItem('token')!;
            state._id = localStorage.getItem('id')!;
            state.username = localStorage.getItem('username')!;
            state.email = localStorage.getItem('email')!;
        },

        ISSUE_LOGOUT: (state) => {
            localStorage.removeItem('token');
            localStorage.removeItem('id');
            localStorage.removeItem('username');
            localStorage.removeItem('email');

            state._id = '';
            state.token = '';
            state.username = '';
            state.email = '';
        }

    }
});

export const { LOGIN, RELOGIN_ON_RELOAD, ISSUE_LOGOUT, OPEN_AUTH_MODAL, CLOSE_AUTH_MODAL, OPEN_AUTH_THROUGH_CART } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.auth;

export default authSlice.reducer;