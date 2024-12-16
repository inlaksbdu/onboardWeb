import document from "../../assets/img/svg/document.svg"
import PropTypes from "prop-types"


function DocumentScanning({setTab}) {
  return (

    <div className="max-lg:w-[80%]  w-[60%]      justify   max-sm:w-[90%]  h-fit justify-center items-center flex flex-col ">
    
        <div className="w-full text-center mb-24">
            <h4 className="text-2xl text-slate-800 font-semibold">Document Scanning</h4>
        </div>
    
        <div className="w-full flex justify-center items-center mb-10 ">
            
            <div className="p-4 rounded-full bg-[#F5E4FF]">
            <img src={document} />
            </div>
        </div>
        <div className="w-full text-center">
        <h4 className="text-2xl text-slate-800 font-semibold"> Scan your document with Onboard</h4>
    
        <p className="text-base  text-gray-500 mt-2  "> Upload or capture an image of your ID document. Make sure all details are clearly visible.</p>
    
        </div>
        
        <button   onClick={() => setTab('tab4')} type="button" className="bg-gradient-to-r from-[#8600D9EB] to-[#470073EB] inline-flex items-center text-white rounded-lg text-sm px-5 py-3  w-[60%] text-center mt-5  justify-center  duration-500 ease-in-out hover:from-[#470073EB] hover:to-[#8600D9EB] transition-all ">
        Get Started
    
    
    </button>
    
    </div>
  )
}


DocumentScanning.propTypes = {
  setTab: PropTypes.func
};


export default DocumentScanning