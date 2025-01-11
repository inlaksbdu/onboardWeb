import PropTypes from "prop-types"

function Tabbar({ currentTab, setTab }) {
  return (
    <div className="w-full z-50 bg-white py-6 flex flex-row items-center justify-center absolute top-0">
      <div className="w-[30%] flex justify-between">
        {/* Each tab is represented as a small bar */}
        <span
          onClick={() => setTab('tab1')} // When clicked, this sets the current tab to "tab1"
          className={`w-[20%] h-1 block rounded-md cursor-pointer duration-300 ease-linear transition-all ${
            currentTab === 'tab1' || currentTab==='tab1.2'|| currentTab==='tab1.3' || currentTab==='tab1.4' ? 'bg-[#8600D9]' : 'bg-[#D1D1D6]'
          }`}
        ></span>
        <span
          onClick={() => setTab('tab2')} // Sets the current tab to "tab2"
          className={`w-[20%] h-1 block rounded-md cursor-pointer  duration-300 ease-linear transition-all  ${
            currentTab === 'tab2' ? 'bg-[#8600D9]' : 'bg-[#D1D1D6]'
          }`}
        ></span>
        <span
          onClick={() => setTab('tab3')} // Sets the current tab to "tab3"
          className={`w-[20%] h-1 block rounded-md cursor-pointer  duration-300 ease-linear transition-all  ${
            currentTab === 'tab3' ? 'bg-[#8600D9]' : 'bg-[#D1D1D6]'
          }`}
        ></span>
        <span
          onClick={() => setTab('tab4')} // Sets the current tab to "tab4"
          className={`w-[20%] h-1 block rounded-md cursor-pointer   duration-300 ease-linear transition-all  ${
            currentTab === 'tab4' ? 'bg-[#8600D9]' : 'bg-[#D1D1D6]'
          }`}
        ></span>
      </div>
    </div>
  );
}


Tabbar.propTypes = {
  setTab: PropTypes.func,
  currentTab: PropTypes.string,
};
export default Tabbar;
