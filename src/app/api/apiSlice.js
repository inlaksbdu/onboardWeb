// apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../features/auth/authSlice";
import { encryptToken, decryptToken } from "../../features/auth/cryptoUtils";


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
        const refreshToken =  localStorage.getItem("refresh")? decryptToken(localStorage.getItem("refresh")):null;
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
                api.dispatch(setCredentials({
                    access: refreshResult.data.access
                }));
                
                // Retry the original request
                result = await baseQuery(args, api, extraOptions);
            } else {
                api.dispatch(logOut());
            }
        } catch {
            api.dispatch(logOut());
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