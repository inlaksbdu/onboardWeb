// apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../features/auth/authSlice";


const baseQuery = fetchBaseQuery({
    baseUrl: '/api',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.access;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
        const refreshToken =  localStorage.getItem("refresh") ;
        if (!refreshToken) {
            api.dispatch(logOut());
            return result;
        }

        try {
            const refreshResult = await baseQuery({
                url: '/auth/refresh/',
                method: 'POST',
                body: { refresh_token: refreshToken }
            }, api, extraOptions);

            if (refreshResult?.data?.access) {
                // Store the new access token
                const currentCredentials = getState().auth;

                api.dispatch(
                  setCredentials({
                    ...currentCredentials,
                    access: response.access,
                  })
                );
                // Retry the original request
                result = await baseQuery(args, api, extraOptions);
            } else {
                console.log(refreshResult )
            }
        } catch (e){
           console.log(e)
        }
    }
    return result;
};




// SigninComponent.js modifications for handleSubmit2
export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
});

// Add this helper function to handle login errors