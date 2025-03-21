import logo from "../../assets/img/svg/logo.svg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { useTranslation } from 'react-i18next';

function Welcome() {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState("en");

  const { t, i18n } = useTranslation();



  useEffect(() => {
    const detectLanguage = () => {
      // First check localStorage
      const savedLanguage = localStorage.getItem('preferredLanguage');
      const supportedLanguages = ["en", "fr", "es", "pt", "it", "de", "zh", "sw", "yo", "af", "ha", "ig", "ak"];
      
      if (savedLanguage && supportedLanguages.includes(savedLanguage)) {
        return savedLanguage;
      }

      // If no saved language, detect browser language
      const browserLang = navigator.language.split('-')[0];
      return supportedLanguages.includes(browserLang) ? browserLang : 'en';
    };

    const defaultLang = detectLanguage();
    if (i18n.language !== defaultLang) {
      i18n.changeLanguage(defaultLang).then(() => {
        setCurrentLanguage(defaultLang); // Update state after language change
      });
    } else {
      setCurrentLanguage(defaultLang); // Set state if language is already correct
    }
  }, [i18n]);

  useEffect(() => {
    const handleLanguageChange = (lang) => {
      setCurrentLanguage(lang);
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);


 

  const handleCardClick = (index) => {
    setSelectedOption(index);
  };

  

  const handleNextClick = () => {
    if (selectedOption !== null) {
      const selectedValue = ["individual", "group", "sme"][selectedOption];
      localStorage.setItem("selectedOption", selectedValue);
      navigate(`/onboarding`);
    }
  };

  useEffect(() => {
    const elements = document.getElementsByClassName('css-1u9des2-indicatorSeparator');
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
    }
  }, []);

 

  const languageOptions = [
    { value: "en", label: "English", flag: "us" },
    { value: "fr", label: "Français", flag: "fr" },
    { value: "es", label: "Español", flag: "es" },
    { value: "pt", label: "Português", flag: "pt" },
    { value: "it", label: "Italiano", flag: "it" },
    { value: "de", label: "Deutsch", flag: "de" },
    { value: "zh", label: "中文", flag: "cn" },
    { value: "sw", label: "Kiswahili", flag: "tz" },
    { value: "yo", label: "Yorùbá", flag: "ng" },
    { value: "af", label: "Afrikaans", flag: "za" },
    { value: "ha", label: "Hausa", flag: "ne" },
    { value: "ig", label: "Igbo", flag: "ng" },
    { value: "ak", label: "Akan", flag: "gh" }
  ].map(lang => ({
    value: lang.value,
    label: (
      <div className="flex items-center justify-between text-xs">
        {lang.label}
        <img
          src={`https://flagcdn.com/w40/${lang.flag}.png`}
          alt={lang.label}
          className="rounded-full ml-2"
          style={{ width: 17, height: 17 }}
        />
      </div>
    )
  }));
  

  const handleLanguageChange = (selectedOption) => {
    i18n.changeLanguage(selectedOption.value);
    localStorage.setItem('preferredLanguage', selectedOption.value);
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "white",
      color: "#374151",
      border: state.isFocused ? "1px solid #9ca3af" : "1px solid #e5e7eb",
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      borderRadius: "0.5rem",
      height: "33px",
      transition: "all 0.3s ease",
      "&:hover": {
        borderColor: "#d1d5db",
      },
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "0.5rem",
      zIndex: 5,
      height: "auto",
      maxHeight: "250px",
      overflowY: "auto",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#e5e7eb" : "transparent",
      color: "#374151",
      padding: "5px 5px",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#9ca3af",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#374151",
    }),
  };

  const getCurrentLanguageOption = () => {
    return languageOptions.find(option => option.value === currentLanguage) || languageOptions[0];
  };

  return (
    <div className="w-full h-full justify-center items-center overflow-y-scroll">
      <div className="w-full flex justify-center items-center py-10 max-sm:px-4 max-xs:px-3">
        <div className="w-fit border py-8 max-sm:px-2 px-5 rounded-lg shadow bg-[#FBFBFB59]">
          <div className="w-full flex justify-end px-4 mb-4">
            <div>
              <Select
                options={languageOptions}
                styles={customStyles}
                onChange={handleLanguageChange}
                value={getCurrentLanguageOption()}
                isSearchable={false}
              />
            </div>
          </div>
          <div className="w-full flex justify-center items-center flex-col mb-4">
            <img src={logo} className="mb-3" alt="logo" />
            <h4 className="font-poppins font-semibold text-3xl mb-3">
              <span>{t('Welcome to')}</span>
              <span className="bg-text-gradient bg-clip-text text-transparent ml-1">
                {t('Onboarding')}
              </span>
            </h4>
            <p className="text-base text-center w-[80%] max-xs:w-[90%] text-gray-500">
              {t("We're here to make your onboarding experience seamless, secure, and swift.")}
            </p>
          </div>
          <div className="w-full p-4 flex text-start flex-col justify-center items-center">
            <p className="font-semibold text-gray-500 w-[90%]">
              {t('Kindly select what best describes you')}
            </p>
            <div className="w-full flex flex-col justify-center items-center mt-5">
              {["Individual", "Groups", "SME"].map((label, index) => (
                <button
                  key={index}
                  onClick={() => handleCardClick(index)}
                  className={`w-[90%] group transition-all duration-300 ease-in-out cursor-pointer ${
                    selectedOption === index
                      ? "bg-text-gradient text-white border"
                      : "bg-white border text-slate-600 border-[#8600D9EB] hover:bg-gray-50"
                  } rounded-lg p-2 flex text-start flex-row mb-8 items-center`}
                >
                  <p className="font-semibold">{t(label)}</p>
                  <div className="flex w-full justify-end p-3 rounded-lg">
                    <div
                      className={`w-5 h-5 rounded-full border ${
                        selectedOption === index 
                        ? "bg-white border-white" 
                        : "border-[#8600D9EB]"
                      }`}
                    >
                      {selectedOption === index && (
                        <div className="w-3 h-3 bg-[#8600D9EB] rounded-full m-auto mt-1"></div>
                      )}
                    </div>
                  </div>
                </button>
              ))}

              <button
                onClick={handleNextClick}
                type="button"
                className="bg-gradient-to-r from-[#8600D9EB] to-[#470073EB] inline-flex items-center text-white rounded-lg text-sm px-5 py-3 w-[50%] text-center mt-3 justify-center duration-500 ease-in-out hover:from-[#470073EB] hover:to-[#8600D9EB] transition-all"
              >
                {t('Next')}
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
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;