import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars ,faBell} from '@fortawesome/free-solid-svg-icons';
import profile from '../../assets/img/profile/profile.jpeg'
import PropTypes from "prop-types"

function Navbar({sidebarReduced,toggleSidebar}) {
  return (
   
    

<nav className={` bg-[#FBFBFB] transition-all duration-300 ease-in-out border-gray-200 ${sidebarReduced?" lg:pl-[10%]":"2lg:pl-[22%] pl-[25%] "} max-lg:pl-0  border-b shadow-md shadow-slate-100 w-full   absolute top-0  `}>
  <div className="flex items-center justify-between  px-4 py-3 w-full">

<div className='text-start  flex justify-start'>
<FontAwesomeIcon icon={faBars}  onClick={toggleSidebar} className='text-slate-600  h-6 w-6' />

</div>
<div>
    <h1 className='text-slate-700 max-lg:text-sm max-sm:hidden '>Customer Onboarding Dashboard</h1>
  
</div>
<div className='mx-2'>
    
<form className="max-w-md mx-auto">   
    <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative xl:w-96 lg:w-72 ">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" className="block w-full px-4 py-3 ps-10 text-sm text-slate-700 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#8600D9EB] focus:border-[#8600D9EB] focus:outline-none " placeholder="Search by name, ID, or application number " required />
    </div>
</form>

</div>

<div className='flex flex-row  justify-center items-center'>
<div className='flex flex-row  justify-center items-center'>

<FontAwesomeIcon icon={faBell} className='w-5 h-5 text-slate-600'  />
<div className='h-8 w-[1px] bg-slate-200 mx-2'></div>
<div className='h-8 w-8 rounded-full'>
    <img className='w-full h-full object-cover rounded-full' src={profile} />
</div>


</div>

<div className='flex flex-row justify-center items-center mx-2'>
<span className='text-slate-800 text-sm mr-2'>Admin</span>
<svg width="14" height="8" viewBox="0 0 14 8" className='mt-1' fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M6.28898 7.15706L0.631985 1.50006L2.04598 0.0860596L6.99599 5.03606L11.946 0.0860596L13.36 1.50006L7.70299 7.15706C7.51546 7.34453 7.26115 7.44985 6.99599 7.44985C6.73082 7.44985 6.47651 7.34453 6.28898 7.15706Z" fill="#8600D9"/>
</svg>

 
</div>
    
</div>
  </div>
</nav>

  )
}
Navbar.propTypes ={
  sidebarReduced: PropTypes.bool,
  toggleSidebar: PropTypes.func,
}

export default Navbar