import PropTypes from "prop-types";
import { useEffect,useState } from "react";
import Select from "react-select";
import logo from "../../assets/img/svg/logo.svg";
import documentsvg from "../../assets/img/svg/document.svg";
import { Camera } from "lucide-react";
import CameraView from "./CameraView";
import { useOCRMutation } from "../../features/onboarding/OnboadingApiSlice";


function DocumentScanning({ setTab }) {
  const [sendOCR, { isLoading }] = useOCRMutation();
  const [selectedIdType, setSelectedIdType] = useState(null);
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [currentSide, setCurrentSide] = useState(null);
  const [getStarted,setGetStarted] =useState(false);
  const [done,setDone]=useState(false)
  const [responseError,setRsponseError] = useState()
  const [success,setSuccess]=useState(false)
  const idTypes = [
    { value: 'national_id', label: 'National ID Card', requiresBack: true },
    { value: 'passport', label: 'Passport', requiresBack: false },
    { value: 'drivers_license', label: 'Driver\'s License', requiresBack: true },
  ];


  useEffect(() => {
    const elements = document.getElementsByClassName("css-1u9des2-indicatorSeparator");
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
            alt="Ghana"
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
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
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


  const handleCameraCapture = (imageData) => {
    if (currentSide === 'front') {
      setFrontImage(imageData);
    } else {
      setBackImage(imageData);
    }
    setShowCamera(false);
    setCurrentSide(null);
  };

  const startCapture = (side) => {
    setCurrentSide(side);
    setShowCamera(true);
  };

 
  
  
// Inside the renderImageCapture function, modify the capture interface:

const renderImageCapture = () => {
  const isBackRequired = selectedIdType?.requiresBack;
  const isFrontComplete = !!frontImage;
  const isBackComplete = !!backImage;

  const handleFileUpload = (e, side) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (side === 'front') {
          setFrontImage(reader.result);
        } else {
          setBackImage(reader.result);
        }
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
      if (frontImage) {
        localStorage.setItem('front', frontImage)
        const frontFile = await base64ToFile(frontImage, 'front.png');
      }
  
      // Add back image if it exists
      if (backImage) {
        localStorage.setItem('back', backImage)
        const backFile = await base64ToFile(backImage, 'back.png');
      }
  
      // Send the request
 //     const response = await sendOCR(formData).unwrap();
      
     
      setDone(true);
      setTimeout(() => {
        setFrontImage(null)
        setBackImage(null)
        setTab("tab3"); // Navigate to the next tab or page
      }, 1500)
    } catch (error) {
      console.error('Document verification failed:', error);
      // Handle error appropriately
      if (error.status === 415) {
        setRsponseError({
          detail:"Invalid file type. Please upload only image files."
        })
      } else if (error.status === 400) {
        setRsponseError({
          detail:"Document verification failed. Please try again."
        })
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
    <div className="w-full space-y-4">
      {/* Front Image Capture */}
      <div className="w-full flex flex-col items-center gap-2">
        <div className="text-sm font-medium text-gray-700">Front of {selectedIdType?.label}</div>
        {frontImage ? (
          <div className="relative w-64 h-40">
            <img src={frontImage} alt="Front ID" className="w-full h-full object-cover rounded-lg" />
            <button
              onClick={() => setFrontImage(null)}
              className="absolute top-2 right-2 bg-red-500 text-white py-1 px-[0.4rem] rounded-full text-xs"
            >
              ✕
            </button>
          </div>
        ) : (
          <div className="w-64 h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
            <div className="text-center space-y-4 flex flex-col justify-center items-center">
              {/* Camera capture button */}
              <button
                onClick={() => startCapture('front')}
                className="cursor-pointer flex flex-col items-center gap-1"
              >
                <Camera className="w-5 h-5 text-gray-400" />
                <span className="text-xs text-gray-500">Capture Front</span>
              </button>
              
              {/* Divider */}
              <div className="flex items-center justify-center">
                <div className="border-t border-gray-300 w-16"></div>
                <span className="mx-2 text-sm text-gray-500">or</span>
                <div className="border-t border-gray-300 w-16"></div>
              </div>
              
              {/* Upload button */}
              <label className="cursor-pointer flex flex-col items-center gap-1">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, 'front')}
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <span className="text-xs text-gray-500">Upload Front</span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Back Image Capture (if required) */}
      {isBackRequired && isFrontComplete && (
        <div className="w-full flex flex-col items-center gap-2">
          <div className="text-sm font-medium text-gray-700">Back of {selectedIdType.label}</div>
          {backImage ? (
            <div className="relative w-64 h-40">
              <img src={backImage} alt="Back ID" className="w-full h-full object-cover rounded-lg" />
              <button
                onClick={() => setBackImage(null)}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs"
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="w-64 h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
              <div className="text-center space-y-4 flex flex-col justify-center items-center">
                {/* Camera capture button */}
                <button
                  onClick={() => startCapture('back')}
                  className="cursor-pointer  flex flex-col items-center gap-1"
                >
                  <Camera className="w-5 h-5 text-gray-400" />
                  <span className="text-xs text-gray-500">Capture Back</span>
                </button>
                
                {/* Divider */}
                <div className="flex items-center justify-center">
                  <div className="border-t border-gray-300 w-16"></div>
                  <span className="mx-2 text-sm text-gray-500">or</span>
                  <div className="border-t border-gray-300 w-16"></div>
                </div>
                
                {/* Upload button */}
                <label className="cursor-pointer flex flex-col items-center gap-1">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, 'back')}
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <span className="text-xs text-gray-500">Upload Back</span>
                </label>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Continue Button */}
      {((isBackRequired && isFrontComplete && isBackComplete) || 
        (!isBackRequired && isFrontComplete)) && (
        <button
          onClick={handleSubmit}
          className="bg-gradient-to-r from-[#8600D9EB] to-[#470073EB] w-full inline-flex items-center text-white rounded-lg text-sm px-5 py-3 font-semibold text-center justify-center duration-500 ease-in-out hover:from-[#470073EB] hover:to-[#8600D9EB] transition-all"
        >

        {
          isLoading?
          <><div className="spinner mr-4"></div> Continue</>
          :done? 
          (<> 
                  <div className="wrapper mr-2"> <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/> <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
</svg>
</div>Continue </> )
          :"Continue"
        }
          
        </button>
      )}
    </div>
  );
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
            <h4 className="font-poppins font-semibold text-xl mb-1">Document scanning</h4>
          </div>
          <div className="w-full my-8 flex justify-center items-center">
            <div className="p-4 rounded-full bg-[#F5E4FF] w-fit">
              <img src={documentsvg} alt="Document Icon" />
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full flex flex-col justify-center items-center mt-0">
              <div className="w-full flex justify-center items-center flex-col">
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
                  {!selectedIdType ? (
            <>

            <div className="text-slate-900 font-semibold w-full">
                    Scan your document with Onboard
                  </div>
                  <div className="text-slate-600 w-full">
                    Upload or capture an image of your ID document. Make sure all details are
                    clearly visible.
                  </div>

{
  getStarted?

            <select
                 value={selectedIdType?.value || ""}
                 onChange={(e) => setSelectedIdType(idTypes.find(option => option.value === e.target.value))}
      className="rounded-md my-2 shadow-md  px-2.5 pb-2.5 pt-2 w-full text-md text-slate-800 border-slate-200 border  appearance-none focus:outline-none focus:ring-0"
    >
      <option value=" " selected hidden>Select id type</option>
      {idTypes.map((option) => (
        <option key={option.value} value={option.value}  >
          {option.label}
        </option>
      ))}
    </select>:""
}
            </>
          ) : (
            <div className="w-full px-4">
              {renderImageCapture()}
            </div>
          )}
             
                </div>

                {showCamera && (
        <CameraView 
          onCapture={handleCameraCapture}
          onClose={() => {
            setShowCamera(false);
            setCurrentSide(null);
          }}
        />
      )}


      {
        getStarted?
        
        "": 
        <button
                  
                  type="button"
                  onClick={()=>{setGetStarted(true)}}
                  className="bg-gradient-to-r mt-6 from-[#8600D9EB] to-[#470073EB] w-[90%] inline-flex items-center text-white rounded-lg text-sm px-5 py-3 font-semibold text-center justify-center duration-500 ease-in-out hover:from-[#470073EB] hover:to-[#8600D9EB] transition-all"
                >
                  Get started
                </button>

      }
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

DocumentScanning.propTypes = {
  setTab: PropTypes.func.isRequired, // Updated to ensure it's mandatory
};

export default DocumentScanning;
