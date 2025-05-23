import Logo from "../../../assets/img/svg/logo.svg"
import { faTimes} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types"
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Users } from "lucide-react";

function CustomerSidebar({sidebarReduced,toggleSidebar}) {

    const navigate=useNavigate()

    const dispatch=useDispatch()

    const handleLogout=()=>{
        dispatch(logOut())
        navigate("/")
    }


  return (
    <div className={`  transition-all max-lg:duration-500 duration-300 ease-in-out  ${sidebarReduced? 'lg:w-[10%]  max-lg:-translate-x-0 ':'2lg:w-[22%]  lg:w-[25%]  max-lg:-translate-x-96 '}  max-lg:w-[32%] max-md:w-[45%] max-sm:w-[50%] max-xs:w-[65%] max-vsm:w-[85%] overflow-x-hidden max-lg:absolute lg:fixed  h-full z-30 bg-white border-r border-slate-200  py-4 px-3 flex flex-col`}>

<div className="absolute right-4 top-4 lg:hidden">
        <FontAwesomeIcon icon={faTimes} className='text-slate-600'  size="xl"  onClick={toggleSidebar} />

</div>

        <div className="w-[90%] flex flex-row justify-center items-center mb-12 max-lg:mt-5 ">
        <img src={Logo} alt="logo" className="h-12 w-12  " />
        <div className={`ml-4 text-[22px] font-bold bg-text-gradient bg-clip-text text-transparent  ${sidebarReduced ? "lg:w-0 lg:overflow-hidden" : "w-fit"}`}>
     
        Onboard
        </div>

        </div>

<div className="w-full flex flex-col justify-center items-center  space-y-4 ">




<Link to='/customer-dashboard'
          className=" group flex  w-[90%] px-6  items-center  rounded-md  py-3  bg-white hover:bg-text-gradient  hover:to-[#470073EB]   transition duration-500 ease-in-out   0 transform   text-center  "
        >
          


<svg className="mr-2 " width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 0.75H5C3.067 0.75 1.5 2.317 1.5 4.25V15.75C1.5 17.683 3.067 19.25 5 19.25H13C14.933 19.25 16.5 17.683 16.5 15.75V4.25C16.5 2.317 14.933 0.75 13 0.75Z" stroke="#475569"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.5 4.755H12.5M5.5 8.755H12.5M5.5 12.755H9"  stroke="#475569"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

       

          <span
            className={`transition-all  text-slate-600 group-hover:text-white font-medium duration-700 ease-in-out ${
              sidebarReduced ? "lg:w-0 lg:overflow-hidden" : "w-fit"
            }`}
            style={{ whiteSpace: "nowrap" }}

          >
                    <span className="group-hover:text-white  text-[15px]">Document</span>

           
           

          </span>
        </Link>



      
<Link to='/organisation'
          className=" group flex  w-[90%] px-6  items-center  rounded-md  py-3  bg-white hover:bg-text-gradient  hover:to-[#470073EB]   transition duration-500 ease-in-out   0 transform   text-center  "
        >
          


<Users className="mr-2 text-[#475569] group-hover:text-white" size={20} />

          <span
            className={`transition-all  text-slate-600 group-hover:text-white font-medium duration-700 ease-in-out ${
              sidebarReduced ? "lg:w-0 lg:overflow-hidden" : "w-fit"
            }`}
            style={{ whiteSpace: "nowrap" }}

          >
                    <span className="group-hover:text-white  text-[15px]">Organization</span>

           
           

          </span>
        </Link>




<button onClick={handleLogout} 
  className="group items-center  flex w-[90%] px-6 rounded-md py-3 bg-white hover:bg-text-gradient hover:to-[#470073EB] transition duration-500 ease-in-out transform text-center"
>



<svg   className='mr-2' width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path     className=" text-slate-600   group-hover:text-white  mr-2"
 d="M12 5V3C12 2.46957 11.7893 1.96086 11.4142 1.58579C11.0391 1.21071 10.5304 1 10 1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3V15C1 15.5304 1.21071 16.0391 1.58579 16.4142C1.96086 16.7893 2.46957 17 3 17H10C10.5304 17 11.0391 16.7893 11.4142 16.4142C11.7893 16.0391 12 15.5304 12 15V13"  stroke="#475569"   stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path     className=" text-slate-600   group-hover:text-white  mr-2"
 d="M7 9H19M19 9L16 6M19 9L16 12" stroke="#475569"   stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>




  <span
            className={`transition-all   text-slate-600 font-medium duration-700 ease-in-out ${
              sidebarReduced ? "lg:w-0 lg:overflow-hidden" : "w-fit"
            }`}
            style={{ whiteSpace: "nowrap" }}

          >  <span className="group-hover:text-white text-[15px] ">Logout</span>
       

          </span>
</button>

</div>
    </div>
  )
}

CustomerSidebar.propTypes={
  sidebarReduced: PropTypes.bool,
  toggleSidebar: PropTypes.func,
 
}

export default CustomerSidebar