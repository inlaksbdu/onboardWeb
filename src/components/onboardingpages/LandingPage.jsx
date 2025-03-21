import React, { useEffect, useState } from 'react';
import { User, FileText, LogOut } from 'lucide-react';
import { Popover } from "react-tiny-popover";
import { useGetCardDataMutation } from '../../features/auth/authApiSlice';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import IdCardContent from '../IDCardContent';

const LandingPage = () => {
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
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/api/placeholder/40/40" alt="Profile" className="w-10 h-10 rounded-full mr-3" />
          <div>
            <h1 className="text-xl font-semibold flex flex-row gap-x-2">
              Welcome
              {isLoading ? (
                <SkeletonTheme baseColor="#a118f508" highlightColor="#ffff">
                  <Skeleton height={"30px"} />
                </SkeletonTheme>
              ) : (
                <span>{cardData?.first_name.content}</span>
              )}
            </h1>
          </div>
        </div>
        <div className="flex space-x-4">
          <button className="flex items-center text-purple-600 hover:bg-purple-50 p-2 rounded">
            <FileText size={20} className="mr-2" />
            Documents
          </button>
          <button className="flex items-center text-gray-500 hover:bg-gray-100 p-2 rounded">
            <User size={20} className="mr-2" />
            Profile
          </button>
          <button className="flex items-center text-gray-500 hover:bg-gray-100 p-2 rounded">
            <LogOut size={20} className="mr-2" />
            Log out
          </button>
        </div>
      </nav>

      <div className="container mx-auto p-6">
        <p className="text-gray-600 mb-4">
          Your onboarding process is complete! Manage your documents and profile.
        </p>

        <div className="grid grid-cols-4 gap-4">
          {isLoading ? (
            <SkeletonTheme baseColor="#a118f508" highlightColor="#ffff">
              <Skeleton height={"100px"} />
            </SkeletonTheme>
          ) : (
            <Popover
              isOpen={isPopoverOpen}
              positions={['right', 'bottom']}
              onClickOutside={() => setIsPopoverOpen(false)}
              content={
              <IdCardContent cardData={cardData} />
              }
              
            >
              <div>
                <button 
                  onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                  className="w-full bg-white border rounded-lg p-3 shadow-sm text-center hover:bg-gray-50 transition-colors"
                >
                  <FileText className="mx-auto text-purple-600 mb-2" size={24} />
                  <p className="text-xs font-medium">{cardData?.document_type}</p>
                </button>
              </div>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;