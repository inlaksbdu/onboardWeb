 import face from "../../assets/img/svg/faceid.svg"
 import PropTypes from "prop-types"
 import logo from "../../assets/img/svg/logo.svg";
import { useEffect } from "react";
import Select from 'react-select'
import { Link } from "react-router-dom";

function FaceRecognition({setTab}) {
  
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
  
  
  return (

    <div className="w-full h-full justify-center items-center overflow-y-scroll">
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
            
          Face ID Verification 
          </h4>
         
        </div>
        <div className="w-full my-8 flex justify-center items-center" >
       
        <div className="p-4 rounded-full bg-[#F5E4FF] w-fit">
        <img src={face} />
        </div>

        </div>
        <div className="w-full flex  flex-col justify-center items-center">
          
          <div className="w-full flex flex-col justify-center items-center mt-0">
           
        <div className=" w-full flex justify-center items-center flex-col">
       

       

          <div className="w-full  justify-center items-center flex flex-col">
        
        <div className="w-[90%] flex flex-col text-center justify-center items-center">
        <div className="text-slate-900 font-semibold w-full">
        Verify Your Identity with Onboard
        </div>
        <div className=" text-slate-600  w-full">
      
        Scan your face within to your Identity.

        </div>
        

        </div>


      <Link
              to="/onboarding"
              type="button"
              onClick={()=>{setTab("tab4")}}
              className="bg-gradient-to-r mt-6 from-[#8600D9EB] to-[#470073EB] w-[90%] inline-flex items-center text-white rounded-lg text-sm px-5 py-3  font-semibold text-center  justify-center duration-500 ease-in-out hover:from-[#470073EB] hover:to-[#8600D9EB] transition-all "
            >
            Get started
           
            </Link>
          </div>

        </div>
        
           
          </div>
        </div>
      </div>
    </div>
  </div>

  

)
}



FaceRecognition.propTypes = {
  setTab: PropTypes.func

};



export default FaceRecognition