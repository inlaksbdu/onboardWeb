import React from 'react';

const AgeGenderChart = () => {
  const data = [
    { age: '18-25', male: 7.7, female: 5, total: 12.7 },
    { age: '25-40', male: 9.2, female: 6, total: 15.2 },
    { age: '41-60', male: 12.3, female: 13, total: 25.3 },
    { age: '61+', male: 15.5, female: 18, total: 33.5 }
  ];

  return (
    <div className=" w-full p-2  max-xl:w-[48%]  max-md:w-full  bg-white shadow border border-slate-100 rounded-lg">
      {/* Header Section */}
      <div className=" pb-1">
        <div className="text-sm text-slate-600 text-start">Statistics</div>
        <div className='w-full'>
        <div className="text-right flex  justify-end flex-col">
        <span className='text-xs font-slate-600'>Total:</span>
            <span className="text-normal font-semibold">31,863</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <h2 className="text-md font-medium">Age and gender</h2>
          <div className="flex gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-400"></div>
            <span>Male</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-200"></div>
            <span>Female</span>
          </div>
        </div>
        </div>
        
        {/* Legend */}
        
      </div>

      {/* Chart Content */}
      <div className="space-y-4 mt-2">
        {data.map((item) => (
          <div key={item.age} className="space-y-1">
            <div className="flex  flex-row justify-between text-sm items-center">
              <span className="font-medium text-nowrap">{item.age}</span>
              <div className="h-3 flex rounded-full overflow-hidden w-full justify-start  bg-gray-100 mx-2">
              <div 
                className="bg-[#7987FF] rounded-r-full z-10 " 
                style={{ width: `${item.male}%` }}
              />
              <div 
                className="bg-[#1976D261] rounded-r-full -ml-[4px] " 
                style={{ width: `${item.female}%` }}
              />
            </div>
              <span className="text-gray-500">{item.total}%</span>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgeGenderChart;