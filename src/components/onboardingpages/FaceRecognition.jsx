import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import Select from 'react-select';
import face from "../../assets/img/svg/faceid.svg";
import logo from "../../assets/img/svg/logo.svg";
import { Camera } from 'lucide-react';
import { useOCRMutation } from "../../features/onboarding/OnboadingApiSlice";



function FaceRecognition({ setTab }) {
  const [image, setImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [sendOCR,{isLoading}] = useOCRMutation()
  const [done, setDone] = useState(false)
  const [selfies, setSelfies] = useState(null)
  const [responseError,setRsponseError] = useState()

  useEffect(() => {
    // Remove separator from react-select
    const elements = document.getElementsByClassName('css-1u9des2-indicatorSeparator');
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
    }
  }, []);

  const countryOptions = [
    {
      value: "English",
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
      value: "French",
      label: (
        <div className="w-full justify-between items-center flex-row text-xs flex">
          French
          <img
            src="https://flagcdn.com/w40/fr.png"
            alt="French"
            className="rounded-full"
            style={{ width: 17, height: 17, marginLeft: 10 }}
          />
        </div>
      ),
    },
  ];

  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "white",
      color: "#374151",
      border: state.isFocused ? "1px solid #9ca3af" : "1px solid #e5e7eb",
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      borderRadius: "0.5rem",
      height: "33px",
      transition: "all 0.3s ease",
      "&:hover": {
        borderColor: "#d1d5db",
      },
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "0.5rem",
      zIndex: 5,
      height: "250px",
      overflowY: "scroll",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#e5e7eb" : "transparent",
      color: "#374151",
      padding: "5px 5px",
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

  const initializeCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError('Failed to access camera');
      console.error(err);
    }
  };

  const captureImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL('image/png');
    setImage(imageData);
    setShowCamera(false);
    cleanup();
  };

  const cleanup = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setSelfies(file)
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = async () => {
    try {
      const formData = new FormData();
  
      // Function to convert base64 to File object
      const base64ToFile = async (base64String, fileName) => {
        // Get the base64 data part
        const base64Data = base64String.split(',')[1];
        // Convert base64 to blob
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/png' });
        
        return new File([blob], fileName, { type: 'image/png' });
      };
  
      // Add front image
     
      
      const frontImage = await  base64ToFile(localStorage.getItem('front'),'front.png');
      formData.append('image_front',frontImage);

      if (localStorage.getItem("back")){

       
        const backdata= await base64ToFile(localStorage.getItem("back"),'back.png')
        formData.append("image_back",backdata)
      }
 
      console.log(image)
      if (image) {
        const selfie= await base64ToFile(image, 'selfie.png');
        console.log(selfie)
        formData.append('selfie', selfie);
      }
    
      // Send the request
   const response = await sendOCR(formData).unwrap();
      
      console.log(response)
      setDone(true);
      setTimeout(() => {
       
        setTab("tab4"); // Navigate to the next tab or page
      }, 1500)
    } catch (error) {
      console.error('Document verification failed:', error);
      // Handle error appropriately
      if (error.status === 415) {
        setRsponseError({
          detail:"Invalid file type. Please upload only image files."
        })
      } else if (error.status === 400) {
        if (error.data.detail.reasons){
          if (error.data.detail.reasons[0].decision==="reject"){
       
  setRsponseError({
    detail: ` We couldn't verify that your selfie is a live photo. Please take a new selfie in good lighting, facing the camera directly.`
    
  })
          }
        
       
        }

        else if (error.data.detail==="Document already uploaded"){
          setRsponseError({
            detail: "Document already uploaded,try again with a different document"
            
          })
        }
        else{
        setRsponseError({
          detail:"Document verification failed. Please try again."
        })
      }
      } 
      else if (error.status === 500) {
        error?.data?.detail==="Error: 400: ID card already exists"?
        setRsponseError({
          detail:"Id Card Already Exist"
        })
      
        :
        setRsponseError({
          detail:"Please provide a valid id,Try again!"
        })
      }
       else {
        alert('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="w-full h-full justify-center items-center overflow-y-scroll">
      <div className="w-full flex justify-center items-center mt-11 pb-10 pt-3 max-sm:px-4 max-xs:px-3">
        <div className="md:w-[50%] sm:w-[65%] xs:w-[80%] w-[96%] border pb-8 pt-3 max-md:px-3 md:px-5 rounded-lg shadow bg-[#FBFBFB59]">
          <div className="w-full flex justify-end px-4 mb-4">
            <div>
              <Select
                options={countryOptions}
                placeholder="Choose a country"
                styles={customStyles}
                defaultValue={countryOptions[0]}
              />
            </div>
          </div>
          
          <div className="w-full flex justify-center items-center flex-col mb-4">
            <img src={logo} className="mb-2" alt="logo" />
            <h4 className="font-poppins font-semibold text-xl mb-1">
              Face ID Verification
            </h4>
          </div>

          <div className="w-full my-8 flex justify-center items-center">
            <div className="p-4 rounded-full bg-[#F5E4FF] w-fit">
              <img src={face} alt="face verification icon" />
            </div>
          </div>

          <div className="w-full flex flex-col justify-center items-center">
            <div className="w-[90%] flex flex-col text-center justify-center items-center">
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
           
              <div className="text-slate-900 font-semibold w-full">
                Verify Your Identity with Onboard
              </div>
              <div className="text-slate-600 w-full">
                Scan your face within to verify your Identity.
              </div>
            </div>

            {!image && (
              <div className="w-full flex flex-col items-center gap-2 mt-6">
                <div className="text-sm font-medium text-gray-700">Instructions:</div>
                <ul className="text-sm text-gray-600 list-disc list-inside">
                  <li>Ensure good lighting.</li>
                  <li>Face the camera directly.</li>
                  <li>Remove any accessories that obscure your face.</li>
                  <li>Use a plain background.</li>
                </ul>
              </div>
            )}

            {showCamera ? (
              <div className="w-full max-w-md mx-auto p-4">
                <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4 shadow-lg">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={captureImage}
                  className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                >
                  Capture Image
                </button>
              </div>
            ) : (
              !image && (
                <button
                  onClick={() => {
                    setShowCamera(true);
                    initializeCamera();
                  }}
                  className="bg-gradient-to-r mt-6 from-[#8600D9EB] to-[#470073EB] w-[90%] inline-flex items-center text-white rounded-lg text-sm px-5 py-3 font-semibold text-center justify-center duration-500 ease-in-out hover:from-[#470073EB] hover:to-[#8600D9EB] transition-all"
                >
                  Start Camera
                </button>
              )
            )}

            {image && (
              <div className="w-full flex flex-col items-center gap-2 mt-6">
                <div className="text-sm font-medium text-gray-700">Captured Image:</div>
                <div className="relative w-64 h-40">
                  <img src={image} alt="Captured" className="w-full h-full object-cover rounded-lg" />
                  <button
                    onClick={() => setImage(null)}
                    className="absolute top-2 right-2 bg-red-500 text-white py-1 px-[0.4rem] rounded-full text-xs"
                  >
                    ✕
                  </button>
                </div>
                <button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-[#8600D9EB] to-[#470073EB] w-[90%] inline-flex items-center text-white rounded-lg text-sm px-5 py-3 font-semibold text-center justify-center duration-500 ease-in-out hover:from-[#470073EB] hover:to-[#8600D9EB] transition-all"
                >
                  
                  {
          isLoading?
          <><div className="spinner mr-4"></div> Verifying...</>
          :done? 
          (<> 
                  <div className="wrapper mr-2"> <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/> <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
</svg>
</div> Verified </> )
          :"Continue"
        }
                </button>
              </div>
            )}

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

FaceRecognition.propTypes = {
  setTab: PropTypes.func
};

export default FaceRecognition;