import { faTrashAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGetCutomerDetailMutation } from '../../features/admin/adminSlice';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function UserDetails() {
  const [getCustomer, { isLoading }] = useGetCutomerDetailMutation();
  const [userDetails, setUserDetails] = useState();
  const { id } = useParams();

  const handlegetUser = async () => {
    try {
      const response = await getCustomer(id).unwrap();
      console.log(response);
      setUserDetails(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handlegetUser();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  };

const getTimeSinceOnboarding = (dateString) => {
  if (!dateString) return 'N/A';
  
  const now = new Date();
  const date = new Date(dateString);
  const diffInMilliseconds = now - date;
  
  // Calculate time differences
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = (now.getFullYear() - date.getFullYear()) * 12 + now.getMonth() - date.getMonth();
  const diffInYears = Math.floor(diffInMonths / 12);

  // Determine the most appropriate time unit
  if (diffInYears > 0) {
    const remainingMonths = diffInMonths % 12;
    if (remainingMonths > 0) {
      return `${diffInYears} year${diffInYears !== 1 ? 's' : ''} and ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''} ago`;
    }
    return `${diffInYears} year${diffInYears !== 1 ? 's' : ''} ago`;
  }
  
  if (diffInMonths > 0) {
    const remainingDays = Math.floor((now - new Date(now.getFullYear(), now.getMonth() - diffInMonths, date.getDate())) / (1000 * 60 * 60 * 24));
    if (remainingDays > 0) {
      return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} and ${remainingDays} day${remainingDays !== 1 ? 's' : ''} ago`;
    }
    return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`;
  }
  
  if (diffInWeeks > 0) {
    const remainingDays = diffInDays % 7;
    if (remainingDays > 0) {
      return `${diffInWeeks} week${diffInWeeks !== 1 ? 's' : ''} and ${remainingDays} day${remainingDays !== 1 ? 's' : ''} ago`;
    }
    return `${diffInWeeks} week${diffInWeeks !== 1 ? 's' : ''} ago`;
  }
  
  if (diffInDays > 0) {
    const remainingHours = diffInHours % 24;
    if (remainingHours > 0) {
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} and ${remainingHours} hour${remainingHours !== 1 ? 's' : ''} ago`;
    }
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
  }
  
  if (diffInHours > 0) {
    const remainingMinutes = diffInMinutes % 60;
    if (remainingMinutes > 0) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} and ${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''} ago`;
    }
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  }
  
  if (diffInMinutes > 0) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
  }
  
  return 'Just now';
};

  const LoadingSkeleton = ({ width = 100, height = 20 }) => (
    <SkeletonTheme baseColor="#a118f508" highlightColor="#ffff">
      <Skeleton width={width} height={height} />
    </SkeletonTheme>
  );

  const getVerificationStatus = () => {
    if (!userDetails) return '';
    if (userDetails.id_card?.verified) return 'Verified';
    if (userDetails.id_card?.is_confirmed) return 'Confirmed';
    return 'Pending Verification';
  };

  const getVerificationColor = () => {
    const status = getVerificationStatus();
    switch (status) {
      case 'Verified': return 'bg-[#5AD000] text-[#02B62F]';
      case 'Confirmed': return 'bg-[#C2C200] text-[#B4BA00]';
      default: return 'bg-gray-200 text-gray-600';
    }
  };

  return (
    <div className="w-full  h-full pt-24 flex flex-col items-center px-3 bg-[#FBFBFB]">
      <div className='w-full text-slate-700 text-start mb-5 flex justify-between'>
        <h2 className="text-xl font-bold font-livvic">Customer Details</h2>
        <button className="bg-transparent border-slate-400 border rounded-md text-red-600 px-3 py-2">
          <FontAwesomeIcon icon={faTrashAlt} className='mr-1' />
          <span className='font-semibold text-sm'>Deactivate customer</span>
        </button>
      </div>

      <div className="w-full flex flex-row justify-between gap-4">
        <div className="w-[60%] h-fit bg-white border border-slate-200 rounded-md p-4">
          <div className='flex font-poppins  flex-col w-full text-start border-b border-slate-400 pb-5 border-dashed'>
            <h6 className='text-xl font-poppins font-semibold text-slate-800'>
              {isLoading ? <LoadingSkeleton width={200} height={28} /> : 
                `${userDetails?.id_card?.first_name || ''} ${userDetails?.id_card?.last_name || ''}`}
            </h6>
            <span className='text-xs text-slate-600'>
              {isLoading ? <LoadingSkeleton width={150} /> : 
                `Onboarded ${getTimeSinceOnboarding(userDetails?.created_at)}`}
            </span>
            <span className={`px-3 py-2 w-fit rounded-md ${getVerificationColor()} bg-opacity-10 mt-3 font-semibold text-sm`}>
              {isLoading ? <LoadingSkeleton width={80} /> : getVerificationStatus()}
            </span>
          </div>

          <div className='pt-3 flex w-full flex-row  font-poppins justify-between'>
            <div className='flex p-2 flex-col'>
              <span className='text-sm text-slate-600'>Onboarding status</span>
              <span className='text-[#02B62F] my-1'>
                {isLoading ? <LoadingSkeleton width={80} /> : userDetails?.onboarding_stage?.stage || 'N/A'}
              </span>
            </div>
            <div className='flex p-2 flex-col'>
              <span className='text-sm text-slate-600'>Document Type</span>
              <span className='text-slate-900 my-1'>
                {isLoading ? <LoadingSkeleton width={80} /> : 
                  userDetails?.id_card?.document_type ? userDetails.id_card.document_type.replace('_', ' ').toUpperCase() : 'N/A'}
              </span>
            </div>
            <div className='flex p-2 flex-col'>
              <span className='text-sm text-slate-600'>Last Login</span>
              <span className='text-slate-900 my-1'>
                {isLoading ? <LoadingSkeleton width={80} /> : formatDate(userDetails?.last_login)}
              </span>
            </div>
          </div>
        </div>

        <div className='w-[38%] bg-white border font-poppins  border-slate-200 rounded-md p-4 flex flex-col'>
          <span className='text-slate-600 font-medium  font-livvic text-start w-full'>Personal Information</span>
          <hr className='my-2 bg-slate-200'/>
          <div className='w-full flex-col text-start'>
            <div className='flex flex-row justify-between w-full mb-1'>
              <span className='font-poppins text-slate-800'>First Name</span>
              <span className='text-slate-600 text-base'>
                {isLoading ? <LoadingSkeleton /> : userDetails?.id_card?.first_name || 'N/A'}
              </span>
            </div>

            <div className='flex flex-row justify-between w-full mb-1'>
              <span className='font-poppins text-slate-800'>Last Name</span>
              <span className='text-slate-600 text-base'>
                {isLoading ? <LoadingSkeleton /> : userDetails?.id_card?.last_name || 'N/A'}
              </span>
            </div>

            <div className='flex flex-row justify-between w-full mb-1'>
              <span className='font-poppins text-slate-800'>Date of Birth</span>
              <span className='text-slate-600 text-base'>
                {isLoading ? <LoadingSkeleton /> : formatDate(userDetails?.id_card?.date_of_birth)}
              </span>
            </div>

            <div className='flex flex-row justify-between w-full mb-1'>
              <span className='font-poppins text-slate-800'>Email:</span>
              <span className='text-slate-600 text-base'>
                {isLoading ? <LoadingSkeleton width={150} /> : userDetails?.email || 'N/A'}
              </span>
            </div>

            <div className='flex flex-row justify-between w-full mb-1'>
              <span className='font-poppins text-slate-800'>Phone number:</span>
              <span className='text-slate-600 text-base'>
                {isLoading ? <LoadingSkeleton /> : userDetails?.phone || 'N/A'}
              </span>
            </div>

            <div className='flex flex-row justify-between w-full mb-1'>
              <span className='font-poppins text-slate-800'>Nationality:</span>
              <span className='text-slate-600 text-base'>
                {isLoading ? <LoadingSkeleton /> : userDetails?.id_card?.nationality ? userDetails.id_card.nationality.charAt(0).toUpperCase() + userDetails.id_card.nationality.slice(1) : 'N/A'}
              </span>
            </div>

            <div className='flex flex-row justify-between w-full mb-1'>
              <span className='font-poppins text-slate-800'>Gender</span>
              <span className='text-slate-600 text-base'>
                {isLoading ? <LoadingSkeleton /> : 
                  userDetails?.id_card?.gender === 'M' ? 'Male' : 
                  userDetails?.id_card?.gender === 'F' ? 'Female' : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full flex bg-white border border-slate-200 rounded-md p-4 flex-col mt-5 mb-20'>
        <span className='text-slate-600 font-medium text-start font-livvic w-full'>Document Information</span>
        <hr className='my-2 bg-slate-200'/>
        <div className='w-full font-poppins flex-col text-start'>
          <div className='flex flex-row justify-between w-full mb-1'>
            <span className='font-poppins text-slate-800'>Document type:</span>
            <span className='text-slate-600 text-base'>
              {isLoading ? <LoadingSkeleton /> : 
                userDetails?.id_card?.document_type ? userDetails.id_card.document_type.replace('_', ' ').toUpperCase() : 'N/A'}
            </span>
          </div>

          <div className='flex flex-row justify-between w-full mb-1'>
            <span className='font-poppins text-slate-800'>Document number:</span>
            <span className='text-slate-600 text-base'>
              {isLoading ? <LoadingSkeleton /> : userDetails?.id_card?.document_number || 'N/A'}
            </span>
          </div>

          <div className='flex flex-row justify-between w-full mb-1'>
            <span className='font-poppins text-slate-800'>ID card issue date:</span>
            <span className='text-slate-600 text-base'>
              {isLoading ? <LoadingSkeleton /> : formatDate(userDetails?.id_card?.date_of_issue)}
            </span>
          </div>

          <div className='flex flex-row justify-between w-full mb-1'>
            <span className='font-poppins text-slate-800'>ID card expiry date:</span>
            <span className='text-slate-600 text-base flex flex-row justify-center items-center'>
              {isLoading ? <LoadingSkeleton /> : (
                <>
                  {formatDate(userDetails?.id_card?.date_of_expiry)}
                  {userDetails?.id_card?.date_of_expiry && new Date(userDetails.id_card.date_of_expiry) < new Date() && (
                    <FontAwesomeIcon icon={faInfoCircle} className='text-red-400 text-xs ml-2' />
                  )}
                </>
              )}
            </span>
          </div>

          <div className='flex flex-row justify-between w-full mb-1'>
            <span className='font-poppins text-slate-800'>Place of birth</span>
            <span className='text-slate-600 text-base'>
              {isLoading ? <LoadingSkeleton /> : 
                `${userDetails?.id_card?.state || ''}, ${userDetails?.id_card?.country ? userDetails.id_card.country.charAt(0).toUpperCase() + userDetails.id_card.country.slice(1) : ''}`}
            </span>
          </div>
        </div>

        <hr className='my-2 bg-slate-200'/>

        <div className="text-sm font-poppins text-center text-gray-500">
          <ul className="flex flex-wrap -mb-px">
            <li className="me-2">
              <a href="#" className="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active" aria-current="page">Images</a>
            </li>
          </ul>
        </div>

        <div className='w-full mt-5 flex flex-row justify-between gap-4'>
          {isLoading ? (
            <>
              <div className='w-[48%] h-[300px]'>
                <LoadingSkeleton height={300} width="100%"/>
              </div>
              <div className='w-[48%] h-[300px]'>
                <LoadingSkeleton height={300} width="100%" />
              </div>
            </>
          ) : (
            <>
              {userDetails?.id_card?.urls?.length >= 2 && (
                <>
                  <div className='w-[48%] h-[300px] border rounded-md overflow-hidden'>
                    <img 
                      className="h-full w-full object-contain transition-all duration-300 rounded-lg" 
                      src={userDetails.id_card.urls[0]} 
                      alt="ID Front" 
                    />
                  </div>
                  <div className='w-[48%] h-[300px] border rounded-md overflow-hidden'>
                    <img 
                      className="h-full w-full object-contain transition-all duration-300 rounded-lg" 
                      src={userDetails.id_card.urls[1]} 
                      alt="ID Back" 
                    />
                  </div>
                </>
              )}
              {userDetails?.id_card?.urls?.length === 1 && (
                <div className='w-full h-[300px] border rounded-md overflow-hidden'>
                  <img 
                    className="h-full w-full object-contain transition-all duration-300 rounded-lg" 
                    src={userDetails.id_card.urls[0]} 
                    alt="ID Document" 
                  />
                </div>
              )}
              {(!userDetails?.id_card?.urls || userDetails.id_card.urls.length === 0) && (
                <div className='w-full text-center py-10 text-gray-500'>
                  No document images available
                </div>
              )}
            </>
          )}
        </div>

        {userDetails?.id_card?.urls?.length >= 3 && (
          <div className='w-full mt-5 flex justify-center'>
            <div className='w-[48%] h-[300px] border rounded-md overflow-hidden'>
              <img 
                className="h-full w-full object-contain transition-all duration-300 rounded-lg" 
                src={userDetails.id_card.urls[2]} 
                alt="Selfie" 
              />
            </div>
          </div>
        )}
      </div>

      <div className='my-10 opacity-0'>dsds</div>
    </div>
  );
}

export default UserDetails;