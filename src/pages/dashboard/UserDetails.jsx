import { faTrashAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import id1 from "../../assets/img/idcard/image.png";
import id2 from "../../assets/img/idcard/image.png";
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
      setUserDetails(response);
      console.log(response)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handlegetUser();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (date){
      return date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
      });
    }
    else{
      return 'N/A';
    }
   
  };

  const getTimeSinceOnboarding = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const months = (now.getFullYear() - date.getFullYear()) * 12 + now.getMonth() - date.getMonth();
    return `${months} months ago`;
  };

  const LoadingSkeleton = ({ width = 100, height = 20 }) => (
    <SkeletonTheme baseColor="#a118f508" highlightColor="#ffff">
      <Skeleton width={width} height={height} />
    </SkeletonTheme>
  );

  return (
    <div className="w-full h-full pt-24 flex flex-col items-center px-3 bg-[#FBFBFB]">
      <div className='w-full text-slate-700 text-start mb-5 flex justify-between'>
        Customer Details
        <button className="bg-transparent border-slate-400 border rounded-md text-red-600 px-3 py-2">
          <FontAwesomeIcon icon={faTrashAlt} className='mr-1' />
          <span className='font-semibold text-sm'>Deactivate customer</span>
        </button>
      </div>

      <div className="w-full flex flex-row justify-between">
        <div className="w-[60%] h-fit bg-white border border-slate-200 rounded-md p-4">
          <div className='flex flex-col w-full text-start border-b border-slate-400 pb-5 border-dashed'>
            <h6 className='text-2xl font-bold text-slate-800'>
              {isLoading ? <LoadingSkeleton width={200} height={28} /> : userDetails?.IdCard?.first_name}
            </h6>
            <span className='text-sm text-slate-600'>
              {isLoading ? <LoadingSkeleton width={150} /> : `Onboarded ${getTimeSinceOnboarding(userDetails?.User?.created_at)}`}
            </span>
            <span className={`px-3 py-2 w-fit rounded-md ${userDetails?.OnboardingStage?.stage==="completed"?"bg-[#5AD000] ":"bg-[#C2C200]" } ${userDetails?.OnboardingStage?.stage==="completed"?"text-[#02B62F]":"text-[#B4BA00]" }     bg-opacity-10 mt-3 font-semibold text-sm `}>
              {isLoading ? <LoadingSkeleton width={80} /> : userDetails?.OnboardingStage?.stage }
            </span>
          </div>

          <div className='pt-3 flex w-full flex-row justify-between'>
            <div className='flex p-2 flex-col'>
              <span className='text-sm text-slate-600'>Onboarding status</span>
              <span className='text-[#02B62F] my-1'>
                {isLoading ? <LoadingSkeleton width={80} /> : userDetails?.OnboardingStage?.stage || 'Completed'}
              </span>
            </div>
            <div className='flex p-2 flex-col'>
              <span className='text-sm text-slate-600'>Profile type</span>
              <span className='text-slate-900 my-1'>
                {isLoading ? <LoadingSkeleton width={80} /> : userDetails?.User?.account_type}
              </span>
            </div>
            <div className='flex p-2 flex-col'>
              <span className='text-sm text-slate-600'>Date of onboarding</span>
              <span className='text-slate-900 my-1'>
                {isLoading ? <LoadingSkeleton width={80} /> : formatDate(userDetails?.User?.created_at)}
              </span>
            </div>
          </div>
        </div>

        <div className='w-[38%] bg-white border border-slate-200 rounded-md p-4 flex flex-col'>
          <span className='text-slate-600 font-semibold text-start w-full'>Personal Information</span>
          <hr className='my-2 bg-slate-200'/>
          <div className='w-full flex-col text-start'>
            <div className='flex flex-row justify-between w-full mb-1'>
              <span className='font-medium text-slate-800'>First Name</span>
              <span className='text-slate-600 text-base'>
                {isLoading ? <LoadingSkeleton /> : userDetails?.IdCard?.first_name}
              </span>
            </div>

            <div className='flex flex-row justify-between w-full mb-1'>
              <span className='font-medium text-slate-800'>Last Name</span>
              <span className='text-slate-600 text-base'>
                {isLoading ? <LoadingSkeleton /> : userDetails?.IdCard?.last_name}
              </span>
            </div>

            <div className='flex flex-row justify-between w-full mb-1'>
              <span className='font-medium text-slate-800'>Date of Birth</span>
              <span className='text-slate-600 text-base'>
                {isLoading ? <LoadingSkeleton /> : formatDate(userDetails?.IdCard?.date_of_birth)}
              </span>
            </div>

            <div className='flex flex-row justify-between w-full mb-1'>
              <span className='font-medium text-slate-800'>Email:</span>
              <span className='text-slate-600 text-base'>
                {isLoading ? <LoadingSkeleton width={150} /> : userDetails?.User?.email}
              </span>
            </div>

            <div className='flex flex-row justify-between w-full mb-1'>
              <span className='font-medium text-slate-800'>Phone number:</span>
              <span className='text-slate-600 text-base'>
                {isLoading ? <LoadingSkeleton /> : userDetails?.User?.phone}
              </span>
            </div>

            <div className='flex flex-row justify-between w-full mb-1'>
              <span className='font-medium text-slate-800'>Address:</span>
              <span className='text-slate-600 text-base'>
                {isLoading ? <LoadingSkeleton /> : `${userDetails?.IdCard?.street || ''}, ${userDetails?.IdCard?.city || ''}`}
              </span>
            </div>

            <div className='flex flex-row justify-between w-full mb-1'>
              <span className='font-medium text-slate-800'>Nationality:</span>
              <span className='text-slate-600 text-base'>
                {isLoading ? <LoadingSkeleton /> : userDetails?.IdCard?.nationality}
              </span>
            </div>

            <div className='flex flex-row justify-between w-full mb-1'>
              <span className='font-medium text-slate-800'>Gender</span>
              <span className='text-slate-600 text-base'>
                {isLoading ? <LoadingSkeleton /> : userDetails?.IdCard?.gender === 'M' ? 'Male' : 'Female'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full flex bg-white border border-slate-200 rounded-md p-4 flex-col mt-5 mb-20'>
        <span className='text-slate-600 font-semibold text-start w-full'>Document Information</span>
        <hr className='my-2 bg-slate-200'/>
        <div className='w-full flex-col text-start'>
          <div className='flex flex-row justify-between w-full mb-1'>
            <span className='font-medium text-slate-800'>Document type:</span>
            <span className='text-slate-600 text-base'>
              {isLoading ? <LoadingSkeleton /> : userDetails?.IdCard?.document_type}
            </span>
          </div>

          <div className='flex flex-row justify-between w-full mb-1'>
            <span className='font-medium text-slate-800'>ID card issue date:</span>
            <span className='text-slate-600 text-base'>
              {isLoading ? <LoadingSkeleton /> : formatDate(userDetails?.IdCard?.date_of_issue)}
            </span>
          </div>

          <div className='flex flex-row justify-between w-full mb-1'>
            <span className='font-medium text-slate-800'>ID card expiry date:</span>
            <span className='text-slate-600 text-base flex flex-row justify-center items-center'>
              {isLoading ? <LoadingSkeleton /> : (
                <>
                  {formatDate(userDetails?.IdCard?.date_of_expiry)}
                  {/*<FontAwesomeIcon icon={faInfoCircle} className='text-red-400 text-xs ml-2' />*/}
                  
                </>
              )}
            </span>
          </div>

          <div className='flex flex-row justify-between w-full mb-1'>
            <span className='font-medium text-slate-800'>Place of birth</span>
            <span className='text-slate-600 text-base'>
              {isLoading ? <LoadingSkeleton /> : `${userDetails?.IdCard?.city||""}, ${userDetails?.IdCard?.country||""}`}
            </span>
          </div>
        </div>

        <hr className='my-2 bg-slate-200'/>

        <div className="text-sm font-medium text-center text-gray-500">
          <ul className="flex flex-wrap -mb-px">
            <li className="me-2">
              <a href="#" className="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active" aria-current="page">Images</a>
            </li>
            <li className="me-2">
              <a href="#" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300">Confidentiality Level</a>
            </li>
          </ul>
        </div>

        <div className='w-full flex flex-row justify-between'>
          <div className='w-full mt-5 flex flex-row justify-between'>
            {isLoading ? (
              <>
                <div className='w-[48%] h-[300px]'>
                  <LoadingSkeleton height={300}  width="100%"/>
                </div>
                <div className='w-[48%] h-[300px]'>
                  <LoadingSkeleton height={300}  width="100%" />
                </div>
              </>
            ) : (
              <>

                <div className='w-[48%] h-[300px]'>
               
                  <img className="h-full w-full object-cover transition-all duration-300 rounded-lg blur-sm hover:blur-none" src={id1} alt="ID Front" />
                </div>
                <div className='w-[48%] h-[300px]'>
                  <img className="h-full w-full object-cover transition-all duration-300 rounded-lg blur-sm hover:blur-none" src={id2} alt="ID Back" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className='my-10 opacity-0'>dsds</div>
    </div>
  );
}

export default UserDetails;