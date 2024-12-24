
import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth/token',
                method: 'POST',
                body: credentials.body,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            })
        }),
        register: builder.mutation({
            query: body => ({
                url: '/auth/register',
                method: 'POST',
                body,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
        })
    })
});




export const {
    useLoginMutation,
    useRegisterMutation,
} = authApiSlice;