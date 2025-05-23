import React , { useState ,useEffect} from 'react'
import IdCardContent from '../../components/IDCardContent';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { User, FileText, LogOut } from 'lucide-react';
import { Popover } from "react-tiny-popover";
import { useGetCardDataMutation } from '../../features/auth/authApiSlice';
function CustomerDashboard() {
     const [cardData, setGetCardData] = useState();
      const [isPopoverOpen, setIsPopoverOpen] = useState(false);
      const [getCardData, { isLoading }] = useGetCardDataMutation();

      const handleGetCustomerCardData = async () => {
        try {
          const response = await getCardData().unwrap();
          setGetCardData(response);
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      };
    
      useEffect(() => {
        handleGetCustomerCardData();
      }, []);
  return (
     <div className="w-full h-full pt-24  flex flex-col items-center    px-3 bg-[#FBFBFB]">
    <div className='w-full text-slate-700 text-start mb-5 font-light'>
    Your onboarding process is complete! Manage your documents and profile.

    </div>

    <div className='w-full text-slate-500 text-start mb-5 font-light mt-5'>
        Document Uploaded
    </div>

 <div className="grid grid-cols-1 w-full md:grid-cols-4 gap-4">
              {isLoading ? (
                <SkeletonTheme baseColor="#a118f508" highlightColor="#ffff">
                  <Skeleton height={"100px"} />
                </SkeletonTheme>
              ) : (
                <Popover
                  isOpen={isPopoverOpen}
                  positions={['right', 'bottom']}
                  onClickOutside={() => setIsPopoverOpen(false)}
                  content={<IdCardContent cardData={cardData} />}
                >
                  <div>
                    <button 
                      onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                      className="w-full bg-white border rounded-lg px-10 py-14 shadow-sm text-center hover:bg-gray-50 transition-colors"
                    >
                      <FileText className="mx-auto text-purple-600 mb-2" size={30} />
                      <p className="text-xs font-medium">{cardData?.document_type}</p>
                    </button>
                  </div>
                </Popover>
              )}
            </div>

    </div>
  )
}

export default CustomerDashboard