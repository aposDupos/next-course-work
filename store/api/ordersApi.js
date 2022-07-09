import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://aposdupos.pythonanywhere.com/api',
    }),
    tagTypes: ['Orders'],
    endpoints: (build) => ({
        getOrders: build.query({
            query: (params) => ({
                url: '/order',
                params: {
                    limit: params?.limit || 5,
                    offset: ((params?.page || 1) - 1) * (params?.limit || 5),
                    status: params.status || ''
                }
            }),
            providesTags: ['Orders']
        }),
        getCurrOrder: build.query({
            query: ({id}) => ({
                url: `/order/${id}`
            })
        }),
        createOrder: build.mutation({
            query: (order) => ({
                url: '/order/',
                method: "POST",
                body: order,
                headers: {
                    'Content-Type': 'application/json',
                }
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try {
                    const response = await queryFulfilled
                    console.log(response)
                } catch (e) {
                    console.log(e)
                }
            },
            invalidatesTags: ['Orders']
        }),
        getProducts: build.query({
            query: (arg) => ({
                url: '/product'
            })
        })
    })
})

export const {useGetOrdersQuery, useGetCurrOrderQuery, useCreateOrderMutation, useGetProductsQuery} = ordersApi