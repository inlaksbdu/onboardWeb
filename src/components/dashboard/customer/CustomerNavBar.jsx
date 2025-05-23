import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars ,faBell} from '@fortawesome/free-solid-svg-icons';
import profile from '../../../assets/img/profile/profile.jpeg'
import PropTypes from "prop-types"
import { useGetCardDataMutation } from '../../../features/auth/authApiSlice';
import { useEffect,useState } from 'react';

function CustomerNavBar({sidebarReduced,toggleSidebar}) {
    const [firstName, setFirstName] = useState('');

    const [getCardData, { isLoading }] = useGetCardDataMutation()

    const handleGetCardData=async ()=>{
        const data=await getCardData().unwrap();
        console.log(data)
        setFirstName(data.first_name.content)
    }

    useEffect(()=>{
        handleGetCardData()

    },[])
  return (
   
    

<nav className={` bg-[#FBFBFB] transition-all duration-300 ease-in-out border-gray-200 ${sidebarReduced?" lg:pl-[10%]":"2lg:pl-[22%] pl-[25%] "} max-lg:pl-0  border-b shadow-md shadow-slate-100 w-full   absolute top-0  z-20 `}>
  <div className="flex items-center justify-between  px-4 py-3 w-full">


<div className='flex flex-row justify-center items-center gap-4 '>
<div className='text-start  flex justify-start'>
<FontAwesomeIcon icon={faBars}  onClick={toggleSidebar} className='text-slate-600  h-6 w-6' />

</div>
<div className=' flex flex-row  text-sm'>

    <span className='opacity-60 '> Welcome,</span>

   <p className='opacity-100 lowercase ml-1 '> {firstName&&firstName}</p>
  
</div>
</div>
<div className='mx-2'>
    


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
<svg width="14" height="8" viewBox="0 0 14 8" className='mt-1' fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M6.28898 7.15706L0.631985 1.50006L2.04598 0.0860596L6.99599 5.03606L11.946 0.0860596L13.36 1.50006L7.70299 7.15706C7.51546 7.34453 7.26115 7.44985 6.99599 7.44985C6.73082 7.44985 6.47651 7.34453 6.28898 7.15706Z" fill="#8600D9"/>
</svg>

 
</div>
    
</div>
  </div>
</nav>

  )
}
CustomerNavBar.propTypes ={
  sidebarReduced: PropTypes.bool,
  toggleSidebar: PropTypes.func,
}

export default CustomerNavBar