import { apiSlice } from "../../app/api/apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCustomers: builder.mutation({
            query: (params) => ({
                url: '/admin/customers',
                method: 'GET',
                params: {
                    page: params?.page || 1,
                    page_size: params?.page_size || 10,
                    stage: params?.stage || undefined,
                    account_type: params?.account_type || undefined
                }
            })
        }),
        getCutomerDetail: builder.mutation({
            query: (id) => ({
                url: '/admin/customer',
                method: 'GET',
                params: {
                    user_id: id,
               
                }
            })
        }),
    })
});

export const {
    useGetCustomersMutation,
    useGetCutomerDetailMutation
} = adminApiSlice;