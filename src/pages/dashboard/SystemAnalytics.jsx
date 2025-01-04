import { DateRangePicker } from 'react-date-range';
import { useState,useEffect } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import ReportTable from '../../components/dashboard/ReportTable'

function SystemAnalytics() {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  

  const [isMobile, setIsMobile] = useState(false);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 940);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  

  return (
    <div className="w-full h-full pt-24 flex flex-col items-center px-3 bg-[#FBFBFB]">
      <div className="w-full text-slate-700 text-start mb-5">
        System analytics
      </div>

      <div className="w-full flex justify-center items-center">
        <div className="w-full grid grid-cols-3 gap-4 mb-10">
          <div>
            <div className="p-2 text-start">
              <label className="block mb-2 text-sm text-slate-800 font-semibold">
                Account type
              </label>
              <select 
                className="bg-gray-50 border border-slate-300 text-slate-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-slate-400"
              >
                <option value="">Choose account type</option>
                <option value="individual">Individual</option>
                <option value="group">Group</option>
                <option value="sme">SME</option>
              </select>
            </div>
          </div>
          <div>
            <div className="p-2 text-start">
              <label className="block mb-2 text-sm text-slate-800 font-semibold">
               Onboarding Stage 
              </label>
              <select 
                className="bg-gray-50 border border-slate-300 text-slate-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-slate-400"
              >
                <option value="">Choose  stage of onboarding</option>
                <option value="signup">Signup</option>
                <option value="document">Document</option>
                <option value="face">Face</option>
                <option value="address">Address</option>
                <option value="biometric">Biometric</option>
                <option value="complete">Complete</option>

              </select>
            </div>

            
          </div>
          <div className="p-2 text-start">
              <label className="block mb-2 text-sm text-slate-800 font-semibold">
               Age
              </label>
              <select 
                className="bg-gray-50 border border-slate-300 text-slate-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-slate-400"
              >
                <option value="">Choose  age </option>
                <option value="18-25">18-25</option>
                <option value="25-40">25-40</option>
                <option value="41-60">41-60</option>
                <option value="61-200">61+</option>
                

              </select>
            </div>

            <div className="p-2 text-start">
              <label className="block mb-2 text-sm text-slate-800 font-semibold">
               Gender
              </label>
              <select 
                className="bg-gray-50 border border-slate-300 text-slate-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-slate-400"
              >
                <option value="">Choose  gender </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              
                

              </select>
            </div>
          <div className="col-span-3 ">
            <div className="p-2">
              <label className="block mb-2 text-start text-sm text-slate-800 font-semibold">
                Date Range
              </label>
              <DateRangePicker
                onChange={item => setDateRange([item.selection])}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={true}
                months={2}
                ranges={dateRange}
                direction={`${isMobile?"vertical":"horizontal"}`}
                className="border w-full border-slate-300 rounded-lg"
              />
            </div>
          </div>
        </div>

      

    </div>
    <div className="flex justify-center items-center mt-5 w-full">
        
        <ReportTable/>
      </div>
    </div>
  );
}

export default SystemAnalytics;