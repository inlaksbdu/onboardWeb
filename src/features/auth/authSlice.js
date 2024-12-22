import { createSlice } from "@reduxjs/toolkit";



const authSlice = createSlice({
    name:"auth",
    initialState:{
        access:localStorage.getItem('access') || null,
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
