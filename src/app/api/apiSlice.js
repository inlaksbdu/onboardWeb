import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials,logOut } from "../../features/auth/authSlice";



const apiUrl = 'http://onboarding-api.bdudcloud.com/docs'
console.log("API URL:", apiUrl);
const baseQuery=fetchBaseQuery({
    baseUrl:`${apiUrl}`,
    credentials: 'include',
  
  
    
   
    prepareHeaders:(headers,{getState})=>{
        const token =getState().auth.access

        if (token) {
            headers.set('authorization',`JWT ${token}`,)

        }
    
        return headers
    }
})


const BaseQueryWithReauth=async (args,api,extraOptions)=>{
    let result = await baseQuery(args,api,extraOptions)
    
if (result?.error?.status === 401){
       
            console.log('sending refresh token')
       
        const refreshTokenResponse =await  fetch(`${apiUrl}auth/refresh/`, {
            
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              
             
            },
            body:JSON.stringify({
                'refresh':localStorage.getItem('refresh')

            })
               
            
          });
          const refreshToken = await refreshTokenResponse.json();
 
        if (refreshToken?.access){

      
            const refresh=api.getState().auth.refresh;


            //store user
            api.dispatch(setCredentials({access:refreshToken.access,refresh:refresh}));
            //retry original request with new access token
            result=await baseQuery(args,api,extraOptions)
        } 
        else{
            api.dispatch(logOut())
        }

    }

   return result
}


export const apiSlice=createApi({
    baseQuery: BaseQueryWithReauth,
    endpoints:builder=>({})
})