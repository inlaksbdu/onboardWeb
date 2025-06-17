import { useState, useEffect } from "react";
import { ActionMenuPopover, DetailsPopover } from "../ActionMenuPopover";
import profile from "../../assets/img/profile/tableprofile.jpeg";
import { Popover } from "react-tiny-popover";
import { faFileWord, faFilePdf, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import { useGetCustomersMutation } from '../../features/admin/adminSlice';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Document, Packer, Paragraph, TextRun } from "docx";
import * as XLSX from "xlsx";

const Table = () => {
  const [activeTab, setActiveTab] = useState("All onboarding");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [customers, setCustomers] = useState([]);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [filters, setFilters] = useState({
    stage: "",
    account_type: ""
  });

  const [getCustomers, { isLoading }] = useGetCustomersMutation();

  const handleGetCustomer = async (page = "1", filters = {}) => {
    try {
      const response = await getCustomers({
        page,
        page_size: 10,
        ...filters
      }).unwrap();
      
      setTotalCustomers(response.total);
      setCustomers(response.items);
      setTotalPages(Math.ceil(response.total / 10));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleGetCustomer(currentPage, filters);
  }, [currentPage, filters]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (name, value) => {
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const stages = [
    { value: "", label: "All Stages" },
    { value: "mail_verfication", label: "Email Verification" },
    { value: "phone_verification", label: "Phone Number Verification" },
    { value: "ocr", label: "OCR" },
    { value: "id_confirmation", label: "ID confrimation" },
    { value: "document_upload", label: "Document Upload" },
    { value: "complete", label: "Complete" }
  ];

  const accountTypes = [
    { value: "", label: "All Types" },
    { value: "individual", label: "Individual" },
    { value: "group", label: "Group" },
    { value: "sme", label: "SME" }
  ];

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

  // Export functions
  const exportToPDF = async () => {
    const input = document.querySelector('table');
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('customers.pdf');
    setIsPopoverOpen(false);
  };

  const exportToWord = async () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Customer Details",
                  bold: true,
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "Exported on: " + new Date().toLocaleDateString(),
                  size: 22,
                }),
              ],
            }),
            new Paragraph({ text: "" }),
            ...customers.map(customer => 
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Email: ${customer.email}`,
                    bold: true,
                  }),
                  new TextRun({
                    text: `\tStatus: ${getStatus(customer.phone_is_verified)}`,
                  }),
                  new TextRun({
                    text: `\tOnboarding Date: ${formatDate(customer.created_at)}`,
                  }),
                  new TextRun({
                    text: `\tPhone: ${customer.phone || "-"}`,
                  }),
                ],
              })
            ),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then(blob => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'customers.docx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsPopoverOpen(false);
    });
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      customers.map(customer => ({
        "Customer Email": customer.email,
        "Onboarding Status": getStatus(customer.phone_is_verified),
        "Date of Onboarding": formatDate(customer.created_at),
        "Phone Number": customer.phone || "-",
      }))
    );
    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");
    XLSX.writeFile(workbook, "customers.xlsx");
    setIsPopoverOpen(false);
  };

  const exportPopoverContent = (
    <div className="bg-white shadow-md border border-gray-200 rounded-md w-40">
      <button 
        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 border-slate-200 border-b text-slate-600"
        onClick={exportToPDF}
      >
        <FontAwesomeIcon icon={faFilePdf} className="mr-1" />
        PDF
      </button>
      <button 
        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 border-slate-200 border-b text-slate-600"
        onClick={exportToWord}
      >
        <FontAwesomeIcon icon={faFileWord} className="mr-1" />
        DOCX
      </button>
      <button 
        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 border-slate-200 border-b text-slate-600"
        onClick={exportToExcel}
      >
        <FontAwesomeIcon icon={faFileExcel} className="mr-1" />
        XLSX
      </button>
    </div>
  );

  return (
    <div className="pb-20 w-full">
      <div className="w-full flex flex-col justify-center items-center bg-white shadow-lg rounded-md border border-slate-100 py-3">
        {/* Header section */}
        <div className="w-full flex justify-between mb-10 px-3">
          <h6 className="text-slate-800">Customer Details</h6>
          <span className="text-slate-800 underline cursor-pointer">View all</span>
        </div>

        {/* Filter section */}
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

          <div className="flex justify-center items-center gap-2">
            {/* Export Popover */}
            <Popover
              isOpen={isPopoverOpen}
              position={["bottom", "right"]}
              onClickOutside={() => setIsPopoverOpen(false)}
              content={exportPopoverContent}
            >
              <span
                className="text-slate-600 cursor-pointer"
                onClick={() => setIsPopoverOpen(!isPopoverOpen)}
              >
                Export
              </span>
            </Popover>

            {/* Filter Popover */}
            <Popover
              isOpen={isFilterOpen}
              positions={["bottom", "right"]}
              onClickOutside={() => setIsFilterOpen(false)}
              content={
                <div className="bg-white shadow-md border border-gray-200 rounded-md p-4 w-64">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stage
                    </label>
                    <select
                      className="w-full border rounded-md p-2"
                      value={filters.stage}
                      onChange={(e) => handleFilterChange("stage", e.target.value)}
                    >
                      {stages.map((stage) => (
                        <option key={stage.value} value={stage.value}>
                          {stage.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Account Type
                    </label>
                    <select
                      className="w-full border rounded-md p-2"
                      value={filters.account_type}
                      onChange={(e) => handleFilterChange("account_type", e.target.value)}
                    >
                      {accountTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              }
            >
              <button
                className="text-sm bg-[#ecebeb59] flex-row flex justify-center items-center text-slate-600 rounded-md px-3 py-2 border border-slate-100 shadow-md"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                Filter
              </button>
            </Popover>
          </div>
        </div>

        {/* Table section */}
        <div className="w-full mt-5">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-sm text-left text-slate-600 bg-gray-50">
                <tr>
                  <th scope="col" className="px-3 text-nowrap py-3">Customer Email</th>
                  <th scope="col" className="px-3 text-nowrap py-3">Onboarding status</th>
                  <th scope="col" className="px-3 text-nowrap py-3">Date of Onboarding</th>
                  <th scope="col" className="px-3 text-nowrap py-3">Phone Number</th>
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
                  customers.map((customer) => (
                    <tr key={customer.id} className="odd:bg-white even:bg-gray-50">
                      <td className="px-3 text-slate-600 py-4 text-nowrap">
                        <Link to={`/admin/user-details/${customer.id}`} className="hover:underline cursor-pointer">
                          {customer.email}
                        </Link>
                      </td>
                      <td className="px-3 text-nowrap py-4">
                        <span className={`${getStatusStyles(customer.phone_is_verified)} rounded-lg p-2`}>
                          {getStatus(customer.phone_is_verified)}
                        </span>
                      </td>
                      <td className="px-3 text-nowrap text-slate-600 py-4">
                        {formatDate(customer.created_at)}
                      </td>
                      <td className="px-3 text-nowrap text-slate-600 py-4">
                        {customer.phone || "-"}
                      </td>
                      <td className="px-3 py-4">
                        <ActionMenuPopover>
                          <div className="flex flex-col">
                            <DetailsPopover 
                              profileImage={profile}
                              clientData={{
                                email: customer.email,
                                phoneNumber: customer.phone,
                                onboardingDate: formatDate(customer.created_at),
                                status: getStatus(customer.phone_is_verified),
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

export default Table;