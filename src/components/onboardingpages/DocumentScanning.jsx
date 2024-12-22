import PropTypes from "prop-types";
import { useEffect,useState } from "react";
import Select from "react-select";
import logo from "../../assets/img/svg/logo.svg";
import documentsvg from "../../assets/img/svg/document.svg";
import { Camera } from "lucide-react";
import CameraView from "./CameraView";


function DocumentScanning({ setTab }) {
  const [selectedIdType, setSelectedIdType] = useState(null);
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [currentSide, setCurrentSide] = useState(null);
  const [getStarted,setGetStarted] =useState(false);

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

  const renderImageCapture = () => {
    const isBackRequired = selectedIdType?.requiresBack;
    const isFrontComplete = !!frontImage;
    const isBackComplete = !!backImage;
    console.log(selectedIdType)

    return (
      <div className="w-full space-y-4">
        {/* Front Image Capture */}
        <div className="w-full flex flex-col items-center gap-2">
          <div className="text-sm font-medium text-gray-700">Front of {selectedIdType&&selectedIdType?.label}</div>
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
              <div className="text-center">
                <button
                  onClick={() => startCapture('front')}
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <Camera className="w-8 h-8 text-gray-400" />
                  <span className="text-sm text-gray-500">Capture Front</span>
                </button>
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
                <div className="text-center">
                  <button
                    onClick={() => startCapture('back')}
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Camera className="w-8 h-8 text-gray-400" />
                    <span className="text-sm text-gray-500">Capture Back</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Continue Button */}
        {((isBackRequired && isFrontComplete && isBackComplete) || 
          (!isBackRequired && isFrontComplete)) && (
          <button
          onClick={()=>{setTab("tab3")}}
            className="bg-gradient-to-r from-[#8600D9EB] to-[#470073EB] w-full inline-flex items-center text-white rounded-lg text-sm px-5 py-3 font-semibold text-center justify-center duration-500 ease-in-out hover:from-[#470073EB] hover:to-[#8600D9EB] transition-all"
          >
            Continue
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
