import logo from "../../assets/img/svg/logo.svg";
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import googlesvg from "../../assets/img/svg/google.svg"
import PropTypes from "prop-types";
import { faInfoCircle,faCheckCircle,faChevronCircleLeft} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useVerifyPhoneMutation, useSendOTPSMSMutation} from "../../features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { useInstantLayoutTransition } from "framer-motion";

    
function VerifyPhone({setTab}) {

    const [verifyOtp,{isLoading}]=useVerifyPhoneMutation()
    const [sendOtp,{isLoading:isSendOtpLoading}]=useSendOTPSMSMutation()
    const [isdone,setIsDone] = useState(false)
    const [responseError,setRsponseError]=useState()
    const [successdiv,setSuccess]=useState()
    const [tooshort,setTooShort]=useState()
    const [optsent,setOtpsent]=useState(false)
    const [optsentsuccess,setOtpsentSuccess]=useState(false)
    const [optsentverified,setOtpVerified]=useState(false)
    const [timer, setTimer] = useState(60); // 60 seconds


    useEffect(() => {
      let interval;
      if (timer > 0) {
        interval = setInterval(() => {
          setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
      }
      return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [timer]);

    const [formData, setFormData] = useState({
      phone: "",
      countryCode: "+233",
    });


    const [formDataOtp, setFormDataOtp] = useState({
      otp: "",
      
    });
  
  
    useEffect(() => {
      const elements = document.getElementsByClassName('css-1u9des2-indicatorSeparator');
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
      }
    }, []);

  
  
  
    
    const handleSendOtp =async()=>{

      if (!errors.phone){

        try{

          const fullPhoneNumber = `${formData.countryCode}${formData.phone.replace(/\D/g, "")}`;

          console.log(fullPhoneNumber)
          const response =await sendOtp({
            "phone": String(fullPhoneNumber),
           
          }).unwrap();
          console.log(response)
          setOtpsent(true)
          setOtpsentSuccess(true)
          setTimer(60); // Reset the timer to 60 seconds

          
          }catch(error){
            
            if (error.data.detail){
              setRsponseError({
                detail:error.data.detail
              })
            }
            else{
              setRsponseError({
                detail:"please enter a valid phone number"
              })
  
            }

            console.log(error)
          }
    

      }

        
    }
    
  

    
  
 
    const formatPhoneNumber = (phoneNumber) => {
      // Remove all non-digit characters
      const cleaned = phoneNumber.replace(/\D/g, "");
      
      // Apply formatting
      if (cleaned.length <= 3) {
        return cleaned;
      } else if (cleaned.length <= 6) {
        return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
      } else {
        return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 10)}`;
      }
    };
  
  

    const handleInputChange = (e) => {
      const { name, value } = e.target;
    
      if (name === "phone") {
        const formattedPhone = formatPhoneNumber(value);
        setFormData(prev => ({
          ...prev,
          [name]: formattedPhone
        }));
    
        setErrors(prev => ({
          ...prev,
          phone: validatePhone(value) ? "" : "Please enter a valid phone number"
        }));
    
        // Reset OTP sent status when the phone number changes
        setOtpsent(false);
        setOtpsentSuccess(false);
        setOtpVerified(false);
        setRsponseError(null); // Clear any previous errors
      }
    };

    const handleInputChange2 = (e) => {
      const { name, value } = e.target;
      
      ;
      setFormDataOtp(prev => ({
       ...prev,
        [name]: value
      }));
    };
     
    
    const handleCountryCodeChange = (selectedOption) => {
      setFormData(prev => ({
        ...prev,
        countryCode: selectedOption.value
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      // Validate all fields
      console.log(formDataOtp) 
   
  
  if (formDataOtp.otp.length !==6){
    setTooShort(true)
     
     return;
 
  }

  
     try{
  
      const response = await verifyOtp(formDataOtp).unwrap();
      console.log(response);
      setIsDone(true)
      setOtpVerified(true)
      setOtpsent(false)
      setTimeout(() => {
        setFormData({
          phone: "",
          countryCode: "+233",
        })
        setTab("tab2"); // Navigate to the next tab or page
      }, 500);
     
      
     }catch(e){
      console.log(e)
      setRsponseError(e.data)
      setOtpsentSuccess(false)
   
  
      
     }
        
    }
        
      
      
    
  

    


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
      
    
    

const countryOptions1 = [
    {
      value: "+233",
      label: (
        <div className="w-full justify-between items-center flex-row text-xs flex   " >
       
         
          <img
            src="https://flagcdn.com/w40/gh.png"
            
            style={{ width: 17, height: 17, marginLeft: 10 }}
            className="rounded-full"
          />
          +233
        </div>
      ),

    },
      {
        value: "+234",
        label: (
          <div className="w-full justify-between items-center flex-row text-xs flex   " >
         
           
            <img
              src="https://flagcdn.com/w40/ng.png"
              
              style={{ width: 17, height: 17, marginLeft: 10 }}
              className="rounded-full"
            />
            +234
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


 

  const customStyles2 = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "white", // bg-gray-50
      color: " #f5f6f7", // text-slate-700
     // border-slate-200
      borderRight: "0", // No border on the right side
      borderTopRightRadius: "0", // Remove top-right corner radius
      borderBottomRightRadius: "0", // Remove bottom-right corner radius
      height: "46px",
      transition: "all 0.3s ease",
      padding:"0px",
      width:'110px',
      borderColor:" #e5e7eb",
  
      "&:hover": {
        borderColor: " #e5e7eb", // hover:border-slate-300
      },
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "0.5rem",
      zIndex: 200,
      height: "250px",
      overflowY: "scroll",
     
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
       margin:"0px",
       padding:"0px"
    }),
  };

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    password: ""
  });


  const validatePhone = (phone) => {
    const digits = phone.replace(/\D/g, "");
    return digits.length >= 9 && digits.length <= 10;
  };

  


  return (

    <div className="w-full h-full justify-center items-center overflow-scroll">
    <div className="w-full flex justify-center items-center mt-11 pb-10 pt-3 max-sm:px-4 max-xs:px-3">
      <div className="md:w-[50%] sm:w-[65%] xs:w-[80%] w-[96%] border pb-8 pt-3 max-md:px-3 md:px-5 rounded-lg shadow bg-[#FBFBFB59]">
      <div className="w-full flex justify-between   px-4 mb-4"> 
      
      <div className="text-[#8600D9]">
      <FontAwesomeIcon icon={faChevronCircleLeft} onClick={()=>setTab("tab1")} size="xl" className="py-2  px-3" />
      </div>
      <div>
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
            Verify your phone
          </h4>
         
        </div>
        <div className="w-full px-4 flex text-start flex-col justify-center items-center">
          
          <div className="w-full flex flex-col justify-center items-center mt-0">
           
        <div className=" md:w-[90%] w-full flex justify-center items-center flex-col">
    
       
       {
        responseError?
        <div className="w-full my-3">
       <div id="alert-border-2" className="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 " role="alert">
  <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <div className="ms-3 text-sm font-medium">
          {responseError.detail}
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

       {
        optsentsuccess?
        <div id="alert-3" className="flex w-full items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
  <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <span className="sr-only">Info</span>
  <div className="ms-3 text-sm font-medium">
  OTP sent successfully
  </div>
  <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-3" aria-label="Close">
    <span className="sr-only">Close</span>
    <svg onClick={()=>{setOtpsentSuccess(false)}} className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
    </svg>
  </button>
</div>


:
""
       }
       


       {
        optsentverified?
        <div id="alert-3" className="flex w-full items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
  <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <span className="sr-only">Info</span>
  <div className="ms-3 text-sm font-medium">
  Phone number verified successfully
  </div>
  <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-3" aria-label="Close">
    <span className="sr-only">Close</span>
    <svg onClick={()=>{setOtpVerified(false)}} className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
    </svg>
  </button>
</div>


:
""
       }

        
          <div className="w-full ">
        
          <div className='mb-5'>
            <div className="w-full flex  flex-row ">
            <Select
        options={countryOptions1}
       
        styles={customStyles2}
        defaultValue={countryOptions1[0]}
        onChange={handleCountryCodeChange}
      

      />
                  <input 
                  
                  value={formData.phone}
                  onChange={handleInputChange}
                  type="tel" id="phone" name="phone" className="bg-white   placeholder:text-sm focus:placeholder:text-white  text-slate-700 border placeholder:text-slate-600 border-slate-200  text-base rounded-r-lg  transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow block w-full p-2.5 " placeholder="Phone" required />

            </div>
            {errors.phone && <p className="text-red-500 text-xs mt-1">  <FontAwesomeIcon icon={faInfoCircle}    className="mr-1 opacity-80"  />{errors.phone}</p>}


        </div>


{
  optsent?
  <>
  <div className="relative w-full mb-0">
<input
  type="number"
  id="otp"
  name="otp"
  className="block rounded-md px-2.5 pb-2.5 pt-2 w-full text-md text-slate-800 border-slate-200 border  appearance-none focus:outline-none focus:ring-0 peer"
  placeholder=" "
  value={formDataOtp.otp}
  onChange={handleInputChange2}
  min={6}
  max={6}
  onFocus={()=>{setTooShort(false)}}
 
/>
<label
  htmlFor="floating_filled"
  className="absolute text-sm text-slate-600 duration-300 transform scale-75 -translate-y-5 top-3 z-10 origin-[0] start-2.5 bg-white px-1 peer-focus:text-slate-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5"
>
  OTP
</label>




</div>
<div className="w-full textstart mb-4">
    {
     tooshort?
     <span className="text-xs text-red-600">OTP must be 6 digits</span>
     :""
    }
</div>

<div className="w-full text-start mb-14 flex justify-center items-start flex-col">
  {isSendOtpLoading ? (
    <div className="dots mr-4 my-3"></div>
  ) : (
    <button
      onClick={handleSendOtp}
      disabled={timer > 0}
      className={`text-sm cursor-pointer text-[#8600D9] underline ${
        timer > 0 ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
    </button>
  )}
</div>
  </>

  

  


  :

  ""
}





   {
    optsent ?

    <Link
              to="/onboarding"
              type="button"
              onClick={handleSubmit}

              className="bg-gradient-to-r  mb-5  from-[#8600D9EB] to-[#470073EB] inline-flex items-center text-white rounded-lg text-sm px-5 py-3  font-semibold text-center mt-6 justify-center duration-500 ease-in-out hover:from-[#470073EB] hover:to-[#8600D9EB] transition-all w-full"
            >
            {
              isLoading?
                  
              
              isdone?
              (<> 
                <div className="wrapper mr-2"> <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/> <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
</svg>
</div> verified</> ):<><div className="spinner mr-4 "></div> <span>verfying</span></>

:"verify phone"
              
                        
            }
              
           
            </Link>
    :

    <Link
             
              type="button"
              onClick={handleSendOtp}

              className="bg-gradient-to-r mb-5   from-[#8600D9EB] to-[#470073EB] inline-flex items-center text-white rounded-lg text-sm px-5 py-3  font-semibold text-center mt-6 justify-center duration-500 ease-in-out hover:from-[#470073EB] hover:to-[#8600D9EB] transition-all w-full"
            >
           {
            isSendOtpLoading?

            <><div className="spinner mr-4 "></div> <span>sending...</span></>
            :"Send OTP"
           }
              
           
            </Link>
   }


    

            
           
            </div>

          </div>

        </div>
        
           
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifyPhone