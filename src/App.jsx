import './App.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import OnboardingLayout from './pages/onboarding/OnboardingLayout';
import Welcome from "./pages/onboarding/Welcome"
import Layout from './components/dashboard/Layout';
import Dashboard from './pages/dashboard/Dashboard';
import Customer from './pages/dashboard/Customer';
import SystemAnalytics from './pages/dashboard/SystemAnalytics';
import UserDetails from './pages/dashboard/UserDetails';
function App() {
 

  return (
    <>
       <Router>
  
     <div className='w-full h-full  overflow-hidden'>
     <Routes>
     
      <Route path="/" element={ <Welcome/>} />
      <Route path="/onboarding" element={ <OnboardingLayout/>} />
      <Route path="/onboarding" element={ <OnboardingLayout/>} />
      <Route path="/admin" element={ <Layout><Dashboard/></Layout>} />
      <Route path="/admin/customers" element={ <Layout><Customer/></Layout>} />
      <Route path="/admin/system-analytics" element={ <Layout><SystemAnalytics/></Layout>} />
      <Route path="/admin/user-details/:id" element={ <Layout><UserDetails/></Layout>} />





</Routes>

     </div>
     </Router>
    </>
  )
}

export default App

