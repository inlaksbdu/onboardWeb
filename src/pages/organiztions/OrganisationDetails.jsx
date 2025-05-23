import React, { useEffect } from 'react'
import OrganisationsTable from '../../components/tables/Organisations'
import { useGetOrganizationDetailsMutation } from '../../features/auth/authApiSlice'
import { useParams } from 'react-router-dom'
import { useWhoAmIMutation } from '../../features/auth/authApiSlice'
function OrganistionDetails() {

    const [getOrganizations, { isLoading, data }] = useGetOrganizationDetailsMutation()
    const [whoAmI, { isLoading: isLoading2, data: data2 }] = useWhoAmIMutation()

    const {id}=useParams()

    const handleGetOrganisationDetails=async ()=>{
        try {
          const response=  await getOrganizations(id).unwrap();
          console.log(response);
        } catch (error) {
            console.error('Failed to fetch organizations:', error);
        }
    }


    const handleGetWhoAmI=async()=>{
        try{

            const response=  await whoAmI({body:{org_id:id},id:id}).unwrap();
            console.log(response);

        }
        catch(e){
            console.log(e)
        }
    }




    useEffect(()=>{

        handleGetOrganisationDetails()
        handleGetWhoAmI()
    },[])
  return (
     <div className="w-full h-full pt-24  flex flex-col items-center    px-3 bg-[#FBFBFB]">

        <div>
            
        </div>
    <div className='w-full text-slate-700 text-start mb-5 font-livvic font-semibold'>
    Organisations Details

    </div>

    <div className='mt-5  w-full'>
              <div className="grid grid-cols-[200px_1fr] gap-y-6 text-start">
                       <span className="text-[#000000] text-base">Name</span>
        <span className="text-[#000000] font-semibold text-base">
            {
                data?.name
            }

 
        </span>

</div>


    </div>

   
   
    </div>
  )
}

export default OrganistionDetails