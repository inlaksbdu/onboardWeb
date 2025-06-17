import { useState, useEffect } from "react";
import { ActionMenuPopover, DetailsPopover } from "../ActionMenuPopover";
import profile from "../../assets/img/profile/tableprofile.jpeg";
import { Popover } from "react-tiny-popover";
import { faFileWord, faFilePdf, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import { useGetCustomersMutation } from '../../features/admin/adminSlice';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ReportTable = () => {
  const [activeTab, setActiveTab] = useState("All onboarding");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [customers, setCustomers] = useState([]);
  const [totalCustomers, setTotalCustomers] = useState(0);

  const [getCustomers, { isLoading }] = useGetCustomersMutation();

  const handleGetCustomer = async (page = 1) => {
    try {
      const response = await getCustomers({
        page,
        page_size: 10
      }).unwrap();
      
      setTotalCustomers(response.total);
      setCustomers(response.items);
      setTotalPages(Math.ceil(response.total / 10));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleGetCustomer(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const tabs = [
    { label: `All onboarding(${totalCustomers || 0})` },
    { label: "Uncompleted" },
    { label: "Completed" },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
  };

  const getStatus = (is_verified) => {
    return is_verified ? "Completed" : "Uncompleted";
  };

  const getStatusStyles = (is_verified) => {
    return is_verified
      ? "bg-[#5AD0000D] bg-opacity-30 font-light text-[#02B62F]"
      : "bg-[#C2C20014] bg-opacity-30 font-light text-[#B4BA00]";
  };

  return (
    <div className="pb-20 w-full">
      <div className="w-full flex flex-col justify-center items-center bg-white shadow-lg rounded-md border border-slate-100 py-3">
       
        <div className="w-full flex justify-between mb-10 px-3">
          <h6 className="text-slate-800">Report List </h6>
           {/* Header section 
          <span className="text-slate-800 underline cursor-pointer">View all</span>
          */}
        </div>

       
        <div className="w-full justify-end flex px-3 mb-3">
         {/* Tabs and Export section
          <div className="bg-[#ecebeb59] flex-row flex justify-center items-center text-slate-600 rounded-md px-2 py-1 border border-slate-100 shadow-md">
            {tabs.map((tab) => (
              <div
                key={tab.label}
                className={`py-2 px-3 rounded-md text-sm cursor-pointer ${
                  activeTab === tab.label ? "bg-white shadow-md border-slate-200" : ""
                }`}
                onClick={() => setActiveTab(tab.label)}
              >
                {tab.label}
              </div>
            ))}
          </div>
           */}

          <div>
            <Popover
              isOpen={isPopoverOpen}
              position={["bottom", "right"]}
              onClickOutside={() => setIsPopoverOpen(false)}
              content={
                <div className="bg-white shadow-md border border-gray-200 rounded-md w-40">
                  <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 border-slate-200 border-b text-slate-600">
                    <FontAwesomeIcon icon={faFilePdf} className="mr-1" />
                    pdf
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 border-slate-200 border-b text-slate-600">
                    <FontAwesomeIcon icon={faFileWord} className="mr-1" />
                    docx
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 border-slate-200 border-b text-slate-600">
                    <FontAwesomeIcon icon={faFileExcel} className="mr-1" />
                    xlsx
                  </button>
                </div>
              }
            >
              <span
                className="text-slate-600 cursor-pointer"
                onClick={() => setIsPopoverOpen(!isPopoverOpen)}
              >
                Export
              </span>
            </Popover>
          </div>
        </div>

        {/* ReportTable section */}
        <div className="w-full mt-5">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-sm text-left text-slate-600 bg-gray-50">
                <tr>
                  <th scope="col" className="px-3 text-nowrap py-3">Client Name</th>
                  <th scope="col" className="px-3 text-nowrap py-3">Onboarding status</th>
                  <th scope="col" className="px-3 text-nowrap py-3">Date of Onboarding</th>
                  <th scope="col" className="px-3 text-nowrap py-3">Profile type</th>
                  <th scope="col" className="px-3 text-nowrap py-3">Action</th>
                </tr>
              </thead>
              <tbody className="text-left">
                {isLoading ? (
                  <tr>
                    <td colSpan={5}>
                      <SkeletonTheme baseColor="#a118f508" highlightColor="#ffff">
                        <Skeleton height={"50px"} count={6} className='shadow mb-2' />
                      </SkeletonTheme>
                    </td>
                  </tr>
                ) : customers?.length > 0 ? (
                  customers?.map((customer) => (
                    <tr key={customer.User.id} className="odd:bg-white even:bg-gray-50">
                      <td className="px-3 text-slate-600 py-4 text-nowrap">
                        <Link to={`/admin/user-details/${customer.User.id}`} className="hover:underline cursor-pointer">
                          {customer.User.email}
                        </Link>
                      </td>
                      <td className="px-3 text-nowrap py-4">
                        <span className={`${getStatusStyles(customer.User.is_verified)} rounded-lg p-2`}>
                          {getStatus(customer.User.is_verified)}
                        </span>
                      </td>
                      <td className="px-3 text-nowrap text-slate-600 py-4">
                        {formatDate(customer.User.created_at)}
                      </td>
                      <td className="px-3 text-nowrap text-slate-600 py-4">
                        {customer.User.account_type}
                      </td>
                      <td className="px-3 py-4">
                        <ActionMenuPopover>
                          <div className="flex flex-col">
                            <DetailsPopover 
                              profileImage={profile}
                              clientData={{
                                email: customer.User.email,
                                phoneNumber: customer.User.phone,
                                onboardingDate: formatDate(customer.User.created_at),
                                profileType: customer.User.account_type,
                                status: getStatus(customer.User.is_verified),
                              }}
                            />
                          </div>
                        </ActionMenuPopover>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-slate-600 font-semibold bg-gray-50">
                      No customers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination section */}
        <div className="w-full flex flex-row px-3 text-sm my-3">
          {customers?.length > 0 && (
            <nav className="flex flex-row items-center">
              <button
                className={`mr-1 text-slate-400 mt-[0.8px] cursor-pointer ${
                  currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:text-[#8600D9]'
                }`}
                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <span
                  key={page}
                  className={`mr-1 border text-center rounded-md p-1 justify-center items-center flex w-6 h-6 cursor-pointer ${
                    currentPage === page
                      ? 'text-white bg-[#8600D9]'
                      : 'text-slate-900 bg-white hover:text-white hover:bg-[#8600D9]'
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </span>
              ))}
              
              <button
                className={`ml-1 text-slate-700 mt-[0.8px] cursor-pointer ${
                  currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:text-[#8600D9]'
                }`}
                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportTable;