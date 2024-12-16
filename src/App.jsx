import './App.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import OnboardingLayout from './pages/onboarding/OnboardingLayout';
import Welcome from "./pages/onboarding/Welcome"
import Layout from './components/dashboard/Layout';
import Dashboard from './pages/dashboard/Dashboard';
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


</Routes>

     </div>
     </Router>
    </>
  )
}

export default App

