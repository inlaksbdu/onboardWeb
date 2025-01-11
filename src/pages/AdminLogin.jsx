import React from 'react'
import { useState } from 'react'
import logo  from "../../src/assets/img/svg/logo.svg"
import Select from "react-select";
import { useLoginMutation } from '../features/auth/authApiSlice';
import { faInfoCircle,faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
function AdminLogin() {
 const [login,{isLoading}]=useLoginMutation()
  const [isdone,setisDone]=useState(false )
  const [responseError,setRsponseError]=useState()
  const dispatch=useDispatch()


  const [formData, setFormData] = useState({
    username: "",
    password: "",
   
  });



  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const countryOptions = [
    {
      value: "English",
      label: (
        <div className="w-full justify-between items-center flex-row text-xs flex" >
       
          English
          <img
            src="https://flagcdn.com/w40/us.png"
            alt="English"
            style={{ width: 17, height: 17, marginLeft: 10 }}
            className="rounded-full"
          />
        </div>
      ),
    },
    {
      value: "French",
      label: (
        <div className="w-full justify-between items-center flex-row text-xs flex" >
        
          French
          <img
            src="https://flagcdn.com/w40/fr.png"
            alt="Ghana"
            className="rounded-full"
            style={{ width: 17, height: 17, marginLeft: 10 }}
          />
        </div>
      ),
    },
    // Add more countries here
  ];


  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "white", // bg-gray-50
      color: "#374151", // text-slate-700
      border: state.isFocused ? "1px solid #9ca3af" : "1px solid #e5e7eb", // focus:border-slate-400 / border-slate-200
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      borderRadius: "0.5rem", // rounded-lg
      height: "33px", //
      transition: "all 0.3s ease",
      
    
      "&:hover": {
        borderColor: "#d1d5db",
         // hover:border-slate-300
      },

      
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "0.5rem",
      zIndex: 5,
      height: "250px",
      overflowY:"scroll",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#e5e7eb" : "transparent", // hover color
      color: "#374151", // text color
      padding: "5px 5px",
    
    }),
    placeholder: (base) => ({
      ...base,
      color: "#9ca3af", // placeholder text-slate-400
    }),
    singleValue: (base) => ({
      ...base,
      color: "#374151", // text-slate-700
    }),
  };




  const [errors, setErrors] = useState({
    username: "",
   
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
   
    if (name === "username") {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));

      setErrors(prev => ({
        ...prev,
        email: validateEmail(value) ? "" : "Please enter a valid email"
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));

     
    }
  };



const navigate=useNavigate()

   const handleSubmit = async (e) => {
      e.preventDefault();
      
      // Validate all fields
      console.log(formData)
      const newErrors = {
        email: validateEmail(formData.email) ? "" : "Please enter a valid email",
       
  
  
      };
  
  
      setErrors(newErrors);
      
  
  
      // Check if there are any errors
      if (!Object.values(newErrors).some(error => error)) {
        // Format the phone number for submission
  
     try{
         
      const formBody = new URLSearchParams();
      formBody.append('grant_type', 'password');
      formBody.append('username', formData.email);
      formBody.append('password', formData.password);
      
  
          formBody.append('client_id', "");
  
          formBody.append('client_secret', "");
      
  
      const signindata = await login({ body: formBody }).unwrap();
  
      if (signindata.access_token) {
        
              dispatch(setCredentials({access:signindata.access_token,refresh:signindata.refresh_token}))
          setisDone(true);
      }
     
      
        setFormData({
          username: "",
          password: "",
         
        })

        navigate("/admin")
     
     }catch(e){
      console.log(e)
    
  
      
      setRsponseError(e.data.detail)
      
    
        
    }
        
      
      }
    };
  

  return (
    <div className="w-full h-full justify-center items-center overflow-scroll">
      <div className="w-full flex justify-center items-center mt-11 pb-10 pt-3 max-sm:px-4 max-xs:px-3">
        <div className="md:w-[50%] sm:w-[65%] xs:w-[80%] w-[96%] border pb-8 pt-3 max-md:px-3 md:px-5 rounded-lg shadow bg-[#FBFBFB59]">
        <div className="w-full flex justify-end  px-4 mb-4"> <div>
        <Select
        options={countryOptions}
        placeholder="Choose a country"
        styles={customStyles}
        defaultValue={countryOptions[0]}
      

      />
        </div> </div>
          <div className="w-full flex justify-center items-center flex-col mb-4">
            <img src={logo} className="mb-2" alt="logo" />
            <h4 className="font-poppins font-semibold text-xl mb-1">
              Admin Login
            </h4>
           
          </div>
          <div className="w-full px-4 flex text-start flex-col justify-center items-center">
            
            <div className="w-full flex flex-col justify-center items-center mt-0">
             
          <div className=" md:w-[90%] w-full flex justify-center items-center flex-col">
          {/*
           <div className="shadow-md w-full px-2 py-2 mb-5 border border-slate-100 rounded-lg bg-white flex justify-center items-center text-md font-normal text-slate-900 ">
          <img src={googlesvg} className="h-7 w-7"/>
          continue with google

          </div>
          
          <div className="w-full flex-row flex justify-between items-center mb-5 ">
          <hr className="w-full bg-slate-200"/> <span className="mx-1 text-xs text-slate-600 text-nowrap mb-1"> or sign in with</span><hr className="w-full bg-slate-200"/>


            
            </div>

          */}
         
         {
          responseError?
          <div className="w-full my-3">
         <div id="alert-border-2" className="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 " role="alert">
    <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
    </svg>
    <div className="ms-3 text-sm font-medium">
            {responseError}
    </div>
    <button type="button" onClick={()=>setRsponseError()} className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 "  data-dismiss-target="#alert-border-2" aria-label="Close">
      <span className="sr-only">Dismiss</span>
      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
      </svg>
    </button>
</div>
         </div> 
          :""
         }
         

          
            <div className="w-full ">
          

 
        <div className="relative w-full mb-5">
  <input
    type="text"
    id="email"
    name="email"
    className="block rounded-md px-2.5 pb-2.5 pt-2 w-full text-md text-slate-800 border-slate-200 border  appearance-none focus:outline-none focus:ring-0 peer"
    placeholder=" "
    value={formData.email}
    onChange={handleInputChange}
   
   
  />
  <label
    htmlFor="floating_filled"
    className="absolute text-sm text-slate-600 duration-300 transform scale-75 -translate-y-5 top-3 z-10 origin-[0] start-2.5 bg-white px-1 peer-focus:text-slate-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5"
  >
    Email
  </label>

  {errors.email && <p className="text-red-500 text-xs mt-1">             <FontAwesomeIcon icon={faInfoCircle}    className="mr-1 opacity-80"  />
  {errors.email}</p>}

  

</div>



 
       

        <div className="w-full">
      <div className="relative w-full mb-5">
        <input
          type="password"
          id="password"
          name="password"
          className="block rounded-md px-2.5 pb-2.5 pt-2 w-full text-md text-slate-800 border-slate-200 border  appearance-none focus:outline-none focus:ring-0 peer"
          placeholder=" "
          value={formData.password}
          onChange={handleInputChange}
        
        />
        <label
          htmlFor="password"
          className="absolute text-sm text-slate-600 duration-300 transform scale-75 -translate-y-5 top-3 z-10 origin-[0] start-2.5 bg-white px-1 peer-focus:text-slate-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5"
        >
          Password
        </label>


       

        {errors.password && (
          <p className="text-red-500 text-xs mt-1">
            <FontAwesomeIcon icon={faInfoCircle} className="mr-1 opacity-80" />
            {errors.password}
          </p>
        )}
      </div>
    </div>



        <button
                type="button"
                onClick={handleSubmit}

                className="bg-gradient-to-r from-[#8600D9EB] to-[#470073EB] inline-flex items-center text-white rounded-lg text-sm px-5 py-3  font-semibold text-center mt-3 justify-center duration-500 ease-in-out hover:from-[#470073EB] hover:to-[#8600D9EB] transition-all w-full"
              >
              {
                isLoading?
                (<><div className="spinner mr-4"></div> Loading...</>)
                :
                    
                
                isdone?
                (<> 
                  <div className="wrapper mr-2"> <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/> <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
</svg>
</div> Done </> ):"Sign in"
                
                          
              }
                
             
              </button>
            </div>

          </div>
          
             
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin