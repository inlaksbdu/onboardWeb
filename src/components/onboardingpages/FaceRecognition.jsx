 import face from "../../assets/img/svg/faceid.svg"
 import PropTypes from "prop-types"


function FaceRecognition({setTab}) {
  return (

  
<div className="max-lg:w-[80%]  max-sm:w-[90%]  justify   w-[60%]  justify-center items-center flex flex-col ">

    <div className="w-full text-center mb-24">
        <h4 className="text-2xl text-slate-800 font-semibold">Face ID Verification</h4>
    </div>

    <div className="w-full flex justify-center items-center mb-10 ">
        
        <div className="p-4 rounded-full bg-[#F5E4FF]">
        <img src={face} />
        </div>
    </div>
    <div className="w-full text-center">
    <h4 className="text-2xl text-slate-800 font-semibold"> Verify Your Identity with Onboard</h4>

    <p className="text-base  text-gray-500 mt-2  "> Scan your face within to your Identity</p>

    </div>
    
    <button  onClick={() => setTab('tab3')} type="button" className="bg-gradient-to-r from-[#8600D9EB] to-[#470073EB] inline-flex items-center text-white rounded-lg text-sm px-5 py-3  w-[60%] text-center mt-5  justify-center  duration-500 ease-in-out hover:from-[#470073EB] hover:to-[#8600D9EB] transition-all ">
    Get Started


</button>

</div>
)
}

FaceRecognition.propTypes = {
    setTab: PropTypes.func
  };
export default FaceRecognition