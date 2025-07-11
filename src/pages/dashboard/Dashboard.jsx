import Card from '../../components/dashboard/Card';
import Table from '../../components/dashboard/Table';
import OnboardedCustomersChat from '../../components/charts/OnboardedCustomersChat';
import AgeGenderChart from '../../components/charts/AgeGenderChart';
import DemographyChart from '../../components/charts/DemographyCharts';
import { useGetCustomersMutation,useGetMetricsMutation} from '../../features/admin/adminSlice';
import { useEffect ,useState} from 'react';
import Skeleton ,{ SkeletonTheme}from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useGetDashboardDataMutation } from '../../features/admin/adminSlice';
function Dashboard() {


  const [getCustomers, { isLoading }] = useGetCustomersMutation();
  const [getMetrics, { isLoading:isLoadingMetrics }] = useGetMetricsMutation();
  const [getDashboardData, { isLoading:isLoadingDashboardData }] = useGetDashboardDataMutation();
  const [metrics, setMetrics] = useState();
  const [onboardedCustomers, setOnboardedCustomers] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    stage: "",
    account_type: ""
  });


  const handleGetDashboardData = async () => {
    
    try {
      const response = await getDashboardData().unwrap();
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }
  const handleGetCustomer = async (page = 1, filters = {}) => {
    try {
      const response = await getCustomers({
        page,
        page_size: 10,
        ...filters
      }).unwrap();
      
      setTotalCustomers(response.total);
      setOnboardedCustomers(response.customers);
      setTotalPages(Math.ceil(response.total / 10));
    } catch (e) {
      console.log(e);
    }
  };


  const handlegetMetrics=async()=>{
    try {
      const response = await getMetrics().unwrap();
      console.log(response);
      setMetrics(response);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    handlegetMetrics();
    handleGetDashboardData();
  }, []);

  useEffect(() => {
    handleGetCustomer(currentPage, filters);
  }, [currentPage, filters]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };


  const cards=[  {
    title: 'Total Onboarded Customers',
    icon: (
      <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8.99999 6C9.79564 6 10.5587 5.68393 11.1213 5.12132C11.6839 4.55871 12 3.79565 12 3C12 2.20435 11.6839 1.44129 11.1213 0.87868C10.5587 0.316071 9.79564 0 8.99999 0C8.20434 0 7.44128 0.316071 6.87867 0.87868C6.31606 1.44129 5.99999 2.20435 5.99999 3C5.99999 3.79565 6.31606 4.55871 6.87867 5.12132C7.44128 5.68393 8.20434 6 8.99999 6ZM4.99999 5C4.99999 5.53043 4.78928 6.03914 4.4142 6.41421C4.03913 6.78929 3.53042 7 2.99999 7C2.46956 7 1.96085 6.78929 1.58578 6.41421C1.2107 6.03914 0.99999 5.53043 0.99999 5C0.99999 4.46957 1.2107 3.96086 1.58578 3.58579C1.96085 3.21071 2.46956 3 2.99999 3C3.53042 3 4.03913 3.21071 4.4142 3.58579C4.78928 3.96086 4.99999 4.46957 4.99999 5ZM0.48999 12.326C0.319276 12.229 0.191435 12.0711 0.13199 11.884C-0.0442046 11.3133 -0.0460522 10.7031 0.126683 10.1313C0.299419 9.5596 0.638875 9.05244 1.10158 8.6748C1.56429 8.29716 2.12919 8.06622 2.72393 8.01156C3.31868 7.95691 3.9162 8.08102 4.43999 8.368C3.36334 9.42557 2.68959 10.8258 2.53499 12.327C2.51232 12.5503 2.52066 12.7683 2.55999 12.981C1.83034 12.9169 1.12369 12.6933 0.48999 12.326ZM15.44 12.98C16.1696 12.9162 16.8762 12.693 17.51 12.326C17.6803 12.2288 17.8078 12.071 17.867 11.884C18.0435 11.3133 18.0455 10.7028 17.8729 10.1309C17.7003 9.55901 17.3609 9.05165 16.8981 8.67386C16.4353 8.29606 15.8703 8.06503 15.2754 8.01036C14.6805 7.95569 14.0829 8.07987 13.559 8.367C14.6366 9.42453 15.3111 10.8251 15.466 12.327C15.4885 12.5451 15.4798 12.7654 15.44 12.981M17 5C17 5.53043 16.7893 6.03914 16.4142 6.41421C16.0391 6.78929 15.5304 7 15 7C14.4696 7 13.9608 6.78929 13.5858 6.41421C13.2107 6.03914 13 5.53043 13 5C13 4.46957 13.2107 3.96086 13.5858 3.58579C13.9608 3.21071 14.4696 3 15 3C15.5304 3 16.0391 3.21071 16.4142 3.58579C16.7893 3.96086 17 4.46957 17 5ZM4.30399 13.19C4.20511 13.1019 4.12848 12.9916 4.08034 12.8682C4.0322 12.7448 4.01392 12.6118 4.02699 12.48C4.15419 11.2495 4.73303 10.1098 5.65165 9.28125C6.57026 8.4527 7.76341 7.9941 9.00049 7.9941C10.2376 7.9941 11.4307 8.4527 12.3493 9.28125C13.2679 10.1098 13.8468 11.2495 13.974 12.48C13.9871 12.6118 13.9688 12.7448 13.9206 12.8682C13.8725 12.9916 13.7959 13.1019 13.697 13.19C12.4109 14.3565 10.7363 15.0019 8.99999 15C7.26386 15.0026 5.58927 14.3571 4.30399 13.19Z"
          fill="#8600D9"
        />
      </svg>
    ),
    number: metrics&&metrics?.total_customers ||0,
    percentage: `${metrics&&metrics?.total_customers_change ||0}%`,
    time: 'from Last month',
    action: ` ${metrics && metrics?.total_customers_change > 0 ? "increase" : metrics?.total_customers_change < 0 ? "decrease" : "stable"}`, // Action as string ("increase" or "decrease")
  },
  {
    title: 'Pending Verifications',
    icon: (
    
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M10.418 0.64301C10.2801 0.422647 10.0769 0.250765 9.83672 0.15129C9.59654 0.051814 9.33133 0.029694 9.07799 0.0880095L7.27999 0.50101C7.09573 0.543361 6.90426 0.543361 6.71999 0.50101L4.92199 0.0880095C4.66866 0.029694 4.40344 0.051814 4.16327 0.15129C3.92309 0.250765 3.7199 0.422647 3.58199 0.64301L2.60199 2.20701C2.50199 2.36701 2.36699 2.50201 2.20699 2.60301L0.642992 3.58301C0.42301 3.7208 0.25138 3.92366 0.151926 4.16342C0.0524714 4.40319 0.0301263 4.66797 0.0879918 4.92101L0.500992 6.72101C0.54319 6.90495 0.54319 7.09607 0.500992 7.28001L0.0879918 9.07901C0.0299014 9.3322 0.0521341 9.5972 0.151599 9.83717C0.251064 10.0771 0.42282 10.2802 0.642992 10.418L2.20699 11.398C2.36699 11.498 2.50199 11.633 2.60299 11.793L3.58299 13.357C3.86499 13.808 4.40299 14.031 4.92199 13.912L6.71999 13.499C6.90426 13.4567 7.09573 13.4567 7.27999 13.499L9.07899 13.912C9.33218 13.9701 9.59718 13.9479 9.83715 13.8484C10.0771 13.7489 10.2801 13.5772 10.418 13.357L11.398 11.793C11.498 11.633 11.633 11.498 11.793 11.398L13.358 10.418C13.5782 10.28 13.7499 10.0767 13.8491 9.83655C13.9484 9.59638 13.9704 9.33124 13.912 9.07801L13.5 7.28001C13.4576 7.09574 13.4576 6.90427 13.5 6.72001L13.913 4.92101C13.9712 4.66792 13.9491 4.403 13.8498 4.16304C13.7505 3.92308 13.579 3.72 13.359 3.58201L11.794 2.60201C11.6342 2.50183 11.4992 2.36679 11.399 2.20701L10.418 0.64301ZM9.91499 4.77001C9.97684 4.65628 9.99217 4.52298 9.95774 4.39818C9.92332 4.27338 9.84182 4.16679 9.73041 4.10085C9.619 4.03491 9.48635 4.01476 9.36038 4.04463C9.23441 4.0745 9.12494 4.15206 9.05499 4.26101L6.43999 8.68701L4.86099 7.17501C4.81415 7.12691 4.7581 7.08874 4.69618 7.06277C4.63427 7.0368 4.56776 7.02357 4.50062 7.02386C4.43348 7.02416 4.36708 7.03797 4.3054 7.06448C4.24371 7.09098 4.188 7.12964 4.14157 7.17815C4.09515 7.22665 4.05897 7.28401 4.0352 7.3468C4.01142 7.40959 4.00054 7.47652 4.00319 7.54361C4.00584 7.6107 4.02198 7.67656 4.05063 7.73728C4.07929 7.798 4.11989 7.85232 4.16999 7.89701L6.20399 9.84601C6.25843 9.89806 6.32393 9.93714 6.39559 9.96034C6.46725 9.98353 6.54322 9.99023 6.61784 9.97994C6.69245 9.96965 6.76378 9.94264 6.82649 9.90092C6.8892 9.8592 6.94167 9.80385 6.97999 9.73901L9.91499 4.77001Z" fill="#00C51D"/>
</svg>


    ),
    number: metrics&&metrics?.total_pending ||0,
    percentage: `${metrics&&metrics?.total_pending_change ||0}%`,
    time: 'from Last month',
    action:` ${metrics && metrics?.total_pending_change > 0 ? "increase" : metrics?.total_pending_change < 0 ? "decrease" : "stable"}`, // Action as string
  },
  {
    title: 'Success rate(liveness check)',
    icon: (
        <svg width="23" height="14" viewBox="0 0 23 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 12V14H6V12C6 12 6 8 12 8C18 8 18 12 18 12ZM15 3C15 2.40666 14.8241 1.82664 14.4944 1.33329C14.1648 0.839943 13.6962 0.455426 13.1481 0.228363C12.5999 0.00129986 11.9967 -0.0581102 11.4147 0.0576455C10.8328 0.173401 10.2982 0.459123 9.87868 0.878681C9.45912 1.29824 9.1734 1.83279 9.05764 2.41473C8.94189 2.99667 9.0013 3.59987 9.22836 4.14805C9.45542 4.69623 9.83994 5.16477 10.3333 5.49441C10.8266 5.82405 11.4067 6 12 6C12.7956 6 13.5587 5.68393 14.1213 5.12132C14.6839 4.55871 15 3.79565 15 3ZM18.2 8.06C18.7466 8.5643 19.1873 9.17244 19.4964 9.84891C19.8054 10.5254 19.9766 11.2566 20 12V14H23V12C23 12 23 8.55 18.2 8.06ZM17 1.1415e-06C16.6979 1.87014e-05 16.3976 0.0472552 16.11 0.140001C16.6951 0.97897 17.0087 1.97718 17.0087 3C17.0087 4.02282 16.6951 5.02103 16.11 5.86C16.3976 5.95275 16.6979 5.99998 17 6C17.7956 6 18.5587 5.68393 19.1213 5.12132C19.6839 4.55871 20 3.79565 20 3C20 2.20435 19.6839 1.44129 19.1213 0.878681C18.5587 0.316072 17.7956 1.1415e-06 17 1.1415e-06ZM6.34 3.92L7.5 5.33L2.75 10.08L0 7.08L1.16 5.92L2.75 7.5L6.34 3.92Z" fill="#0E2A9B"/>
</svg>

    ),
    number:`${metrics&&metrics?.success_rate ||0}%`,
    percentage: `${metrics&&metrics?.success_rate_change ||0}%`,
    time: 'from Last month',
    action:` ${metrics && metrics?.success_rate_change > 0 ? "increase" : metrics?.success_rate_change < 0 ? "decrease" : "stable"}`, // Action as string
  },
  {
    title: 'Error Rate(OCR)',
    icon: (
        <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M5.59974 0.230046L0.919744 4.91305V4.90305C0.84572 4.9782 0.78729 5.06725 0.747817 5.16508C0.708344 5.2629 0.688608 5.36756 0.689744 5.47305V12.527C0.689744 12.747 0.769744 12.947 0.919744 13.097L5.58974 17.77C5.73974 17.92 5.94974 18 6.15974 18H13.2197C13.4397 18 13.6397 17.92 13.7897 17.77L18.4597 13.097C18.5338 13.0219 18.5922 12.9328 18.6317 12.835C18.6711 12.7372 18.6909 12.6325 18.6897 12.527V5.47305C18.6897 5.25305 18.6097 5.05305 18.4597 4.90305L13.7897 0.230046C13.7146 0.156022 13.6255 0.0975925 13.5277 0.0581197C13.4299 0.0186468 13.3252 -0.0010896 13.2197 4.63936e-05H6.16974C5.94974 4.63936e-05 5.74974 0.0800464 5.59974 0.230046ZM9.68974 4.00005C9.95496 4.00005 10.2093 4.1054 10.3969 4.29294C10.5844 4.48048 10.6897 4.73483 10.6897 5.00005V10C10.6897 10.2653 10.5844 10.5196 10.3969 10.7072C10.2093 10.8947 9.95496 11 9.68974 11C9.42453 11 9.17017 10.8947 8.98264 10.7072C8.7951 10.5196 8.68974 10.2653 8.68974 10V5.00005C8.68974 4.73483 8.7951 4.48048 8.98264 4.29294C9.17017 4.1054 9.42453 4.00005 9.68974 4.00005ZM8.68974 13C8.68974 12.7348 8.7951 12.4805 8.98264 12.2929C9.17017 12.1054 9.42453 12 9.68974 12H9.69774C9.96296 12 10.2173 12.1054 10.4049 12.2929C10.5924 12.4805 10.6977 12.7348 10.6977 13C10.6977 13.2653 10.5924 13.5196 10.4049 13.7072C10.2173 13.8947 9.96296 14 9.69774 14H9.68974C9.42453 14 9.17017 13.8947 8.98264 13.7072C8.7951 13.5196 8.68974 13.2653 8.68974 13Z" fill="#B4070D"/>
</svg>

    ),
    number: `${metrics&&metrics?.error_rate ||0}%`,
    percentage: `${metrics&&metrics?.error_rate_change ||0}%`,
    time: 'from Last month',
    action:` ${metrics && metrics?.error_rate_change > 0 ? "increase" : metrics?.error_rate_change < 0 ? "decrease" : "stable"}`,// Action as string
  },
];

  
  return (
    <div className="w-full h-full pt-24  flex flex-col items-center    px-3 bg-[#FBFBFB]">
    <div className='w-full text-slate-700 text-start mb-5'>
    Overview

    </div>
    <div className='w-full mb-7   grid md:grid-cols-3 gap-y-5 xs:grid-cols-2  xl:grid-cols-4 gap-x-5 '>
    {cards.map((card, index) => (
      
      isLoadingMetrics?
        
        <SkeletonTheme key={index} baseColor="#a118f508" highlightColor="#ffff">
  
      <Skeleton height={"130px"} className='shadow' />
    
  </SkeletonTheme>

        :
        <Card key={index} action={card.action}  title={card.title} time={card.time} number={card.number} percentage={card.percentage} icon={card.icon}  />

      
      ))}
    </div>
    <div className='w-full   flex xl:flex-row flex-col  justify-between'>
    <div className='  xl:w-[68%] w-full ' >

    {
      
isLoading?

<SkeletonTheme baseColor="#a118f508" highlightColor="#ffff">
  
  <Skeleton height={"400px"} className='shadow' />

</SkeletonTheme>

      :

      <OnboardedCustomersChat />
    }
      


    </div>

    <div className='xl:w-[30%] w-full justify-between max-xl:mt-5  max-md:flex-col flex xl:flex-col'>
      {
        isLoading?
        <SkeletonTheme baseColor="#a118f508" highlightColor="#ffff">
  
  <Skeleton height={"200px"} className='shadow mb-4' />

</SkeletonTheme>
:
<AgeGenderChart/>


      }

      {
        isLoading?
        <SkeletonTheme baseColor="#a118f508" highlightColor="#ffff">
  
  <Skeleton height={"200px"} className='shadow' />

</SkeletonTheme>
:
<DemographyChart/>


      }
      
    </div>

    </div>
    
    <div  className="my-5 w-full"></div>
   
 
        <Table
         

        />
     
    </div>
  )
}

export default Dashboard