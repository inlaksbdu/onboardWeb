import { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Select, { components } from "react-select";
import { useGetCardDataMutation } from '../../features/auth/authApiSlice';
import { useNavigate } from 'react-router-dom';
import { useCorfirmCardDataMutation } from '../../features/onboarding/OnboadingApiSlice';
import axios from 'axios';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';


function PersonalInformation() {
  const [isFocused, setIsFocused] = useState(false);
  const [date, setDate] = useState(null);
  const [end_date, setEndDate] = useState(null);
  const [issued_date, setIssuedDate] = useState(null);
  const [gender, setGender] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [idType, setIdType] = useState('');
  const [done, setDone] = useState(false);
  const navigate = useNavigate();
  const [confirmCardData, { isLoading: confirmLoading }] = useCorfirmCardDataMutation();
  const [animated, setAnimated] = useState(false);
  const [confidence, setConfidence] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    otherNames: '',
    address: ''
  });
  const [pin, setPin] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [signupError, setSignupError] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const { isOpen: isPinOpen, onOpen: openPinModal, onClose: closePinModal, onOpenChange: onPinOpenChange } = useDisclosure();
  const { isOpen: isPasswordOpen, onOpen: openPasswordModal, onClose: closePasswordModal, onOpenChange: onPasswordOpenChange } = useDisclosure();
  const pinLength = 4;
  const [pinDigits, setPinDigits] = useState(new Array(pinLength).fill(''));
  const inputRefs = useRef([]);


  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Position received:", position);
          setLatitude(position.coords.latitude.toFixed(2));
          setLongitude(position.coords.longitude.toFixed(2));
          console.log("Latitude:", position.coords.latitude.toFixed(2));
          console.log("Longitude:", position.coords.longitude.toFixed(2));
        },
        (error) => {
          console.error("Geolocation error:", error);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 } // Add options for better accuracy
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);
 

  useEffect(() => {
    // Add a small delay before starting animation
    const animationTimeout = setTimeout(() => {
      setAnimated(true);
    }, 300);

 

    return () => {
      clearTimeout(animationTimeout);
    };
  }, []);

 
  const getColorClass = (confidence) => {
    const percentage = confidence * 100;
    if (percentage >= 95) return "bg-green-600 text-green-100";
    if (percentage >= 85) return "bg-blue-600 text-blue-100";
    if (percentage >= 75) return "bg-yellow-500 text-yellow-100";
    if (percentage >= 60) return "bg-orange-500 text-orange-100";
    return "bg-red-600 text-red-100";
  };

  const colorClass = getColorClass(confidence && confidence);

  const [selectedOption, setSelectedOption] = useState(null);
  const [isNationalityFocused, setIsNationalityFocused] = useState(false);
  const [cardData, setCardData] = useState(null);
  const [getCardData, { isLoading }] = useGetCardDataMutation();

  const handleFocus = () => setIsNationalityFocused(true);
  const handleBlur = () => setIsNationalityFocused(false);

  const getUserData = async () => {
    try {
      const response = await getCardData().unwrap();
      console.log(response);

      setConfidence(Math.round(response.confidence * 100));
      // Set form data
      setFormData({
        firstName: response.first_name.content,
        lastName: response.last_name.content,
        otherNames: response.middle_name ? response.middle_name.content : "",
        address:(latitude&&latitude) + " " + (longitude&&longitude)
      });

      // Set date of birth
      if (response.date_of_expiry) {
        console.log(new Date(response.date_of_issue.content));
        setEndDate(new Date(response.date_of_expiry.content));
      }

      if (response.date_of_birth) {
        const [day, month, year] = response.date_of_birth.content.split("/");
        const formattedDate = `${year}-${month}-${day}`; // Convert to YYYY-MM-DD
        console.log(new Date(formattedDate));
        setDate(new Date(formattedDate));
      }
      

      if (response.date_of_issue) {
        console.log(new Date(response.date_of_issue.content));
        setIssuedDate(new Date(response.date_of_issue.content));
      }

      if (response.gender) {
        setGender(response.gender.content);
      }

      if (response.id_number) {
        setIdNumber(response.id_number.content);
      }

      if (response.document_type) {
        setIdType(response.document_type);
      }
      // Set nationality
      if (response.country) {
        const nationality = response.country.content.toLowerCase();
        const matchingOption = countryOptions.find(option =>
          option.value === nationality.toLowerCase().replace('ghanaian', 'ghana')
            .replace('nigerian', 'nigeria')
            .replace('kenyan', 'kenya')
        );
        setSelectedOption(matchingOption);
      }

      setCardData(response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "#f9fafb",
      color: "#374151",
      border: state.isFocused ? "1px solid #9ca3af" : "1px solid #e5e7eb",
      boxShadow: state.isFocused ? "0 0 0 1px #9ca3af" : "none",
      borderRadius: "0.5rem",
      height: "45px",
      transition: "all 0.3s ease",
      "&:hover": {
        borderColor: "#d1d5db",
      },
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "0.5rem",
      height: "130px",
      overflowY: "scroll",
      zIndex: 1000,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#e5e7eb" : "transparent",
      color: "#374151",
      padding: "10px 15px",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#9ca3af",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#374151",
    }),
  };

  const countryOptions = [
    { value: "ghana", label: (<span className='py-1'>Ghana</span>), icon: "https://flagcdn.com/w40/gh.png" },
    { value: "nigeria", label: (<span className='py-1'>Nigeria</span>), icon: "https://flagcdn.com/w40/ng.png" },
    { value: "kenya", label: (<span className='py-1'>Kenya</span>), icon: "https://flagcdn.com/w40/ke.png" },
  ];

  const handleConfirm = async () => {
    try {
      const requestBody = {
        first_name: formData.firstName,
        middle_name: formData.otherNames,
        last_name: formData.lastName,
        gender: gender,
        date_of_birth: date,
        nationality: selectedOption ? selectedOption.value : cardData.nationality.content,
        document_type: idType || cardData.document_type,
        document_number: idNumber || cardData.document_number.content,
        id_number: idNumber || cardData.id_number.content,
        date_of_issue: issued_date ? issued_date.toISOString().split('T')[0] : cardData.date_of_issue.content,
        date_of_expiry: end_date ? end_date.toISOString().split('T')[0] : cardData.date_of_expiry.content,
        state: cardData.state.content,
        country: selectedOption ? selectedOption.value : cardData.country.content,
        latitude: cardData.latitude||latitude,
        longitude: cardData.longitude||longitude,
      
      };

      // Log the request body for debugging
      console.log("Request body:");
      for (const [key, value] of Object.entries(requestBody)) {
        console.log(`${key}: ${value}`);
      }

      // Make the main API call
      const response = await confirmCardData({
        id: cardData.id,
        body: requestBody,
      }).unwrap();

     

     
      



      {
        /* openPinModal();*/
      }
      setDone(true);
       navigate('/customer-dashboard');
     
    } catch (error) {
      console.error("Confirmation failed:", error);

      // Prepare error log data in the same format
      const errorLogData = {
        success: false,
        status: error.status || 500,
        response: error.data || { message: error.message },
        request_data: {
          user_id: cardData.id,
          first_name: formData.firstName,
          last_name: formData.lastName,
          // Include other relevant fields you want to log on error
        }
      };


      {
        /* try {
        await axios.post('/api/account-creation-log', errorLogData);
      } catch (loggingError) {
        console.error("Failed to log error:", loggingError);
      }

      // Show error in UI (use API errorMsg if available)
      setSignupError(
        error.response?.data?.errorMsg || error.response?.data?.message || error.message || 'Signup failed'
      );*/
      }

      // Log the error
     
    }
  };

  const handlePinChange = (e, index) => {
    const { value } = e.target;
    if (!/^[0-9]$/.test(value)) return;
    const newDigits = [...pinDigits];
    newDigits[index] = value;
    setPinDigits(newDigits);
    setPin(newDigits.join(''));
    if (index < pinLength - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePinKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const newDigits = [...pinDigits];
      if (newDigits[index]) {
        // Clear current digit
        newDigits[index] = '';
        setPinDigits(newDigits);
        setPin(newDigits.join(''));
      } else if (index > 0) {
        // Move to previous and clear
        const prev = index - 1;
        newDigits[prev] = '';
        setPinDigits(newDigits);
        setPin(newDigits.join(''));
        inputRefs.current[prev]?.focus();
      }
    }
  };

  // Auto-focus first PIN digit when modal opens
  useEffect(() => {
    if (isPinOpen) {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 0);
    }
  }, [isPinOpen]);

  const handlePinSubmit = () => {
    // Ensure full PIN entered
    if (pinDigits.includes('')) return;
    closePinModal();
    openPasswordModal();
  };

  const handlePasswordSubmit = async () => {
    setSignupError('');
    setIsSigningUp(true);
    // Prepare formattedPhone for use in try/catch
    const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;
    // Keep modal open on errors to show feedback
    try {
      const signupData = {
        phone_number: formattedPhone,
        first_name: formData.firstName,
        last_name: formData.lastName,
        dob: date ? date.toISOString().split('T')[0] : '',
        id_type: 1,
        id_number: idNumber || cardData.id_number.content,
        password,
        secure_pin: pin,
      };
      const response = await axios.post('https://retailbanking.bdudcloud.com/auth/new-customer-signup/', signupData, {
        headers: { 'accept': 'application/json', 'Content-Type': 'application/json' }
      });
      await axios.post('https://c655-2c0f-2a80-7ba-e510-3476-b0f2-8872-fec8.ngrok-free.app/api/account-creation-log', {
        success: response.status >= 200 && response.status < 300,
        status: response.status,
        response: response.data,
        request_data: signupData,
      });
      // Success: close modal and navigate
      closePasswordModal();
      navigate('/customer-dashboard');
    } catch (err) {
      console.error('Signup failed:', err);
      // Determine and set UI error message first
      const msg =
        err.response?.data?.data?.errorMsg ||
        err.response?.data?.errorMsg ||
        err.response?.data?.data?.message ||
        err.response?.data?.message ||
        err.message ||
        'Signup failed';
      setSignupError(msg);
      // Log error, but don't let logging failures override UI
      try {
        await axios.post('https://c655-2c0f-2a80-7ba-e510-3476-b0f2-8872-fec8.ngrok-free.app/api/account-creation-log', {
          success: false,
          status: err.response?.status || 500,
          response: err.response?.data || { message: err.message },
          request_data: { phone_number: formattedPhone, password },
        });
      } catch (logErr) {
        console.error('Failed to log signup error:', logErr);
      }
    } finally {
      setIsSigningUp(false);
    }
  };

  const generateRandomPhone = () => {
    const prefix = '+234';
    const random = Math.floor(1000000000 + Math.random() * 9000000000);
    return prefix + random;
  };

  return (
    <div className="w-full h-full justify-center items-center overflow-scroll">
      <div className="w-full flex justify-center items-center mt-11 pb-10 pt-3 max-sm:px-4 max-xs:px-3">
        <div className="md:w-[50%] sm:w-[65%] xs:w-[80%] w-[96%] border pb-8 pt-3 max-md:px-3 md:px-5 rounded-lg shadow bg-[#FBFBFB59]">
          <div className="w-full justify-center items-center flex flex-col overflow-hidden">
            <div className="w-full text-center my-6">
              <h4 className="text-2xl text-slate-800 font-semibold">Personal Information</h4>
              <p className='text-base text-gray-500 mt-2'>Please provide your personal information</p>
            </div>

            <div className="md:px-10 sm:px-7 px-4 w-full text-start">
              <form className='w-full'>
                <div className="relative w-full mb-5">
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="block rounded-md px-2.5 pb-2.5 pt-2 w-full text-md text-slate-800 border-slate-200 border appearance-none focus:outline-none focus:ring-0 peer"
                    placeholder=" "
                  />
                  <label className="absolute text-sm text-slate-600 duration-300 transform scale-75 -translate-y-5 top-3 z-10 origin-[0] start-2.5 bg-white px-1 peer-focus:text-slate-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5">
                    First Name
                  </label>
                </div>

                <div className="relative w-full mb-5">
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="block rounded-md px-2.5 pb-2.5 pt-2 w-full text-md text-slate-800 border-slate-200 border appearance-none focus:outline-none focus:ring-0 peer"
                    placeholder=" "
                  />
                  <label className="absolute text-sm text-slate-600 duration-300 transform scale-75 -translate-y-5 top-3 z-10 origin-[0] start-2.5 bg-white px-1 peer-focus:text-slate-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5">
                    Last Name
                  </label>
                </div>

                <div className="relative w-full mb-5">
                  <input
                    type="text"
                    id="otherNames"
                    value={formData.otherNames}
                    onChange={handleInputChange}
                    className="block rounded-md px-2.5 pb-2.5 pt-2 w-full text-md text-slate-800 border-slate-200 border appearance-none focus:outline-none focus:ring-0 peer"
                    placeholder=" "
                  />
                  <label className="absolute text-sm text-slate-600 duration-300 transform scale-75 -translate-y-5 top-3 z-10 origin-[0] start-2.5 bg-white px-1 peer-focus:text-slate-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5">
                    Other Name(s)
                  </label>
                </div>

                <div className="relative w-full mb-5">
                  <input
                    type="text"
                    id="otherNames"
                    value={idType}
                    onChange={handleInputChange}
                    className="block  rounded-md px-2.5 pb-2.5 pt-2 w-full text-md text-slate-800 border-slate-200 border appearance-none focus:outline-none focus:ring-0 peer"
                    placeholder=" "
                    disabled
                  />
                  <label className="absolute text-sm text-slate-600 duration-300 transform scale-75 -translate-y-5 top-3 z-10 origin-[0] start-2.5 bg-white px-1 peer-focus:text-slate-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5">
                    Document Type
                  </label>
                </div>

                <div className="relative w-full mb-5">
                  <select
                    type="text"
                    id="otherNames"
                    value={formData.otherNames}
                    onChange={handleInputChange}
                    className="block rounded-md px-2.5 pb-2.5 pt-2 w-full text-md text-slate-800 border-slate-200 border appearance-none focus:outline-none focus:ring-0 peer"
                    placeholder=" "
                  >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                  <label className="absolute text-sm text-slate-600 duration-300 transform scale-75 -translate-y-5 top-3 z-10 origin-[0] start-2.5 bg-white px-1 peer-focus:text-slate-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5">
                    Gender
                  </label>
                </div>

                <div className="relative w-full mb-5">
                  <input
                    type="text"
                    id="otherNames"
                    value={idNumber}
                    onChange={handleInputChange}
                    className="block rounded-md px-2.5 pb-2.5 pt-2 w-full text-md text-slate-800 border-slate-200 border appearance-none focus:outline-none focus:ring-0 peer"
                    placeholder=" "
                  />
                  <label className="absolute text-sm text-slate-600 duration-300 transform scale-75 -translate-y-5 top-3 z-10 origin-[0] start-2.5 bg-white px-1 peer-focus:text-slate-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5">
                    ID Number
                  </label>
                </div>

                <div className="relative w-full mb-5">
                  <DatePicker
                    selected={date&& date}
                    onChange={(newDate) => setDate(newDate)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="block rounded-md px-2.5 pb-2.5 pt-2 w-full text-md text-slate-800 border-slate-200 border appearance-none focus:outline-none focus:ring-0"
                    placeholderText=" "
                    dateFormat="dd/MM/yyyy"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 11C1 7.229 1 5.343 2.172 4.172C3.344 3.001 5.229 3 9 3H13C16.771 3 18.657 3 19.828 4.172C20.999 5.344 21 7.229 21 11V13C21 16.771 21 18.657 19.828 19.828C18.656 20.999 16.771 21 13 21H9C5.229 21 3.343 21 2.172 19.828C1.001 18.656 1 16.771 1 13V11Z" stroke="#181818" strokeWidth="1.5" />
                      <path d="M6 3V1.5M16 3V1.5M1.5 8H20.5" stroke="#181818" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M17 16C17 16.2652 16.8946 16.5196 16.7071 16.7071C16.5196 16.8946 16.2652 17 16 17C15.7348 17 15.4804 16.8946 15.2929 16.7071C15.1054 16.5196 15 16.2652 15 16C15 15.7348 15.1054 15.4804 15.2929 15.2929C15.4804 15.1054 15.7348 15 16 15C16.2652 15 16.5196 15.1054 16.7071 15.2929C16.8946 15.4804 17 15.7348 17 16ZM17 12C17 12.2652 16.8946 12.5196 16.7071 12.7071C16.5196 12.8946 16.2652 13 16 13C15.7348 13 15.4804 12.8946 15.2929 12.7071C15.1054 12.5196 15 12.2652 15 12C15 11.7348 15.1054 11.4804 15.2929 11.2929C15.4804 11.1054 15.7348 11 16 11C16.2652 11 16.5196 11.1054 16.7071 11.2929C16.8946 11.4804 17 11.7348 17 12ZM12 16C12 16.2652 11.8946 16.5196 11.7071 16.7071C11.5196 16.8946 11.2652 17 11 17C10.7348 17 10.4804 16.8946 10.2929 16.7071C10.1054 16.5196 10 16.2652 10 16C10 15.7348 10.1054 15.4804 10.2929 15.2929C10.4804 15.1054 10.7348 15 11 15C11.2652 15 11.5196 15.1054 11.7071 15.2929C11.8946 15.4804 12 15.7348 12 16ZM12 12C12 12.2652 11.8946 12.5196 11.7071 12.7071C11.5196 12.8946 11.2652 13 11 13C10.7348 13 10.4804 12.8946 10.2929 12.7071C10.1054 12.5196 10 12.2652 10 12C10 11.7348 10.1054 11.4804 10.2929 11.2929C10.4804 11.1054 10.7348 11 11 11C11.2652 11 11.5196 11.1054 11.7071 11.2929C11.8946 11.4804 12 11.7348 12 12ZM7 16C7 16.2652 6.89464 16.5196 6.70711 16.7071C6.51957 16.8946 6.26522 17 6 17C5.73478 17 5.48043 16.8946 5.29289 16.7071C5.10536 16.5196 5 16.2652 5 16C5 15.7348 5.10536 15.4804 5.29289 15.2929C5.48043 15.1054 5.73478 15 6 15C6.26522 15 6.51957 15.1054 6.70711 15.2929C6.89464 15.4804 7 15.7348 7 16ZM7 12C7 12.2652 6.89464 12.5196 6.70711 12.7071C6.51957 12.8946 6.26522 13 6 13C5.73478 13 5.48043 12.8946 5.29289 12.7071C5.10536 12.5196 5 12.2652 5 12C5 11.7348 5.10536 11.4804 5.29289 11.2929C5.48043 11.1054 5.73478 11 6 11C6.26522 11 6.51957 11.1054 6.70711 11.2929C6.89464 11.4804 7 11.7348 7 12Z" fill="#181818" />
                    </svg>
                  </div>
                  <label className={`absolute text-sm text-slate-600 duration-300 transform ${isFocused || end_date ? "scale-75 -translate-y-5" : "scale-100 translate-y-0"} top-3 z-10 origin-[0] start-2.5 bg-white px-1 pointer-events-none`}>
                    Date of Birth
                  </label>
                </div>

                <div className="relative w-full mb-5">
                  <DatePicker
                    selected={issued_date && issued_date}
                    onChange={(newDate) => setIssuedDate(newDate)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="block rounded-md px-2.5 pb-2.5 pt-2 w-full text-md text-slate-800 border-slate-200 border appearance-none focus:outline-none focus:ring-0"
                    placeholderText=" "
                    dateFormat="dd/MM/yyyy"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 11C1 7.229 1 5.343 2.172 4.172C3.344 3.001 5.229 3 9 3H13C16.771 3 18.657 3 19.828 4.172C20.999 5.344 21 7.229 21 11V13C21 16.771 21 18.657 19.828 19.828C18.656 20.999 16.771 21 13 21H9C5.229 21 3.343 21 2.172 19.828C1.001 18.656 1 16.771 1 13V11Z" stroke="#181818" strokeWidth="1.5" />
                      <path d="M6 3V1.5M16 3V1.5M1.5 8H20.5" stroke="#181818" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M17 16C17 16.2652 16.8946 16.5196 16.7071 16.7071C16.5196 16.8946 16.2652 17 16 17C15.7348 17 15.4804 16.8946 15.2929 16.7071C15.1054 16.5196 15 16.2652 15 16C15 15.7348 15.1054 15.4804 15.2929 15.2929C15.4804 15.1054 15.7348 15 16 15C16.2652 15 16.5196 15.1054 16.7071 15.2929C16.8946 15.4804 17 15.7348 17 16ZM17 12C17 12.2652 16.8946 12.5196 16.7071 12.7071C16.5196 12.8946 16.2652 13 16 13C15.7348 13 15.4804 12.8946 15.2929 12.7071C15.1054 12.5196 15 12.2652 15 12C15 11.7348 15.1054 11.4804 15.2929 11.2929C15.4804 11.1054 15.7348 11 16 11C16.2652 11 16.5196 11.1054 16.7071 11.2929C16.8946 11.4804 17 11.7348 17 12ZM12 16C12 16.2652 11.8946 16.5196 11.7071 16.7071C11.5196 16.8946 11.2652 17 11 17C10.7348 17 10.4804 16.8946 10.2929 16.7071C10.1054 16.5196 10 16.2652 10 16C10 15.7348 10.1054 15.4804 10.2929 15.2929C10.4804 15.1054 10.7348 15 11 15C11.2652 15 11.5196 15.1054 11.7071 15.2929C11.8946 15.4804 12 15.7348 12 16ZM12 12C12 12.2652 11.8946 12.5196 11.7071 12.7071C11.5196 12.8946 11.2652 13 11 13C10.7348 13 10.4804 12.8946 10.2929 12.7071C10.1054 12.5196 10 12.2652 10 12C10 11.7348 10.1054 11.4804 10.2929 11.2929C10.4804 11.1054 10.7348 11 11 11C11.2652 11 11.5196 11.1054 11.7071 11.2929C11.8946 11.4804 12 11.7348 12 12ZM7 16C7 16.2652 6.89464 16.5196 6.70711 16.7071C6.51957 16.8946 6.26522 17 6 17C5.73478 17 5.48043 16.8946 5.29289 16.7071C5.10536 16.5196 5 16.2652 5 16C5 15.7348 5.10536 15.4804 5.29289 15.2929C5.48043 15.1054 5.73478 15 6 15C6.26522 15 6.51957 15.1054 6.70711 15.2929C6.89464 15.4804 7 15.7348 7 16ZM7 12C7 12.2652 6.89464 12.5196 6.70711 12.7071C6.51957 12.8946 6.26522 13 6 13C5.73478 13 5.48043 12.8946 5.29289 12.7071C5.10536 12.5196 5 12.2652 5 12C5 11.7348 5.10536 11.4804 5.29289 11.2929C5.48043 11.1054 5.73478 11 6 11C6.26522 11 6.51957 11.1054 6.70711 11.2929C6.89464 11.4804 7 11.7348 7 12Z" fill="#181818" />
                    </svg>
                  </div>
                  <label className={`absolute text-sm text-slate-600 duration-300 transform ${isFocused || issued_date ? "scale-75 -translate-y-5" : "scale-100 translate-y-0"} top-3 z-10 origin-[0] start-2.5 bg-white px-1 pointer-events-none`}>
                    Date of Issue
                  </label>
                </div>

                <div className="relative w-full mb-5">
                  <DatePicker
                    selected={end_date && end_date}
                    onChange={(newDate) => setEndDate(newDate)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="block rounded-md px-2.5 pb-2.5 pt-2 w-full text-md text-slate-800 border-slate-200 border appearance-none focus:outline-none focus:ring-0"
                    placeholderText=" "
                    dateFormat="MM/dd/yyyy"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 11C1 7.229 1 5.343 2.172 4.172C3.344 3.001 5.229 3 9 3H13C16.771 3 18.657 3 19.828 4.172C20.999 5.344 21 7.229 21 11V13C21 16.771 21 18.657 19.828 19.828C18.656 20.999 16.771 21 13 21H9C5.229 21 3.343 21 2.172 19.828C1.001 18.656 1 16.771 1 13V11Z" stroke="#181818" strokeWidth="1.5" />
                      <path d="M6 3V1.5M16 3V1.5M1.5 8H20.5" stroke="#181818" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M17 16C17 16.2652 16.8946 16.5196 16.7071 16.7071C16.5196 16.8946 16.2652 17 16 17C15.7348 17 15.4804 16.8946 15.2929 16.7071C15.1054 16.5196 15 16.2652 15 16C15 15.7348 15.1054 15.4804 15.2929 15.2929C15.4804 15.1054 15.7348 15 16 15C16.2652 15 16.5196 15.1054 16.7071 15.2929C16.8946 15.4804 17 15.7348 17 16ZM17 12C17 12.2652 16.8946 12.5196 16.7071 12.7071C16.5196 12.8946 16.2652 13 16 13C15.7348 13 15.4804 12.8946 15.2929 12.7071C15.1054 12.5196 15 12.2652 15 12C15 11.7348 15.1054 11.4804 15.2929 11.2929C15.4804 11.1054 15.7348 11 16 11C16.2652 11 16.5196 11.1054 16.7071 11.2929C16.8946 11.4804 17 11.7348 17 12ZM12 16C12 16.2652 11.8946 16.5196 11.7071 16.7071C11.5196 16.8946 11.2652 17 11 17C10.7348 17 10.4804 16.8946 10.2929 16.7071C10.1054 16.5196 10 16.2652 10 16C10 15.7348 10.1054 15.4804 10.2929 15.2929C10.4804 15.1054 10.7348 15 11 15C11.2652 15 11.5196 15.1054 11.7071 15.2929C11.8946 15.4804 12 15.7348 12 16ZM12 12C12 12.2652 11.8946 12.5196 11.7071 12.7071C11.5196 12.8946 11.2652 13 11 13C10.7348 13 10.4804 12.8946 10.2929 12.7071C10.1054 12.5196 10 12.2652 10 12C10 11.7348 10.1054 11.4804 10.2929 11.2929C10.4804 11.1054 10.7348 11 11 11C11.2652 11 11.5196 11.1054 11.7071 11.2929C11.8946 11.4804 12 11.7348 12 12ZM7 16C7 16.2652 6.89464 16.5196 6.70711 16.7071C6.51957 16.8946 6.26522 17 6 17C5.73478 17 5.48043 16.8946 5.29289 16.7071C5.10536 16.5196 5 16.2652 5 16C5 15.7348 5.10536 15.4804 5.29289 15.2929C5.48043 15.1054 5.73478 15 6 15C6.26522 15 6.51957 15.1054 6.70711 15.2929C6.89464 15.4804 7 15.7348 7 16ZM7 12C7 12.2652 6.89464 12.5196 6.70711 12.7071C6.51957 12.8946 6.26522 13 6 13C5.73478 13 5.48043 12.8946 5.29289 12.7071C5.10536 12.5196 5 12.2652 5 12C5 11.7348 5.10536 11.4804 5.29289 11.2929C5.48043 11.1054 5.73478 11 6 11C6.26522 11 6.51957 11.1054 6.70711 11.2929C6.89464 11.4804 7 11.7348 7 12Z" fill="#181818" />
                    </svg>
                  </div>
                  <label className={`absolute text-sm text-slate-600 duration-300 transform ${isFocused || end_date ? "scale-75 -translate-y-5" : "scale-100 translate-y-0"} top-3 z-10 origin-[0] start-2.5 bg-white px-1 pointer-events-none`}>
                    Date of Expiry
                  </label>
                </div>

                <div className="relative w-full mb-5">
                  <input
                    type="text"
                    id="address"
                    value={`${latitude&&latitude} ${longitude&&longitude}`}
                    onChange={handleInputChange}
                    className="block rounded-md px-2.5 pb-2.5 pt-2 w-full text-md text-slate-800 border-slate-200 border appearance-none focus:outline-none focus:ring-0 peer"
                    placeholder=" "
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.132 18.737C3.5759 17.8698 2.27971 16.6027 1.37746 15.0666C0.475215 13.5306 -0.00033212 11.7814 1.74026e-07 10C1.74026e-07 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20.0003 11.7814 19.5248 13.5306 18.6225 15.0666C17.7203 16.6027 16.4241 17.8698 14.868 18.737L13.972 16.946C15.503 16.0702 16.7016 14.7129 17.3814 13.0854C18.0612 11.4579 18.1841 9.65135 17.731 7.94676C17.2779 6.24217 16.2741 4.73511 14.8759 3.66C13.4776 2.58488 11.7633 2.00199 9.9995 2.00199C8.23571 2.00199 6.52136 2.58488 5.12312 3.66C3.72488 4.73511 2.72113 6.24217 2.268 7.94676C1.81488 9.65135 1.93778 11.4579 2.6176 13.0854C3.29742 14.7129 4.49603 16.0702 6.027 16.946L5.132 18.737ZM6.924 15.153C5.79634 14.4798 4.9207 13.4552 4.43143 12.2365C3.94215 11.0177 3.86627 9.67207 4.21543 8.40602C4.56459 7.13997 5.31949 6.02345 6.36432 5.22776C7.40915 4.43208 8.68619 4.00117 9.9995 4.00117C11.3128 4.00117 12.5899 4.43208 13.6347 5.22776C14.6795 6.02345 15.4344 7.13997 15.7836 8.40602C16.1327 9.67207 16.0568 11.0177 15.5676 12.2365C15.0783 13.4552 14.2027 14.4798 13.075 15.153L12.177 13.356C12.9008 12.8864 13.4534 12.1954 13.7523 11.3861C14.0512 10.5767 14.0804 9.69244 13.8355 8.86514C13.5907 8.03783 13.0849 7.31187 12.3937 6.79557C11.7024 6.27927 10.8628 6.00031 10 6.00031C9.13722 6.00031 8.29757 6.27927 7.60633 6.79557C6.91509 7.31187 6.40931 8.03783 6.16446 8.86514C5.81488 9.65135 5.93778 11.4579 6.6176 13.0854C7.29742 14.7129 8.49603 16.0702 10.027 16.946L9.132 18.737ZM10 14L13 20H7L10 14Z" fill="#212121" fillOpacity="0.72" />
                    </svg>
                  </div>
                  <label className="absolute text-sm text-slate-600 duration-300 transform scale-75 -translate-y-5 top-3 z-10 origin-[0] start-2.5 bg-white px-1 peer-focus:text-slate-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5">
                    Address
                  </label>
                </div>

                <div className="relative w-full mb-5">
                  <label
                    htmlFor="nationality"
                    className={`absolute text-sm text-slate-600 duration-300 transform ${isNationalityFocused || selectedOption ? "scale-75 -translate-y-5" : "scale-100 translate-y-0"} top-3 z-10 origin-[0] start-2.5 bg-white px-1 pointer-events-none`}
                  >
                    Nationality
                  </label>
                  <Select
                    id="nationality"
                    value={selectedOption}
                    options={countryOptions}
                    placeholder=""
                    styles={customStyles}
                    onChange={setSelectedOption}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    components={{
                      Option: ({ children, ...props }) => (
                        <components.Option {...props}>
                          <div className="flex items-center">
                            {props.data.icon && (
                              <img
                                src={props.data.icon}
                                alt={props.data.value}
                                className="w-5 h-4 mr-2"
                              />
                            )}
                            {children}
                          </div>
                        </components.Option>
                      ),
                      SingleValue: ({ children, ...props }) => (
                        <components.SingleValue {...props}>
                          <div className="flex items-center">
                            {props.data.icon && (
                              <img
                                src={props.data.icon}
                                alt={props.data.value}
                                className="w-5 h-4 mr-2"
                              />
                            )}
                            {children}
                          </div>
                        </components.SingleValue>
                      ),
                    }}
                  />
                </div>

                <div className="mb-5">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Confidence Score</span>
                    <span className="text-sm font-medium text-gray-700">{confidence && confidence}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                    <div
                      className={`${colorClass} text-xs font-medium text-center p-0.5 leading-none rounded-full transition-all duration-1000 ease-out`}
                      style={{
                        width: animated ? `${confidence && confidence}%` : '0%',
                        transitionProperty: 'width'
                      }}
                    >
                      {confidence && confidence}%
                    </div>
                  </div>
                </div>

                {confirmLoading ?
                  <button onClick={handleConfirm} to='/customer-dashboard' type="button" className="bg-gradient-to-r mb-10 from-[#8600D9EB] to-[#470073EB] inline-flex items-center text-white rounded-lg text-sm px-5 py-3 w-full text-center mt-5 justify-center duration-500 ease-in-out hover:from-[#470073EB] hover:to-[#8600D9EB] transition-all">
                    <div className='spinner mx-4'></div> Confirming...
                  </button>
                  :
                  <button onClick={handleConfirm} to='/customer-dashboard' type="button" className="bg-gradient-to-r mb-10 from-[#8600D9EB] to-[#470073EB] inline-flex items-center text-white rounded-lg text-sm px-5 py-3 w-full text-center mt-5 justify-center duration-500 ease-in-out hover:from-[#470073EB] hover:to-[#8600D9EB] transition-all">
                    {done ?
                      <span className='flex flex-row items-center gap-2'>
                        <div className="wrapper mr-2">
                          <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                            <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                            <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                          </svg>
                        </div>
                        Completed
                      </span>
                      :
                      "Get Started"
                    }
                  </button>
                }
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* PIN Modal */}
      <Modal isOpen={isPinOpen} placement='top' className='rounded-md' onOpenChange={onPinOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='font-livvic text-base'>Enter Secure PIN</ModalHeader>
              <ModalBody>
                <div className="flex  space-x-8 justify-center  mt-10 mb-4">
                  {pinDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={el => inputRefs.current[idx] = el}
                      type="password"
                      inputMode="numeric"
                      maxLength="1"
                      value={digit}
                      onChange={e => handlePinChange(e, idx)}
                      onKeyDown={e => handlePinKeyDown(e, idx)}
                      className="w-12 h-12 text-center border rounded-md text-xl"
                    />
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                
                  onPress={() => {
                    handlePinSubmit();
                    onClose();
                  }}
                  className='bg-gradient-to-r text-white from-[#8600D9EB] rounded-md to-[#470073EB]'
                >
                  Next
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Password Modal */}
      <Modal placement='top' className='rounded-md' isOpen={isPasswordOpen} onOpenChange={onPasswordOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='font-livvic text-base'>Set Password</ModalHeader>
              <ModalBody>
                {/* Error Alert */}
                {signupError && (
                  <div id="alert-border-2" className="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800" role="alert">
                    <svg className="shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <div className="ml-3 text-sm font-medium">{signupError}</div>
                    <button type="button" onClick={() => setSignupError('')} className="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" aria-label="Close">
                      <span className="sr-only">Dismiss</span>
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
                    </button>
                  </div>
                )}
                <div className="mb-4">
                  <PhoneInput country={'us'} onlyCountries={['us','gh','ng','ke']} value={phone} onChange={setPhone} inputStyle={{ width: '100%', height: '45px' }} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border text-sm  rounded w-full px-2 py-3  mb-4"
                  placeholder="Password"
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onPress={handlePasswordSubmit}
                  disabled={isSigningUp}
                  className={`bg-gradient-to-r text-white from-[#8600D9EB] rounded-md to-[#470073EB] transition-all ${isSigningUp ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSigningUp ? <><div className='spinner mx-2'></div>Signing up...</> : 'Submit'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default PersonalInformation;