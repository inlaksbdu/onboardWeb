import React from 'react'
import OrganisationsTable from '../../components/tables/Organisations'
function Organistion() {
  return (
     <div className="w-full h-full pt-24  flex flex-col items-center    px-3 bg-[#FBFBFB]">
    <div className='w-full text-slate-700 text-start mb-5 font-livvic font-semibold'>
    Organisations

    </div>

    <div className='mt-5  w-full'>

        <OrganisationsTable/>

    </div>

   
   
    </div>
  )
}

export default Organistion