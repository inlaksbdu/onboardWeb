import logo from '../../assets/img/svg/logo.svg'
import PropTypes from "prop-types"

function SigninComponent({ setTab }) {
  return (
    <div className="max-lg:w-[80%] max-sm:w-[90%]  overflow-hidden w-[60%] border  max-lg:mt-24  border-[#8600D9EB] rounded-lg max-sm:mx-4  grid grid-cols-2 max-md:grid-rows-[1fr,2fr]  max-md:grid-cols-1 ">
      <div id="fit" className="w-full bg-[#FBF4FF80]  border-r border-r-[#efd7fdeb] flex justify-center items-center flex-col ">
        <img src={logo} className="mb-3" alt="logo" />
        <h4 className="font-poppins font-semibold text-3xl mb-2">
          <span className="bg-text-gradient bg-clip-text text-transparent ml-1">
            onboard
          </span>
        </h4>
        <h6 className="text-gray-800 font-semibold text-xl">
          Sign in to Onboard
        </h6>
        <p className="text-base text-gray-500 mt-2">Carefully provide information here</p>
      </div>
      <div className="w-full p-4 flex justify-center items-center text-start flex-col">
        <form className="w-full">
          <div className="w-full py-4 px-2">
            <div className='mb-2'>
              <label htmlFor="email" className="block mb-2 text-base font-medium text-slate-700 ">Email</label>
              <input type="email" id="email" className="bg-gray-50 text-slate-700 border border-slate-200 text-base rounded-lg transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow block w-full p-2.5" placeholder="Enter email" required />
            </div>

            <div className='mb-2'>
              <label htmlFor="password" className="block mb-2 text-base font-medium text-slate-700 ">Password</label>
              <input type="password" id="password" className="bg-gray-50 text-slate-700 border border-slate-200 text-base rounded-lg transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow block w-full p-2.5" placeholder="Enter password" required />
            </div>

            <div className='mb-2'>
              <label htmlFor="confirm_password" className="block mb-2 text-base text-slate-700 font-medium ">Confirm Password</label>
              <input type="confirm_password" id="confirm_password" className="bg-gray-50 text-slate-700 border border-slate-200 text-base rounded-lg transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow block w-full p-2.5" placeholder="Enter confirmation password" required />
            </div>

            <div className='mb-2'>
              <label htmlFor="language" className="block mb-2 text-base text-slate-700 font-medium ">Language</label>
              <select className="bg-gray-50 text-slate-700 border border-slate-200 text-base rounded-lg transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow block w-full p-2.5">
                <option>English</option>
              </select>
            </div>

            <button onClick={() => setTab('tab2')} type="button" className="bg-gradient-to-r from-[#8600D9EB] to-[#470073EB] inline-flex items-center text-white rounded-lg text-sm px-5 py-3 w-full text-center mt-5 justify-center duration-500 ease-in-out hover:from-[#470073EB] hover:to-[#8600D9EB] transition-all">
              Create account
            </button>
          </div>
        </form>
      </div>
    </div>
    
  )
}

SigninComponent.propTypes = {
  setTab: PropTypes.func
};

export default SigninComponent;
