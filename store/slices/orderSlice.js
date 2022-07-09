import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    products: []
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addProduct: (state, {payload}) => {
            if (!state.products.includes(payload)) {
                state.products = [...state.products, payload].sort((a, b) => a - b)
            }
        },
        removeProduct: (state, {payload}) => {
            state.products = state.products.filter(id => id !== payload)
        },
        clearProducts: (state) => {
            state.products = []
        }
    }
})

export const {addProduct, removeProduct, clearProducts} = orderSlice.actions
export default orderSlice.reducer