
import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth/login',
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
        }),

        sendOTP: builder.mutation({
            query:(body) => ({
                url: '/auth/send-otp-email',
                method: 'POST',
                body,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
        }),

        sendOTPSMS: builder.mutation({
            query:(body) => ({
                url: '/auth/send-otp-sms',
                method: 'POST',
                body:{...body},
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
        }),



        verifyEmail: builder.mutation({
            query: (otp) => ({
                url: '/auth/verify-email',
                method: 'POST',
                params:otp,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
        }),

        verifyPhone: builder.mutation({
            query: (otp) => ({
                url: '/auth/verify-phone',
                method: 'POST',
                params:otp,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
        }),

        
        getCardData: builder.mutation({
            query: () => ({
                url: '/onboarding/card-data',
                method: 'GET',
                
            })
        }),


   


    }),
    


});




export const {
    useLoginMutation,
    useRegisterMutation,
    useVerifyEmailMutation,
    useSendOTPMutation,
    useSendOTPSMSMutation,
    useVerifyPhoneMutation,
    useGetCardDataMutation,
} = authApiSlice;