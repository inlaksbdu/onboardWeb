import  { useState } from 'react';
import profile from "../../assets/img/profile/tableprofile.jpeg"

function Table() {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState("All onboarding(5)");

  // Tabs data
  const tabs = [
    { label: "All onboarding(5)" },
    { label: "Upcompleted" },
    { label: "Completed" },
  ];

  return (
<div className='pb-20 w-full'>
    <div className="w-full   flex flex-col justify-center items-center bg-white shadow-lg rounded-md border border-slate-100 mb ">
      <div className="w-full flex justify-between mb-10  px-3 ">
        <h6 className="text-slate-800">Customer Details</h6>
        <span className="text-slate-800 underline cursor-pointer">View all</span>
      </div>

      <div className="w-full justify-between flex  px-3  mb-3 ">
        <div className="bg-[#ecebeb59] flex-row flex justify-center items-center text-slate-600 rounded-md px-2 py-1 border border-slate-100 shadow-md">
          {tabs.map((tab) => (
            <div
              key={tab.label}
              className={`py-2 px-3  rounded-md text-sm cursor-pointer ${
                activeTab === tab.label ? "bg-white shadow-md border-slate-200" : ""
              }`}
              onClick={() => setActiveTab(tab.label)}
            >
              {tab.label} 
            </div>
          ))}
        </div>
      </div>

      <div className="w-full mt-5 ">
       

       

<div className="relative overflow-x-auto ">
    <table className="w-full text-sm ">
        <thead className="text-sm text-left text-slate-600 bg-gray-50">
            <tr>
            <th scope="col" className="px-3 text-nowrap  py-3 ">
            Image
                    </th>
                <th scope="col" className="px-3 text-nowrap  py-3 ">
                    Client Name
                </th>
                <th scope="col" className="px-3 text-nowrap  py-3 ">
                    Date of birth
                </th>
                <th scope="col" className="px-3 text-nowrap  py-3 ">
                    phone
                </th>
                <th scope="col" className="px-3 text-nowrap  py-3 ">
                    Email address
                </th>
                
                <th scope="col" className="px-3 text-nowrap  py-3 ">
                    Action
                </th>
            </tr>
        </thead>
        <tbody className='text-left'>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50  0">
                <th scope="row" className="px-3 text-nowrap  py-2 font-medium text-gray-900 whitespace-nowrap  ">
                    <div className="w-14 h-14">
                        <img className="object-cover w-full h-full rounded-md" src={profile} alt="User profile" />
                    </div>
                </th>
                <td className="px-3   py-4 text-nowrap">
                John Doe
                </td>
                <td className="px-3 text-nowrap  py-4">
                12/13/2024
                </td>
                <td className="px-3 text-nowrap  py-4">
                +233 24 123 4567
                </td>
                <td className="px-3 text-nowrap  py-4">
                mayorvina1@gmail                </td>
                <td className="px-3 text-nowrap  py-4">
                ..      </td>
            </tr>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50  0">
                <th scope="row" className="px-3 text-nowrap  py-2 font-medium text-gray-900 whitespace-nowrap  ">
                    <div className="w-14 h-14">
                        <img className="object-cover w-full h-full rounded-md" src={profile} alt="User profile" />
                    </div>
                </th>
                <td className="px-3 text-nowrap  py-4">
                John Doe
                </td>
                <td className="px-3 text-nowrap  py-4">
                12/13/2024
                </td>
                <td className="px-3 text-nowrap  py-4">
                +233 24 123 4567
                </td>
                <td className="px-3 text-nowrap  py-4">
                mayorvina1@gmail                </td>
                <td className="px-3 text-nowrap  py-4">
                ..      </td>
            </tr>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50  0">
                <th scope="row" className="px-3 text-nowrap  py-2 font-medium text-gray-900 whitespace-nowrap  ">
                    <div className="w-14 h-14">
                        <img className="object-cover w-full h-full rounded-md" src={profile} alt="User profile" />
                    </div>
                </th>
                <td className="px-3 text-nowrap  py-4">
                John Doe
                </td>
                <td className="px-3 text-nowrap  py-4">
                12/13/2024
                </td>
                <td className="px-3 text-nowrap  py-4">
                +233 24 123 4567
                </td>
                <td className="px-3 text-nowrap  py-4">
                mayorvina1@gmail                </td>
                <td className="px-3 text-nowrap  py-4">
                ..      </td>
            </tr>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50  0">
                <th scope="row" className="px-3 text-nowrap  py-2 font-medium text-gray-900 whitespace-nowrap  ">
                    <div className="w-14 h-14">
                        <img className="object-cover w-full h-full rounded-md" src={profile} alt="User profile" />
                    </div>
                </th>
                <td className="px-3 text-nowrap  py-4">
                John Doe
                </td>
                <td className="px-3 text-nowrap  py-4">
                12/13/2024
                </td>
                <td className="px-3 text-nowrap  py-4">
                +233 24 123 4567
                </td>
                <td className="px-3 text-nowrap  py-4">
                mayorvina1@gmail                </td>
                <td className="px-3 text-nowrap  py-4">
                ..      </td>
            </tr>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50  0">
                <th scope="row" className="px-3 text-nowrap  py-2 font-medium text-gray-900 whitespace-nowrap  ">
                    <div className="w-14 h-14">
                        <img className="object-cover w-full h-full rounded-md" src={profile} alt="User profile" />
                    </div>
                </th>
                <td className="px-3 text-nowrap  py-4">
                John Doe
                </td>
                <td className="px-3 text-nowrap  py-4">
                12/13/2024
                </td>
                <td className="px-3 text-nowrap  py-4">
                +233 24 123 4567
                </td>
                <td className="px-3 text-nowrap  py-4">
                mayorvina1@gmail                </td>
                <td className="px-3 text-nowrap  py-4">
                ..      </td>
            </tr>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50  0">
                <th scope="row" className="px-3 text-nowrap  py-2 font-medium text-gray-900 whitespace-nowrap  ">
                    <div className="w-14 h-14">
                        <img className="object-cover w-full h-full rounded-md" src={profile} alt="User profile" />
                    </div>
                </th>
                <td className="px-3 text-nowrap  py-4">
                John Doe
                </td>
                <td className="px-3 text-nowrap  py-4">
                12/13/2024
                </td>
                <td className="px-3 text-nowrap  py-4">
                +233 24 123 4567
                </td>
                <td className="px-3 text-nowrap  py-4">
                mayorvina1@gmail                </td>
                <td className="px-3 text-nowrap  py-4">
                ..      </td>
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
