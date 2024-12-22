
import{  useRef, useEffect } from "react";
import { X } from "lucide-react";
import { faCamera} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from "prop-types";

const CameraView = ({ onCapture, onClose }) => {
    const videoRef = useRef(null);
    const streamRef = useRef(null);


    const handleClose = () => {
       
        if (streamRef.current) {
            // Stop all tracks of the stream
            streamRef.current.getTracks().forEach((track) => {
              track.stop();
            });
            streamRef.current = null; // Clear the reference
          }
        onClose(); // Call the parent function to hide the modal
      };
    
  
    useEffect(() => {
      const startCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'environment' }, 
            audio: false 
          });
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
        } catch (err) {
          console.error("Error accessing camera:", err);
        }
      };
  
      startCamera();
  
      return () => {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }
      };
    }, []);
  
    const handleCapture = () => {
      const canvas = document.createElement('canvas');
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      const imageData = canvas.toDataURL('image/jpeg');
      onCapture(imageData);
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  
    return (
        <div className="w-screen absolute z-50 h-screen bg-slate-900 top-0  bg-opacity-50 flex justify-center pt-16">
      <div className=" bg-[#FBFBFB59] z-50 border border-slate-500 flex flex-col w-[70%] h-[70%]">
        <div className="relative flex-1 w-full h-full bg-black  rounded-t-md">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline
            className="w-full h-full object-cover rounded-t-md"
          />
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 bg-gray-800 rounded-full"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>
        <div className="p-4 bg-gradient-to-r rounded-b-md from-[#8600D9EB] to-[#470073EB] flex justify-center">
          <button
            onClick={handleCapture}
            className="w-16 h-16 bg-white  text-center rounded-full border-4 border-gray-300 flex items-center justify-center"
          >
                  

            <div className="w-12 h-12 bg-white rounded-full flex justify-center items-center" >
            <FontAwesomeIcon icon={faCamera}    />
            </div>
          </button>
        </div>
      </div>
      </div>
    );
  };

  CameraView.propTypes = {
   onCapture: PropTypes.func.isRequired, // Updated to ensure it's mandatory
   onClose: PropTypes.func.isRequired, 
  };
  export default CameraView;