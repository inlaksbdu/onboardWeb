import { useState } from 'react'
 import Navbar from './Navbar'
 import Sidebar from './Sidebar'
 import PropTypes from "prop-types"

 
function Layout({children}) {
  const [sidebarReduced,setSideBarReduced]=useState(false)
  const [sidebarShow,setSidebarShow]=useState(false)
  const toggleSidebar=()=>{
    setSideBarReduced(!sidebarReduced)
    setSidebarShow(!sidebarShow)
  }
  
  

  return (
    <div className='w-full h-screen flex flex-row  overflow-x-hidden overflow-y-scroll  '>
    <Navbar toggleSidebar={toggleSidebar}  sidebarReduced={sidebarReduced} />
    <Sidebar toggleSidebar={toggleSidebar} sidebarShow={sidebarShow}  sidebarReduced={sidebarReduced} />
    <div className={` ${ sidebarReduced?"lg:pl-[10%]": ' 2lg:pl-[23%] lg:pl-[25%]'}  transition-all duration-300 ease-in-out w-full h-full  max-lg:w-full flex justify-center items-center `} >

{children}     
    </div>

    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.element,
};
export default Layout