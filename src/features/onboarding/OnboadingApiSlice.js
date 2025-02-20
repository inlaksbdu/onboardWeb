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

        getStage: builder.mutation({
            query: () => ({
                url: '/onboarding/stage',
                method: 'GET',
                
            })
        }),

        corfirmCardData: builder.mutation({
            query: ({id,body}) => ({
                url: `/onboarding/confirm-id?id=${encodeURIComponent(id)}`,
                method: 'PUT',
                body: body,
              
               
            })
        }),
        
    })
});

export const {
    useOCRMutation,
    useGetStageMutation,
    useCorfirmCardDataMutation
} = OnboardingApiSlice;