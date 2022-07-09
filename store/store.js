import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "@/store/slices";
import {ordersApi} from "@/store/api/ordersApi";

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(ordersApi.middleware),
})