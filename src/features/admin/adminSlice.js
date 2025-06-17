import { apiSlice } from "../../app/api/apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCustomers: builder.mutation({
            query: (params) => ({
                url: '/admin/customers',
                method: 'GET',
                params: {
                    page:  "1",
                    page_size: "10",
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

        getMetrics: builder.mutation({
            query: () => ({
                url: '/admin/quick-stats',
                method: 'GET',
               
            })
        }),
             getDashboardData: builder.mutation({
            query: () => ({
                url: '/admin/dashboard',
                method: 'GET',
               
            })
        }),
    })
});

export const {
    useGetCustomersMutation,
    useGetCutomerDetailMutation,
    useGetMetricsMutation,
    useGetDashboardDataMutation
} = adminApiSlice;