import {combineReducers} from "@reduxjs/toolkit";
import {ordersApi} from "@/store/api/ordersApi";
import orderSlice from "@/store/slices/orderSlice";

const rootReducer = combineReducers({
    order: orderSlice,
    [ordersApi.reducerPath]: ordersApi.reducer
})

export default rootReducer