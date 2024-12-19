import { useState } from "react";
import { Popover } from "react-tiny-popover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import profile from '../../assets/img/profile/tableprofile.jpeg'





function Table() {
  const [activeTab, setActiveTab] = useState("All onboarding(5)");
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // state for hover on the trigger
  const [isPopoverHovered, setIsPopoverHovered] = useState(false); // state for hover on the popover content

  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [isDetailsPopoverVisible, setIsDetailsPopoverVisible] = useState(false); // New state for view details popover

  const toggleModal = () => {
    setIsModalDetailOpen(!isModalDetailOpen);
  };

  // Tabs data
  const tabs = [
    { label: "All onboarding(5)" },
    { label: "Upcompleted" },
    { label: "Completed" },
  ];

  return (
    <div className="pb-20 w-full">
      <div className="w-full flex flex-col justify-center items-center bg-white shadow-lg rounded-md border border-slate-100 py-3 mb">
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
            <span className="text-slate-600 ">Export</span>
            <div className="text-sm ml-2 bg-[#ecebeb59] flex-row flex justify-center items-center text-slate-600 rounded-md px-3 py-2 border border-slate-100 shadow-md">
              Filter
            </div>
          </div>
        </div>

        <div className="w-full mt-5">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-sm text-left text-slate-600 bg-gray-50">
                <tr>
                  <th scope="col" className="px-3 text-nowrap py-3 text-slate-600">
                    Client Name
                  </th>
                  <th scope="col" className="px-3 text-nowrap py-3">
                    Onboarding status
                  </th>
                  <th scope="col" className="px-3 text-nowrap py-3">
                    Date of Onboarding
                  </th>
                  <th scope="col" className="px-3 text-nowrap py-3">
                    Profile type
                  </th>
                  <th scope="col" className="px-3 text-nowrap py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="text-left">
                <tr className="odd:bg-white even:bg-gray-50">
                  <td className="px-3 text-slate-600 py-4 text-nowrap">John Doe</td>
                  <td className="px-3 text-nowrap py-4">
                    <span className="bg-[#5AD0000D] bg-opacity-30 font-light text-[#02B62F] rounded-lg p-2">
                      Completed
                    </span>
                  </td>
                  <td className="px-3 text-nowrap text-slate-600 py-4">12/13/2024</td>
                  <td className="px-3 text-nowrap text-slate-600 py-4">mayorvina1@gmail</td>
                  <td className="px-3 py-4">
                    <Popover
                      isOpen={isPopoverVisible}
                      positions={["right", "left"]} // preferred position
                      padding={0.5}
                      onClickOutside={() => setIsPopoverVisible(false)}
                      content={
                        <div
                          className="bg-white w-full text-gray-600 py-2 px-2 rounded-md shadow-md"
                          onMouseEnter={() => setIsPopoverHovered(true)}
                          onMouseLeave={() => setIsPopoverHovered(false)}
                        >
                      
                      <Popover
                      isOpen={isDetailsPopoverVisible}
                      positions={["left",'right','top','bottom']} // preferred position
                      padding={10}
                      onClickOutside={() => setIsDetailsPopoverVisible(false)}
                      content={
                        <div style={{zIndex:2000,}} className="bg-white w-[350px]   z-40 py-2 rounded-md shadow-md">
                          <div onClick={toggleModal} className="flex items-center flex-col  hover:bg-[#EEEEEE] rounded-md  py-2 cursor-pointer">

                            
                            <div className="w-full flex px-4   ">
                            <div className="w-[10%]">
                              <FontAwesomeIcon icon={faTimesCircle} className='mr-1'   />

                                    </div>
                            <div className="text-md text-slate-700 text-center w-[90%]">

                            View details
                            </div>
                          

                            </div>

                            <hr className="bg-[#3333332E] my-3 w-full"/>
                            <div className="flex flex-row justify-between w-full px-3  items-center">
                                <img src={profile} className="w-10 h-10 rounded-md  "/>
                                <div>
                                <span className="text-slate-600 text-sm">Onboarding Status:<span className="bg-[#5AD0000D] bg-opacity-30  text-[#02B62F] mx-2 font-medium rounded-lg p-2">
                      Completed
                    </span></span>

                                </div>
                            </div>


                            <div className="w-full px-3 my-4">

                            <span className="font-semibold text-sm  text-slate-800">Client Information</span>

                            </div>
                            <div className="w-full flex flex-col px-3 mb-5 text-sm">
                            <div className="flex flex-row justify-between w-full mb-3">
                            <span className="text-slate-600 text-start">First name:</span>
                            <span className="text-end">John</span>

                            </div>

                            <div className="flex flex-row justify-between w-full mb-3">
                            <span className="text-slate-600 text-start">Last name:</span>
                            <span className="text-end">Doe</span>

                            </div>


                            <div className="flex flex-row justify-between w-full mb-3">
                            <span className="text-slate-600 text-start">Date of birth:</span>
                            <span className="text-end">12/17/2024</span>

                            </div>


                            <div className="flex flex-row justify-between w-full mb-3">
                            <span className="text-slate-600 text-start">Phone number::</span>
                            <span className="text-end">08105695440</span>

                            </div>

                            <div className="flex flex-row justify-between w-full mb-3">
                            <span className="text-slate-600 text-start">Address:</span>
                            <span className="text-end">GA-543-789</span>

                            </div>

                            <div className="flex flex-row justify-between w-full mb-3">
                            <span className="text-slate-600 text-start">Nationality:</span>
                            <span className="text-end">Ghana</span>

                            </div>

                            <div className="flex flex-row justify-between w-full mb-3">
                            <span className="text-slate-600 text-start">Gender:</span>
                            <span className="text-end">Male</span>

                            </div>

                            <hr className="bg-[#3333332E] h-1 "/>

                            <div className="w-full  my-4 ">

<span className="font-semibold tex-sm  text-slate-800 ">Onboarding  Information</span>
<div className="flex flex-row justify-between w-full mb-3 mt-4">
                            <span className="text-slate-600 text-start">Date of onboarding:</span>
                            <span className="text-end">12/17/2024</span>

                            </div>

                            <div className="flex flex-row justify-between w-full mb-3">
                            <span className="text-slate-600 text-start">Profile type:</span>
                            <span className="text-end">Individual</span>

                            </div>

                            <div className="flex flex-row justify-between w-full mb-3">
                            <span className="text-slate-600 text-start">Onboarding status:</span>
                            <span className="text-end">Completed</span>

                            </div>

</div>
                            </div>


                          </div>
                        </div>
                      }
                    >
                    

                      <div
                          // Show details on click
                          onClick={() => setIsDetailsPopoverVisible(true)}
                            className="flex items-center hover:bg-[#EEEEEE] rounded-md px-3 py-2 cursor-pointer"
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.4738 0.315674H1.7405C1.40279 0.315674 1.07891 0.449828 0.840114 0.688624C0.601317 0.927421 0.467163 1.2513 0.467163 1.58901V14.3223C0.467163 14.66 0.601317 14.9839 0.840114 15.2227C1.07891 15.4615 1.40279 15.5957 1.7405 15.5957H14.4738C14.8115 15.5957 15.1354 15.4615 15.3742 15.2227C15.613 14.9839 15.7472 14.66 15.7472 14.3223V1.58901C15.7472 1.2513 15.613 0.927421 15.3742 0.688624C15.1354 0.449828 14.8115 0.315674 14.4738 0.315674ZM13.2005 12.4123H3.01383C2.84498 12.4123 2.68304 12.3453 2.56364 12.2259C2.44424 12.1065 2.37716 11.9445 2.37716 11.7757C2.37716 11.6068 2.44424 11.4449 2.56364 11.3255C2.68304 11.2061 2.84498 11.139 3.01383 11.139H13.2005C13.3694 11.139 13.5313 11.2061 13.6507 11.3255C13.7701 11.4449 13.8372 11.6068 13.8372 11.7757C13.8372 11.9445 13.7701 12.1065 13.6507 12.2259C13.5313 12.3453 13.3694 12.4123 13.2005 12.4123ZM13.2005 8.59234H3.01383C2.84498 8.59234 2.68304 8.52526 2.56364 8.40587C2.44424 8.28647 2.37716 8.12453 2.37716 7.95567C2.37716 7.78682 2.44424 7.62488 2.56364 7.50548C2.68304 7.38608 2.84498 7.31901 3.01383 7.31901H13.2005C13.3694 7.31901 13.5313 7.38608 13.6507 7.50548C13.7701 7.62488 13.8372 7.78682 13.8372 7.95567C13.8372 8.12453 13.7701 8.28647 13.6507 8.40587C13.5313 8.52526 13.3694 8.59234 13.2005 8.59234ZM13.2005 4.77234H3.01383C2.84498 4.77234 2.68304 4.70526 2.56364 4.58587C2.44424 4.46647 2.37716 4.30453 2.37716 4.13567C2.37716 3.96682 2.44424 3.80488 2.56364 3.68548C2.68304 3.56608 2.84498 3.49901 3.01383 3.49901H13.2005C13.3694 3.49901 13.5313 3.56608 13.6507 3.68548C13.7701 3.80488 13.8372 3.96682 13.8372 4.13567C13.8372 4.30453 13.7701 4.46647 13.6507 4.58587C13.5313 4.70526 13.3694 4.77234 13.2005 4.77234Z"
                                fill="#181818"
                              />
                            </svg>
                            <span className="mx-2 text-sm">View details</span>
                          </div>
                    </Popover>
                        </div>
                      }
                    >
                      <span
                        className="cursor-pointer text-2xl text-slate-600"
                        onMouseEnter={() => {
                          setIsHovered(true);
                          setIsPopoverVisible(true);
                        }}
                        onMouseLeave={() => {
                          if (!isPopoverHovered) {
                            setIsPopoverVisible(false);
                          }
                          setIsHovered(false);
                        }}
                      >
                        ...
                      </span>
                    </Popover>
                    {/* New popover for view details */}
                  
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
