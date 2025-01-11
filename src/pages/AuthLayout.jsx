import { useLocation,Navigate,Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../features/auth/authSlice'
function AuthLayout() {
 

    const token =useSelector(selectCurrentToken)
   
    const location=useLocation()
  return (
    token ?
    <Outlet/>:<Navigate to="/admin/login" state={{from:location}} replace />
  )
}

export default AuthLayout