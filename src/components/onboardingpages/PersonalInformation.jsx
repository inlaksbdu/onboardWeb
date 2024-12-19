import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
function PersonalInformation() {



  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "#f9fafb", // bg-gray-50
      color: "#374151", // text-slate-700
      border: state.isFocused ? "1px solid #9ca3af" : "1px solid #e5e7eb", // foctext-slate-700 placeholder:text-slate-700e-400 / border-slate-200
      boxShadow: state.isFocused ? "0 0 0 1px #9ca3af" : "none", // focus:shadow
      borderRadius: "0.5rem", // rounded-lg
      height: "45px", //
      transition: "all 0.3s ease",
      "&:hover": {
        borderColor: "#d1d5db", // hover:border-slate-300
      },
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "0.5rem",
      zIndex: 5,
      height: "250px",
      overflowY:"scroll",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#e5e7eb" : "transparent", // hover color
      color: "#374151", // text color
      padding: "10px 15px",
    
    }),
    placeholder: (base) => ({
      ...base,
      color: "#9ca3af", // placeholder text-slate-400
    }),
    singleValue: (base) => ({
      ...base,
      color: "#374151", // text-slate-700
    }),
  };

  


  const countryOptions = [
    {
      value: "US",
      label: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="https://flagcdn.com/w40/us.png"
            alt="United States"
            style={{ width: 20, height: 15, marginRight: 10 }}
          />
          United States
        </div>
      ),
    },
    {
      value: "GH",
      label: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="https://flagcdn.com/w40/gh.png"
            alt="Ghana"
            style={{ width: 20, height: 15, marginRight: 10 }}
          />
          Ghana
        </div>
      ),
    },
    // Add more countries here
  ];
  
  return (
    <div className="w-full h-full justify-center items-center overflow-scroll">
    <div className="w-full flex justify-center items-center mt-11 pb-10 pt-3 max-sm:px-4 max-xs:px-3">
      <div className="md:w-[50%] sm:w-[65%] xs:w-[80%] w-[96%] border pb-8 pt-3 max-md:px-3 md:px-5 rounded-lg shadow bg-[#FBFBFB59]">
     
      <div className="  w-full    justify-center items-center flex flex-col  overflow-hidden ">

<div className="w-full text-center my-6 ">
    <h4 className="text-2xl text-slate-800 font-semibold">Personal Information</h4>
    <p className='text-base  text-gray-500 mt-2  '>Please provide your personal information</p>
</div>


<div className="md:px-10 sm:px-7 px-4 w-full  text-start">

<form className='w-full '>
<div className='mb-2'>
        <label htmlFor="email" className="block mb-2   text-base font-normal text-slate-500 ">First Name</label>
        <input type="first_name" id="first_name" className="bg-gray-50    font-normal text-slate-700 placeholder:text-slate-700 border border-slate-200  text-base rounded-lg  transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow block w-full p-2.5 " placeholder="Enter first name" required />
    </div>
    

    <div className='mb-2'>
        <label htmlFor="password" className="block mb-2  text-base font-normal text-slate-500 ">Last Name</label>
        <input type="last_nam" id="last_nam" className="bg-gray-50      font-normal text-slate-700 placeholder:text-slate-700 border border-slate-200  text-base rounded-lg  transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow block w-full p-2.5 " placeholder="Enter last name" required />
    </div>


    <div className='mb-2'>
        <label htmlFor="password" className="block mb-2  text-base font-normal text-slate-500 ">Other Name(s)</label>
        <input type="last_nam" id="last_nam" className="bg-gray-50      font-normal text-slate-700 placeholder:text-slate-700 border border-slate-200  text-base rounded-lg  transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow block w-full p-2.5 " placeholder="Enter other name(s)" required />
    </div>

    <div className='mb-2'>
        <label htmlFor="dateofbirth" className="block mb-2 text-base    font-normal text-slate-500  ">Date of birth</label>

  
        <div className="relative w-full ">
  <DatePicker
    id="datepicker-range-end"
    name="end"
    style={{ width: '100%' }}
    className="bg-gray-50     font-normal text-slate-700 placeholder:text-slate-700 border border-slate-200  text-base rounded-lg  transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow block w-full p-2.5"
    placeholderText="MM/DD/YY"
    dateFormat="MM/DD/YY"
  
  />
  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 11C1 7.229 1 5.343 2.172 4.172C3.344 3.001 5.229 3 9 3H13C16.771 3 18.657 3 19.828 4.172C20.999 5.344 21 7.229 21 11V13C21 16.771 21 18.657 19.828 19.828C18.656 20.999 16.771 21 13 21H9C5.229 21 3.343 21 2.172 19.828C1.001 18.656 1 16.771 1 13V11Z" stroke="#181818" strokeWidth="1.5"/>
      <path d="M6 3V1.5M16 3V1.5M1.5 8H20.5" stroke="#181818" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M17 16C17 16.2652 16.8946 16.5196 16.7071 16.7071C16.5196 16.8946 16.2652 17 16 17C15.7348 17 15.4804 16.8946 15.2929 16.7071C15.1054 16.5196 15 16.2652 15 16C15 15.7348 15.1054 15.4804 15.2929 15.2929C15.4804 15.1054 15.7348 15 16 15C16.2652 15 16.5196 15.1054 16.7071 15.2929C16.8946 15.4804 17 15.7348 17 16ZM17 12C17 12.2652 16.8946 12.5196 16.7071 12.7071C16.5196 12.8946 16.2652 13 16 13C15.7348 13 15.4804 12.8946 15.2929 12.7071C15.1054 12.5196 15 12.2652 15 12C15 11.7348 15.1054 11.4804 15.2929 11.2929C15.4804 11.1054 15.7348 11 16 11C16.2652 11 16.5196 11.1054 16.7071 11.2929C16.8946 11.4804 17 11.7348 17 12ZM12 16C12 16.2652 11.8946 16.5196 11.7071 16.7071C11.5196 16.8946 11.2652 17 11 17C10.7348 17 10.4804 16.8946 10.2929 16.7071C10.1054 16.5196 10 16.2652 10 16C10 15.7348 10.1054 15.4804 10.2929 15.2929C10.4804 15.1054 10.7348 15 11 15C11.2652 15 11.5196 15.1054 11.7071 15.2929C11.8946 15.4804 12 15.7348 12 16ZM12 12C12 12.2652 11.8946 12.5196 11.7071 12.7071C11.5196 12.8946 11.2652 13 11 13C10.7348 13 10.4804 12.8946 10.2929 12.7071C10.1054 12.5196 10 12.2652 10 12C10 11.7348 10.1054 11.4804 10.2929 11.2929C10.4804 11.1054 10.7348 11 11 11C11.2652 11 11.5196 11.1054 11.7071 11.2929C11.8946 11.4804 12 11.7348 12 12ZM7 16C7 16.2652 6.89464 16.5196 6.70711 16.7071C6.51957 16.8946 6.26522 17 6 17C5.73478 17 5.48043 16.8946 5.29289 16.7071C5.10536 16.5196 5 16.2652 5 16C5 15.7348 5.10536 15.4804 5.29289 15.2929C5.48043 15.1054 5.73478 15 6 15C6.26522 15 6.51957 15.1054 6.70711 15.2929C6.89464 15.4804 7 15.7348 7 16ZM7 12C7 12.2652 6.89464 12.5196 6.70711 12.7071C6.51957 12.8946 6.26522 13 6 13C5.73478 13 5.48043 12.8946 5.29289 12.7071C5.10536 12.5196 5 12.2652 5 12C5 11.7348 5.10536 11.4804 5.29289 11.2929C5.48043 11.1054 5.73478 11 6 11C6.26522 11 6.51957 11.1054 6.70711 11.2929C6.89464 11.4804 7 11.7348 7 12Z" fill="#181818"/>
    </svg>
  </div>
</div>
    

    </div>


    <div className='mb-2'>
        <label htmlFor="dateofbirth" className="block mb-2 text-base  text-slate-500 font-normal ">Address</label>

  
        <div className="relative w-full ">
  <input 
    id="address"
    name="address"
    className="bg-gray-50    text-slate-700 placeholder:text-slate-700 border border-slate-200  text-base rounded-lg  transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow block w-full p-2.5"
    placeholder="Enter address"
  
  />
  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
   
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.132 18.737C3.5759 17.8698 2.27971 16.6027 1.37746 15.0666C0.475215 13.5306 -0.00033212 11.7814 1.74026e-07 10C1.74026e-07 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20.0003 11.7814 19.5248 13.5306 18.6225 15.0666C17.7203 16.6027 16.4241 17.8698 14.868 18.737L13.972 16.946C15.503 16.0702 16.7016 14.7129 17.3814 13.0854C18.0612 11.4579 18.1841 9.65135 17.731 7.94676C17.2779 6.24217 16.2741 4.73511 14.8759 3.66C13.4776 2.58488 11.7633 2.00199 9.9995 2.00199C8.23571 2.00199 6.52136 2.58488 5.12312 3.66C3.72488 4.73511 2.72113 6.24217 2.268 7.94676C1.81488 9.65135 1.93778 11.4579 2.6176 13.0854C3.29742 14.7129 4.49603 16.0702 6.027 16.946L5.132 18.737ZM6.924 15.153C5.79634 14.4798 4.9207 13.4552 4.43143 12.2365C3.94215 11.0177 3.86627 9.67207 4.21543 8.40602C4.56459 7.13997 5.31949 6.02345 6.36432 5.22776C7.40915 4.43208 8.68619 4.00117 9.9995 4.00117C11.3128 4.00117 12.5899 4.43208 13.6347 5.22776C14.6795 6.02345 15.4344 7.13997 15.7836 8.40602C16.1327 9.67207 16.0568 11.0177 15.5676 12.2365C15.0783 13.4552 14.2027 14.4798 13.075 15.153L12.177 13.356C12.9008 12.8864 13.4534 12.1954 13.7523 11.3861C14.0512 10.5767 14.0804 9.69244 13.8355 8.86514C13.5907 8.03783 13.0849 7.31187 12.3937 6.79557C11.7024 6.27927 10.8628 6.00031 10 6.00031C9.13722 6.00031 8.29757 6.27927 7.60633 6.79557C6.91509 7.31187 6.40931 8.03783 6.16446 8.86514C5.91961 9.69244 5.94881 10.5767 6.24772 11.3861C6.54662 12.1954 7.0992 12.8864 7.823 13.356L6.924 15.153ZM10 14L13 20H7L10 14Z" fill="#212121" fillOpacity="0.72"/>
</svg>

  </div>
</div>
    

    </div>

    

    <div className='mb-2'>
        <label htmlFor="language" className="block mb-2 text-base  text-slate-500 font-normal">Nationality</label>
       
        <Select
    options={countryOptions}
    placeholder="Choose a country"
    styles={customStyles}

  />
    
    </div>
    <button   type="button"  className="bg-gradient-to-r mb-10  from-[#8600D9EB] to-[#470073EB] inline-flex items-center text-white rounded-lg text-sm px-5 py-3  w-full text-center mt-5  justify-center  duration-500 ease-in-out hover:from-[#470073EB] hover:to-[#8600D9EB] transition-all ">
Get Started


</button>
</form>

</div>



</div>
      </div>
    </div>
  </div>

)
}

export default PersonalInformation