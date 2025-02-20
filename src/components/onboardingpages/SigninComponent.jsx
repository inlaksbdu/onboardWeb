import logo from "../../assets/img/svg/logo.svg";
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import googlesvg from "../../assets/img/svg/google.svg"
import PropTypes from "prop-types";
import { faInfoCircle,faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRegisterMutation,useLoginMutation,useSendOTPMutation } from "../../features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import { useTranslation } from 'react-i18next';
import { useGetStageMutation } from "../../features/onboarding/OnboadingApiSlice";

function SigninComponent({setTab}) {
  const [register,{isLoading}]=useRegisterMutation()
  const [login,{isLoading:isLoginLoading}]=useLoginMutation()
  const [sendOTP,{isLoadig:isSendingOTP}]=useSendOTPMutation()
  const [getStage,{isLoading:isStageLoading}] = useGetStageMutation();
  const [isdone,setisDone]=useState(false )
  const [responseError,setRsponseError]=useState()
  const dispatch = useDispatch();
  const [currentLanguage, setCurrentLanguage] = useState("en"); 
  const [userLogin,setUserLogin]=useState(false);
  const [tabToDirect,setTabToDirect]=useState()

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    countryCode: "+233",
    account_type:localStorage.getItem("selectedOption") || ""
  });

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    password: ""
  });



  useEffect(() => {
    const elements = document.getElementsByClassName('css-1u9des2-indicatorSeparator');
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
    }
  }, []);

  // Format phone number to match XXX XXX XXXX
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


  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const digits = phone.replace(/\D/g, "");
    return digits.length >= 9 && digits.length <= 10;
  };

  
  const validatepasword2 = (password) => {
    return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password)
  };



  
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    uppercase: false,
    lowercase: false,
    number: false,
  });

  const validatePassword = (password) => {
    setPasswordValidation({
      minLength: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
    });
     password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password)?  setErrors(prev => ({
      ...prev,
      password:""
    })):""
  };


  const [openpasswordinfo,setOpenpasswordinfo]=useState(false)
const handlePasswordFocus = () => {
  setOpenpasswordinfo(true)
};

const handlePasswordBlur = () => {
  setOpenpasswordinfo(false);
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
    } else if (name === "email") {
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

      setErrors((prev) => ({
        ...prev,
        password: validatePassword(value) ? "" : "Password is invalid.",
      }));
      validatePassword(value);
    }
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
    console.log(formData)
    const newErrors = {
      email: validateEmail(formData.email) ? "" : "Please enter a valid email",
      password: validatepasword2(formData.password) ? "" : "Please enter a valid password ",


    };


    setErrors(newErrors);
    


    // Check if there are any errors
    if (!Object.values(newErrors).some(error => error)) {
      // Format the phone number for submission
      const fullPhoneNumber = `${formData.countryCode}${formData.phone.replace(/\D/g, "")}`;

   try{

    const response = await register({
      "email": formData.email,
      "phone": fullPhoneNumber,
      "account_type": formData.account_type,
      "role": "user",
      "password": formData.password
    }).unwrap();
    console.log(response);


    
    if (response.access_token) {
      
      dispatch(setCredentials({access:response.access_token,refresh:response.refresh_token}))
  setisDone(true);
  // Handle successful login (e.g., redirect)
}


  

const sendoptreponse=await sendOTP().unwrap()
console.log(sendoptreponse)


    setTimeout(() => {
      setFormData({
        email: "",
        phone: "",
        password: "",
        countryCode: "+233",
        account_type: localStorage.getItem("selectedOption") || ""
      })
      setTab("tab1.2"); // Navigate to the next tab or page
    }, 500);
   }catch(e){
    console.log(e.data.detail)
  
if (e.status==500){
    setRsponseError(e.data.detail);

   }
   else if (e.data.detail[0]){
    setRsponseError(e.data.detail[0].msg);


   }
   else{
    setRsponseError("An error occured,Try again !")

    
   }
      
  }
      
    
    }
  };


  

  const handleSubmit2 = async (e) => {
    e.preventDefault();
  
    // Validate all fields
    console.log(formData);
    const newErrors = {
      email: validateEmail(formData.email) ? "" : "Please enter a valid email",
      password: validatepasword2(formData.password) ? "" : "Please enter a valid password",
    };
  
    setErrors(newErrors);
  
    // Check if there are any errors
    if (!Object.values(newErrors).some(error => error)) {
      try {
        // Format the data as URL-encoded
        const urlEncodedData = new URLSearchParams();
        urlEncodedData.append("username", formData.email);
        urlEncodedData.append("password", formData.password);
        urlEncodedData.append("grant_type", "password");
        urlEncodedData.append("scope", "");
        urlEncodedData.append("client_id", "");
        urlEncodedData.append("client_secret", "");
  
        // Call the login mutation with URL-encoded data
        const response = await login({body:urlEncodedData}).unwrap();
        console.log(response);
  
        if (response.access_token) {
          dispatch(setCredentials({ access: response.access_token, refresh: response.refresh_token }));
          setisDone(true);
          // Handle successful login (e.g., redirect)
        }
  

        const  stage=await getStage().unwrap();
        console.log(stage)
        


        
    
  
        setTimeout(() => {
          setFormData({
            email: "",
            phone: "",
            password: "",
            countryCode: "+233",
            account_type: localStorage.getItem("selectedOption") || "",
          });

          if (stage.stage=="phone_verification"){
            setTab("tab2");
          }
          else if (stage.stage=="mail_verification"){
        setTab("tab1.3");            
          }
          else if (stage.stage=="ocr"){
            setTab("tab4");

          }
          else if(stage.stage=="signup"){
            setTab("tab1.2");
          }
          else if(stage.stage=="id_confirmation"){
            setTab("tab4");
          }
          

        }, 300);
      } catch (e) {
        console.log(e);
  
        if (e.status === 401) {
          setRsponseError(e.data.detail);
       
        } else {
          setRsponseError("An error occurred. Try again!");
        }
      }
    }
  };
 


  



  useEffect(() => {
    const elements = document.getElementsByClassName('css-1u9des2-indicatorSeparator');
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
    }
    
  }, []); //

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
        <div className="w-full justify-between items-center flex-row text-xs flex  " >
       
         
          <img
            src="https://flagcdn.com/w40/gh.png"
            
            style={{ width: 17, height: 17, marginLeft: 10 }}
            className="rounded-full"
          />
          +233
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
  
  


  const { t, i18n } = useTranslation();


  
  useEffect(() => {
    const detectLanguage = () => {
      // First check localStorage
      const savedLanguage = localStorage.getItem('preferredLanguage');
      const supportedLanguages = ['en', 'fr', 'es'];
      
      if (savedLanguage && supportedLanguages.includes(savedLanguage)) {
        return savedLanguage;
      }

      // If no saved language, detect browser language
      const browserLang = navigator.language.split('-')[0];
      return supportedLanguages.includes(browserLang) ? browserLang : 'en';
    };

    const defaultLang = detectLanguage();
    if (i18n.language !== defaultLang) {
      i18n.changeLanguage(defaultLang).then(() => {
        setCurrentLanguage(defaultLang); // Update state after language change
      });
    } else {
      setCurrentLanguage(defaultLang); // Set state if language is already correct
    }
  }, [i18n]);

  useEffect(() => {
    const handleLanguageChange = (lang) => {
      setCurrentLanguage(lang);
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  const languageOptions = [
    {
      value: "en",
      label: (
        <div className="w-full justify-between items-center flex-row text-xs flex">
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
      value: "fr",
      label: (
        <div className="w-full justify-between items-center flex-row text-xs flex">
          Français
          <img
            src="https://flagcdn.com/w40/fr.png"
            alt="French"
            className="rounded-full"
            style={{ width: 17, height: 17, marginLeft: 10 }}
          />
        </div>
      ),
    },
    {
      value: "es",
      label: (
        <div className="w-full justify-between items-center flex-row text-xs flex">
          Español
          <img
            src="https://flagcdn.com/w40/es.png"
            alt="Spanish"
            className="rounded-full"
            style={{ width: 17, height: 17, marginLeft: 10 }}
          />
        </div>
      ),
    }
  ];



  const handleLanguageChange = (selectedOption) => {
    i18n.changeLanguage(selectedOption.value).then(() => {
      localStorage.setItem('preferredLanguage', selectedOption.value);
    });
  };

  const getCurrentLanguageOption = () => {
    return languageOptions.find(option => option.value === currentLanguage) || languageOptions[0];
  };


  const handleUserLogin=()=>{
    setUserLogin(true);
    setRsponseError()
  }

  const handleUserLogi2n=()=>{
    setUserLogin(false);
    setRsponseError()
  }


  return (
    <div className="w-full h-full justify-center items-center overflow-scroll">
      <div className="w-full flex justify-center items-center mt-11 pb-10 pt-3 max-sm:px-4 max-xs:px-3">
        <div className="md:w-[50%] sm:w-[65%] xs:w-[80%] w-[96%] border pb-8 pt-3 max-md:px-3 md:px-5 rounded-lg shadow bg-[#FBFBFB59]">
        <div className="w-full flex justify-end  px-4 mb-4">
        <div>
              <Select
                    options={languageOptions}
                styles={customStyles}
                onChange={handleLanguageChange}
                value={getCurrentLanguageOption()}
                isSearchable={false}
              />
              
            </div> </div>
          <div className="w-full flex justify-center items-center flex-col mb-4">
            <img src={logo} className="mb-2" alt="logo" />
            {
              userLogin?
              <>
              <h4 className="font-poppins font-semibold text-xl mb-1">
             { t('Sign in to continue ')}
            </h4>
            <p className="text-sm text-gray-400">Carefully Provide your Credentials </p>
            </>
              :
              <>

              <h4 className="font-poppins font-semibold text-xl mb-1">
             { t('Start  Onboarding')}
            </h4>
            <p className="text-sm text-gray-400">Carefully Provide your details </p>
            </>

            }
            
           
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
           
            {responseError=="Input should be 'individual', 'group' or 'sme'"
?<>{responseError+". "} <Link to='/' className="underline ml-1">Select user type here </Link></>:responseError=="User already exists"?
<>{responseError+". "} <button onClick={handleUserLogin} to='/' className="underline ml-1">login and continue </button></>:responseError
}

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
              { t("Email")}

    
  </label>

  {errors.email && <p className="text-red-500 text-xs mt-1">             <FontAwesomeIcon icon={faInfoCircle}    className="mr-1 opacity-80"  />

  {t(errors.email)}

  </p>}

  

</div>

{
  /*<div className='mb-5'>
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
       */
}

        

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
          onBlur={handlePasswordBlur}
          onFocus={handlePasswordFocus}
        />
        <label
          htmlFor="password"
          className="absolute text-sm text-slate-600 duration-300 transform scale-75 -translate-y-5 top-3 z-10 origin-[0] start-2.5 bg-white px-1 peer-focus:text-slate-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5"
        >
          
          { t("Password")}
        </label>

{
  openpasswordinfo?
  <div className="absolute bg-white border border-gray-300 rounded-md shadow-md p-2 text-xs text-slate-600 top-12 left-0 z-20 w-full">
          <ul>
            <li>
              {passwordValidation.minLength ? (
                <FontAwesomeIcon icon={faCheckCircle} className="mr-1 text-green-500" />

              ) : (
                <FontAwesomeIcon icon={faInfoCircle} className="mr-1 text-red-500" />

              )}
              
              { t("Minimum of 8 characters")}
            </li>
            <li >
              {passwordValidation.uppercase ? (

                <FontAwesomeIcon icon={faCheckCircle} className="mr-1 text-green-500" />

              ) : (
                <FontAwesomeIcon icon={faInfoCircle} className="mr-1 text-red-500" />

              )}
              
              { t("At least 1 uppercase letter")}
            </li>
            <li >
              {passwordValidation.lowercase ? (
                <FontAwesomeIcon icon={faCheckCircle} className="mr-1 text-green-500" />

              ) : (
                <FontAwesomeIcon icon={faInfoCircle} className="mr-1 text-red-500" />

              )}
              At least 1 lowercase letter
            </li>
            <li className="" >
              {passwordValidation.number ? (
                <FontAwesomeIcon icon={faCheckCircle} className="mr-1 text-green-500" />
              ) : (
                <FontAwesomeIcon icon={faInfoCircle} className="mr-1 text-red-500" />
              )}
             
              { t(" At least 1 number")}

            </li>
          </ul>
        </div>

  :""
}
       

        {errors.password && (
          <p className="text-red-500 text-xs mt-1">
            <FontAwesomeIcon icon={faInfoCircle} className="mr-1 opacity-80" />
            
            {t(errors.password)}
          </p>
        )}
      </div>
    </div>


{
  userLogin?
  <Link
                type="button"
                onClick={handleSubmit2}

                className="bg-gradient-to-r from-[#8600D9EB] to-[#470073EB] inline-flex items-center text-white rounded-lg text-sm px-5 py-3  font-semibold text-center mt-3 justify-center duration-500 ease-in-out hover:from-[#470073EB] hover:to-[#8600D9EB] transition-all w-full"
              >
              {
                isLoginLoading?(<><div className="spinner mr-4"></div>
                  {t("Loading...")}
                 </>)
                :
                    
                
                isdone?
                (<> 
                  <div className="wrapper mr-2"> <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/> <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
</svg>
</div> {("Done")} </> ):t("sign in and continue")
                
                          
              }
                
             
              </Link>


              :

              <Link
                type="button"
                onClick={handleSubmit}

                className="bg-gradient-to-r from-[#8600D9EB] to-[#470073EB] inline-flex items-center text-white rounded-lg text-sm px-5 py-3  font-semibold text-center mt-3 justify-center duration-500 ease-in-out hover:from-[#470073EB] hover:to-[#8600D9EB] transition-all w-full"
              >
              {
                isLoading || isSendingOTP?(<><div className="spinner mr-4"></div>
                  {t("Loading...")}
                 </>)
                :
                    
                
                isdone?
                (<> 
                  <div className="wrapper mr-2"> <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/> <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
</svg>
</div> {("Done")} </> ):t("create account")
                
                          
              }
                
             
              </Link>


}

       
            </div>

            {
              userLogin?
              <p className="text-sm  text-start w-full my-3 ">No account?<span className="underline cursor-pointer " onClick={handleUserLogi2n}>Sign up to Onboard</span></p>

              :""
            }

          </div>
          
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


SigninComponent.propTypes = {
  setTab: PropTypes.func.isRequired, // Updated to ensure it's mandatory
};

export default SigninComponent;