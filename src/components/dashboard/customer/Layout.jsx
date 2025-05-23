import { useState } from 'react'
import CustomerNavBar from './CustomerNavBar'
import CustomerSidebar from './CustomerSideBar'
 import PropTypes from "prop-types"

 
function CustomerLayout({children}) {
  const [sidebarReduced,setSideBarReduced]=useState(false)
  const [sidebarShow,setSidebarShow]=useState(false)
  const toggleSidebar=()=>{
    setSideBarReduced(!sidebarReduced)
    setSidebarShow(!sidebarShow)
  }
  
  

  return (
    <div className='w-full h-screen flex flex-row  overflow-x-hidden overflow-y-scroll  '>
    <CustomerNavBar toggleSidebar={toggleSidebar}  sidebarReduced={sidebarReduced} />
    <CustomerSidebar toggleSidebar={toggleSidebar} sidebarShow={sidebarShow}  sidebarReduced={sidebarReduced} />
    <div className={` ${ sidebarReduced?"lg:pl-[10%]": ' 2lg:pl-[23%] lg:pl-[25%]'}  transition-all duration-300 ease-in-out w-full h-full  max-lg:w-full flex justify-center items-center `} >

{children}     
    </div>

    </div>
  )
}

CustomerLayout.propTypes = {
  children: PropTypes.element,
};
export default CustomerLayout