import { useState } from "react";
import { ActionMenuPopover,DetailsPopover } from "../ActionMenuPopover";
import profile from "../../assets/img/profile/tableprofile.jpeg"
import { Popover } from "react-tiny-popover";
import { faFileWord,faFilePdf,faFileExcel} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";

const Table = () => {
  const [activeTab, setActiveTab] = useState("All onboarding(5)");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // Tabs data
  const tabs = [
    { label: "All onboarding(5)" },
    { label: "Upcompleted" },
    { label: "Completed" },
  ];


  const tableData = [
    {
      id: 1,
      clientName: "John Doe",
      status: "Completed",
      onboardingDate: "12/13/2024",
      profileType: "mayorvina1@gmail",
      details: {
        firstName: "John",
        lastName: "Doe",
        dateOfBirth: "17/06/1990",
        phoneNumber: "08105695440",
        address: "GA-543-789, East Legon",
        nationality: "Ghana",
        gender: "Male",
        onboardingDate: "12/17/2024",
        profileType: "Individual",
        status: "Completed",
        documentType: "Drivers license",
        idCardIssueDate: "01/15/2022",
        placeOfBirth: "Accra, Ghana",
        idCardExpiryDate: "01/15/2027"
      }
    },
    {
      id: 2,
      clientName: "Sarah Williams",
      status: "Uncompleted",
      onboardingDate: "12/15/2024",
      profileType: "sarah.w@company.com",
      details: {
        firstName: "Sarah",
        lastName: "Williams",
        dateOfBirth: "23/08/1988",
        phoneNumber: "07012345678",
        address: "Plot 45, Airport Residential Area",
        nationality: "Nigerian",
        gender: "Female",
        onboardingDate: "12/15/2024",
        profileType: "Business",
        status: "Uncompleted",
        documentType: "International Passport",
        idCardIssueDate: "03/20/2021",
        placeOfBirth: "Lagos, Nigeria",
        idCardExpiryDate: "03/20/2031"
      }
    },
    {
      id: 3,
      clientName: "Robert Chen",
      status: "Completed",
      onboardingDate: "12/10/2024",
      profileType: "robert.chen@gmail.com",
      details: {
        firstName: "Robert",
        lastName: "Chen",
        dateOfBirth: "05/12/1995",
        phoneNumber: "09076543210",
        address: "Block C2, Roman Ridge",
        nationality: "Chinese",
        gender: "Male",
        onboardingDate: "12/10/2024",
        profileType: "Individual",
        status: "Completed",
        documentType: "National ID",
        idCardIssueDate: "06/01/2023",
        placeOfBirth: "Shanghai, China",
        idCardExpiryDate: "06/01/2033"
      }
    },
    {
      id: 4,
      clientName: "Maria Garcia",
      status: "Uncompleted",
      onboardingDate: "12/18/2024",
      profileType: "maria.g@outlook.com",
      details: {
        firstName: "Maria",
        lastName: "Garcia",
        dateOfBirth: "30/03/1992",
        phoneNumber: "05544332211",
        address: "House 7, Cantonments",
        nationality: "Spanish",
        gender: "Female",
        onboardingDate: "12/18/2024",
        profileType: "Business",
        status: "Uncompleted",
        documentType: "Residence Permit",
        idCardIssueDate: "09/15/2023",
        placeOfBirth: "Madrid, Spain",
        idCardExpiryDate: "09/15/2025"
      }
    },
    {
      id: 5,
      clientName: "David Osei",
      status: "Completed",
      onboardingDate: "12/11/2024",
      profileType: "david.osei@yahoo.com",
      details: {
        firstName: "David",
        lastName: "Osei",
        dateOfBirth: "14/11/1987",
        phoneNumber: "02033445566",
        address: "PM-456, Tema",
        nationality: "Ghanaian",
        gender: "Male",
        onboardingDate: "12/11/2024",
        profileType: "Individual",
        status: "Completed",
        documentType: "Voter ID",
        idCardIssueDate: "11/01/2023",
        placeOfBirth: "Kumasi, Ghana",
        idCardExpiryDate: "11/01/2027"
      }
    }
  ];

  // Simplified status styling
  const getStatusStyles = (status) => {
    return status === "Completed" 
      ? "bg-[#5AD0000D] bg-opacity-30 font-light text-[#02B62F]"
      : "bg-[#C2C20014] bg-opacity-30 font-light text-[#B4BA00]";
  };


 

  return (
    <div className="pb-20 w-full">
      <div className="w-full flex flex-col justify-center items-center bg-white shadow-lg rounded-md border border-slate-100 py-3">
       
        <div className="w-full flex justify-between mb-10 px-3">
          <h6 className="text-slate-800">Customer Details</h6>
          <span className="text-slate-800 underline cursor-pointer">View all</span>
        </div>

       
        <div className="w-full justify-between flex px-3 mb-3">
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
          <div className="flex justify-center items-center">
          <Popover
            isOpen={isPopoverOpen}
            position={["bottom", "right"]} // Preferred popover positions
            onClickOutside={() => setIsPopoverOpen(false)}
            content={
              <div className="bg-white shadow-md border border-gray-200 rounded-md w-40">
                <button
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 border-slate-200 border-b text-slate-600"
                >
                        <FontAwesomeIcon icon={faFilePdf} className='mr-1'   />
                  pdf
                </button>
                <button
                                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 border-slate-200 border-b text-slate-600"

                >
                        <FontAwesomeIcon icon={faFileWord} className='mr-1'   />
                
                   docx
                </button>
                <button
                                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 border-slate-200 border-b text-slate-600"
                                    >
                          <FontAwesomeIcon icon={faFileExcel} className='mr-1'   />
                  
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

            <div className="text-sm ml-2 bg-[#ecebeb59] flex-row flex justify-center items-center text-slate-600 rounded-md px-3 py-2 border border-slate-100 shadow-md">
              Filter
            </div>
          </div>
        </div>

        {/* Table */}
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
                {tableData.map((row) => (
                  <tr key={row.id} className="odd:bg-white even:bg-gray-50">
                    <td className="px-3 text-slate-600 py-4 text-nowrap">
                    
                    <Link to={`/admin/user-details/${row.id}`} className="hover:underline cursor-pointer"> {row.clientName}</Link>
                   </td>
                    <td className="px-3 text-nowrap py-4">
                      
                    <span className={`${getStatusStyles(row.status)} rounded-lg p-2`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-3 text-nowrap text-slate-600 py-4">{row.onboardingDate}</td>
            <td className="px-3 text-nowrap text-slate-600 py-4">{row.profileType}</td>
            <td className="px-3 py-4">
              <ActionMenuPopover>
                <div className="flex flex-col">
                  <DetailsPopover 
                    profileImage={profile}
                    clientData={row.details}
                  />
                </div>
              </ActionMenuPopover>
            </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

       
        <div className="w-full flex flex-row px-3 text-sm my-3">
          <nav className="flex flex-row">
            <span className="mr-1 text-slate-400 mt-[0.8px] cursor-pointer">Prev</span>
            <span className="mr-1 text-white border bg-[#8600D9] text-center rounded-md p-1 justify-center items-center flex w-6 h-6">1</span>
            {[2, 3, 4, 5].map((page) => (
              <span key={page} className="mr-1 text-slate-900 border bg-white text-center rounded-md p-1 justify-center items-center flex w-6 h-6 hover:text-white hover:bg-[#8600D9] transition-all duration-150">
                {page}
              </span>
            ))}
            <span className="mr-1 text-slate-700 mt-[0.8px] cursor-pointer hover:text-[#8600D9]">Next</span>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Table;


