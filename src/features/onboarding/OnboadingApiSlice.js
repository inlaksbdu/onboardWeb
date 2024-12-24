import { apiSlice } from "../../app/api/apiSlice";


export const OnboardingApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        OCR: builder.mutation({
            query: (images) => ({
                url: '/onboarding/card-ocr',
                method: 'POST',
                body: images,
              
                FormData:true
            })
        }),
        
    })
});

export const {
    useOCRMutation,
} = OnboardingApiSlice;