import { createSlice } from "@reduxjs/toolkit";



const authSlice = createSlice({
    name:"auth",
    initialState:{
        access:localStorage.getItem('access') || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiZXhwIjoxNzM1MDY1NTMyLCJ0eXBlIjoiYWNjZXNzIiwianRpIjoieTZTZW1OV21jV0xXRFc1clRSVnR3R1ktd193SDQzQ2pGWEZfVjRRc1g3SSJ9.hMUONCdVJHlEKJuO5qaYTRm-hmy3a8Nv-RxoPP9Ae70",
        refresh:localStorage.getItem('refresh') || null,
      

    
    },
    reducers:{
        setCredentials:(state,action)=>{
            const {access,refresh}=action.payload;

            localStorage.setItem('access', access);
            localStorage.setItem('refresh', refresh);
       

          
            state.access=access;
            state.refresh=refresh;
         

        },
        
       

        
        logOut:()=>{
     
            localStorage.removeItem('access');
            localStorage.removeItem('refresh' );
         
        },
    }
})



export const {setCredentials,logOut}=authSlice.actions
export default authSlice.reducer 
export const selectCurrentToken=(state)=>state.auth.access
