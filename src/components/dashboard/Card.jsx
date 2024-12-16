import { faArrowUp,faArrowDown} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from "prop-types"

function Card({title,icon,number,action,time,percentage}) {
  return (
    <div className='w-full p-2 flex flex-col h-full bg-white shadow-lg  rounded-md border border-slate-100 '>
    <div className='w-full mb-3 flex-row flex justify-between'><span className='text-slate-600 text-sm '>{title}</span>
    
    <span className='p-1 bg-[#C5C5C540] w-8 h-7 flex justify-center items-center  '>{icon}</span>
     </div>
     <h6 className='text-slate-800 font-semibold text-xl text-start mb-5'>{number}</h6>
     <div className="flex-row flex justify-start items-center ">
     <div className={`  rounded-lg text-xs py-1 px-3 mr-3 ${action=='increase'?'bg-green-700 bg-opacity-20 text-green-700':"bg-red-700 bg-opacity-10  text-red-700"}`}>
     {
        action =='increase'?
        <FontAwesomeIcon icon={faArrowUp} className='mr-1'   />

        :
        <FontAwesomeIcon icon={faArrowDown}   className='mr-1'   />

  
     }

     {
        action=='increase'?
        <span>+</span>

        :
        <span>-</span>

  
     }
{percentage}
     </div>
     <span className='text-slate-600 text-xs'>{time}</span>

     </div>

    </div>
  )
}

Card.propTypes = {
  
  title:PropTypes.string,
  icon:PropTypes.element,
  number:PropTypes.number,
  action:PropTypes.string,
  time:PropTypes.string,
  percentage:PropTypes.string,
};


export default Card