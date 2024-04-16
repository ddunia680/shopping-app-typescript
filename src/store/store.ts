import { configureStore } from "@reduxjs/toolkit";
import cart from "./cart";
import wishList from "./wishList";
import authSlice from "./auth";
import watcheSlice from "./watches";
import errorUI from "./errorUI";
import order from "./order";

const store = configureStore({
    reducer: {
        cartOps: cart,
        wishList: wishList, 
        auth: authSlice,
        watches: watcheSlice,
        errorUI: errorUI,
        order: order,
    }
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch