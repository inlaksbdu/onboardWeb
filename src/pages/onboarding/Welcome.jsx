import logo from "../../assets/img/svg/logo.svg";
import { useState } from "react";
import { Link } from "react-router-dom";

function Welcome() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleRadioChange = (index) => {
    setSelectedOption(index);
  };

  return (
    <div className="w-full h-full justify-center items-center overflow-y-scroll">
      <div className="w-full flex justify-center items-center py-10 max-sm:px-4 max-xs:px-3">
        <div className="w-fit border py-8 max-sm:px-2  px-5 rounded-lg shadow bg-[#FBFBFB59]">
          <div className="w-full flex justify-center items-center flex-col mb-4">
            <img src={logo} className="mb-3" alt="logo" />
            <h4 className="font-poppins font-semibold text-3xl mb-3">
              <span>Welcome to</span>
              <span className="bg-text-gradient bg-clip-text text-transparent ml-1">
                onboarding
              </span>
            </h4>
            <p className="text-base text-center w-[80%] max-xs:w-[90%] text-gray-500">
              We’re here to make your onboarding experience seamless, secure, and swift.
            </p>
          </div>
          <div className="w-full p-4 flex text-start flex-col justify-center items-center">
            <p className="font-semibold text-gray-500 w-[90%]">
              Kindly select what best describes you
            </p>
            <div className="w-full flex flex-col justify-center items-center mt-5">
              {/* Radio Buttons */}
              {["Individual", "Groups", "SME"].map((label, index) => (
                <div
                  key={index}
                  className={`w-[90%] group transition-all duration-300 ease-in-out ${
                    selectedOption === index
                      ? "bg-text-gradient text-white border"
                      : "bg-white border text-gray-700 border-[#8600D9EB]"
                  } rounded-lg p-2 flex text-start flex-row mb-8 items-center`}
                >
                  <p className="font-semibold">{label}</p>
                  <div className="flex w-full justify-end p-3 rounded-lg">
                    <input
                      type="radio"
                      className="w-5 h-5 accent-[#8600D9EB]"
                      name="description"
                      id={`radio-${index}`}
                      value={label}
                      checked={selectedOption === index}
                      onChange={() => handleRadioChange(index)}
                    />
                  </div>
                </div>
              ))}

              <Link
                to="/onboarding"
                type="button"
                className="bg-gradient-to-r from-[#8600D9EB] to-[#470073EB] inline-flex items-center text-white rounded-lg text-sm px-5 py-3 w-[50%] text-center mt-3 justify-center duration-500 ease-in-out hover:from-[#470073EB] hover:to-[#8600D9EB] transition-all"
              >
                Next
                <svg
                  width="24"
                  height="24"
                  className="ml-4 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 12C0 14.3734 0.703788 16.6934 2.02236 18.6668C3.34094 20.6402 5.21508 22.1783 7.4078 23.0865C9.60051 23.9948 12.0133 24.2324 14.3411 23.7694C16.6689 23.3064 18.807 22.1635 20.4853 20.4853C22.1635 18.807 23.3064 16.6689 23.7694 14.3411C24.2324 12.0133 23.9948 9.60051 23.0865 7.4078C22.1783 5.21508 20.6402 3.34094 18.6668 2.02236C16.6934 0.703788 14.3734 0 12 0C8.8174 0 5.76515 1.26428 3.51472 3.51472C1.26428 5.76515 0 8.8174 0 12ZM5.14286 11.1429H15.5571L10.7743 6.33686L12 5.14286L18.8571 12L12 18.8571L10.7743 17.634L15.5571 12.8571H5.14286V11.1429Z"
                    fill="white"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
